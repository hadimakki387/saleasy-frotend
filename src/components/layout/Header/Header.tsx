import React from "react";
import Header1 from "./Header1";
import Header2 from "./Header2";
import Header3 from "./Header3";

type Props = {};

function Header({}: Props) {
  return (
    <div className="">
      <Header1 />
      <Header2 />
    </div>
  );
}

export default Header;
