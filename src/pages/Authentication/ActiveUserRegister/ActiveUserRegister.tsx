import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import i18n from 'i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, Spinner } from 'reactstrap'
import withRouter from '../../../components/Common/withRouter'
import useConfirmUserRegister from '../../../hooks/useConfirmUserRegister'
import { PAGE } from '../../../utils/Route'
import AuthFooter from '../Components/AuthFooter'

const ActiveUserRegister = () => {
    const { activeRegister, loading } = useConfirmUserRegister()
    const navigate = useNavigate()

    const { params } = useParams()

    const searchParams = new URLSearchParams(params)
    const active = searchParams.get('active')
    const email = searchParams.get('email')

    useEffect(() => {
        const activeRegisterAsync = async () => {
            if (email && active) {
                await activeRegister(active, email, this)
            } else {
                navigate(PAGE.EXPIRE_USER_REGISTER_LINK)
            }
        }
        activeRegisterAsync()
    }, [email, active])

    document.title = `Active User | ${i18n.t<string>('titles.brandName')}`
    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay login-bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container className="text-center">
                        {!loading && <Spinner className="text-white" color="primary" animation="border" role="status" />}
                    </Container>
                </div>
                <AuthFooter />
            </div>
        </React.Fragment>
    )
}

ActiveUserRegister.propTypes = {
    history: PropTypes.object
}

export default withRouter(ActiveUserRegister)
