import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

import TagInput from "../Input/TagInput";
import { NoteBaseUrl } from "../Axios";

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  /* -------------------- STATE -------------------- */
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState("");

  /* -------------------- EDIT NOTE -------------------- */
  const editNote = async () => {
    try {
      const id = noteData._id;

      const result = await NoteBaseUrl.post(
        `/edit/${id}`,
        { title, content, tags },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${result.data.token}`,
          },
        },
      );

      if (!result.data.success) {
        setError(result.data.message);
        toast.error(result.data.message);
        return;
      }

      toast.success(result.data.message || "Note updated successfully");
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  /* -------------------- ADD NOTE -------------------- */
  const addNotes = async () => {
    if (!title || !content) {
      setError("Please fill all fields");
      toast.error("Please fill all fields");
      return;
    }

    if (tags.length === 0) {
      toast.error("Please add at least one tag");
      return;
    }

    try {
      const res = await NoteBaseUrl.post(
        "/add",
        { title, content, tags },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        },
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message || "Note added successfully");
      getAllNotes();
      onClose();
      setTags(res.data.tags || []);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  /* -------------------- SUBMIT HANDLER -------------------- */
  const handleClick = async () => {
    if (!title) {
      setError("Please enter the title");
      toast.error("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      toast.error("Please enter the content");
      return;
    }

    setError("");

    try {
      type === "edit" ? await editNote() : await addNotes();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute -top-3 -right-3 w-10 h-10 rounded-full 
                   flex items-center justify-center hover:bg-slate-50"
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      {/* Title */}
      <div className="flex flex-col">
        <label className="input-label uppercase text-red-400">Title</label>
        <input
          type="text"
          value={title}
          placeholder="Wake at 6 am"
          onChange={(e) => setTitle(e.target.value)}
          className="text-2xl text-slate-950 outline-none"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label uppercase text-red-400">Content</label>
        <textarea
          rows={10}
          value={content}
          placeholder="Content..."
          onChange={(e) => setContent(e.target.value)}
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
        />
      </div>

      {/* Tags */}
      <div className="mt-3">
        <label className="input-label uppercase text-red-400">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
        {error && <p className="text-red-500 text-xs pt-2">{error}</p>}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleClick}
        className="btn w-full bg-blue-400 font-medium mt-5 p-3"
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
