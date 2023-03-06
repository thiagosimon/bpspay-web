import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Container, Row } from 'reactstrap'
import i18n from '../../../i18n'
import AuthSlider from '../Components/AuthCarousel'

import AuthFooter from '../Components/AuthFooter'

const CheckRegistrationEmail = () => {
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

                                                <div className="alert alert-borderless alert-warning text-center mb-2 mx-2" role="alert">
                                                    {i18n.t<string>('descriptions.checkEmailRegistration')}
                                                </div>

                                                <div className="mt-3 mb-5 text-center">
                                                    <p className="mb-0">
                                                        {/* Caso não tenha recebido o email */}
                                                        {i18n.t<string>('descriptions.checkEmailRegistrationProblem')}
                                                        <Link to="/login" className="fw-bold text-primary text-decoration-underline">
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

export default CheckRegistrationEmail
