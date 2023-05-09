import {Button,Row, Col, Space, Dropdown, Avatar, Grid} from "antd"
import type { MenuProps } from 'antd';
import {MenuOutlined, BellOutlined, QuestionCircleOutlined, UserOutlined, DownOutlined, UpOutlined, LogoutOutlined} from  "@ant-design/icons"
import styles from "@/styles/Navbar.module.scss"
import React from 'react';
import { TogglerProps } from "@/types/toggler";
import { LangContext } from "@/contexts/lang";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from 'next/image'
import { signOut, useSession } from "next-auth/react";


const { useBreakpoint } = Grid;

const Navbar = ({setToggler}:TogglerProps) => {

    const {t,i18n} = React.useContext(LangContext)
    const router = useRouter()
    const {data:session, status} = useSession()
    const {md,sm, lg,xs} = useBreakpoint();
    const [open, setOpen] = React.useState<boolean>(false)
    const items: MenuProps['items'] = [
          {
            label:t("navbar:signout"),
            icon: <LogoutOutlined />,
            danger:true,
            key: '3',
            onClick:()=>signOut({redirect:false})
          },
    ]
    if (!(lg||md) && session) {
        items.unshift({type:"divider"})
        items.unshift({label:session.user?.name,key:'6', style:{textAlign:"center"}})
      }
    return (
        <nav className={styles.navbar}>
            <Row align={"middle"} justify={"space-between"}>
                <Col className={`${styles.dFlex} ${styles.aligItemsCenter}`}>
                        {(!(lg) && session) && <MenuOutlined onClick={()=>setToggler(true)} className={`${styles.navBarIconMenu} `+(i18n.language=="en"?styles.mr1:styles.ml1)}/>}
                        <Image width={((xs||sm) && !md)?90:200} height={((xs||sm) && !md)?20:32} src={"/static/images/LOGO-h-01.png"} alt="HYRDD" />
                </Col>
                <Col>
                   <Space size={!(lg||md)? xs?2: "small":"middle"}>
                        <Link href={router.asPath} locale={i18n.language == "en"? "ar":"en"}>
                            <Button size={xs?"small":"middle"}>
                                {i18n.language == "ar"? xs?"EN" :"English": xs?"ع":"العربية"}
                            </Button>
                        </Link>
                    {
                        session && 
                        <>
                            <Button type={"text"} shape={"circle"} size={xs?"middle":"large"} icon={<BellOutlined />} />
                            <Button type={"text"} shape={"circle"} size={xs?"middle":"large"} icon={<QuestionCircleOutlined />} />
                            <Dropdown
                            
                             onOpenChange={(open)=> setOpen(open)}
                             placement={i18n.language=="en"?"bottomRight":"bottomLeft"}
                             arrow={{pointAtCenter:false}}
                             trigger={['click']}
                             menu={{items}}>
                                <Space className={styles.cursorPointer} size={!xs?"small":"small"}>
                                    {(lg||md) && <span>{session.user?.name}</span>}
                                    <Avatar size={!xs?"default":"small"} icon={<UserOutlined />} />
                                    {open ? <UpOutlined /> : <DownOutlined />}
                                </Space>
                            </Dropdown>
                        </>
                    }    
                    </Space>
                </Col>
            </Row>
        </nav>
     );
}
 
export default Navbar;