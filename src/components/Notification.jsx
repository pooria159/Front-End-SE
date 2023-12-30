import React, { useState, useEffect } from "react";
import { BellIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {
  useGetNotification,
  useDeleteNotification,
} from "../hooks/useNotifications";
import config from "../hooks/config";
import getDecodedToken from "../hooks/useDecodedToken";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const wsurl = config.WEBSOCKET_NOTIFICATION_URL;

const NotificationComponent = () => {
  const [hasNotification, setHasNotification] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const toggleNotifDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setHasNotification(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useState(() => {
    const id = getDecodedToken();

    if (id) {
      const token = localStorage.getItem("token");
      console.log(token);

      const socket = new WebSocket(wsurl + "/" + id.UserID);
      socket.onopen = (event) => {
        console.warn("WebSocket connection opened:", event);
      };

      socket.onclose = (event) => {
        console.error("WebSocket connection closed:", event);
      };

      socket.onerror = (event) => {
        console.error("WebSocket error:", event);
      };
      socket.onmessage = (event) => {
        console.log("WebSocket message received:", event.data);
        const data = JSON.parse(event.data);
        if (data.signal === 1) {
          setHasNotification(true);
        //   setNotifications([...notifications, data.notification]);
        }
      };

      return () => {
        socket.close();
      };
    }
  });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await useGetNotification();
        setNotifications(data.data);
        // setHasNotification(false);
      } catch (error) {
        console.error("Error getting notifications:", error);
      }
    };

    fetchNotifications();
  }, [hasNotification]);

  const handleDeleteNotification = async (notificationId) => {
    try {
      const response = await useDeleteNotification(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  return (
    <div>
      <Tooltip title="notifications">
        <IconButton
          className="relative rounded-full p-1 focus:outline-none "
          onClick={handleClick}
        >
          {hasNotification && (
            <span class="absolute w-4 h-6 flex right-4">
              <span className="absolute w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75" />
              <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          )}
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <BellIcon
            className="h-6 w-6 text-white hover:text-gray-200"
            aria-hidden="true"
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {notifications.length === 0 ? (
          <MenuItem>
            <span className="block text-sm text-gray-700 ">
              <p>No new notifications.</p>
            </span>
          </MenuItem>
        ) : (
          notifications.map((notification) => (
            <MenuItem
              
              key={notification.id}
              sx={{
                "&": {
                  backgroundColor: "#e3f2fd", // Your desired background color
                  fontSize: "0.8rem",
                  minWidth: "300px",
                },
              }}
            >
              <p>{notification.message}</p>
              <button
                onClick={() => handleDeleteNotification(notification.id)}
                className="absolute top-1 right-2"
              >
                <EyeSlashIcon
                  className="h-5 text-blue-500"
                  aria-hidden="true"
                />
              </button>
            </MenuItem>
            
          ))
        )}
      </Menu>
    </div>

  );
};

export default NotificationComponent;
