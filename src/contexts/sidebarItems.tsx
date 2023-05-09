import * as React from 'react';
import {DashboardFilled, AccountBookFilled, CrownFilled, FolderFilled, SettingFilled, LeftOutlined, RightOutlined} from "@ant-design/icons"
import styles from "@/styles/Sidebar.module.scss"
import type { MenuProps } from 'antd';


type MenuItem = Required<MenuProps>['items'][number];
type MenuSubItem = {
    [key: string]: MenuProps['items']
  }

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: string,
    className?:string
    ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
      className,
    } as MenuItem;
  }

  const subItems : MenuSubItem = {
    "dashboard": [
      { label: "dashboard1", key: "dashboard1", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "dashboard2", key: "dashboard2", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "dashboard3", key: "dashboard3", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "dashboard4", key: "dashboard4", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
    ],
    "jobs": [
      { label: "jobs1", key: "jobs1", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "jobs2", key: "jobs2", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "jobs3", key: "jobs3", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "jobs4", key: "jobs4", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
    ],
    "candidates": [
      { label: "candidates1", key: "candidates1", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "candidates2", key: "candidates2", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "candidates3", key: "candidates3", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "candidates4", key: "candidates4", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
    ],
    "agencies": [
      { label: "agencies1", key: "agencies1", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "agencies2", key: "agencies2", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "agencies3", key: "agencies3", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "agencies4", key: "agencies4", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
    ],
    "folders": [
      { label: "folders1", key: "folders1", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "folders2", key: "folders2", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "folders3", key: "folders3", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "folders4", key: "folders4", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
    ],
    "settings": [
      { label: "settings1", key: "settings1", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "settings2", key: "settings2", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "settings3", key: "settings3", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
      { label: "settings4", key: "settings4", className: `${styles.menuItem} ${styles.noBackGround}` },
      { type: 'divider', className: "divider-item" },
    ],
  }

const Items = [
    {label: "Dashboard", key:"dashboard", icon: <DashboardFilled className={styles.menuItemIcon} />, className: styles.menuItem},
    {label:"Jobs", key:"jobs", icon:<AccountBookFilled className={styles.menuItemIcon}  />, className: styles.menuItem},
    {label:"Candidates", key:"candidates", icon:<DashboardFilled className={styles.menuItemIcon}  />, className: styles.menuItem},
    {label:"Agencies", key:"agencies", icon:<CrownFilled className={styles.menuItemIcon}  />, className: styles.menuItem},
    {label:"Folders", key:"folders", icon:<FolderFilled className={styles.menuItemIcon}  />, className: styles.menuItem},
    {label:"Settings", key:"settings", icon:<SettingFilled className={styles.menuItemIcon}  />, className: styles.menuItem}
]

const itemsWithChilds: MenuItem[] = [];

Items.forEach(item=>{
    const {label,key,icon,className} = item
    const children  = subItems[item.key]
    itemsWithChilds.push(getItem(label,key,icon,children,undefined,className))
})



type ItemsContextProps = {Items:{
    label: string;
    key: string;
    icon: JSX.Element;
    className: string;
}[], subItems:MenuSubItem, itemsWithChilds:MenuItem[]}

export const ItemsContext = React.createContext<ItemsContextProps>({Items, subItems, itemsWithChilds});

const ItemsProvider = ({children}: {children:React.ReactNode}) => {
    return ( 
        <ItemsContext.Provider value={{Items,subItems, itemsWithChilds}}>
            {children}
        </ItemsContext.Provider>
     );
}
 
export default ItemsProvider;