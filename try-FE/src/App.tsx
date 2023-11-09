import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Main from "./layouts/Main";
import { useDispatch } from "react-redux";
import { api, setAuthToken } from "./libs/api/api";
import { useState, useEffect } from "react";
import { AUTH_CHECK, AUTH_ERROR } from "./store/rootReducer";
import Follows from "./Pages/Follows";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const auth = useSelector((auth: any) => auth);
  const dispatch = useDispatch();

  const token: any = localStorage.getItem("token");

  async function authCheck() {
    try {
      setAuthToken(localStorage.token);
      const response = await api.get("/auth/check");
      // console.log("authCheck : ", response);
      dispatch(AUTH_CHECK(response.data.user));
      setIsLoading(false);
    } catch (err) {
      // const navigate = useNavigate();
      dispatch(AUTH_ERROR());
      console.log("auth check error", err);
      setIsLoading(false);
      // navigate("/");
    }
  }

  useEffect(() => {
    if (localStorage.token) {
      authCheck();
    } else {
      setIsLoading(false);
    }
  }, []);

  //check apakah sudah login(jiak sudahh auth.username ada) dan akan bisa mengakses routingan di dalam outlet
  function IsNotLogin() {
    if (!token) {
      return <Navigate to="/login" />;
    } else {
      return <Outlet />;
    }
  }

  return (
    <>
      {isLoading ? null : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<IsNotLogin />}>
              <Route
                path="/"
                element={
                  <Main>
                    <Home />
                  </Main>
                }
              />
            </Route>
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<Search />} />
            <Route path="/follows" element={<Follows />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
