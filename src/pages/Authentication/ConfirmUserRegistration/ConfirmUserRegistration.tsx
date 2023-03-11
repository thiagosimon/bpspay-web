import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Row } from 'reactstrap'
import i18n from '../../../i18n'
import AuthSlider from '../Components/AuthCarousel'

import { PAGE } from '../../../utils/Route'
import AuthFooter from '../Components/AuthFooter'

const ConfirmUserRegistration = () => {
    const navigate = useNavigate()

    const onHandleNavigateToLogin = () => {
        navigate(PAGE.LOGIN)
    }

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
                                            <div className="p-lg-5 p-4 mb-5 text-center">
                                                <div className="mt-5">
                                                    <div className="avatar-lg mx-auto mt-2">
                                                        <div className="avatar-title bg-light text-primary display-3 rounded-circle">
                                                            <i className="ri-checkbox-circle-fill"></i>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-5">
                                                    <h4 className="text-primary">{i18n.t<string>('titles.goodWork')}</h4>
                                                    <p className="text-muted"> {i18n.t<string>('subtitles.confirmationRegisterUser')} </p>
                                                </div>

                                                <div className="mt-4">
                                                    <Button
                                                        color="primary"
                                                        className="btn btn-primary w-100"
                                                        type="submit"
                                                        onClick={() => {
                                                            onHandleNavigateToLogin()
                                                        }}
                                                    >
                                                        {i18n.t<string>('buttons.goToLogin')}
                                                    </Button>
                                                </div>

                                                <div className="mt-3 mb-5 text-center p-4">
                                                    <p className="mb-0 text-muted">
                                                        {i18n.t<string>('descriptions.redirectToLoginInSeconds')}
                                                        <Link to={PAGE.LOGIN} className="text-primary text-decoration-underline">
                                                            {' '}
                                                            {i18n.t<string>('hyperlink.clickHere')}{' '}
                                                        </Link>{' '}
                                                    </p>
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

export default ConfirmUserRegistration
