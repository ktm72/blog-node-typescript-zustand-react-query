import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Navbar } from "keep-react";
//icons
import { MdOutlineFavorite } from "react-icons/md";
import Sidebar from "../sidebar/Sidebar";

const HeaderTop: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Navbar
      fluid={true}
      className="lg:px-30 md:px-24 sm:px-16 px-10 lg:py-10 py-10"
    >
      <Navbar.Container className="flex items-center justify-between">
        <Navbar.Brand className="text-orange-400 text-[3rem] font-extrabold">
          Doodle Test
        </Navbar.Brand>
        <Navbar.Container
          tag="ul"
          className="lg:flex hidden items-center justify-between gap-8"
        >
          <NavLink />
        </Navbar.Container>

        <Navbar.Collapse collapseType="sidebar">
          <Navbar.Container tag="ul" className="flex flex-col gap-5">
            <NavLink />
          </Navbar.Container>
        </Navbar.Collapse>

        <Navbar.Container className="flex items-center gap-3">
          <Button
            onClick={() => setOpen((p) => !p)}
            size="xs"
            type="outlineGray"
          >
            <span>
              <MdOutlineFavorite size={20} color="#444" />
            </span>
          </Button>
          <Sidebar setClicked={setOpen} clicked={open} />
          <Navbar.Toggle />
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
};

const NavLink = () => {
  return (
    <React.Fragment>
      <Link
        to="/"
        className="text-metal-300 text-lg font-medium hover:-translate-y-1 hover:text-metal-800 transition"
      >
        Home
      </Link>
      <Link
        to="/blog"
        className="text-metal-300 text-lg font-medium hover:-translate-y-1 hover:text-metal-800 transition"
      >
        Blog
      </Link>
    </React.Fragment>
  );
};

export default HeaderTop;
