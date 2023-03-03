import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { FOOTER_DESCRIPTION } from '../../constants'

const AuthFooter = () => {
    return (
        <React.Fragment>
            <footer className="footer">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="text-center">
                                <p className="mb-0">
                                    &copy; {new Date().getFullYear()} {FOOTER_DESCRIPTION.BRAND_NAME}.{FOOTER_DESCRIPTION.DEVELOPMENT_BY}{' '}
                                    <i className="mdi mdi-heart text-danger"></i> {FOOTER_DESCRIPTION.COMPANY_NAME}
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </React.Fragment>
    )
}

export default AuthFooter
