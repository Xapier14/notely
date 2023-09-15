import NavigationMenu from "./navigation-menu";
import style from "./outlet-container.module.scss";

import { ReactNode } from "react";

export default function OutletContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <>
      <div className={`${style["container"]} ${className}`}>
        <div className={style["menu"]}>
          <NavigationMenu />
        </div>
        <div className={style["outlet-container"]}>
          <div className={style["outlet"]}>{children}</div>
        </div>
      </div>
    </>
  );
}
