import * as React from 'react';
import { Modal } from 'antd';
import {WarningOutlined} from "@ant-design/icons"

type DeleteModalProps={
    id:string,
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    deleteItem:(id:string)=>void
}

const DeleteModal = ({id, open, setOpen, deleteItem }:DeleteModalProps) => {
    return ( 
        <Modal
        title={<><WarningOutlined /> confirm delete</>}
        open={open}
        onOk={()=>{deleteItem(id); setOpen(false)}}
        onCancel={()=>setOpen(false)}
        okType={"danger"}
      >
        <p>are you sure you want to delete this ?</p>
      </Modal>
     );
}
 
export default DeleteModal
