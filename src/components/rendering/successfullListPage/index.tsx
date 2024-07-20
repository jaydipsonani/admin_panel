import Navbar from "@/components/modules/navbar";
import styles from "./successfullList.module.scss";
import SuccessFullList from "../SuccessfullListTable";
// import React, { useState } from 'react'; 
import { useState } from 'react';

const searchIcon = "/assets//icons/successfullList/searchIcon.png";
const horizontalLine = "/assets/icons/dashboard/horizontalLine.png";
const costIcon = "/assets/icons/successfullList/costIcon.png";
const dealIcon = "/assets/icons/successfullList/dealIcon.png";
const discountIcon = "/assets/icons/successfullList/discountIcon.png";
const incomeIcon = '/assets/icons/successfullList/incomeIcon.png'
const totalSellingIcon = "/assets/icons/successfullList/totalSellingIcon.png";
const waoclubIcon = "/assets/icons/successfullList/waoclubIcon.png";

const statsData = [
  {
    label: "TOTAL SELLING",
    value: "$10",
    icon: totalSellingIcon,
  },
  {
    label: "ACTUAL COST",
    value: "$5",
    icon: costIcon,
  },
  { label: "DEALS", value: "1", icon: dealIcon },
  { label: "DISCOUNT", value: "$1", icon: discountIcon },
  { label: "WAOCLUB", value: "$1", icon: waoclubIcon },
  { label: "NET INCOME", value: "$1", icon: incomeIcon },
];

// const [search, setSearch] = useState<string>("");

const SucceefullListPage = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainHeader}>
          <div className={styles.header}>
            <h1>SUCCESSFUL LIST</h1>
          </div>

          <div className={styles.searchContainer}>
            <img src={searchIcon} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for anything..."
              className={styles.searchInput}
              // onChange={(e) => setSearch(e.target.value)} 
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

        <div className={styles.successfullListTable}>
            <SuccessFullList  />
        </div>

      </div>
    </>
  );
};

export default SucceefullListPage;
