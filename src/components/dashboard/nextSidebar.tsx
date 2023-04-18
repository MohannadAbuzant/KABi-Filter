import React from "react"
import {Layout, Menu} from "antd"
import styles from "@/styles/Sidebar.module.scss"
import { ItemsContext } from "@/contexts/sidebarItems";
type NextsidebarProps={
    itemKey:string|"dashboard"
}  
const Nextsidebar = ({itemKey} : NextsidebarProps) => {
    const {subItems} = React.useContext(ItemsContext)
    return ( 
        <Layout.Sider width={250} className={`${styles.subsidebar} ${styles.boxShadow}`}  theme="light">
            <Menu className={styles.borderRadius} defaultSelectedKeys={["jobs1"]} items={subItems[itemKey]}></Menu>
        </Layout.Sider>
     );
}
 
export default Nextsidebar;
