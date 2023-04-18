import Head from 'next/head'
import React from 'react'
import {Layout, Grid, ConfigProvider} from "antd"
import Navbar from "@/components/Navbar"
import styles from "@/styles/Home.module.scss"
import Sidebar from './dashboard/sidebar'
import ItemsProvider from '@/contexts/sidebarItems'
import { LangContext } from '@/contexts/lang'
import { useSession } from 'next-auth/react'

type BaseLayoutProp ={
    title:string,
    PageComponent:React.FC
}

const {useBreakpoint} = Grid;
const BaseLayout = ({title,PageComponent}:BaseLayoutProp) => {
    const [toggler, setToggler] = React.useState(false);
    const {i18n} = React.useContext(LangContext)
    const {lg, md,xl} = useBreakpoint();
    // const {session} = React.useContext(sessioncontext)
    const {data:session} = useSession()
    return (
      <ConfigProvider direction={i18n.language == "en"? "ltr":"rtl"}  theme={{
        token:{
            colorPrimary:"#7B68F6",
            screenXSMin:0,
            screenXS:400,
            screenXSMax:419,
            screenSMMin:420,
            screenSM:420,
            screenSMMax:767,
        },
        components:{
          Layout:{
            colorBgHeader:"#fff"
          },
          Button:{
            colorBgContainerDisabled:"#F6F4FF",
          }
        }
      }}>
        <Head>
          <title>HYRDD-{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Layout>
          <Layout.Header className={(session? `${styles.borderBottom} `+ styles.px1 : !lg? !md? styles.px1 :styles.px2 :  !xl? styles.px10:styles.px19)}>
            <Navbar toggler={toggler} setToggler={setToggler} />
          </Layout.Header>
          <Layout hasSider className={styles.minHeightBody}>
            { session &&
              <ItemsProvider>
                  <Sidebar toggler={toggler} setToggler={setToggler} />
              </ItemsProvider>
              }
            <Layout.Content  className={session? styles.px0 : `${styles.main} ${styles.pt5} ` +  (!lg? !md? styles.px1 :styles.px2 :  !xl? styles.px10:styles.px19)}>
              <PageComponent />
            </Layout.Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    )
}
export default BaseLayout;