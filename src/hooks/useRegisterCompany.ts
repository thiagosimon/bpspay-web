import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerCompanyService } from '../services/Company'
import { COMPANY_SERVICE_STATUS } from '../utils/Constant'
import { PAGE } from '../utils/Route'

const useRegisterCompany = () => {
    const navigate = useNavigate()
    const serviceAgreementTermRoute = PAGE.SERVICE_AGREEMENT_TERM

    const [loading, setLoading] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const submitRegister = async (data: any, navigation: any) => {
        if (loading) {
            return
        }

        setLoading(true)

        try {
            const response = await registerCompanyService(data, navigation)
            const result = response?.data?.result
            if (response.status === 200 && result) {
                navigate(serviceAgreementTermRoute)
            } else {
                setErrorMessage(COMPANY_SERVICE_STATUS.REGISTER_ERROR)
            }
        } catch (error) {
            const result = error?.response?.data
            if (result?.messageId === COMPANY_SERVICE_STATUS.ALREADY_EXISTS) {
                setErrorMessage(COMPANY_SERVICE_STATUS.ALREADY_EXISTS)
            } else {
                setErrorMessage(COMPANY_SERVICE_STATUS.REGISTER_ERROR)
            }
        } finally {
            setLoading(false)
        }
    }

    return { submitRegister, loading, errorMessage }
}

export default useRegisterCompany
