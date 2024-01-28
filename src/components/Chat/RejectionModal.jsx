import React from "react";
import { MdClose, MdOutlineWarningAmber } from "react-icons/md";
import { toast } from "react-toastify";

const RejectionModal = ({
  isVisible,
  onClose,
  onRejectConfirm, // New prop for handling rejection confirmation
}) => {
  if (!isVisible) return null;

  const handelClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  const handleNoClick = () => {
    onClose(); // Use onClose for consistency
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
          <div className="block rounded-lg bg-white p-6">
            <h5
              className="mb-2 text-xl font-medium leading-tight text-neutral-800"
              style={{ display: "flex", alignItems: "center" }}
            >
              <MdOutlineWarningAmber className="text-yellow-400 text-3xl" />
              <span style={{ marginLeft: "10px" }}>Reject Confirmation</span>
            </h5>
            <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              Are you sure you want to reject this offer?
            </p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={onRejectConfirm} // Call onRejectConfirm when Yes is clicked
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
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;
