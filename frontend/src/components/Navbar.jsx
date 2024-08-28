import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      // Optionally, handle error or display a message to the user
    }
  };

  return (
    <nav className="w-full p-6 bg-sky-500 text-white shadow-md">
      <div className="w-full flex justify-between items-center">
        <div className="logo">
          <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        </div>
        <div className="logout">
          <button
            className="p-3 rounded-md bg-slate-200 text-gray-800"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
