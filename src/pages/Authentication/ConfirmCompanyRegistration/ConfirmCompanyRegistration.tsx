import React from 'react'
import { Button, Card, Col, Container, Row } from 'reactstrap'
import i18n from '../../../i18n'
import AuthSlider from '../Components/AuthCarousel'

import { useNavigate } from 'react-router-dom'
import { PAGE } from '../../../utils/Route'
import AuthFooter from '../Components/AuthFooter'

const ConfirmCompanyRegistration = () => {
    const navigate = useNavigate()

    const onHandleNavigate = () => {
        navigate(PAGE.DASHBOARD)
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

                                                <div className="mt-5 mb-2">
                                                    <h4 className="text-primary mb-4">{i18n.t<string>('titles.goodWork')}</h4>
                                                    <p className="text-muted"> {i18n.t<string>('descriptions.confirmCompanyRegistration')} </p>
                                                </div>

                                                <div className="mt-4 mb-5">
                                                    <Button
                                                        color="primary"
                                                        className="btn btn-primary w-100"
                                                        type="submit"
                                                        onClick={() => onHandleNavigate()}
                                                    >
                                                        {i18n.t<string>('buttons.goToLogin')}
                                                    </Button>
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

export default ConfirmCompanyRegistration
