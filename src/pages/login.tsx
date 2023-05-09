import React from 'react';
import BaseLayout from '@/components/BaseLayout';
import LoginPage from '@/components/LoginPage';
import  Router  from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useSession } from 'next-auth/react';

export async function getStaticProps({ locale }:{locale:string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'login',
        'navbar',
      ])),
    },
  }
}
const Login = () => {
  const { status } = useSession()

  React.useEffect(()=>{
    if(status=="authenticated"){
      Router.push("/dashboard")
    }
  })

  if (status === "loading") {
    return <p>Loading....</p>
  }
  if (status === "authenticated") {
    return <p>redirect to panel...</p>
  }
  return ( 
      <BaseLayout title='Login' PageComponent={LoginPage} />
  )
}
 
export default Login;