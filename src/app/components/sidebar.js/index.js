"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaChartPie, FaDollarSign } from "react-icons/fa";

import styles from "./styles.module.scss";
import bobyanLogo from "../../../assets/bobyan-logo.svg";
import uris from "../../../utils/uris";

const sidebarData = [
  {
    id: 1,
    name: "Performance",
    path: uris.performance,
    icon: <FaChartPie />,
  },
  {
    id: 2,
    name: "Earnings",
    path: uris.earnings,
    icon: <FaDollarSign />,
  },
];

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState(1);
  const router = useRouter();
  
  const onClickActiveMenu = ({ selectedMenu }) => {
    setActiveMenu(selectedMenu?.id);
    router.push(selectedMenu?.path);
  }

  useEffect(() => {
    const currentPath = window.location.pathname;
    const activeMenuItem = sidebarData.find((menu) => menu.path === currentPath);
    if (activeMenuItem) {
      setActiveMenu(activeMenuItem.id);
    }
  }, []);

  return (
    <div className={styles["sidebar-main"]}>
      <Image 
      className={styles["logo"]} 
      alt="Bobyan Delivery"
      src={bobyanLogo}
      />
      <div className={styles["menu-container"]}>
        {sidebarData?.map((menu) => {
          const isMenuActive = activeMenu === menu?.id;
          return (
            <div
              className={`${styles["menu-wrapper"]} ${isMenuActive ? styles["active-menu"] : styles["inactive-menu"]}`}
              onClick={() => onClickActiveMenu({ selectedMenu: menu })}
              key={menu?.id}
            >
              <span className={styles["menu-icon"]}>{menu?.icon}</span>
              <span className={styles["menu-name"]}>{menu?.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Sidebar;
