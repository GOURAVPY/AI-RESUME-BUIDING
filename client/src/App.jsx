import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Layout,
  Deshboard,
  ResumeBuilder,
  Preview,
  Login,
} from "./pages/index.js";
import { useDispatch } from "react-redux";
import endPoint from "./configs/api.js";
import { login, setLoading } from "./app/features/authSlice.js";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
const App = () => {
  const dispatch = useDispatch();
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await endPoint.get("/api/user/data", {
          headers: { Authorization: token },
        });
      }
      if (data.user) {
        dispatch(login({ token, user: data.user }));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error, "in dispatch");
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Toaster />
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Login and Preview outside app */}
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/share/:resumeId" element={<Preview />} />

        {/* App Routes */}
        <Route path="app" element={<Layout />}>
          <Route index element={<Deshboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
