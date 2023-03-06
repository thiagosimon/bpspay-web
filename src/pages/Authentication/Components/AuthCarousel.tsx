import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Col } from 'reactstrap'

const logoLight = require('../../../assets/images/logo-light.png')

const AuthSlider = () => {
    return (
        <React.Fragment>
            <Col lg={6}>
                <div className="p-lg-5 p-4 auth-one-bg h-100">
                    <div className="bg-overlay carousel-bg-overlay"></div>
                    <div className="position-relative h-100 d-flex flex-column">
                        <div className="mb-4">
                            <img src={logoLight} alt="logo" height="36" />
                        </div>
                        <div className="mt-auto">
                            <div className="mb-3">
                                <i className="ri-double-quotes-l display-4 text-success"></i>
                            </div>

                            <Carousel
                                showThumbs={false}
                                autoPlay={true}
                                showArrows={false}
                                showStatus={false}
                                infiniteLoop={true}
                                className="carousel slide"
                            >
                                <div className="carousel-inner text-center text-white pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">
                                            "Incrível, estamos adorando a BPS PAY, os recursos nos fizeram economizar muito tempo nas tarefas!”
                                        </p>
                                    </div>
                                </div>
                                <div className="carousel-inner text-center text-white pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">
                                            "Incrível, estamos adorando a BPS PAY, os recursos nos fizeram economizar muito tempo nas tarefas!”
                                        </p>
                                    </div>
                                </div>
                                <div className="carousel-inner text-center text-white pb-5">
                                    <div className="item">
                                        <p className="fs-15 fst-italic">
                                            "Incrível, estamos adorando a BPS PAY, os recursos nos fizeram economizar muito tempo nas tarefas!”
                                        </p>
                                    </div>
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </Col>
        </React.Fragment>
    )
}

export default AuthSlider
