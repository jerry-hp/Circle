import { ChangeEvent, useState } from "react";
import { api } from "../../../libs/api/api";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const [newUser, setNewUser] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  }

  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await api.post("/register", newUser);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return { newUser, handleChange, handleRegister };
}
