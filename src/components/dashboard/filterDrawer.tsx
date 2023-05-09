import * as React from 'react';
import {CloseOutlined, MinusOutlined, PlusOutlined,ReloadOutlined,CalendarOutlined} from "@ant-design/icons"
import { Checkbox, Col,Row } from 'antd';
import { Button, Drawer,DatePicker, Collapse } from 'antd';
import type { DatePickerProps } from 'antd';
import d from "@/data.json"
import styles from "@/styles/filterDrawer.module.scss"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { dataType } from '@/types/dataType';
import { useRouter } from 'next/router';
const { Panel } = Collapse;

const DrawerItems = ["sector","functional Area","published date","end date","Job Type","by users"]
type items ="sector"|"functionalarea"|"jobType"
const Filter = ({data, setData,open,setOpen} : {data:dataType,setData:React.Dispatch<React.SetStateAction<dataType>>,open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const router = useRouter();
  const [checked,setChecked]= React.useState<string[]>(router.query.checked?Array.isArray(router.query.checked)? router.query.checked  as string[]: Array(router.query.checked) as string[]: [])
  React.useEffect(()=>{
    router.query.checked = checked
    router.push(router)
    checked?.length ==0 ?
    setData(d)
    :
          setData(d)
          const filterValues=checked.reduce((arr,item)=>{
            const [key,value]= item.split(".")  
            if(key=="sector"){
              arr.sector.push(value)
            }else if(key=="functionalarea"){
              arr.functionalarea.push(value)
            }else if(key=="jobType") {
              arr.jobType.push(value)
            }else if(key=="by users"){
              arr.users.push(value)
            }
            return arr
          },{sector:[],functionalarea:[],jobType:[],users:[]})
          console.log("ABD", Object.entries(filterValues))
          for (const [key, value] of Object.entries(filterValues)) {
            if(value.length>0 && key != "users") {setData(d=>d.filter(item=>value.includes(item[key])))} 
            if(value.length>0 && key == "users") {setData(d=>d.filter(item=>value.every(i=>item.hiringManagers.includes(i))))}
          }
  },[checked])
  const handelReset = ()=>{
    setChecked([])
    setData(d)
  }
  const onChangeCheckBox = (checkedValues: CheckboxValueType[]) => {
     setChecked(checkedValues as string[])

    }
  const renderData  = (item:string)=>{
      switch(item){
          case "sector":return getData(item)
          case "functional Area":return getData("functionalarea")
          case "Job Type":return getData("jobType")
      }
  }
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    dateString.length !=0? 
    setData(d=>d.filter(i=>new Date(i.published_date).getTime() >= new Date(dateString).getTime()))
    :
    onChangeCheckBox(checked as CheckboxValueType[])
  };
  const getData = (type:items)=>{
      return d.reduce((set, item) => {
         const count= data.filter(i=>
            i[type] == item[type]
       ).length
          set.filter(i=>item[type] == i.type).length == 0 &&
          set.push({type:item[type],count:count})
           return set;
         }, [{type:"",count:0}]).map(item=>
           item.type != "" &&
           <Col span={24}>
               <Checkbox value={type+"."+item.type} className={`${styles.w100} ${styles.justifyContentBetween} ${styles.checkbox} ${styles.flexDRR}`}>{item.type} <span className={styles.primaryColor}> ({item.count})</span></Checkbox>
           </Col>
         ) 
  }
  const getUsers=()=>{
    const users:string[] = []
    d.map(item=>item.hiringManagers.map(user=>users.push(user)))
    return users
  }
  const getUserscount = ()=>{
    return getUsers().reduce((users,user)=>{
      const count = getUsers().filter(u=> u == user).length
      users.filter(u=>u.user == user).length == 0 && users.push({user:user,count:count})
      return users
    },[{user:"",count:0}])

  }
    return ( 
        <Drawer
        title="Basic Drawer"
        placement={"right"}
        closable={false}
        maskClosable={true}
        onClose={()=>setOpen(false)}
        open={open}
        extra={<CloseOutlined className={styles.primaryColor} onClick={()=>setOpen(false)} />}
      >
        <Checkbox.Group value={checked} style={{display:"block"}} onChange={onChangeCheckBox}>
        <Collapse
         expandIconPosition='end'
         bordered={false} 
         ghost
         expandIcon={({isActive})=> isActive? <MinusOutlined />: <PlusOutlined />}
         >

            {DrawerItems.map((item:string,index)=>
                <Panel key={index} className={styles.mb1} header={item}>

                    <Row>
                        {
                          renderData(item)
                        }
                        {
                          (item=="published date") &&
                          <DatePicker  onChange={onChange} format={'YYYY-MM-DD'} suffixIcon={<CalendarOutlined className={styles.primaryColor} />}  />
                        }
                        {
                            (item=="by users") && 
                            getUserscount().map((user)=>
                            user.user != "" && 
                              <Col span={24}>
                                <Checkbox value={item+"."+user.user} className={`${styles.w100} ${styles.justifyContentBetween} ${styles.checkbox} ${styles.flexDRR}`}>{user.user} <span className={styles.primaryColor}> ({user.count})</span></Checkbox>
                              </Col>
                              )
                          }

                    </Row>


                    
                
                </Panel>
            )}
        </Collapse>
            </Checkbox.Group>
            <Button block type='primary' icon={<ReloadOutlined />} onClick={handelReset}>Reset</Button>
      </Drawer>
     );
}
 
export default Filter;