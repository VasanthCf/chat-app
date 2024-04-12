// import { FaArrowLeft } from "react-icons/fa6";
// import { IoSendSharp } from "react-icons/io5";
// // const DEFAULT_OPTIONS = [
// //   {
// //     name: "Brightness",
// //     property: "brightness",
// //     value: 100,
// //     range: {
// //       min: 0,
// //       max: 200,
// //     },
// //     unit: "%",
// //   },
// //   {
// //     name: "Contrast",
// //     property: "contrast",
// //     value: 100,
// //     range: {
// //       min: 0,
// //       max: 200,
// //     },
// //     unit: "%",
// //   },
// //   {
// //     name: "Saturation",
// //     property: "saturate",
// //     value: 100,
// //     range: {
// //       min: 0,
// //       max: 200,
// //     },
// //     unit: "%",
// //   },

// //   {
// //     name: "Blur",
// //     property: "blur",
// //     value: 0,
// //     range: {
// //       min: 0,
// //       max: 20,
// //     },
// //     unit: "px",
// //   },
// // ];
// function ImageSend({ setImg, img }) {
//   //   const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
//   //   const [options, setOptions] = useState(DEFAULT_OPTIONS);
//   //   const selectedOption = options[selectedOptionIndex];

//   //   function handleSliderChange({ target }) {
//   //     setOptions((prevOptions) => {
//   //       return prevOptions.map((option, index) => {
//   //         if (index !== selectedOptionIndex) return option;
//   //         return { ...option, value: target.value };
//   //       });
//   //     });
//   //   }

//   //   function getImageStyle() {
//   //     const filters = options.map((option) => {
//   //       return `${option.property}(${option.value}${option.unit})`;
//   //     });

//   //     return { filter: filters.join(" ") };
//   //   }

//   return (
//     <div className="absolute inset-0 bg-black h-full transition-all duration-400 w-full z-50">
//       <div className=" transition-all duration-400 w-[100%] relative h-full flex items-end justify-center bg-black">
//         <img
//           src={img}
//           alt={img}
//           className="object-contain w-full h-full"
//           //   style={getImageStyle()}
//         />
//         <div
//           className={` absolute h-16  flex justify-between  items-center px-2 top-0 left-0 w-full`}
//         >
//           <div className=" hover:bg-gray-600/50 rounded-full px-2 py-0.5">
//             <button
//               className="text-white text-xl gap-2 flex items-center"
//               onClick={() => {
//                 setImg(null);
//               }}
//             >
//               <FaArrowLeft />
//             </button>
//           </div>
//         </div>
//         {/* <div className="absolute bottom-24 w-full  left-2">
//           <input
//             type="range"
//             className="w-[95%] accent-green-400"
//             min={selectedOption.range.min}
//             max={selectedOption.range.max}
//             value={selectedOption.value}
//             onChange={handleSliderChange}
//           />
//         </div> */}
//         <div className="absolute bottom-10 flex px-1 justify-between items-center h-12 w-full">
//           <div className="flex flex-wrap justify-evenly flex-1 items-center">
//             {/* {" "}
//             {options.map((option, index) => (
//               <p
//                 key={index}
//                 onClick={() => setSelectedOptionIndex(index)}
//                 className={`${
//                   index === selectedOptionIndex
//                     ? "bg-green-400 text-black"
//                     : "bg-black text-white"
//                 }  ring-1 ring-offset-2 ring-green-400 rounded-full p-2 text-xs`}
//               >
//                 {option.name}
//               </p>
//             ))} */}
//           </div>
//           <div>
//             <button
//               type="submit"
//               className=" w-12  h-12 rounded-full flex  justify-center items-center text-white text-xl   bg-green-400 pl-1"
//             >
//               <IoSendSharp />
//             </button>{" "}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ImageSend;
{
  /* <dialog id="my_modal_3" className="modal">
  <div className="modal-box pb-0 bg-gray-700">
    <div method="dialog">
      <button
        className="btn btn-xl btn-circle  bg-gray-400/50 btn-ghost absolute   font-bold right-2 top-0"
        onClick={() => {
          setImg(null);
          document.getElementById("my_modal_3").close();
        }}
      >
        ✕
      </button>
    </div>
    <div className="w-full rounded-xl">
      <img src={img} />
    </div>
    <div className="w-full  flex justify-end py-2">
      <button
        type="submit"
        className=" w-10  h-10 rounded-full flex bg-gray-500 justify-center items-center text-white text-xl   active:bg-green-400 pl-1"
        onClick={() => {
          document.getElementById("my_modal_3").close();
        }}
      >
        <IoSendSharp />
      </button>
    </div>
  </div>
</dialog>; */
}
