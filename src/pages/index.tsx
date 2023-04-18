import React from 'react'
import Router from 'next/router'
import { useSession } from 'next-auth/react'

export default function Home() {
  
  const { status } = useSession()

  React.useEffect(()=>{
    if(status=="unauthenticated"){
      Router.push("/login")
    }else if(status =="authenticated"){
      Router.push("/dashboard")
  }})
  
  if(status=="authenticated"){
    return <p>redirect to panel...</p>
  }else if(status=="unauthenticated"){
    return <p>redirect to login page..</p>
  }else{
    return <p>Loading page ....</p>
  }
}
