import Sidebar from "../components/sidebar.js"
import styles from "./styles.module.scss"


const DashboardLayout = ({ children }) => {


    return (
        <div className={styles["dashboard-layout"]}>
            <Sidebar />
            <div className={styles["dashboard-container"]}>
                {/* anything to add for phone design */}
                <div className={styles["dashboard-content"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout