"use client";

import { useState } from "react";
import Brand from "../common/brand";
import AccountMenu from "./account-menu";
import style from "./app-nav-bar.module.scss";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function AppNavBar() {
  const [accountMenuShown, setAccountMenuShown] = useState<Boolean>(false);

  function toggleAccountMenu() {
    setAccountMenuShown(!accountMenuShown);
  }

  return (
    <nav className={style["nav-bar"]}>
      <Brand href="/app" />
      <ul className={style["nav-bar-items"]}>
        <li>
          <button onClick={() => toggleAccountMenu()}>
            <Bars3Icon />
          </button>
        </li>
      </ul>
      {accountMenuShown ? <AccountMenu /> : null}
    </nav>
  );
}
