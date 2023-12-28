import { React, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import { toast } from 'react-toastify';


const Uploadimg = ({setHostHouseImages}) => {
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState("");


  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;
    if (files.length + file.length > 3) {
        setMessage("You cannot upload more than three photos");
        console.log(message);
        return;
    }
    for (let i = 0; i < file.length; i++) {
        const fileType = file[i]["type"];
        const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
        if (validImageTypes.includes(fileType)) {
            setFile([...files, file[i]]);
            setHostHouseImages([...files, file[i]]);
        } else {
            setMessage("Only pictures are acceptable");
            console.log(message);
        }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
    setHostHouseImages(files.filter((x) => x.name !== i));
  };


  return (
    <>
        <div class="flex justify-center h- w-screen items-center px-3">
          <div class="rounded-lg bg-white w-full">
            <div class="m-4">
              <span classNam="flex justify-center items-center text-[12px] mb-1 text-red-500">
                {message}
              </span>
              <div class="flex items-center justify-center w-full">
                <label class="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                  <div class="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select a photo
                    </p>
                  </div>
                  <input
                    type="file"
                    onChange={handleFile}
                    class="opacity-0"
                    multiple="multiple"
                    name="files[]"
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {files.map((file, key) => {
                  return (
                    <div key={key} className="overflow-hidden relative">
                      <FaTimes
                        onClick={() => {
                          removeImage(file.name);
                        }}
                        class="absolute right-1 hover:text-white cursor-pointer"
                      />
                      <img
                        className="h-24 w-24 rounded-md"
                        src={URL.createObjectURL(file)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default Uploadimg;
