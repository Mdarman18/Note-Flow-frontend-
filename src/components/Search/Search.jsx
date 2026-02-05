import React from "react";
import { IoSearchSharp, IoClose } from "react-icons/io5";

const Searching = ({ value, onChange, handleSearch, handleClear }) => {
  return (
    <div className="w-40 sm:w-60 md:w-80 flex items-center px-4 bg-slate-100 mx-1 md:mx-none rounded-md">
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-xs bg-transparent py-2.75 outline-none"
        value={value}
        onChange={onChange}
      />

      {value && (
        <IoClose
          className="text-slate-500 text-xl cursor-pointer hover:text-black mr-3"
          onClick={handleClear}
        />
      )}

      <IoSearchSharp
        className="text-slate-500 text-xl cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default Searching;


// import { useState } from "react";
// import { IoSearchSharp } from "react-icons/io5";
// import { IoClose } from "react-icons/io5";
// import { useSelector } from "react-redux";
// import { NoteBaseUrl } from "../../Axios";
// const Searching = () => {
//   const [value, setValue] = useState("");
//   const [close, setClose] = useState(false);
//   const { currentUser } = useSelector((state) => state.user);
//   console.log("user", currentUser?._id, "v", value);

  

//   function HandleChange(e) {
//     setValue(e.target.value);
//     setClose(true);
//   }

//   function HandleClear() {
//     setValue("");
//     setClose(false);
//   }
//   console.log(value);
//   return (
//     <div className=" w-20 md:w-80 sm:w-60 flex items-center px-4 bg-slate-100 rounded-md">
//       <input
//         className="w-full text-xs bg-transparent py-3 outline-none"
//         type="text"
//         value={value}
//         placeholder="Search Notes..."
//         onChange={(e) => HandleChange(e)}
//       />
//       {close && (
//         <IoClose
//           onClick={HandleClear}
//           className="text-xl cursor-pointer mr-3 hover:text-black"
//         />
//       )}
//       <IoSearchSharp
//         onClick={() => onSearch(value)}
//         className="text-2xl cursor-pointer hover:text-black text-slate-500 mr-3"
//       />
//     </div>
//   );
// };

// export default Searching;
