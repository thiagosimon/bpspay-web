import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { Card, CardBody, Col, Container, Row } from 'reactstrap'
import i18n from '../../../i18n'
import { PAGE } from '../../../utils/Route'
import { getItemFromStorage } from '../../../utils/Storage'

const oopsImage = require('../../../assets/images/404.png')

interface LinkState {
    email: string | undefined
}

interface ResendTokenLinkProps extends LinkProps {
    pathname: string
    state: LinkState
}

interface User {
    email: string
}

const ExpireUserRegisterLink = () => {
    const user = getItemFromStorage('user')
    document.title = `Expired Token | ${i18n.t<string>('titles.brandName')}`

    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay login-bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col xl={5}>
                                <Card className="overflow-hidden card-bg-fill">
                                    <CardBody className="p-4">
                                        <div className="text-center">
                                            <div className="w-50 pt-3 mx-auto">
                                                <img src={oopsImage} className="img-fluid" alt="crazy-user" />
                                            </div>

                                            <h1 className="text-primary mb-4">{i18n.t<string>('titles.oops')}</h1>
                                            <h4 className="text-uppercase">{i18n.t<string>('titles.expiredRegisterUrl')}</h4>
                                            <p className="text-muted mb-4">{i18n.t<string>('descriptions.unableConfirmRegistration')}</p>

                                            <Link
                                                to={
                                                    {
                                                        pathname: PAGE.LOGIN
                                                    } as ResendTokenLinkProps
                                                }
                                                className="btn btn-success"
                                            >
                                                <i className="mdi mdi-email me-1"></i>
                                                {i18n.t<string>('buttons.goToLogin')}
                                            </Link>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ExpireUserRegisterLink
