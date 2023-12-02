import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Link to="/" className="flex items-center">
        <img
          src="https://framerusercontent.com/images/hslc4uI27FRmikd0pFavyN3Z6YY.png"
          alt="hoobank"
          className="w-[32px] h-[32px] mr-2"
        />
        <p className="text-gradient text-xl">CryptoWealth</p>
      </Link>

      <ul className="list-none sm:flex  justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => {
              setActive(nav.title);
              navigate(`/${nav.id}`);
            }}
          >
            <Link to={nav.id ? `/${nav.id}` : "/"}>{nav.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
