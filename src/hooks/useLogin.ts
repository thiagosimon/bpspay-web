import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLoginService } from '../services/Login'
// import { changeLayoutMode } from '../store/actions'
import { COMPANY_STATUS, STORAGE_KEYS, USER_SERVICE_STATUS, USER_STATUS, USER_TYPE } from '../utils/Constant'
import { PAGE } from '../utils/Route'
import { setObjectInStore } from '../utils/Storage'

export const useLogin = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // const setDarkMode = () => {
    //     dispatch(changeLayoutMode('dark'))
    // }

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
            const result = response?.data?.result
            const role = result?.companyUser?.subtype
            const company = result?.company

            if ((result?.companyUser && role === USER_TYPE.ADMIN) || role === USER_TYPE.SUPER_ADMIN_MASTER) {
                const token = response.data.token
                const correlationId = response.headers['x-correlation-id']
                await setObjectInStore(STORAGE_KEYS.TOKEN, token)
                await setObjectInStore(STORAGE_KEYS.USER, result)
                await setObjectInStore(STORAGE_KEYS.CORRELATION_ID, correlationId)

                const status = result?.status
                const activeRegisterDate = result?.confirmActiveUserRegisterDate

                setLoading(false)

                if (status === USER_STATUS.ACTIVE && company) {
                    if (company?.status === COMPANY_STATUS.ACTIVE) {
                        navigate(PAGE.DASHBOARD)
                    } else {
                        navigate(PAGE.SERVICE_AGREEMENT_TERM)
                    }
                } else if (status === USER_STATUS.ACTIVE && !company) {
                    navigate(PAGE.REGISTER_COMPANY, { state: { user: result } })
                } else if (status === USER_STATUS.PENDING_CONFIRMATION && !activeRegisterDate) {
                    navigate(PAGE.CHECK_REGISTRATION_EMAIL, { state: { email: result?.email, resentEmail: true } })
                }
            }
        } catch (error) {
            setLoading(false)
            if (error?.response?.data?.messageId === USER_SERVICE_STATUS.INVALID_PASSWOD) {
                return
            }
        }
        setLoading(false)
    }
    return { submitLogin, loading }
}
