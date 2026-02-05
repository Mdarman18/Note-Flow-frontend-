import React from "react";
import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");
  const HandleRemove = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };
  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const HandleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  return (
    <div className="">
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 py-1 px-3 rounded"
            >
              #{tag}
              <button
                className="cursor-pointer"
                onClick={() => HandleRemove(tag)}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none "
          placeholder="Add Tags"
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={HandleKeyDown}
        />
        <button
          className="w-8 h-8 flex justify-center items-center rounded border border-blue-700 hover:bg-blue-600 "
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
}

export default TagInput;
