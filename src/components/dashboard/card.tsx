import * as React from 'react';
import styles from "@/styles/Card.module.scss"
import { Card, Button, Space, Row, Col, Typography, Divider, Grid, Dropdown } from 'antd';
import {MoreOutlined, DeleteOutlined, EditFilled, DiffOutlined} from "@ant-design/icons"
import type { MenuProps } from 'antd';
import { cardPropsTypes } from '@/types/card';
import DeleteModal from './deleteModal';
import { LangContext } from '@/contexts/lang';

const {useBreakpoint} = Grid

const JobCard = (
    {
        id,
        jobTitle,
        reqType,
        reqStatus,
        orgStructure,
        Units,
        hiringManagers,
        vacanciesBudget,
        vacanciesOpen,
        vacanciesField,
        deleteItem
    } : cardPropsTypes
    ) => {

    const {md,xl,xs} = useBreakpoint()
    const [open,setOpen] = React.useState<boolean>(false);
    const {t,i18n} = React.useContext(LangContext)
    const DropdownItem: MenuProps["items"] = [
        {
            key:"1",
            label: t("card:reqjob"),
            icon:<DiffOutlined />
        },
        {
            key:"2",
            label:t("card:deleteitem"),
            icon:<DeleteOutlined/>,
            danger:true,
            onClick:()=>setOpen(true)
        },
    ]
    const title =
                    i18n.language == "ar"?
                    <>{jobTitle}   <span className={styles.fontWeightNormal}>:{id}#</span></>
                    :
                    <><span className={styles.fontWeightNormal}>#{id}: </span> {jobTitle}</>
                
        
    const extras = (xs?
        <Dropdown menu={{ items:DropdownItem }} placement={"bottomRight"} trigger={['click']} arrow={{ pointAtCenter: true }}>
                        <Button icon={<MoreOutlined />}/>
                    </Dropdown>
                    :
                    <Space>
                        <Button type={"primary"}>{t("card:reqjob")}</Button>
                        <Button icon={<MoreOutlined />}/>
                        <Button icon={<EditFilled />}/>
                        <Button onClick={()=>setOpen(true)} danger icon={<DeleteOutlined />}/>
                    </Space>)

    return ( 
        <>
        <DeleteModal id={id} deleteItem={deleteItem} open={open} setOpen={setOpen}/>
        <Card title={title} extra={extras}>
            <Row gutter={[0,20]}>
                <Col xs={24} md={24} xl={8}>
                        <Row gutter={[0,((!xl && md)|| xs)?15:10]}>
                            <Col xs={24}>
                                <Space size={0} direction={"vertical"}>
                                    <Typography.Text strong>{t("card:reqtype")}</Typography.Text>
                                    <Typography.Text>{reqType}</Typography.Text>
                                </Space>
                            </Col>
                            <Col xs={24}>
                            <Space size={0} direction={"vertical"}>
                                    <Typography.Text strong className={styles.primaryColor}>{t("card:ordstrucure")}</Typography.Text>
                                    <Typography.Text>{orgStructure}</Typography.Text>
                                </Space>
                            </Col>
                            <Col xs={24}>
                            <Space size={0} direction={"vertical"}>
                                    <Typography.Text strong>{t("card:units")}</Typography.Text>
                                    <Typography.Text>{Units?.toString()}</Typography.Text>
                                </Space>
                            </Col>
                            <Divider className={styles.my1} />
                            <Col span={24}>
                                <Space direction={"vertical"}>
                                    <Typography.Text strong>{t("card:hiringmanager")}</Typography.Text>
                                    <Space>
                                        {hiringManagers.map((item,index)=>{
                                            return(

                                                <Typography.Text key={index} className={`${styles.bgSuccess} ${styles.hiringManagers}`} >{item}</Typography.Text>
                                            )
                                        })}
                                    </Space>
                                </Space>
                            </Col>
                        </Row>
                </Col>
                <Col xs={24} md={24} xl={16}>
                    <Row gutter={[0,25]}>
                        <Col className={((!xl && md)|| xs)? styles.alignTextStart:styles.alignTextEnd} span={24}>
                            <Space size={0} direction={"vertical"}>
                                <Typography.Text>{t("card:currentreqstatus")}</Typography.Text>
                                <Typography.Text type={reqStatus? "success":"danger"}>{reqStatus? t("card:requested"):t("card:notreq")}</Typography.Text>
                                <Typography.Link>{t("card:viewdetails")}</Typography.Link>
                            </Space>
                        </Col>
                        <Col span={24}>
                            <Row justify={((!xl && md)|| xs)?"start":"end"} gutter={[0,25]}>
                                <Col xs={24} md={7} lg={8} xl={7}>
                                    <Card bordered={false} size={"small"} className={`${styles.h100} ${styles.card} `+ (i18n.language=="en"? styles.rightGradient : styles.leftGradient)}>
                                        <Typography.Text strong>{vacanciesBudget}</Typography.Text>
                                        <Typography.Paragraph>{t("card:totalvac")}</Typography.Paragraph>
                            
                                    </Card>
                                </Col>
                                <Col xs={24} md={7} lg={8} xl={7}>
                                    <Card bordered={false} size={"small"} className={`${styles.h100}  ${styles.card} `+ (i18n.language=="en"? styles.rightGradient : styles.leftGradient)}>
                                        <Typography.Text type={"success"} strong>{vacanciesOpen}</Typography.Text>
                                        <Typography.Paragraph>{t("card:vacopen")}</Typography.Paragraph>
                                    </Card>
                                </Col>
                                <Col xs={24} md={7} lg={8} xl={7}>
                                    <Card bordered={false} size={"small"} className={`${styles.h100}  ${styles.card} `+ (i18n.language=="en"? styles.rightGradient : styles.leftGradient)}>
                                    <Typography.Text type={"danger"} strong>{vacanciesField}</Typography.Text>
                                    <Typography.Paragraph>{t("card:vacfield")}</Typography.Paragraph>
                                        
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
        </>
     );
}
 
export default JobCard;