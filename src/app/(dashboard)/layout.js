import Sidebar from "../components/sidebar.js"
import styles from "./styles.module.scss"


const DashboardLayout = ({children}) => {


    return (
        <div className={styles["dashboard"]}>
            <Sidebar />
            {children}
        </div>
    )
}

export default DashboardLayout