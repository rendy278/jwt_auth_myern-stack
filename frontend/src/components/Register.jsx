import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const Registers = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });
      navigate("/login");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
        console.log(error.response.data); // Untuk melihat detail error di konsol
      } else {
        console.log(error); // Untuk menangkap error lain selain dari response
      }
    }
  };

  return (
    <section className="h-screen flex bg-slate-200 items-center justify-center w-full">
      <div className="container flex-col p-6 flex items-center justify-center">
        <div className="rounded-xl w-96 flex flex-col justify-center items-center gap-4 bg-sky-500 shadow-md">
          <div className="bg-green-500 p-4 rounded-t-xl w-full">
            <h1 className="font-bold text-white text-2xl">Register</h1>
          </div>
          <form onSubmit={Registers} className="w-full p-4 flex flex-col gap-5">
            <div className="flex gap-3 flex-col">
              <label htmlFor="username" className="font-bold text-white">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="username"
                className="bg-slate-200 p-2 rounded-md outline-none"
              />
            </div>
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
            <div className="flex gap-3 flex-col">
              <label htmlFor="confirmpassword" className="font-bold text-white">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpassword"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                placeholder="*****"
                className="bg-slate-200 p-2 rounded-md outline-none"
              />
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-green-500 p-3 w-full text-white font-bold">
                Register
              </button>
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

export default Register;
