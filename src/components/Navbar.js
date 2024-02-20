import React from "react";
import { Menubar } from "primereact/menubar";

const Navbar = () => {
  const items = [
    {
      label: (
        <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          | eContacts |
        </span>
      ),
    },
  ];

  return <Menubar model={items} />
};

export default Navbar;
