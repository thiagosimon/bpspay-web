import React, { useState } from 'react'

import { Button, Card, Col, Container, FormFeedback, Input, Label, Row, Spinner } from 'reactstrap'

import AuthSlider from '../Components/AuthCarousel'
import AuthFooter from '../Components/AuthFooter'

import i18n from '../../../i18n'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import Cleave from 'cleave.js/react'
import GenericModal from '../../../components/Common/GenericModal/GenericModal'
import useRegisterCompany from '../../../hooks/useRegisterCompany'
import useTerms from '../../../hooks/useTerms'
import useValidateContact from '../../../hooks/useValidateContact'
import { COMPANY_TYPE } from '../../../utils/Constant'

const RegisterCompany = () => {
    const { submitRegister, loading } = useRegisterCompany()
    const { termsOfUse } = useTerms()
    const { documentAlreadyExist } = useValidateContact()

    const [passwordShow, setPasswordShow] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false)
    const [delimiter2, setDelimiter2] = useState('')

    const validation = useFormik({
        enableReinitialize: false,
        initialValues: {
            document: '76.064.677/0001-55',
            socialName: 'Test CNPJ',
            federalTaxId: '561.673.970-74'
        },
        validationSchema: Yup.object({
            document: Yup.string()
                .required(i18n.t('validations.documentRequired'))
                .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, i18n.t('validations.documentInvalid'))
                .min(18, i18n.t('validations.documentLength'))
                .max(18, i18n.t('validations.documentLength')),
            socialName: Yup.string()
                .required(i18n.t('validations.socialNameRequired'))
                .min(3, i18n.t('validations.socialNameMinLength'))
                .max(100, i18n.t('validations.socialNameMaxLength')),
            federalTaxId: Yup.string()
                .required(i18n.t('validations.federalTaxIdRequired'))
                .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, i18n.t('validations.federalTaxIdInvalid'))
                .min(14, i18n.t('validations.federalTaxIdLength'))
                .max(14, i18n.t('validations.federalTaxIdLength'))
        }),
        onSubmit: async values => {
            // const documentExists = await documentAlreadyExist(String(values.document), this)

            // if (documentExists) {
            //     validation.setFieldError('email', i18n.t('validations.documentAlreadyExist'))
            //     return
            // }

            const body = {
                document: values.document,
                socialName: values.socialName,
                type: COMPANY_TYPE.CLIENT,
                contactPerson: {
                    federalTaxId: values.federalTaxId
                }
            }

            await submitRegister(body, this)
        }
    })

    const onHandleSubmitTerms = (value: boolean) => {
        setAcceptTerms(value)
        setShowModal(false)
    }

    const onDelimiterChange2 = (e: any) => {
        setDelimiter2(e.target.rawValue)
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
                                                    <h5 className="text-primary">{i18n.t<string>('titles.firstAccess')}</h5>

                                                    <p className="text-muted">{i18n.t<string>('subtitles.firstAccess')}</p>
                                                </div>

                                                <form onSubmit={validation.handleSubmit}>
                                                    <div className="mb-3">
                                                        <Label htmlFor="document" className="form-label">
                                                            {i18n.t<string>('labels.document')} <span className="text-danger">*</span>
                                                        </Label>

                                                        <Cleave
                                                            placeholder={i18n.t<string>('placeholder.documentMask')}
                                                            options={{
                                                                delimiters: ['.', '.', '/', '-'],
                                                                blocks: [2, 3, 3, 4, 2],
                                                                numericOnly: true
                                                            }}
                                                            name="document"
                                                            className="form-control"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.document || ''}
                                                            onInvalid={validation.handleBlur}
                                                        />
                                                        {validation.touched.document && validation.errors.document ? (
                                                            <FormFeedback type="invalid">{validation.errors.document}</FormFeedback>
                                                        ) : null}
                                                    </div>

                                                    <div className="mb-3">
                                                        <Label htmlFor="socialName" className="form-label">
                                                            {i18n.t<string>('labels.socialName')} <span className="text-danger">*</span>
                                                        </Label>
                                                        <Input
                                                            name="socialName"
                                                            type="text"
                                                            placeholder={i18n.t<string>('placeholder.enterSocialName')}
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.socialName || ''}
                                                            invalid={validation.touched.socialName && validation.errors.socialName ? true : false}
                                                        />
                                                        {validation.touched.socialName && validation.errors.socialName ? (
                                                            <FormFeedback type="invalid">
                                                                <div>{validation.errors.socialName}</div>
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>

                                                    <div className="mb-3">
                                                        <Label htmlFor="federalTaxId" className="form-label">
                                                            {i18n.t<string>('labels.responsableFederalTaxId')} <span className="text-danger">*</span>
                                                        </Label>

                                                        <Cleave
                                                            placeholder={i18n.t<string>('placeholder.enterResponsableFederalTaxId')}
                                                            options={{
                                                                delimiters: ['.', '.', '-'],
                                                                blocks: [3, 3, 3, 2],
                                                                numericOnly: true
                                                            }}
                                                            name="federalTaxId"
                                                            className="form-control"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.federalTaxId || ''}
                                                            onInvalid={validation.handleBlur}
                                                        />
                                                        {validation.touched.federalTaxId && validation.errors.federalTaxId ? (
                                                            <FormFeedback type="invalid">{validation.errors.federalTaxId}</FormFeedback>
                                                        ) : null}
                                                    </div>

                                                    {/* <div className="mb-4">
                                                        <p className="mb-0 fs-12 text-muted fst-italic" onClick={() => setShowModal(true)}>
                                                            {i18n.t<string>('labels.readAndAcceptTermsRequired')}
                                                            <Link to="#" className="text-primary text-decoration-underline fst-normal fw-medium">
                                                                {i18n.t<string>('hyperlink.termsOfUse')}
                                                            </Link>
                                                        </p>
                                                    </div> */}

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
                                                            {i18n.t<string>('buttons.sendRegister')}
                                                        </Button>
                                                    </div>
                                                </form>
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

export default RegisterCompany
