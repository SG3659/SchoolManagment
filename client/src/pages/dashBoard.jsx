import React from "react";
import {
  userDashboard,
  studentDashboard,
  teacherDashboard,
  principleDashboard,
} from "../constants/index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const dashBoard = () => {
  const { currentUser } = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const dashToBeRender = currentUser?.isStudent
    ? studentDashboard
    : currentUser?.isTeacher
    ? teacherDashboard
    : currentUser?.isPrinciple
    ? principleDashboard
    : userDashboard;
  return (
    <>
      <div className=" flex flex-wrap justify-center  items-center gap-2 mt-12">
        {dashToBeRender.map((item) => (
          <div
            key={item.id}
            className=" bg-white w-40 h-52 flex justify-center items-center rounded-md shadow-2xl"
            onClick={() => {
              navigate(item.path);
            }}
          >
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default dashBoard;
