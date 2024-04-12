import { FaArrowLeft } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { saveAs } from "file-saver";
import { useState } from "react";
function ImageDownload({ selectedImage, setImageOpen, setSelectedImage }) {
  const [openTop, setOpenTop] = useState(false);

  function handleOpenTop() {
    setOpenTop((prev) => !prev);
  }
  return (
    <div
      className="absolute inset-0 bg-black h-full w-full z-50 "
      onClick={handleOpenTop}
    >
      <div className="w-[100%] relative h-full flex items-center justify-center bg-black">
        <img
          src={selectedImage}
          alt={selectedImage}
          className="object-contain w-full h-full"
        />
        <div
          className={`${
            openTop ? "opacity-0" : "opacity-100"
          } transition-all duration-300 absolute h-16 bg-gray-800/40 flex justify-between  items-center px-2 top-0 left-0 w-full`}
        >
          <div className=" hover:bg-gray-600/50 rounded-full px-2 py-0.5">
            <button
              className="text-white text-xl gap-2 flex items-center"
              onClick={() => {
                setImageOpen(false);
                setSelectedImage(null);
              }}
            >
              <FaArrowLeft /> <span className="inline">back</span>
            </button>
          </div>
          <div className=" hover:bg-gray-600/50 rounded-full p-1 px-2 ">
            <button
              className="text-white text-2xl"
              onClick={() => saveAs(selectedImage)}
            >
              <IoMdDownload />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageDownload;
