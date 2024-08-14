import { useEffect } from "react";
import axios from "axios";
import { setUser } from "../redux/setUserSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.currentUser);
  const getUser = async () => {
    try {
      const response = await axios.post("/api/user/getDetails");
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear();
        navigate("/logIn");
      }
    } catch (error) {
      localStorage.clear();
      navigate("/logIn");
    }
  };
  useEffect(() => {
    if (!currentUser) {
      getUser();
    }
  }, [getUser]);
  return <div>home</div>;
};

export default home;
