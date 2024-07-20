import { useState } from "react";
import styles from './navbar.module.scss'

const downloadIcon = "/assets/icons/dashboard/downloadButtonIcon.png";

const Navbar = () => {
    const [activeButton, setActiveButton] = useState("thisMonth");

    const handleButtonClick = (buttonName: string) => {
      setActiveButton(buttonName);
    };


  return (
    <>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.buttons}>
            <button
              className={`${styles.all} ${
                activeButton === "all" ? styles.active : ""
              }`}
              onClick={() => handleButtonClick("all")}
            >
              All
            </button>
            <button
              className={`${styles.today} ${
                activeButton === "today" ? styles.active : ""
              }`}
              onClick={() => handleButtonClick("today")}
            >
              Today
            </button>
            <button
              className={`${styles.thisWeek} ${
                activeButton === "thisWeek" ? styles.active : ""
              }`}
              onClick={() => handleButtonClick("thisWeek")}
            >
              This Week
            </button>
            <button
              className={`${styles.thisMonth} ${
                activeButton === "thisMonth" ? styles.active : ""
              }`}
              onClick={() => handleButtonClick("thisMonth")}
            >
              This Month
            </button>
            <button
              className={`${styles.thisYear} ${
                activeButton === "thisYear" ? styles.active : ""
              }`}
              onClick={() => handleButtonClick("thisYear")}
            >
              This Year
            </button>
          </div>
          <button className={styles.downloadButton}>
            <img className={styles.downloadIcon} src={downloadIcon} alt="Download" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default Navbar;
