import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const Logins = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      // Assuming the API response contains a token or some indicator of successful login
      setIsAuthenticated(true);
      localStorage.setItem("authToken", response.data.token); // Store token in localStorage
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="h-screen flex bg-slate-200 items-center justify-center w-full">
      <div className="container flex-col p-6 flex items-center justify-center">
        <div className="rounded-xl w-96 flex flex-col justify-center items-center gap-4 bg-sky-500 shadow-md">
          <div className="bg-green-500 p-4 rounded-t-xl w-full">
            <h1 className="font-bold text-white text-2xl">Login</h1>
          </div>
          <form onSubmit={Logins} className="w-full p-4 flex flex-col gap-5">
            <div className="flex gap-3 flex-col">
              <label htmlFor="email" className="font-bold text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="bg-slate-200 p-2 rounded-md outline-none"
              />
            </div>
            <div className="flex gap-3 flex-col">
              <label htmlFor="password" className="font-bold text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*****"
                className="bg-slate-200 p-2 rounded-md outline-none"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-green-500 p-3 w-full text-white font-bold"
              >
                Login
              </button>
            </div>
            <div className="flex items-center justify-center">
              <h1 className="flex justify-center items-center gap-3 font-bold text-white">
                don{"'"}t have an account yet?{" "}
                <a href="/register" className="text-gray-900">
                  register now
                </a>
              </h1>
            </div>
            {message && (
              <div className="bg-red-500 p-2 w-full rounded-md text-white">
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
