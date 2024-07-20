import EsimListTable from '../esimListTable';
import styles from './esimListPage.module.scss'

const searchIcon = "/assets//icons/successfullList/searchIcon.png";
const horizontalLine = "/assets/icons/dashboard/horizontalLine.png";


const EsimListPage = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.mainHeader}>
                    <div className={styles.header}>
                        <h1>ESIM LIST</h1>
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
                <div className={styles.esimListTable}>
                    <EsimListTable />
                </div>
            </div>
        </>
    )
}

export default EsimListPage