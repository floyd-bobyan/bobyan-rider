"use client"

import Image from "next/image";
import { FaChartPie, FaDollarSign } from "react-icons/fa";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import { useState } from "react";

const sidebarData = [
  {
    id: 1,
    name: "Performance",
    path: "/performance",
    icon: <FaChartPie />,
  },
  {
    id: 2,
    name: "Earnings",
    path: "/earnings",
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

  return (
    <div className={styles["sidebar-main"]}>
      <Image className={styles["logo"]} />
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
