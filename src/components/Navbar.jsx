import React from "react";
import { NavLink } from "react-router-dom";
import { navpic } from "../images/exporter";

const Navbar = () => {
  return (
    <div className="relative w-full h-14 md:h-16 lg:h-20">
      <img
        src={navpic}
        alt="Navbar Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative flex items-center justify-end h-full text-pink-600 text-xs md:text-sm lg:text-lg opacity-80 px-2 md:px-4">
        <ul className="flex gap-2 md:gap-4 m-1 md:m-3">
          <NavLink to="/" className="hover:-translate-y-0.5">Home</NavLink>
          <NavLink to="/show" className="hover:-translate-y-0.5">All Photos</NavLink>
          <NavLink to="/add" className="hover:-translate-y-0.5">Add</NavLink>
          <NavLink to="/message" className="hover:-translate-y-0.5">Message</NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
