import { useEffect, useState } from 'react'
import { userTermServices } from '../services/Terms'
import { TERMS } from '../utils/Constant'

type Terms = {
    _id: string
    content: string
}

type UseTermsHook = {
    termsOfUse: string
    serviceAgreement: string
    loadingTerms: boolean
    getTerms: (navigation: any) => Promise<void>
}

const useTerms = (): UseTermsHook => {
    const [loadingTerms, setLoadingTerms] = useState<boolean>(false)
    const [termsOfUse, setTermsOfUse] = useState<string>('')
    const [serviceAgreement, setServiceAgreement] = useState<string>('')

    const getTerms = async (navigation: any): Promise<void> => {
        if (loadingTerms) {
            return
        }

        setLoadingTerms(true)

        try {
            const response = await userTermServices(navigation)
            const { results } = response.data

            if (response.status === 200 && results) {
                const terms: Terms[] = results

                const termsOfUse = terms.find(term => term._id === TERMS.TERMS_OF_USE)?.content || ''
                const serviceAgreement = terms.find(term => term._id === TERMS.SERVICE_AGREEMENT)?.content || ''

                setTermsOfUse(termsOfUse)
                setServiceAgreement(serviceAgreement)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoadingTerms(false)
        }
    }

    useEffect(() => {
        getTerms(this)
    }, [])

    return { termsOfUse, serviceAgreement, loadingTerms, getTerms }
}

export default useTerms
