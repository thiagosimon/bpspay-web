import React, { useState } from 'react'

import AuthFooter from '../Components/AuthFooter'

import i18n from '../../../i18n'

import GenericModal from '../../../components/Common/GenericModal/GenericModal'
import useCompanyTerms from '../../../hooks/useCompanyTerms'
import useTerms from '../../../hooks/useTerms'

const ServiceAgreementTerm = () => {
    const { serviceAgreement } = useTerms()
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false)

    const { accepServiceTerms } = useCompanyTerms()

    const onHandleSubmitTerms = async (value: boolean) => {
        setAcceptTerms(value)
        await accepServiceTerms(this)
    }

    return (
        <React.Fragment>
            <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay login-bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <GenericModal
                        show={true}
                        headerCloseIcon={false}
                        title={i18n.t('titles.serviceAgreementTerms')}
                        description={serviceAgreement}
                        acceptTerms={acceptTerms}
                        acceptTitle={i18n.t('labels.acceptServiceAgreementRequire')}
                        onAcceptClick={() => onHandleSubmitTerms(!acceptTerms)}
                    />

                    <AuthFooter />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ServiceAgreementTerm
