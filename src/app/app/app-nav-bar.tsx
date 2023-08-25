import style from "./app-nav-bar.module.scss";

export default function AppNavBar() {
  return (
    <nav className={style["nav-bar"]}>
      <span>Todo</span>
      <ul>
        <li>Logout</li>
      </ul>
    </nav>
  );
}
