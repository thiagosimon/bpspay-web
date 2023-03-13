import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Card, Col, Container, Row } from 'reactstrap'
import i18n from '../../../i18n'
import AuthSlider from '../Components/AuthCarousel'

import useConfirmUserRegister from '../../../hooks/useConfirmUserRegister'
import { PAGE } from '../../../utils/Route'
import AuthFooter from '../Components/AuthFooter'

const CheckRegistrationEmail = () => {
    const { resendEmail } = useConfirmUserRegister()
    const navigate = useNavigate()
    const location = useLocation()

    const [resentEmail, setResentEmail] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [timeLeft, setTimeLeft] = useState<number>(60)

    const onHandleResendEmail = async () => {
        if (!email || timeLeft > 0) return

        await resendEmail(email, this)
        setResentEmail(true)
        setTimeLeft(60)
    }

    useEffect(() => {
        const checkParamsNavigation = async () => {
            if (location?.state?.email) {
                setEmail(location.state.email)
                if (location?.state?.resentEmail) {
                    await resendEmail(location.state.email, this)
                    setResentEmail(true)
                    setTimeLeft(60)
                }
            } else {
                navigate(PAGE.LOGIN)
            }
        }

        checkParamsNavigation()
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)
        return () => clearTimeout(timer)
    }, [timeLeft])

    return (
        <React.Fragment>
            <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay login-bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden card-bg-fill border-0 card-border-effect-none">
                                    <Row className="g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4 mb-5">
                                                <h5 className="text-primary">{i18n.t<string>('titles.registrationDone')}</h5>
                                                <p className="text-muted"> {i18n.t<string>('subtitles.registrationDone')} </p>

                                                <div className="mt-5 text-center">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/rhvddzym.json"
                                                        trigger="loop"
                                                        colors="primary:#8c68cd"
                                                        className="avatar-xl"
                                                        style={{ width: '120px', height: '120px' }}
                                                    ></lord-icon>
                                                </div>

                                                {resentEmail ? (
                                                    <div className="alert alert-borderless alert-success text-center mb-2 mx-2" role="alert">
                                                        {i18n.t<string>('descriptions.checkEmailRegistrationResent')}
                                                    </div>
                                                ) : (
                                                    <div className="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                                                        {i18n.t<string>('descriptions.checkEmailRegistration')}
                                                    </div>
                                                )}

                                                <div className="mt-4 mb-5 text-center">
                                                    <p onClick={() => onHandleResendEmail()} className="mb-0">
                                                        {i18n.t<string>('descriptions.checkEmailRegistrationProblem')}
                                                        <Link to={'#'} className="fw-bold text-primary text-decoration-underline">
                                                            {' '}
                                                            {i18n.t<string>('hyperlink.clickHere')}
                                                        </Link>
                                                    </p>
                                                    {timeLeft > 0 && resentEmail && (
                                                        <p className="mt-2 mb-2 text-muted">
                                                            {i18n.t<string>('descriptions.checkEmailRegistrationResendCountdown') +
                                                                ' ' +
                                                                timeLeft +
                                                                ' ' +
                                                                i18n.t<string>('labels.seconds')}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <AuthFooter />
            </div>
        </React.Fragment>
    )
}

export default CheckRegistrationEmail
