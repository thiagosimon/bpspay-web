import React, { useState } from 'react'
import { Button, Card, Col, Container, FormFeedback, Input, Label, Row, Spinner } from 'reactstrap'
import i18n from '../../../i18n'
import AuthSlider from '../Components/AuthCarousel'

import { useFormik } from 'formik'
// import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import AuthFooter from '../Components/AuthFooter'

type ResetPasswordState = {
    Login: {
        user: any
        errorMsg: string
        loading: boolean
        error: boolean
    }
}

const ResetPassword = () => {
    const [passwordShow, setPasswordShow] = useState(false)
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // const dispatch = useDispatch()
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            password: Yup.string().required(i18n.t('validations.passwordRequired')),
            confirmPassword: Yup.string().required(i18n.t('validations.confirmPasswordRequired'))
        }),
        onSubmit: values => {
            // dispatch(resetPassword(values, '/dashboard'))
        }
    })

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
                                                <h5 className="text-primary">{i18n.t<string>('titles.resetPassword')}</h5>
                                                <p className="text-muted"> {i18n.t<string>('subtitles.resetPassword')} </p>

                                                <div className="mt-4">
                                                    <form action="/">
                                                        <div className="mb-3">
                                                            <Label className="form-label" htmlFor="password-input">
                                                                {i18n.t<string>('labels.password')}
                                                            </Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input
                                                                    name="password"
                                                                    className="form-control"
                                                                    placeholder={i18n.t<string>('placeholder.enterPassword')}
                                                                    type="password"
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

                                                        <div className="mb-3">
                                                            <Label className="form-label" htmlFor="password-input">
                                                                {i18n.t<string>('labels.confirmPassword')}
                                                            </Label>
                                                            <div className="position-relative auth-pass-inputgroup mb-3">
                                                                <Input
                                                                    name="confirmPassword"
                                                                    className="form-control"
                                                                    placeholder={i18n.t<string>('placeholder.confirmPassword')}
                                                                    type="password"
                                                                    onChange={validation.handleChange}
                                                                    onBlur={validation.handleBlur}
                                                                    value={validation.values.confirmPassword || ''}
                                                                    invalid={
                                                                        validation.touched.confirmPassword && validation.errors.confirmPassword
                                                                            ? true
                                                                            : false
                                                                    }
                                                                />
                                                                <button
                                                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                                                    type="button"
                                                                    id="password-addon"
                                                                    onClick={() => setPasswordShow(!passwordShow)}
                                                                >
                                                                    {!validation.errors.confirmPassword && <i className="ri-eye-fill align-middle" />}
                                                                </button>
                                                                {validation.touched.confirmPassword && validation.errors.confirmPassword ? (
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
                                                            >
                                                                {error ? null : loading ? (
                                                                    <Spinner size="sm" className="me-2">
                                                                        {' '}
                                                                        {i18n.t<string>('buttons.loading')}...{' '}
                                                                    </Spinner>
                                                                ) : null}
                                                                {i18n.t<string>('buttons.sendUpdate')}
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </div>

                                                <div className="mt-5 text-center">
                                                    <p className="pt-5 mb-0">
                                                        {i18n.t<string>('labels.IRememberMyPassword')}{' '}
                                                        <a href="/login" className="fw-semibold text-primary text-decoration-underline">
                                                            {' '}
                                                            {i18n.t<string>('hyperlink.clickHere')}
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

export default ResetPassword
