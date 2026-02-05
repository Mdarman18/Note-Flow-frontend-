import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
function EmptyCard({ imgsrc, message }) {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={imgsrc} alt="No notes" className="w-60" />
      <p className="w-1/2 text-sm font-medium text-slate-500 text-center leading-6 mt-5">
        {message}
      </p>
      <div className="flex">
        <span className="text-slate-900">𝓦𝓮𝓫 𝓓𝓮𝓿 𝓑𝔂</span>
        <Link
          className="text-sm text-slate-500 hover:text-blue-600 hover:underline ml-2"
          to="https://www.instagram.com/only_arman18/"
        >
          @𝓞𝓷𝓵𝔂_𝓐𝓻𝓶𝓪𝓷18
        </Link>
        <Link to="https://www.instagram.com/only_arman18/" className="flex">
          <FaInstagram className="my-0.5 text-red-400 ml-0.5 hover:text-red-700 cursor-pointer" />
        </Link>
        <Link to="https://www.linkedin.com/in/md-imran-006751392/">
          <FaLinkedin
            size={16}
            className="my-0.5 text-blue-500-400 ml-0.5 hover:text-blue-700 cursor-pointer"
          />
        </Link>
        <Link to="https://github.com/Mdarman18">
          <FaGithub
            size={17}
            className="my-0.5 text-gray-500-400 ml-1 hover:text-gray-700 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}

export default EmptyCard;
