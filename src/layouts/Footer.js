import React from 'react'
import { Col, Container } from 'reactstrap'
import { FOOTER_DESCRIPTION } from '../constants'

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer border-top">
                <Container fluid>
                    <Col sm={6}>
                        {new Date().getFullYear()}© {FOOTER_DESCRIPTION.BRAND_NAME}
                    </Col>
                    <Col sm={6}>
                        <div className="text-sm-end d-none d-sm-block">
                            {FOOTER_DESCRIPTION.DEVELOPMENT_BY} {FOOTER_DESCRIPTION.COMPANY_NAME}
                        </div>
                    </Col>
                </Container>
            </footer>
        </React.Fragment>
    )
}

export default Footer
