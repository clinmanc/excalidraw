import React, { FC } from "react";
import styles from "./styles.module.scss";

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
        <i className={styles.red}>登陆</i>
      </span>
      <span className={styles.ul}>
        <i className={styles.tencent}>免费注册</i>
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
