import * as React from 'react';
import {CloseOutlined, MinusOutlined, PlusOutlined,ReloadOutlined} from "@ant-design/icons"
import { Checkbox, Col, DrawerProps, Form, RadioChangeEvent, Row } from 'antd';
import { Button, Drawer, Radio, Space, Collapse } from 'antd';
import d from "@/data.json"
import styles from "@/styles/filterDrawer.module.scss"
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { dataType } from '@/types/dataType';
const { Panel } = Collapse;

const DrawerItems = ["sector","functional Area","Job Type","by users"]
type items ="sector"|"functionalarea"|"jobType"
const Filter = ({data, setData,open,setOpen} : {data:dataType,setData:React.Dispatch<React.SetStateAction<dataType>>,open:boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [checked,setChecked]= React.useState<string[]>()
  React.useEffect(()=>{
    console.log(`Checked : ${checked}`)
    checked?.length ==0 ?
      setData(d)
      :
          setData(d)
          checked?.map(item=>{
            const [key,value]= item.split(".")
            console.log(`KEY: ${key}`)
            console.log(`Value: ${value}`)
            if(key !== "by users"){
            setData(data=>data.filter(data=>data[key] == value))
          }else{
            setData(data=>data.filter(data=>data.hiringManagers.find(i=>i==value) == value))
          }
      })
  },[checked])
  const handelReset = ()=>{
    setChecked([])
    setData(d)

  }
  console.log("cc = " + checked)
  const onChangeCheckBox = (checkedValues: CheckboxValueType[]) => {
    console.log(checkedValues)
     setChecked(checkedValues as string[])
    // ["s.1","s.2","b.1","b.2"] => [{"s":["1","2"]}, {"b":["1","2"]}]
    // checkedValues.map(checked=>
      //   if(checked.item == "sector"){
      //     setChecked(i=>i.find(n=>(n == checked.value))? i:[...i,checked.value] )
      //     setData(i=>i.filter(d=>d.sector == checked.value))
      //   }else if(checked.item == "functionalarea"){
      //     setChecked(i=>i.find(n=>n == checked.value)? i:[...i,checked.value] )
      //     setData(i=>i.filter(d=>d.functionalarea == checked.value))
      //   }else if(checked.item == "by users"){
      //     setData(i=>i.filter(d=>d.hiringManagers.find(f=>f == checked.user)== checked.user))
      //     console.log("test?")
      //   }
      // }
      console.log(checked)
  // )
      // checked?.map(item=>{
      //   const [key,value]= item.split(".")
      //   console.log(`KEY: ${key}`)
      //   console.log(value)
      //   setData(d=>d.filter(data=>data[key] == value))
      // })
    }
  const renderData  = (item:string)=>{
      switch(item){
          case "sector":return getData(item)
          case "functional Area":return getData("functionalarea")
          case "Job Type":return getData("jobType")
      }
  }
  
  const getData = (type:items)=>{
      return data.reduce((set, item) => {
          const count =  data.filter(i=>
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
    data.map(item=>item.hiringManagers.map(user=>users.push(user)))
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