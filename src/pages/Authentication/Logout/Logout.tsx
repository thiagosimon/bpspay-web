import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import i18n from 'i18next'
import { Card, Col, Container, Row } from 'reactstrap'
import withRouter from '../../../components/Common/withRouter'
import { STORAGE_KEYS } from '../../../utils/Constant'
import { removeStoreItem } from '../../../utils/Storage'
import AuthSlider from '../Components/AuthCarousel'
import AuthFooter from '../Components/AuthFooter'

const Logout = () => {
    useEffect(() => {
        const onHandleLogout = async () => {
            await removeStoreItem(STORAGE_KEYS.TOKEN)
            await removeStoreItem(STORAGE_KEYS.USER)
            await removeStoreItem(STORAGE_KEYS.CORRELATION_ID)
        }
        onHandleLogout()
    }, [])

    document.title = `Log Out | ${i18n.t<string>('titles.brandName')}`
    return (
        <React.Fragment>
            <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay login-bg-overlay"></div>
                <div className="auth-page-content overflow-hidden pt-lg-5">
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <Card className="overflow-hidden card-bg-fill border-0 card-border-effect-none">
                                    <Row className="justify-content-center g-0">
                                        <AuthSlider />

                                        <Col lg={6}>
                                            <div className="p-lg-5 p-4 text-center mt-5 mb-5">
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hzomhqxz.json"
                                                    trigger="loop"
                                                    colors="primary:#644BC5,secondary:#4788ff"
                                                    style={{ width: '180px', height: '180px' }}
                                                ></lord-icon>

                                                <div className="mt-4 pt-2">
                                                    <h5>{i18n.t<string>('titles.youAreLoggedOut')}</h5>
                                                    <p className="text-muted">{i18n.t<string>('messages.thankYouForUsing')}</p>
                                                    <div className="mt-4">
                                                        <Link to="/login" className="btn btn-primary w-100">
                                                            {i18n.t<string>('buttons.enter')}
                                                        </Link>
                                                    </div>
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

Logout.propTypes = {
    history: PropTypes.object
}

export default withRouter(Logout)
