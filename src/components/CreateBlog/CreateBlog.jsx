import { React, useEffect, useState } from "react";
import BlogModal from "./BlogModal";

const CreateBlog = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <button
        className="mt-4 bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-[0.75rem] px-3 py-3 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        style={{ transition: "all .15s ease" }}
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        Offers
      </button>{" "}
      <BlogModal
        isVisible={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
    </div>
  );
};

export default CreateBlog;
