import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from 'react-toastify';

import { useProfile } from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";
import Handlelogout from "./Handlelogout";


import { useEffect, useState } from "react";
import profImg from "../assets/profile.jpg";
import logo from "../assets/logo/logo.png";
import { red } from "@mui/material/colors";
import getDecodedToken from "../hooks/useDecodedToken";
const wsurl = import.meta.env.VITE_WEBSOCKET_NOTIFICATION_URL;
import { useGetNotification } from "../hooks/useGetNotifications";
import useAnncCard from "../hooks/useAncCard";

import defaultProfilePic from "../assets/defaultUserPic.png";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "About", href: "/", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();

  const handlelogout = () => {
    if (Handlelogout()) {
      navigate("/login");
    }
  };
  const [hasNotification, setHasNotification] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [formData, setFormData] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);

  const toggleNotifDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useState(() => {
    const id = getDecodedToken();

    const token = localStorage.getItem('token');
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
        // setNotifications([...notifications, data.notification]);
      }
    };

    return () => {
      socket.close();
    };
  });

  const setNotificationList = async() =>{
    console.log("get notif is called");
    if(hasNotification){
      const data = await useGetNotification();
      setNotifications(data.data);
    }
    console.log("get notif is called");
    setHasNotification(false);
  };

  useEffect(() => {
    const fetch = async () => {
      try{
        const response = await useProfile();
        setFormData(response.data);
        setPreviewImg(response.data.image)
      }catch(error){
        throw error;
      }
    }
    fetch();
  }, []);

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultProfilePic;
  }

  return (
    <Disclosure as="nav" className="z-50 sticky w-full bg-pallate-primary">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-auto" src={logo} alt="TrekDestiny" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative">
                  <Menu.Button className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none "
                  onClick={setNotificationList}
                  >
                    {hasNotification && (
                      <div className="absolute -top-1 w-4 h-4 bg-red-500 rounded-full" 
                      />
                    )}
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded shadow-lg focus:outline-none">
                    {notifications.length === 0 ? (
                      <Menu.Item>
                        <span className="block px-4 py-2 text-sm text-gray-700">
                          No new notifications.
                        </span>
                      </Menu.Item>
                    ) : (
                      notifications.map((notification, index) => (
                        <Menu.Item key={index}>
                          <span className="block px-4 py-2 text-sm text-gray-700 border-t">
                            {notification.message}
                          </span>
                        </Menu.Item>
                      ))
                    )}
                  </Menu.Items>
                </Menu>
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={previewImg!=null && previewImg!="" ? previewImg : defaultProfilePic} 
                        onError={handleError} 
                        alt="Profile"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handlelogout}
                            className={classNames(
                              active ? "bg-gray-100 cursor-pointer" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Log out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
