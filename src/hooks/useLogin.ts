import { useState } from 'react'
import { userLoginService } from '../services/Login'
import { STORAGE_KEYS } from '../utils/Constant'
import { setItemInStorage, setObjectInStore } from '../utils/Storage'

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const submitLogin = async (state: any, navigation: any) => {
        const { email, password } = state
        if ((!email || !password) && loading) {
            return
        }

        const body = {
            email: email,
            password: password
        }

        setLoading(true)

        try {
            const response = await userLoginService(body, navigation)
            const result = response.data.result
            const role = result?.companyUser?.subtype
            if ((result?.companyUser && role === 'ADMIN') || role === 'ADMIN_MASTER') {
                const token = response.data.token
                const correlationId = response.headers['x-correlation-id']
                await setItemInStorage(STORAGE_KEYS.TOKEN, token)
                await setObjectInStore(STORAGE_KEYS.USER, result)
                await setObjectInStore(STORAGE_KEYS.CORRELATION_ID, correlationId)

                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log('error', error)

            if (error?.response?.data?.messageId === 'response.user.password.incorrect') {
                return
            }
        }
        setLoading(false)
    }
    return { submitLogin, loading }
}
