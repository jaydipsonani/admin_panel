import PlanListTable from '../planListTable'
import styles from './planListPage.module.scss'
// import { useState } from 'react';


// const [search, setSearch] = useState<string>(" ");

const searchIcon = "/assets//icons/successfullList/searchIcon.png";
const horizontalLine = "/assets/icons/dashboard/horizontalLine.png";


const PlanListPage = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.mainHeader}>
                    <div className={styles.header}>
                        <h1>PLANS LIST</h1>
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
                <div className={styles.planListTable}>
                    <PlanListTable />
                </div>
            </div>
        </>
    )
}

export default PlanListPage