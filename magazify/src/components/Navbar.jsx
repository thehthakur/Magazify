import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link href='magazine'>Magazines</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
