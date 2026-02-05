import { Link } from "react-router-dom";
import Profile from "../Cards/Profile";
import Searching from "./Search";
import { useState } from "react";

function Navbar({ onSearchNote, handleClearSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };
  // =====-handleClear ===---------
  const handleClear = () => {
    setSearchQuery("");
  };
  return (
    <div className="bg-white flex items-center justify-between md:px-6 py-2 font-medium drop-shadow">
      <Link to={"/"}>
        <h2 className="text-xl font-medium text-black py-2">
          <span className="text-slate-500">Good</span>
          <span className="text-slate-900">Notes</span>
        </h2>
      </Link>
      <Searching
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
        handleClear={handleClear}
      />
      <Profile />
    </div>
  );
}

export default Navbar;
