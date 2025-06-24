
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center bg-red-300 gap-3">
      <Link to={"profile"}>Profile</Link>
      <Link to={"/"}>home</Link>
    </nav>
  );
};

export default Navbar;
