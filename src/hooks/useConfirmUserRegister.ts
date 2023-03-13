import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { activeRegisterUserService, sendEmailRegisterUserService } from '../services/User'
import { USER_SERVICE_STATUS } from '../utils/Constant'
import { PAGE } from '../utils/Route'

const useConfirmUserRegister = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false)

    const resendEmail = async (email: string, navigation: any) => {
        if (!email || email.length === 0 || loading) {
            return
        }

        setLoading(true)

        try {
            const response = await sendEmailRegisterUserService({ email }, navigation)

            if (response.status === 200) {
                return true
            }

            return false
        } catch (error) {
            console.error(error)
            return false
        } finally {
            setLoading(false)
        }
    }

    const activeRegister = async (token: string, email: string, navigation: any) => {
        if (!token || !email || loading) {
            return
        }

        setLoading(true)

        try {
            const response = await activeRegisterUserService({ token, email }, navigation)
            const result = response?.data?.result

            if (response.status === 200 && result) {
                navigate(PAGE.CONFIRM_REGISTRATION, { state: { user: result } })
            } else if (response.status === 500) {
                navigate(PAGE.EXPIRE_USER_REGISTER_LINK, { state: { email } })
            }
        } catch (error) {
            console.error('error', error)
            const messageId = error?.response?.data?.messageId
            if (messageId === USER_SERVICE_STATUS.INVALID_REGISTER_TOKEN) {
                navigate(PAGE.EXPIRE_USER_REGISTER_LINK, { state: { email } })
            }
        } finally {
            setLoading(false)
        }
    }

    return { loading, resendEmail, activeRegister }
}

export default useConfirmUserRegister
