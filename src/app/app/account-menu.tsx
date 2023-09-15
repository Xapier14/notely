import style from "./account-menu.module.scss";

export default function AccountMenu() {
  return (
    <>
      <div className={style["account-menu"]}>
        <ul className={style["menu-items"]}>
          <li>
            <a href="/app/account">My Account</a>
          </li>
          <li>
            <a href="/app/groups">My Groups</a>
          </li>
          <div className={style["menu-divider"]}></div>
          <li>
            <a href="/app/account">Settings</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    </>
  );
}
