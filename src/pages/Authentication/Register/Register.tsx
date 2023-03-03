import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Form, FormFeedback, Alert, Spinner } from 'reactstrap'

import AuthFooter from '../authFooter'
import AuthSlider from '../authCarousel'

import i18n from '../../../i18n'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, apiError, resetRegisterFlag } from '../../../store/actions'

type Registertate = {
    Account: {
        registrationError: any
        loading: boolean
        success: any
        error: any
    }
}

const Register = () => {
    const history = useNavigate()
    const dispatch = useDispatch()

    const { registrationError, loading, success, error } = useSelector((state: Registertate) => ({
        registrationError: state.Account.registrationError,
        loading: state.Account.loading,
        success: state.Account.success,
        error: state.Account.error
    }))

    const [passwordShow, setPasswordShow] = useState(false)

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
            name: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Please Enter Your Email'),
            first_name: Yup.string().required('Please Enter Your Username'),
            password: Yup.string().required('Please Enter Your Password'),
            confirm_password: Yup.string().when('password', {
                is: (val: string) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf([Yup.ref('password')], "Confirm Password Isn't Match")
            })
        }),
        onSubmit: values => {
            dispatch(registerUser(values))
        }
    })

    useEffect(() => {
        dispatch(apiError(''))
    }, [dispatch])

    useEffect(() => {
        if (success) {
            setTimeout(() => history('/login'), 3000)
        }

        setTimeout(() => {
            dispatch(resetRegisterFlag())
        }, 3000)
    }, [dispatch, success, error, history])

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
                                            <div className="p-lg-5 p-4 mb-4">
                                                <div>
                                                    <h5 className="text-primary">{i18n.t<string>('titles.registerAccount')}</h5>
                                                    <p className="text-muted">{i18n.t<string>('subtitles.registerPromptMessage')}</p>
                                                </div>

                                                <div className="mt-4">
                                                    <form action="/">
                                                        <div className="mb-3">
                                                            <Label htmlFor="email" className="form-label">
                                                                {i18n.t<string>('labels.email')} <span className="text-danger">*</span>
                                                            </Label>
                                                            <Input
                                                                name="email"
                                                                className="form-control"
                                                                placeholder="Enter email"
                                                                type="email"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.email || ''}
                                                                invalid={validation.touched.email && validation.errors.email ? true : false}
                                                            />
                                                            {validation.touched.email && validation.errors.email ? (
                                                                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                            ) : null}
                                                        </div>

                                                        <div className="mb-3">
                                                            <Label htmlFor="name" className="form-label">
                                                                {i18n.t<string>('labels.name')} <span className="text-danger">*</span>
                                                            </Label>
                                                            <Input
                                                                name="name"
                                                                type="text"
                                                                placeholder={i18n.t<string>('placeholder.enterName')}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.name || ''}
                                                                invalid={validation.touched.name && validation.errors.name ? true : false}
                                                            />
                                                            {validation.touched.name && validation.errors.name ? (
                                                                <FormFeedback type="invalid">
                                                                    <div>{validation.errors.name}</div>
                                                                </FormFeedback>
                                                            ) : null}
                                                        </div>

                                                        <div className="mb-3">
                                                            <Label className="form-label" htmlFor="password-input">
                                                                {i18n.t<string>('labels.password')} <span className="text-danger">*</span>
                                                            </Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input
                                                                    name="password"
                                                                    value={validation.values.password || ''}
                                                                    type={passwordShow ? 'text' : 'password'}
                                                                    className="form-control pe-5 password-input"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    invalid={validation.touched.password && validation.errors.password ? true : false}
                                                                    placeholder={i18n.t<string>('placeholder.enterPassword')}
                                                                    id="password-input"
                                                                />
                                                                <button
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                    type="button"
                                                                    id="password-addon"
                                                                    onClick={() => setPasswordShow(!passwordShow)}
                                                                >
                                                                    <i className="ri-eye-fill align-middle"></i>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="mb-4">
                                                            <p className="mb-0 fs-12 text-muted fst-italic">
                                                                {i18n.t<string>('labels.readAndAcceptTermsRequired')}
                                                                <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">
                                                                    {i18n.t<string>('hyperlink.termsOfUse')}
                                                                </Link>
                                                            </p>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Button
                                                                color="primary"
                                                                disabled={error || loading}
                                                                className="btn btn-primary w-100"
                                                                type="submit"
                                                            >
                                                                {error ? null : loading ? (
                                                                    <Spinner size="sm" className="me-2">
                                                                        {' '}
                                                                        {i18n.t<string>('buttons.loading')}...{' '}
                                                                    </Spinner>
                                                                ) : null}
                                                                {i18n.t<string>('buttons.register')}
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="pt-5 text-center">
                                                    <p className="mb-0">
                                                        <a>{i18n.t<string>('labels.hasAccount')} </a>
                                                        <a href="/login" className="fw-semibold text-primary text-decoration-underline">
                                                            {' '}
                                                            {i18n.t<string>('hyperlink.login')}
                                                        </a>{' '}
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

export default Register
