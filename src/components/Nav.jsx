import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-slate-50 py-4 px-10 flex items-center justify-between font-mono">
      <Link to={"/"}>
      <h1 className=" text-teal-600 font-bold text-4xl">SHARENOTE.io</h1>
      </Link>
      <Link to={"/create/note"} className=" text-teal-600 font-medium">
          Create
        </Link>
    </nav>
  );
};

export default Nav;