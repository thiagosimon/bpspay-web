import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { acceptServiceTerms } from '../services/Company'
import { refreshTokenService } from '../services/Login'
import { STORAGE_KEYS } from '../utils/Constant'
import { PAGE } from '../utils/Route'
import { setObjectInStore } from '../utils/Storage'

const useCompanyTerms = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false)

    const accepServiceTerms = async (navigation: any) => {
        if (loading) {
            return
        }

        setLoading(true)

        try {
            const responseToken = await refreshTokenService(navigation)
            const token = responseToken?.data?.token
            const user = responseToken?.data?.result
            const correlationId = responseToken.headers['x-correlation-id']

            if (responseToken.status === 200 && token && user) {
                Promise.all([
                    setObjectInStore(STORAGE_KEYS.TOKEN, token),
                    setObjectInStore(STORAGE_KEYS.USER, user),
                    setObjectInStore(STORAGE_KEYS.CORRELATION_ID, correlationId)
                ])

                const response = await acceptServiceTerms(navigation)
                const result = response?.data?.result
                if (response.status === 200 && result) {
                    navigate(PAGE.CONFIRM_COMPANY_REGISTRATION, { state: { user: user } })
                } else {
                    navigate(PAGE.LOGIN)
                }
            } else {
                navigate(PAGE.LOGIN)
            }
        } catch (error) {
            navigate(PAGE.LOGIN)
        } finally {
            setLoading(false)
        }
    }

    return { accepServiceTerms, loading }
}

export default useCompanyTerms
