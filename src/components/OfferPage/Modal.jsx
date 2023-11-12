import React, { useState, useEffect, useRef } from "react";
import { MdClose, MdOutlineWarningAmber } from "react-icons/md";
import Accept from "./Accept";
import Decline from "./Decline";

const Modal = ({ isVisible, onClose, isAccept, index, removeCard }) => {
  const hasPrintedRef = useRef(false);

  useEffect(() => {
    if (!hasPrintedRef.current) {
      hasPrintedRef.current = true;
    }
  }, [index]);

  if (!isVisible) return null;

  const handelClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const handleRemoveCard = () => {
    console.log("index in handleRemoveCard", index);
    if (typeof index === "number") {
      removeCard(index);
    }
  };
  const handleYesClick = () => {
    setIsVisible(false);
  };

  const handleNoClick = () => {
    // Close the modal
  };

  return (
    <div
      className="z-50 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handelClose}
    >
      <div className="w-[20rem] h-[20rem] flex flex-col">
        <div className="bg-white p-6 rounded-md relative">
          <button
            className="text-black text-xl absolute top-0 right-0 m-2 hover:bg-gray-300 p-0.5 rounded"
            onClick={() => {
              onClose();
            }}
          >
            <MdClose />
          </button>
          {isAccept ? (
            <div className="block rounded-lg bg-white p-6">
              <h5
                className="mb-2 text-xl font-medium leading-tight text-neutral-800"
                style={{ display: "flex", alignItems: "center" }}
              >
                <MdOutlineWarningAmber className="text-yellow-400 text-3xl" />
                <span style={{ marginLeft: "10px" }}>Warning</span>
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Are you sure you want to give this user hosting access?
              </p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  onClick={handleYesClick}
                  className="inline-block w-24 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={handleNoClick}
                  className="inline-block w-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <div className="block rounded-lg bg-white p-6">
              <h5
                className="mb-2 text-xl font-medium leading-tight text-neutral-800"
                style={{ display: "flex", alignItems: "center" }}
              >
                <MdOutlineWarningAmber className="text-yellow-400 text-3xl" />
                <span style={{ marginLeft: "10px" }}>Warning</span>
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Are you sure you don't want to give this user a host account?
              </p>
              <div style={{display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  className="inline-block rounded w-24 bg-green-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="inline-block rounded w-24 bg-red-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-red-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
