import Navbar from "@/components/modules/navbar";
import styles from "./failedList.module.scss";
import FailedListTable from "../failedListTable";



const horizontalLine = "/assets/icons/dashboard/horizontalLine.png";
const searchIcon = "/assets//icons/successfullList/searchIcon.png";
const appCrashIcon = "/assets/icons/failedList/appCrashIcon.png";
const cardErrorIcon = "/assets/icons/failedList/cardErrorIcon.png";
const allIcon = "/assets/icons/failedList/allIcon.png";
const dropdownIcon = "/assets/icons/failedList/dropdownIcon.png";



const statsData = [
  { label: "All", value: "1000", icon: appCrashIcon },
  { label: "Card Error", value: "500", icon: cardErrorIcon },
  { label: "WaoClub", value: "400", icon:allIcon  },
  { label: "Net Income", value: "150", icon: dropdownIcon },
];

const FailedListPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainHeader}>
          <div className={styles.header}>
            <h1>FAILED LIST</h1>
          </div>

          <div className={styles.searchContainer}>
            <img src={searchIcon} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for anything..."
              className={styles.searchInput}
            />
          </div>
        </div>
      </div>

      <div className={styles.horizontalLine}>
        <img src={horizontalLine} alt="Horizontal Line" />
      </div>

      <div className={styles.container}>
        <div>
          <Navbar />
          <div className={styles.statsContainer}>
            {statsData.map((stat, index) => (
              <div key={index} className={styles.statBox}>
                <img
                  src={stat.icon}
                  alt={`${stat.label} icon`}
                  className={styles.icon}
                />
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statValue}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.failedListTable}>
            <FailedListTable />
        </div>

      </div>
    </>
  );
};

export default FailedListPage;
