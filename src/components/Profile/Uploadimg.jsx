import React,{useEffect, useState} from 'react';






const Uploadimg = () => {

  return (
    <div>

<>
  {/* component */}
  <div className="bg-gray-500 h-screen w-screen sm:px-8 md:px-16 sm:py-8">
    <main className="container mx-auto max-w-screen-lg h-full">
      {/* file upload modal */}
      <article
        aria-label="File Upload Modal"
        className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
        ondrop="dropHandler(event);"
        ondragover="dragOverHandler(event);"
        ondragleave="dragLeaveHandler(event);"
        ondragenter="dragEnterHandler(event);"
      >
        {/* overlay */}
        <div
          id="overlay"
          className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md"
        >
          <i>
            <svg
              className="fill-current w-12 h-12 mb-3 text-blue-700"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
            </svg>
          </i>
          <p className="text-lg text-blue-700">Drop files to upload</p>
        </div>
        {/* scroll area */}
        <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
          <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
              <span>Drag and drop your</span>&nbsp;
              <span>files anywhere or</span>
            </p>
            <input
              id="hidden-input"
              type="file"
              multiple=""
              className="hidden"
            />
            <button
              id="button"
              className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
            >
              Upload a file
            </button>
          </header>
          <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
            To Upload
          </h1>
          <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
            <li
              id="empty"
              className="h-full w-full text-center flex flex-col items-center justify-center items-center"
            >
              <img
                className="mx-auto w-32"
                src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                alt="no data"
              />
              <span className="text-small text-gray-500">
                No files selected
              </span>
            </li>
          </ul>
        </section>
        {/* sticky footer */}
        <footer className="flex justify-end px-8 pb-8 pt-4">
          <button
            id="submit"
            className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
          >
            Upload now
          </button>
          <button
            id="cancel"
            className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
          >
            Cancel
          </button>
        </footer>
      </article>
    </main>
  </div>
  {/* using two similar templates for simplicity in js code */}
  <template id="file-template" />
  <template id="image-template" />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n.hasImage:hover section {\n  background-color: rgba(5, 5, 5, 0.4);\n}\n.hasImage:hover button:hover {\n  background: rgba(5, 5, 5, 0.45);\n}\n\n#overlay p,\ni {\n  opacity: 0;\n}\n\n#overlay.draggedover {\n  background-color: rgba(255, 255, 255, 0.7);\n}\n#overlay.draggedover p,\n#overlay.draggedover i {\n  opacity: 1;\n}\n\n.group:hover .group-hover\\:text-blue-800 {\n  color: #2b6cb0;\n}\n"
    }}
  />
</>


    </div>
  );
};

export default Uploadimg;
