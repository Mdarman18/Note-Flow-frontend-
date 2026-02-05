import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import { LuPinOff } from "react-icons/lu";
import moment from "moment";
const NoteCard = ({
  title,
  date,
  onPinNote,
  isPinned,
  content,
  tags,
  onEdit,
  onDelete,
}) => {
  console.log(isPinned);

  return (
    <div className="border bg-white rounded-md p-2 hover:shadow-2xl transition-all ease-in">
      <div className=" flex justify-between items-center ">
        <div className="">
          <h5 className="text-sm font-medium ">{title}</h5>
          <span className="text-xs text-green-800 h-fit w-fit">
            {moment(date).format("DD MMM YYYY, HH:mm")}
          </span>
        </div>

        {isPinned ? (
          <MdOutlinePushPin
            onClick={onPinNote}
            className={`icon-btn text-blue-400 ${isPinned}`}
          />
        ) : (
          <LuPinOff onClick={onPinNote} className={`icon-btn text-slate-500`} />
        )}
      </div>

      <p className="text-slate-600 text-sm mt-2 ">{content}</p>
      <div className="flex items-center justify-between mt-2 mb-1">
        <div className="text-xs flex flex-wrap gap-2 text-slate-600 ml-1">
          {tags.map((ele, idx) => (
            <span key={idx} className="bg-slate-100 px-2 py-1 rounded-md">
              #{ele}
            </span>
          ))}
        </div>
        <div className="flex  items-center gap-2">
          <MdCreate
            onClick={onEdit}
            className="icon-btn hover:text-green-600"
          />
          <MdDelete
            onClick={onDelete}
            className="icon-btn hover:text-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
