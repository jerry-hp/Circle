import { ChangeEvent, useState } from "react";
import { api } from "../../../libs/api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AUTH_LOGIN } from "../../../store/rootReducer";

export function useLogin() {
  const [dataLogin, setDataLogin] = useState({
    email: "string",
    password: null,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setDataLogin({
      ...dataLogin,
      [e.target.name]: e.target.value,
    });
  }

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleLogin() {
    try {
      const response = await api.post("/login", dataLogin);
      await dispatch(AUTH_LOGIN(response.data));

      Navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  return { handleChange, handleLogin };
}
