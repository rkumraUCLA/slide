import { useState } from 'react'
import { useAuthContext } from "./useAuthContext"

 export const useSignup = () => {
    const [error, setError ] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const signup = async (email, password, userName, fullName, age, sports) => {
        setIsLoading(true)
        setError(null)
        console.log(JSON.stringify({email, password, userName, fullName, age, sports}))
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password, userName, fullName, age, sports})
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // savc user to local storage
            localStorage.setItem('user', JSON.stringify(json))
            
            // update the auth context
            dispatchEvent({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}
 }