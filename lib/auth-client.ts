import { createAuthClient } from "better-auth/react"

export const authClient =  createAuthClient({
    //you can pass client configuration here
})

export const signIn = async () => {
    await authClient.signIn.social({
        provider: "github",
        errorCallbackURL: '/sign-in?error=true'
    })
}

export const signOut = async () => {
    await authClient.signOut({})
}