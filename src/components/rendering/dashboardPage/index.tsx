import { useState } from "react";
import styles from "./dashboard.module.scss";


const downloadIcon = "/assets/icons/dashboard/downloadIcon.png";
const salesIcon = "/assets/icons/dashboard/salesIcon.png";
const costIcon = "/assets/icons/dashboard/costIcon.png";
const incomeIcon = "/assets/icons/dashboard/incomeIcon.png";
const userIcon = "/assets/icons/dashboard/userIcon.png";
const inquiryIcon = "/assets/icons/dashboard/inquiryIcon.png";
const esimIcon = "/assets/icons/dashboard/esimIcon.png";
const requestIcon = "/assets/icons/dashboard/requestIcon.png";
const horizontalLine = "/assets/icons/dashboard/horizontalLine.png";

const DashboardPage = () => {
  const [activeButton, setActiveButton] = useState("thisMonth");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const stats = [
    { title: "SALES", value: "$100", icon: salesIcon,  },
    { title: "COST", value: "$100", icon: costIcon },
    { title: "INCOME", value: "$10000", icon: incomeIcon },
    { title: "NEW USERS", value: "1000", icon: userIcon },
    { title: "ACTIVE USERS", value: "10000", icon: userIcon },
    { title: "LEAVED USERS", value: "100", icon: userIcon },
    { title: "NEW INQUIRY", value: "600", icon: inquiryIcon },
    { title: "ACTIVE INQUIRY", value: "100000", icon: inquiryIcon },
    { title: "PENDING INQUIRY", value: "100", icon: inquiryIcon },
    { title: "CANCEL REQUEST", value: "10000", icon: requestIcon },
    { title: "COMPLETE REQUEST", value: "400", icon: requestIcon },
    { title: "PENDING REQUEST", value: "900000", icon: requestIcon },
    { title: "NEW PLANS", value: "100", icon: esimIcon },
    { title: "NEW ESIM", value: "10000", icon: esimIcon },
    { title: "SALES", value: "$100", icon: esimIcon },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainPage}>
          <div className={styles.header}>
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>

      <div className={styles.horizontalLine}>
        <img src={horizontalLine} alt="Horizontal Line" />
      </div>

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
            <img src={downloadIcon} alt="Download" />
            <span>Download</span>
          </button>
        </div>

        <div className={styles.statesContainer}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.box}>
              <div className={styles.image}>
                <img src={stat.icon} alt={stat.title} />
              </div>
              <div className={styles.boxContent}>
                <h6>{stat.title}</h6>
                <h5>{stat.value}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
