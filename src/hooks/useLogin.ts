import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLoginService } from '../services/Login'
import { changeLayoutMode } from '../store/actions'
import { STORAGE_KEYS } from '../utils/Constant'
import { setObjectInStore } from '../utils/Storage'

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const setDarkMode = () => {
        dispatch(changeLayoutMode('dark'))
    }

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
            if ((result?.companyUser && role === 'ADMIN') || role === 'SUPER_ADMIN_MASTER') {
                const token = response.data.token
                const correlationId = response.headers['x-correlation-id']
                await setObjectInStore(STORAGE_KEYS.TOKEN, token)
                await setObjectInStore(STORAGE_KEYS.USER, result)
                await setObjectInStore(STORAGE_KEYS.CORRELATION_ID, correlationId)

                setLoading(false)

                navigate('/dashboard')
                // setDarkMode()
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
