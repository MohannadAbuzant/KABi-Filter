import * as React from 'react';
import {CloseOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons"
import { Checkbox, Col, DrawerProps, Form, RadioChangeEvent, Row } from 'antd';
import { Button, Drawer, Radio, Space, Collapse } from 'antd';
import styles from "@/styles/filterDrawer.module.scss"
import Data from "@/data.json"
const { Panel } = Collapse;

const DrawerItems = ["sector","functional Area","Job Type","by users"]
type items ="sector"|"functionalarea"|"jobType"
const Filter = () => {
  const renderData  = (item:string)=>{
      switch(item){
          case "sector":return getData(item)
          case "functional Area":return getData("functionalarea")
          case "Job Type":return getData("jobType")
      }
  }
  
  const getData = (data:items)=>{
      return Data.reduce((set, item) => {
          const count =  Data.filter(i=>
               i[data] == item[data]
          ).length
  
          set.filter(i=>item[data] == i.type).length == 0 &&
          set.push({type:item[data],count:count})
           return set;
         }, [{type:"",count:0}]).map(item=>
           item.type != "" &&
           <Col span={24}>
               <Checkbox className={`${styles.w100} ${styles.justifyContentBetween} ${styles.checkbox} ${styles.flexDRR}`}>{item.type} <span className={styles.primaryColor}> ({item.count})</span></Checkbox>
           </Col>
         ) 
  }
  const getUsers=()=>{
    const users:string[] = []
    Data.map(item=>item.hiringManagers.map(user=>users.push(user)))
    return users
  }
  const getUserscount = ()=>{
    return getUsers().reduce((users,user)=>{
      const count = getUsers().filter(u=> u == user).length
      users.filter(u=>u.user == user).length == 0 && users.push({user:user,count:count})
      return users
    },[{user:"",count:0}])

  }
    console.log(Data[1]["Units"])
    const [open,setOpen] = React.useState(true)
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
                                <Checkbox className={`${styles.w100} ${styles.justifyContentBetween} ${styles.checkbox} ${styles.flexDRR}`}>{user.user} <span className={styles.primaryColor}> ({user.count})</span></Checkbox>
                              </Col>
                              )
                          }

                    </Row>

                    
                
                </Panel>
            )}
        </Collapse>
      </Drawer>
     );
}
 
export default Filter;