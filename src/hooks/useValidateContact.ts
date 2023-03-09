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
            const { result } = response.data
            const { status, messageId } = result

            if (status === 200) {
                if (messageId === 'response.email.not.exist' && !result?.alreadyExist) {
                    return false
                } else if (messageId === 'response.email.already.exists' && result?.alreadyExist) {
                    return true
                }
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingEmail(false)
        }

        return null
    }

    return { emailAlreadyExist, loadingEmail }
}

export default useValidateContact
