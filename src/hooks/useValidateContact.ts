import { useState } from 'react'
import { emailAlreadyExistService } from '../services/Validation'

const useValidateContact = () => {
    const [loadingEmail, setLoadingEmail] = useState<boolean>(false)

    const emailAlreadyExist = async (email: string, navigation: any) => {
        if (loadingEmail || !email) {
            return false
        }

        setLoadingEmail(true)

        try {
            const response = await emailAlreadyExistService(email, navigation)
            const { result, messageId } = response.data

            if (response.status === 200 && messageId === 'response.email.already.exists' && result) {
                setLoadingEmail(false)
                return true
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingEmail(false)
        }

        return false
    }

    return { emailAlreadyExist, loadingEmail }
}

export default useValidateContact
