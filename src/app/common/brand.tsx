import { PencilIcon } from "@heroicons/react/24/solid";
import styles from "./brand.module.scss";

interface BrandProps {
  className?: string;
  href?: string;
}

export default function Brand(props: BrandProps) {
  return (
    <a
      className={`${styles["branding"]} ${props.className ?? ""} ${
        props.href != null ? styles["clickable"] : ""
      }`}
      href={props.href}
    >
      <PencilIcon className={styles["branding-icon"]} />
      <span className={styles["branding-name"]}>Notely</span>
    </a>
  );
}
