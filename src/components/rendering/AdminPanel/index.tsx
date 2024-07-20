
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./adminPanel.module.scss";
import Link from "next/link";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const waosimLogo = '/assets/icons/dashboard/waosimlogo.png';
const DashboardIcon = "/assets/icons/dashboard/dashboardIcon.png";
const listIcon = "/assets/icons/dashboard/listIcon.png";
const activeDashboardIcon = "/assets/icons/dashboard/activeDashboardIcon.png";
const activeListIcon = "/assets/icons/dashboard/activeListIcon.png";
const leftIcon = "/assets/icons/dashboard/leftIcon.png";

const AdminPanel = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { href: "/", icon: DashboardIcon, activeIcon: activeDashboardIcon, label: "Dashboard" },
    { href: "/successful-list", icon: listIcon, activeIcon: activeListIcon, label: "Successful List" },
    { href: "/failed-list", icon: listIcon, activeIcon: activeListIcon, label: "Failed List" },
    { href: "/plans-list", icon: listIcon, activeIcon: activeListIcon, label: "Plans List" },
    { href: "/esim-list", icon: listIcon, activeIcon: activeListIcon, label: "eSIM List" },
    { href: "/users", icon: listIcon, activeIcon: activeListIcon, label: "Users" },
    { href: "/cancel-request", icon: listIcon, activeIcon: activeListIcon, label: "Cancel Request" },
    { href: "/support-list", icon: listIcon, activeIcon: activeListIcon, label: "Support List" },
    { href: "/listing-list", icon: listIcon, activeIcon: activeListIcon, label: "Listing List" },
    { href: "/deals-list", icon: listIcon, activeIcon: activeListIcon, label: "Deals List" },
    { href: "/blog-list", icon: listIcon, activeIcon: activeListIcon, label: "Blog List" },
    { href: "/popular", icon: listIcon, activeIcon: activeListIcon, label: "Popular" },
    { href: "/settings", icon: listIcon, activeIcon: activeListIcon, label: "Settings" },
    { href: "/coupon", icon: listIcon, activeIcon: activeListIcon, label: "Coupon" },
  ];

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.notCollapsed}`}>
      <div className={styles.logo}>
          {isCollapsed ? '' :<img src={waosimLogo} alt="Logo" />}
      </div>
          <button onClick={toggleSidebar} className={styles.toggleBtn}>
             {isCollapsed ? <ChevronRightIcon className={styles.rightIcon} /> : <img className={styles.leftIcon} src={leftIcon} />}
           </button> 
      <ul className={styles.menu}>
      {menuItems?.map((item) => {
          const isActive = router.pathname === item.href;
          return (
            <li key={item.href} className={isActive ? styles.active : ''}>
              <Link href={item.href}>
                <div>
                  <img src={isActive ? item.activeIcon : item.icon} alt={`${item.label} Icon`} />
                  {item.label}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles.logout}>
        <button>Logout</button>
      </div>
    </aside>
  );
};

export default AdminPanel;
