"use client"

import Image from "next/image";
import { FaDollarSign } from "react-icons/fa";
import { FaChartDiagram } from "react-icons/fa6";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import { useState } from "react";

const sidebarData = [
  {
    id: 1,
    name: "Performance",
    path: "/performance",
    icon: <FaChartDiagram />,
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

    const onClickActiveMenu = ({selectedMenu}) => {        
        setActiveMenu(setActiveMenu(selectedMenu?.id))
        router.push(selectedMenu?.path);
    }

  return (
    <div className={styles["sidebar-main"]}>
      <Image className={styles["logo"]} />
      <div className={styles["menu-container"]}>
        {sidebarData?.map((menu) => {
            const isMenuActive = menu?.id === activeMenu;
            return (
                <div 
                className={`${styles["menu-wrapper"]} ${isMenuActive ? styles["active-menu"] : styles["inactive-menu"]}`}
                onClick={() => onClickActiveMenu({selectedMenu: menu})}
                >
                    {menu?.name}
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default Sidebar;
