import { PencilIcon } from "@heroicons/react/24/solid";

import style from "./nav-bar.module.scss";

export default function NavBar() {
  return (
    <nav className={style["nav-bar"]}>
      <div className={style["branding"]}>
        <PencilIcon className={style["branding-icon"]} />
        <span className={style["branding-name"]}>Todo</span>
      </div>
      <ul>
        <li>
          <a href="/login">Log in</a>
        </li>
        <li>
          <a className={style["accent"]} href="/signup">
            Sign up
          </a>
        </li>
      </ul>
    </nav>
  );
}
