import i18n from 'i18next'
import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'

const error500 = require('../../../assets/images/error500.png')

const Error500 = () => {
    document.title = `500 Error | ${i18n.t<string>('titles.brandName')}`
    return (
        <React.Fragment>
            <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="auth-page-content overflow-hidden p-0">
                    <Container fluid={true}>
                        <Row className="justify-content-center">
                            <Col xl={4} className="text-center">
                                <div className="error-500 position-relative">
                                    <img src={error500} alt="" className="img-fluid error-500-img error-img" />
                                    <h1 className="title text-muted">{i18n.t<string>('titles.error500')}</h1>
                                </div>
                                <div>
                                    <h4>{i18n.t<string>('titles.serverError')}</h4>
                                    <p className="text-muted w-75 mx-auto">{i18n.t<string>('descriptions.serverError')}</p>
                                    <Link to="/dashboard" className="btn btn-success">
                                        <i className="mdi mdi-home me-1"></i>
                                        {i18n.t<string>('buttons.backToHome')}
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Error500
