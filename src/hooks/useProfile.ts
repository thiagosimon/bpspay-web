import { useEffect, useState } from 'react'
import { getItemFromStorage } from '../utils/Storage'

const getLoggedinUser = () => {
    const user = getItemFromStorage('user')
    if (!user) {
        return null
    } else {
        return JSON.parse(JSON.stringify(user))
    }
}

const getLoggedToken = () => {
    const token = getItemFromStorage('token')
    if (!token) {
        return null
    } else {
        return JSON.parse(JSON.stringify(token))
    }
}

const useProfile = () => {
    const userProfileSession = getLoggedinUser()
    const token = getLoggedToken()

    const [loading, setLoading] = useState(userProfileSession ? false : true)
    const [userProfile, setUserProfile] = useState(userProfileSession ? userProfileSession : null)

    useEffect(() => {
        const userProfileSession = getLoggedinUser()
        const token = getLoggedToken()
        setUserProfile(userProfileSession ? userProfileSession : null)
        setLoading(token ? false : true)
    }, [])

    return { userProfile, loading, token }
}

export { useProfile }
