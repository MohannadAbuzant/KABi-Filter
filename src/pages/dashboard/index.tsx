import BaseLayout from "@/components/BaseLayout";
import Dashboard from "@/components/dashboard/";
import Router from "next/router";
import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSession } from "next-auth/react";

export async function getServerSideProps({ locale }:{locale:string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'navbar',
        'dashboard',
        'card'
      ])),
    },
  }
}
const Panel = () => {
  const { status} = useSession()
  React.useEffect(()=>{
    if(status=="unauthenticated"){
      Router.push("/login")
    }
  })

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  return (
    <BaseLayout title="Dashboard" PageComponent={Dashboard} />
  )   
}
 
export default Panel;