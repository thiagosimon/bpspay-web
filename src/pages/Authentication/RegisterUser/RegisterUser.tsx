import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { Button, Card, Col, Container, FormFeedback, Input, Label, Row, Spinner } from 'reactstrap'

import AuthSlider from '../Components/AuthCarousel'
import AuthFooter from '../Components/AuthFooter'

import i18n from '../../../i18n'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import GenericModal from '../../../components/Common/GenericModal/GenericModal'
import useRegisterUser from '../../../hooks/useRegisterUser'
import useTerms from '../../../hooks/useTerms'
import useValidateContact from '../../../hooks/useValidateContact'
import { USER_TYPE } from '../../../utils/Constant'
import { splitFullName } from '../../../utils/Helper'
6
const RegisterUser = () => {
    const { submitRegister, loading } = useRegisterUser()
    const { termsOfUse } = useTerms()
    const { emailAlreadyExist } = useValidateContact()

    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [acceptTerms, setAcceptTerms] = useState<boolean>(true)

    const validation = useFormik({
        enableReinitialize: false,
        initialValues: {
            email: 'test4@gmail.com',
            name: 'test test',
            password: '12345678'
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required(i18n.t('validations.emailRequired'))
                .email(i18n.t('validations.emailInvalid'))
                .min(5, i18n.t('validations.emailLength'))
                .max(100, i18n.t('validations.emailLength')),
            name: Yup.string()
                .required(i18n.t('validations.nameRequired'))
                .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, i18n.t('validations.registerFullName')),
            password: Yup.string().required(i18n.t('validations.passwordRequired')).min(8, i18n.t('validations.passwordLength'))
        }),
        onSubmit: async values => {
            const emailExists = await emailAlreadyExist(String(values.email), this)

            if (emailExists) {
                validation.setFieldError('email', i18n.t('validations.emailAlreadyExist'))
                return
            }

            const fullName = await splitFullName(values.name)

            const body = {
                email: values.email,
                firstName: fullName.firstName,
                lastName: fullName.lastName,
                fullName: values.name,
                password: values.password,
                companyUser: {
                    subtype: USER_TYPE.ADMIN
                }
            }

            await submitRegister(body, this)
        }
    })

    const onHandleSubmitTerms = (value: boolean) => {
        setAcceptTerms(value)
        setShowModal(false)
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
                                                    <h5 className="text-primary">{i18n.t<string>('titles.registerAccount')}</h5>
                                                    <p className="text-muted">{i18n.t<string>('subtitles.registerPromptMessage')}</p>
                                                </div>

                                                <div className="mt-4">
                                                    <form onSubmit={validation.handleSubmit}>
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

                                                        <div className="mb-4">
                                                            <p className="mb-0 fs-12 text-muted fst-italic" onClick={() => setShowModal(true)}>
                                                                {i18n.t<string>('labels.readAndAcceptTermsRequired')}
                                                                <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">
                                                                    {i18n.t<string>('hyperlink.termsOfUse')}
                                                                </Link>
                                                            </p>
                                                        </div>

                                                        <div className="mt-4">
                                                            <Button
                                                                color="primary"
                                                                disabled={loading}
                                                                className="btn btn-primary w-100"
                                                                type="submit"
                                                                onClick={() => validation.submitForm()}
                                                            >
                                                                {loading ? (
                                                                    <Spinner size="sm" className="me-2">
                                                                        {i18n.t<string>('buttons.loading')}...
                                                                    </Spinner>
                                                                ) : (
                                                                    <></>
                                                                )}
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
                <GenericModal
                    show={showModal}
                    title={i18n.t('titles.termsOfUse')}
                    description={termsOfUse}
                    acceptTerms={acceptTerms}
                    onCloseClick={() => setShowModal(false)}
                    onAcceptClick={() => onHandleSubmitTerms(!acceptTerms)}
                />
            </div>
        </React.Fragment>
    )
}

export default RegisterUser
