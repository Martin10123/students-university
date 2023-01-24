import { Link } from "react-router-dom";

import styles from "./sideBar.module.css";

export const ListItem = ({ Icon, title, linkTo }) => {
  return (
    <Link to={linkTo} className={styles.list_item}>
      <Icon />
      <p>{title}</p>
    </Link>
  );
};
