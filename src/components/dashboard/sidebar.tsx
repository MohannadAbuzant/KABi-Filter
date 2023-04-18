import {Layout, Grid, Drawer, Button, Menu, Badge, Row,Col} from "antd";
import * as React from 'react';
import styles from "@/styles/Sidebar.module.scss"
import {LeftOutlined, RightOutlined} from "@ant-design/icons"
import Nextsidebar from "./nextSidebar";
import { ItemsContext } from "@/contexts/sidebarItems";
import { TogglerProps } from "@/types/toggler";
import { LangContext } from "@/contexts/lang";

const {useBreakpoint} = Grid
const Sidebar = ({toggler, setToggler}:TogglerProps) => {
    const [colapsed, setColapsed] = React.useState<boolean>(false)
    const [itemKey, setItemKey] = React.useState<string>("jobs")
    const {Items, itemsWithChilds} = React.useContext(ItemsContext)
    const {i18n} = React.useContext(LangContext)
    const {lg,xl} = useBreakpoint();
    const icon = colapsed? i18n.language == "en"?<Button size={"middle"} onClick={()=>setColapsed(false)} shape={"circle"} icon={<RightOutlined/>} />:<Button size={"middle"}  onClick={()=>setColapsed(false)} shape={"circle"} icon={<LeftOutlined/>} />
                           : i18n.language=="en"?<Button size={"middle"}  onClick={()=>setColapsed(true)} shape={"circle"} icon={<LeftOutlined/>} />: <Button size={"middle"}  onClick={()=>setColapsed(true)} shape={"circle"} icon={<RightOutlined/>} />
    function onSelectItem({key}:{key:string}){
        setItemKey(key)
    }
    return ( 
        <Row gutter={[10,0]}>
            { (lg)?
            <>
            
                <Col>
                    <Badge className={styles.h100} offset={[i18n.language=="en"?-10:10,38]} count={icon}>
                        <Layout.Sider className={`${styles.h100} ${styles.borderRight}`} collapsed={colapsed} theme="light">
                            <Menu  onSelect={onSelectItem} defaultSelectedKeys={["jobs"]} className={`${styles.pt1} ${styles.minHeightBody}`} items={Items}></Menu>
                        </Layout.Sider>
                    </Badge>
                </Col>
                <Col  className={`${styles.mt1}`}>
                    <Nextsidebar itemKey={itemKey} />
                </Col>
            </>
                :
            <Drawer
                placement={"left"}
                open={toggler}
                onClose={()=>setToggler(false)}
                maskClosable
            >
                <Menu defaultSelectedKeys={["jobs"]} defaultOpenKeys={["jobs1"]}  mode="inline" items={itemsWithChilds} />
                </Drawer>
            }
        </Row>
     );

}
export default Sidebar;