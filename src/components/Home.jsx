import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";
import Navbar from "./Search/Navbar";
import NoteCard from "./Cards/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { NoteBaseUrl } from "../Axios";
import EmptyCard from "./emptycrds/Empty";

// accessibility fix (recommended)
Modal.setAppElement("#root");

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [isSearch, setIsSearch] = useState(false);
  /* ================= STATES ================= */
  const [allNotes, setAllNotes] = useState([]);

  const [openEditModel, setOpenEditModel] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  /* ================= API ================= */
  const getAllNotes = async () => {
    try {
      const result = await NoteBaseUrl.get("/all", {
        withCredentials: true,
      });

      if (!result.data.success) {
        toast.error(result.data.message);
        return;
      }

      setAllNotes(result.data.note);
    } catch (error) {
      toast.error(error.response?.data || error.message);
      console.log(error.message);
    }
  };

  /* ================= EFFECTS ================= */
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    getAllNotes();
  }, [currentUser, navigate]);

  useEffect(() => {
    // console.log("notes updated:", allNotes);
  }, [allNotes]);

  /* ================= RENDER ================= */
  const handleDelete = async (data) => {
    const id = data?._id;
    if (!id) return;

    try {
      const result = await NoteBaseUrl.post(
        `/delete/${id}`,
        {},
        { withCredentials: true },
      );

      if (!result.data.success) {
        toast.error(result.data.message);

        return;
      }
      toast.success(result.data.message);
      getAllNotes();
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  // ====Handle Pinned or unpinned -==========
  const onPinNote = async (note) => {
    const id = note?._id;
    if (!id) return;
    try {
      const result = await NoteBaseUrl.put(
        `/pinned/${id}`,
        {
          isPinned: !note.isPinned,
        },
        {
          withCredentials: true,
        },
      );
      if (!result.data.success) {
        toast.error(result.data.message);
        return;
      }
      toast.success(result.data.message);
      getAllNotes();
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  // =======--------note searchloading=======--------
  async function onSearchNote(query) {
    const id = query;
    console.log("Searching for:", id);

    try {
      const result = await NoteBaseUrl.get("/find", {
        params: { query: id },
        withCredentials: true,
      });

      if (!result.data.success) {
        console.log("No results found");
        toast.error(result.data.message);
        return;
      }

      console.log("Search success:", result.data.note);

      setIsSearch(true);
      setAllNotes(result.data.note);
    } catch (error) {
      console.log("Search error:", error);
      toast.error(error.response?.data || error.message);
    }
  }
  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };
  return (
    <>
      <Navbar
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      <Outlet />

      {/* Notes Grid */}

      <div className="mx-auto">
        {allNotes?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 md:ml-8 max-md:m-5">
            {allNotes.map((note) => (
              <NoteCard
                key={note._id}
                noteData={note}
                onEdit={() =>
                  setOpenEditModel({ isShown: true, type: "edit", data: note })
                }
                onDelete={() => handleDelete(note)}
                onPinNote={() => onPinNote(note)}
                isPinned={note.isPinned}
                tags={note.tags}
                title={note.title}
                content={note.content}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgsrc={
              isSearch
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtakcQoMFXwFwnlochk9fQSBkNYkO5rSyY9A&s"
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDCtZLuixBFGTqGKdWGLaSKiO3qyhW782aZA&s"
            }
            message={`Big ideas start with small notes.
Every thought matters, don't let it slip away.
Capture thoughts before they fade.
Keep track of everything that inspires you.
Tap Add Note to start your first note.
Create a habit of capturing ideas daily.
Let your thoughts grow into meaningful plans.
And make your ideas count with Noteflow!`}
          />
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={() =>
          setOpenEditModel({ isShown: true, type: "add", data: null })
        }
        className="w-16 h-16 flex items-center justify-center bg-blue-400 rounded-2xl hover:bg-blue-600 fixed right-10 bottom-10"
      >
        <MdAdd size={24} />
      </button>

      {/* Modal */}
      <Modal
        isOpen={openEditModel.isShown}
        onRequestClose={() =>
          setOpenEditModel({ isShown: false, type: "add", data: null })
        }
        className="w-[90%] md:w-[40%] sm:w-full max-h-3/4 bg-white rounded-md mx-auto mt-14 p-4 overflow-scroll"
        overlayClassName="fixed inset-0 bg-black/20"
      >
        <AddEditNotes
          type={openEditModel.type}
          noteData={openEditModel.data}
          getAllNotes={getAllNotes}
          onClose={() =>
            setOpenEditModel({ isShown: false, type: "add", data: null })
          }
        />
      </Modal>
    </>
  );
};

export default Home;
