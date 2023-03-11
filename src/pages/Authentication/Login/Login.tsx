import React, { useState } from 'react'

import { Button, Card, Col, Container, FormFeedback, Input, Label, Row, Spinner } from 'reactstrap'

import i18n from '../../../i18n'
import AuthSlider from '../Components/AuthCarousel'

import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useLogin } from '../../../hooks/useLogin'
import { PAGE } from '../../../utils/Route'
import AuthFooter from '../Components/AuthFooter'

type LoginState = {
    Login: {
        user: any
        errorMsg: string
        loading: boolean
        error: boolean
    }
}

const Login = () => {
    const { submitLogin, loading } = useLogin()
    const navigate = useNavigate()
    const { user, errorMsg, error } = useSelector((state: LoginState) => ({
        user: state.Login.user,
        errorMsg: state.Login.errorMsg,
        error: state.Login.error
    }))

    const [userLogin, setUserLogin] = useState({
        email: '',
        password: ''
    })
    const [passwordShow, setPasswordShow] = useState(false)

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: userLogin.email || 'admin@bpspay.com.br' || '',
            password: userLogin.password || '12345678' || ''
        },
        validationSchema: Yup.object({
            email: Yup.string().required(i18n.t('validations.emailRequired')),
            password: Yup.string().required(i18n.t('validations.passwordRequired'))
        }),
        onSubmit: async values => {
            await submitLogin(
                {
                    email: values.email,
                    password: values.password
                },
                this
            )
        }
    })

    const onHandleRegisterNavigate = () => {
        navigate(PAGE.REGISTER_USER)
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
                                            <div className="p-lg-5 p-4 mb-4">
                                                <div>
                                                    <h5 className="text-primary">{i18n.t<string>('titles.welcome')}</h5>
                                                    <p className="text-muted">{i18n.t<string>('subtitles.loginPromptMessage')}</p>
                                                </div>

                                                <div className="mt-4">
                                                    <form>
                                                        <div className="mb-3">
                                                            <Label htmlFor="email" className="form-label">
                                                                {i18n.t<string>('labels.email')}
                                                            </Label>
                                                            <Input
                                                                name="email"
                                                                className="form-control"
                                                                placeholder={i18n.t<string>('placeholder.enterEmail')}
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
                                                            <div className="float-end">
                                                                <Link to="/reset-password" className="text-muted">
                                                                    {i18n.t<string>('labels.forgotPassword')}
                                                                </Link>
                                                            </div>
                                                            <Label className="form-label" htmlFor="password-input">
                                                                {i18n.t<string>('labels.password')}
                                                            </Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input
                                                                    name="password"
                                                                    className="form-control"
                                                                    placeholder={i18n.t<string>('placeholder.enterPassword')}
                                                                    type={passwordShow ? 'text' : 'password'}
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.password || ''}
                                                                    invalid={validation.touched.password && validation.errors.password ? true : false}
                                                                />
                                                                <button
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                    type="button"
                                                                    id="password-addon"
                                                                    onClick={() => setPasswordShow(!passwordShow)}
                                                                >
                                                                    {!validation.errors.password && <i className="ri-eye-fill align-middle" />}
                                                                </button>
                                                                {validation.touched.password && validation.errors.password ? (
                                                                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                                ) : null}
                                                            </div>
                                                        </div>

                                                        <div className="form-check">
                                                            <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                            <Label className="form-check-label" htmlFor="auth-remember-check">
                                                                {i18n.t<string>('labels.remindMe')}
                                                            </Label>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Button
                                                                color="primary"
                                                                disabled={error || loading}
                                                                className="btn btn-primary w-100"
                                                                type="submit"
                                                                onClick={() => validation.submitForm()}
                                                            >
                                                                {error ? null : loading ? (
                                                                    <Spinner size="sm" className="me-2">
                                                                        {loading && i18n.t<string>('buttons.loading')}...
                                                                    </Spinner>
                                                                ) : null}
                                                                {i18n.t<string>('buttons.signIn')}
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="pt-5 mb-0">
                                                        {i18n.t<string>('labels.dontHaveAccount')}{' '}
                                                        <a
                                                            onClick={() => onHandleRegisterNavigate()}
                                                            className="fw-semibold text-primary text-decoration-underline"
                                                        >
                                                            {' '}
                                                            {i18n.t<string>('hyperlink.signUp')}
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

export default Login
