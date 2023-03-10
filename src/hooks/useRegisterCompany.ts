import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerCompanyService } from '../services/Company'

const useRegisterCompany = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false)

    const submitRegister = async (data: any, navigation: any) => {
        if (loading) {
            return
        }

        setLoading(true)

        try {
            const response = await registerCompanyService(data, navigation)
            const { result } = response.data

            if (response.status === 200 && result) {
                navigate('/register-company-confirm')
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, submitRegister }
}

export default useRegisterCompany
