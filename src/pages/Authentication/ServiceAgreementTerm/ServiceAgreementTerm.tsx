import React, { useState } from 'react'

import AuthFooter from '../Components/AuthFooter'

import i18n from '../../../i18n'

import { useNavigate } from 'react-router-dom'
import GenericModal from '../../../components/Common/GenericModal/GenericModal'
import useTerms from '../../../hooks/useTerms'
import { PAGE } from '../../../utils/Route'
const ServiceAgreementTerm = () => {
    const { serviceAgreement } = useTerms()
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState<boolean>(true)
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false)

    const onHandleSubmitTerms = (value: boolean) => {
        setAcceptTerms(value)
        navigate(PAGE.CONFIRM_COMPANY_REGISTRATION)
    }

    return (
        <React.Fragment>
            <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay login-bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <GenericModal
                        show={showModal}
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
