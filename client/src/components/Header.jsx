import { Link, NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { appContext } from "./ContextWrapper";
import { FaBars, FaShoppingBasket } from "react-icons/fa";
const Header = () => {
  const context = useContext(appContext);
  const [isDesktop, setIsDesktop] = useState(
    window.innerWidth >= 768 ? true : false
  );
  const [nav, setNav] = useState(isDesktop ? true : false);

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth >= 768 ? setIsDesktop(true) : setIsDesktop(false)
    );
  }, []);
  return (
    <header
      className={`main-header  md:flex md:opacity-100  flex md:flex-row ${
        nav ? "flex-col" : "flex-row"
      } items-center justify-between transition-all`}
    >
      <div
        className={`flex justify-between w-full p-4 ${
          !isDesktop ? "shadow-sm shadow-black/40" : ""
        }`}
      >
        <Link
          to="/"
          className="font-square-peg text-orange-500 text-shadow-xl font-semibold text-4xl md:text-6xl"
        >
          ABC Restaurant
        </Link>
        {!isDesktop && (
          <div className=" text-orange-500 flex flex-row gap-5 items-center text-xl text-shadow-xl">
            <button
              className="text-2xl hover:opacity-50 active:text-white"
              onClick={() => {
                context.setIsBasket(!context.isBasket);
                setNav(false);
              }}
            >
              <FaShoppingBasket />
            </button>
            <button onClick={() => setNav(!nav)}>
              <FaBars className="hover:opacity-50 active:text-white" />
            </button>
          </div>
        )}
      </div>
      <nav
        className={`${
          nav ? "visible static opacity-100" : "invisible absolute opacity-0"
        } md:visible md:opacity-100 md:static nav-bar`}
      >
        <NavLink
          to="/"
          className={({ isActive }) => `nav-link ${isActive && "active"}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => `nav-link ${isActive && "active"}`}
        >
          About
        </NavLink>
        <NavLink
          to="/meals"
          className={({ isActive }) => `nav-link ${isActive && "active"}`}
        >
          Menu
        </NavLink>
        <NavLink
          to="/reservation"
          className={({ isActive }) => `nav-link ${isActive && "active"}`}
        >
          Reservation
        </NavLink>
        {isDesktop && (
          <button
            className="text-3xl text-shadow-xl text-orange-500 hover:opacity-50 active:text-white"
            onClick={() => {
              context.setIsBasket(!context.isBasket);
            }}
          >
            <FaShoppingBasket />
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
