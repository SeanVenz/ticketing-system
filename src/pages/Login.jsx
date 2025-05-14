import React, { useState } from "react";
import { loginUserDataFlower } from "../utils/apiClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const reg = await loginUserDataFlower(username, password);
    if (reg.data.success === true) {
      console.log(reg.data.data.id);
      if (reg.data.data.id === "eafe4269-72c2-489d-8739-db7e522b7900") {
        localStorage.setItem("userId", "eafe4269-72c2-489d-8739-db7e522b7900");
        localStorage.setItem("isAdmin", true);
        localStorage.setItem("token", reg.data.accessToken);
        return navigate("/admin");
      }
      localStorage.setItem("userId", reg.data.data.id);
      localStorage.setItem("userName", reg.data.data.username);
      localStorage.setItem("isAdmin", false);
      localStorage.setItem("token", reg.data.accessToken);

      return navigate("/dashboard");
    }
  };

  return (
    <div>
      <form onSubmit={login}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
