import React from "react";
import Image from "next/image";

import { add, home, logo } from "../assets";

function Left() {
  return (
    <aside className="left">
      <div className="left__logo">
        <Image src={logo} alt="altworld" height={24} width={24} />
        <h1>Hi, AltWorld</h1>
      </div>
      <div className="left__divider" />
      <div className="left__item">
        <div className="left__item__icon">
          <Image src={home} alt="dashboad" height={24} width={24} />
        </div>
        <p>Dashboard</p>
      </div>
      <div className="left__card">
        <div className="left__card__add">
          <Image src={add} alt="add" height={32} width={32} />
        </div>
        <div className="left__card__content">
          <h3>New Assignment?</h3>
          <p>Select from Pre-defined question to a have quickaround.</p>
        </div>
        <button>Create New Assignment</button>
      </div>
    </aside>
  );
}

export default Left;
