import { createAuthClient } from "better-auth/react"

export const authClient =  createAuthClient({
    //you can pass client configuration here
})

export const signInGithub = async () => {
    await authClient.signIn.social({
        provider: "github",
    })
}

export const signInGoogle = async () => {
    await authClient.signIn.social({
        provider: "google",
    })
}

export const signOut = async () => {
    await authClient.signOut({})
}