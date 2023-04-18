import * as React from 'react';
import {Row, Col, Space, Input, Button, Grid,Dropdown, AutoComplete} from "antd";
import {SearchOutlined, ReloadOutlined,FilterOutlined, MoreOutlined, DownloadOutlined, UploadOutlined, PlusCircleFilled} from "@ant-design/icons"
import styles from "@/styles/dashboard.module.scss"
import JobCard from "./card";
import type { MenuProps } from 'antd';
import data from  "@/data.json"
import { cardPropsTypes } from "@/types/card";
import CreateForm from './createForm';
import { LangContext } from '@/contexts/lang';

const {useBreakpoint} = Grid

const Dashboard = () => {
    const [open, setOpen] = React.useState(false);
    const [dataCard,setDataCard] = React.useState(data);
    const [options, setOptions] = React.useState<{}[]>();
    const {t} = React.useContext(LangContext)
    const [searchValue, setSearchValue] = React.useState<string>()
    const {xs,xl} = useBreakpoint()
    const Items: MenuProps["items"] = [
        {
            label:t("dashboard:downloadtemp"),
            key:"1",
            icon:<DownloadOutlined/>
        },
        {
            label:t("dashboard:importjob"),
            key:"2",
            icon:<UploadOutlined/>
        },
        {
            label:t("dashboard:addjob"),
            key:"3",
            icon:<PlusCircleFilled/>,
            onClick:()=>setOpen(true)
        },
    
    ]
    function getData(
    id:string,
    jobTitle: string,
    reqType: string,
    reqStatus:boolean,
    orgStructure : string,
    Units : string[],
    hiringManagers: string[],
    vacanciesBudget:number,
    vacanciesOpen:number,
    vacanciesField:number,
    deleteItem:(id:string)=>void
    ):cardPropsTypes {
        return     {
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
        } as cardPropsTypes
        
    }

    const deleteItem =(id:string)=>{
        const newData = dataCard.filter(item=>{
            return item.id != id
        })
        setDataCard(newData)
    }
    const onSearch=(value:string)=>{
        const opt = dataCard.filter(item=>{
            return item.jobTitle.toLowerCase().includes(value.toLowerCase())
        }).reduce((arr,item)=>{
            if(!arr.some(ar=>ar.label == item.jobTitle)){
                arr.push({label:item.jobTitle,value:item.jobTitle})
            }
            return arr
        },[{label:"",value:""}]).filter(item=>item.label !="")
        setOptions(opt)
    }
    const onSelectItem = (value:string)=>{
        setSearchValue(value)
    }

    const filterData =()=>{
        const newData = dataCard.filter(item=>{
            return item.jobTitle == searchValue
        })
        setDataCard(newData)
    }

    const resetData=()=>{
        setDataCard(data)
        setSearchValue("")
    }
    const setValue=(value:string)=>{
        setSearchValue(value)
    }
    return (
        <>
            <CreateForm setOpen={setOpen} open={open} setDataCard={setDataCard}/>
            <Row  gutter={[0,10]} className={`${styles.my1} ${styles.mx1}`}>
                <Col span={24}>
                    <Row gutter={[0,10]} justify={"space-between"}>
                        <Col>
                            <Space>
                                <AutoComplete onChange={setValue} allowClear value={searchValue} onSearch={onSearch} onSelect={onSelectItem} options={options} filterOption={true} style={{ width: xl?300:200 }} size={xs?"middle":"large"} placeholder="Search" />
                                <Button onClick={filterData} size={xs?"middle":"large"} className={`${styles.dFlex} ${styles.justifyContentCenter} ${styles.alignItemsCenter}`}  type="primary" icon={<SearchOutlined className={styles.navBarIconMenu} />} />
                                <Button onClick={resetData} size={xs?"middle":"large"} className={`${styles.dFlex} ${styles.justifyContentCenter} ${styles.alignItemsCenter} ${styles.secoundryButton}`} icon={<ReloadOutlined className={styles.navBarIconMenu} />} />
                                <Button size={xs?"middle":"large"} className={(xs?` `:`${styles.ml1} `)+ `${styles.dFlex} ${styles.justifyContentCenter} ${styles.alignItemsCenter} ${styles.secoundryButton} `} icon={<FilterOutlined />}>{xl?<span>{t("dashboard:filter")}</span>:""}</Button>
                            </Space>
                        </Col>
                        <Col>
                        {
                            xs?
                                <Dropdown menu={{ items:Items }} placement={"bottomRight"} trigger={['click']} arrow={{ pointAtCenter: true }}>
                                    <Button className={styles.secoundryButton} icon={<MoreOutlined />}/>
                                </Dropdown>
                            :
                                <Space>
                                    <Button size={"large"} className={`${styles.dFlex} ${styles.justifyContentCenter} ${styles.alignItemsCenter} ${styles.secoundryButton}`} icon={<DownloadOutlined className={styles.navBarIconMenu} />}>{xl?t("dashboard:downloadtemp"):""}</Button>
                                    <Button size={"large"} className={`${styles.dFlex} ${styles.justifyContentCenter} ${styles.alignItemsCenter} ${styles.secoundryButton}`} icon={<UploadOutlined className={styles.navBarIconMenu} />}>{xl?t("dashboard:importjob"):""}</Button>
                                    <Button  size={"large"} onClick={()=>setOpen(true)} type="primary"  className={`${styles.dFlex} ${styles.justifyContentCenter} ${styles.alignItemsCenter}`} icon={<PlusCircleFilled />}>{xl?t("dashboard:addjob"):""}</Button>
                                </Space> 
                        }
                        </Col>
                    </Row>
                </Col>
                {dataCard.map(item=>{
                    return (
                        <Col key={`job-col-${item.id}`} span={24}>
                            <JobCard key={`job-card-${item.id}`} {...getData(
                                item.id,
                                item.jobTitle,
                                item.reqType,
                                item.reqStatus,
                                item.orgStructure,
                                item.Units,
                                item.hiringManagers,
                                item.vacanciesBudget,
                                item.vacanciesOpen,
                                item.vacanciesField,
                                deleteItem
                                )}/>
                        </Col>
                    )
                })}
            </Row>
        </>
    );
}
 
export default Dashboard;