import React from "react";
import { LuLogOut } from "react-icons/lu";
import { getInitials } from "../Utlies/Helper";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../../Axios";
import { toast } from "react-toastify";
import {
  signInSuccess,
  signOutFailure,
  signOutstarts,
} from "../../redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const Handlelogout = async () => {
    try {
      dispatch(signOutstarts());
      const result = await BaseUrl.get("/logout", {
        withCredentials: true,
      });
      if (!result.data.success) {
        console.log(result.data.message);
        dispatch(signOutFailure(result.data.message));
        toast.error(result.data.message);
      }
      console.log(result.data.message);
      dispatch(signInSuccess());
      toast.success(result.data.message);
      Navigate("/login");
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <div className="w-12 h-12 items-center justify-center flex mx-2 md:mx-none rounded-full text-slate-950 font-medium bg-slate-100 ">
        {getInitials(`${currentUser?.Name}`)}
      </div>
      <div className="hidden sm:flex">
        <p className="text-sm  font-semibold ">{currentUser?.Username}</p>
      </div>
      <div>
        <button
          onClick={Handlelogout}
          className=" flex text-sm bg-red-500 rounded-2xl p-2  md:px-3 md:p-1.5 md:rounded-full  cursor-pointer text-white hover:opacity-50"
        >
         <p className="hidden sm:flex">Log out</p> 
          <LuLogOut  className="text-black text-xl md:text-sm md:my-1 md:ml-2 mx-1" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
