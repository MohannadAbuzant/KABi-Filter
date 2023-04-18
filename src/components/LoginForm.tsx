import {Button, Typography, theme, Form, Input, Checkbox, Alert,Grid} from 'antd';
import {ExclamationCircleOutlined} from  "@ant-design/icons"
import styles from "@/styles/Login.module.scss"
import { signIn } from "next-auth/react"
import React from 'react';
import Link from 'next/link';
import { LangContext } from '@/contexts/lang';

const {useBreakpoint} = Grid
const LoginForm = ()=>{
    const {sm,xs,md} = useBreakpoint()
    const {t,i18n} = React.useContext(LangContext)
    const [error,setError] = React.useState<{email:boolean,password:boolean}>({email:false,password:false})
    const [form] = Form.useForm()
    const [showAlert,setShowAlert] = React.useState<boolean>(false)

    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.type == "email"?
            form.validateFields(["email"])
            .then(val=>setError(prev=>{return{password:prev.password,email:false}}))
            .catch(err=>setError(prev=>{return{password:prev.password,email:true}}))
            :
            form.validateFields(['password'])
            .then(val=>setError(prev=>{return{password:false,email:prev.email}}))
            .catch(err=>setError(prev=>{return{password:true,email:prev.email}}))
      }

    const onFinish = (values:any)=>{
        signIn("credentials",{username:values.email,password:values.password,redirect:false})
        .then(data=>data?.error? setShowAlert(true):setShowAlert(false))
    }

    const onFinishFeild = ()=>{
        form.getFieldsError(["password","email"]).forEach(item=>{
            if(item.errors.length>0){
                item.name[0]=="email"?
                    setError(prev=>{return{password:prev.password,email:true}})
                    :
                    setError(prev=>{return{password:true,email:prev.email}})
            }
        })
    }

    const passwordLabel = (
        <div className={`${styles.dFlex} ${styles.justifyContentBetween}`}>
            <span className={`${styles.formLabel} ` + (i18n.language =="en"? ` ${styles.right}` : ` ${styles.left}`)}>{t("login:password")}</span>
            <Typography.Link className={styles.primaryColor} href="#API">{t("login:forgotpassword")}</Typography.Link>
        </div>
    );
    return (
        <Form
        form={form}
        name="loginForm"
        className={`${styles.form} `+((sm||xs) && !(md)? styles.w100 : styles.w300px)}
        layout={"vertical"}
        size={"middle"}
        initialValues={{ remember: true }}
        validateMessages={{required:()=>t("login:reqfield"),types:{email:()=>t("login:notvalidemail")}}}
        onFinishFailed={onFinishFeild}
        onFinish={onFinish}
        requiredMark={false}
        >
            {
                showAlert &&
                <Form.Item>
                    <Alert message={t("login:invalidep")} type="error" />
                </Form.Item>
            }
            <Form.Item
                label={<span className={`${styles.formLabel} ` + (i18n.language =="en"? ` ${styles.right}` : ` ${styles.left}`)}>{t("login:email")}</span>}
                name="email"
                rules={[{ required: true, type:"email"}]}
                className={styles.mb1}>
                <Input
                 type={"email"}
                 onChange={onChange}
                //  onBlur={onBlur}
                 placeholder="you@example.com"
                 suffix={<ExclamationCircleOutlined className={error.email? styles.dFlex : styles.dNone} />}
                 />
            </Form.Item>
            <Form.Item
                label={passwordLabel}
                name="password"
                rules={[{ required: true}]}
                className={`${styles.passwordLabel} ${styles.mb1}`}
            >
                <Input
                    type="password"
                    onChange={onChange}
                    placeholder={t("login:enterpassword")||undefined}
                    suffix={ <ExclamationCircleOutlined className={error.password? styles.dFlex : styles.dNone} />}
                />
            </Form.Item>
            <Form.Item className={`${styles.remember} ${styles.mb1}`}>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>{t("login:remmberme")}</Checkbox>
                </Form.Item>
                <Form.Item noStyle>
                    <Link href="#" className={styles.primaryColor}>
                        {t("login:resetmulti")}
                    </Link>
                </Form.Item>
            </Form.Item>

            <Form.Item>
                <Button className={(error.email || error.password)? styles.noBorder : ""} disabled={(error.email || error.password)? true:false} block type="primary" htmlType="submit">
                    {t("login:signin")}
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm
