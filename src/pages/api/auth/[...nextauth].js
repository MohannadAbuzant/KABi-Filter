import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import Data from "@/userData"

export const authOptions = {

    pages: {
        signIn: '/login',
      },
    providers: [
        CredentialsProvider({
          
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          credentials: {
            username: { label: "Username", type: "email", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            // const response = await fetch('/userData.json');
            const users = Data
            const getUser = users.find(user=> user.email == credentials?.username && user.password == credentials?.password)
            if (getUser) {
              const user = {name:getUser.firstName+" "+getUser.lastName}
              return user
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
            }
          }
        })
      ],
      secret: process.env.NEXTAUTH_SECRET,
}
export default NextAuth(authOptions)