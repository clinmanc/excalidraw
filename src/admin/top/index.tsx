import React, { FC } from "react";
import styles from "./styles.module.scss";
import Link from "@mui/material/Link";

// export interface NavItem {
//   text: string;
//   toEl: string;
// }

const TopShow: FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.title}>
        <span>
          <i className={styles.red}>Easy</i>
          <i className={styles.tencent}>Draw</i>
        </span>
      </div>

      {/* 横版 nav */}
      <span className={styles.ul}>
        <Link className={styles.red} href="#/home">
          首页
        </Link>
      </span>
      <span className={styles.ul}>
        <Link className={styles.tencent} href="#/login">
          登陆
        </Link>
      </span>
      {/*<ul className={styles.ul}>*/}
      {/*  <Button*/}
      {/*    onClick={() =>"/"}*/}
      {/*    className={styles.emailBtn}*/}
      {/*    color={"#0052d9"}*/}
      {/*  >*/}
      {/*    登陆*/}
      {/*  </Button>*/}
      {/*  <Button*/}
      {/*    onClick={() => window.location.href = ""}*/}
      {/*    className={styles.emailBtn}*/}
      {/*    color={"#ff0000"}*/}
      {/*  >免费注册</Button>*/}
      {/*</ul>*/}
    </nav>
  );
};

export default TopShow;
