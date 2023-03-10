import React, { useState } from 'react'

import InputMask from 'react-input-mask'
import { Button, Card, Col, Container, FormFeedback, Input, Label, Row, Spinner } from 'reactstrap'
import AuthSlider from '../Components/AuthCarousel'
import AuthFooter from '../Components/AuthFooter'

import i18n from '../../../i18n'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import GenericModal from '../../../components/Common/GenericModal/GenericModal'
import useRegisterCompany from '../../../hooks/useRegisterCompany'
import useTerms from '../../../hooks/useTerms'
import { COMPANY_TYPE } from '../../../utils/Constant'

const RegisterCompany = () => {
    const { submitRegister, loading } = useRegisterCompany()
    const { termsOfUse } = useTerms()

    const [showModal, setShowModal] = useState<boolean>(false)
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false)

    const validation = useFormik({
        enableReinitialize: true,
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
                .matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, i18n.t('validations.responsableFederalTaxIdInvalid'))
                .min(14, i18n.t('validations.federalTaxIdLength'))
                .max(14, i18n.t('validations.federalTaxIdLength'))
        }),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async values => {
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
                                                        <Input
                                                            name="document"
                                                            tag={InputMask}
                                                            mask="99.999.999/9999-99"
                                                            alwaysShowMask={false}
                                                            maskPlaceholder={null}
                                                            placeholder={i18n.t<string>('placeholder.enterDocument')}
                                                            value={validation.values.document || ''}
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={validation.touched.document && validation.errors.document ? true : false}
                                                        />
                                                        {validation.touched.document && validation.errors.document ? (
                                                            <FormFeedback type="invalid">
                                                                <div>{validation.errors.document}</div>
                                                            </FormFeedback>
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
                                                        <Input
                                                            name="federalTaxId"
                                                            tag={InputMask}
                                                            mask="999.999.999-99"
                                                            alwaysShowMask={false}
                                                            maskPlaceholder={null}
                                                            placeholder={i18n.t<string>('placeholder.enterResponsableFederalTaxId')}
                                                            value={validation.values.federalTaxId || ''}
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={validation.touched.federalTaxId && validation.errors.federalTaxId ? true : false}
                                                        />
                                                        {validation.touched.federalTaxId && validation.errors.federalTaxId ? (
                                                            <FormFeedback type="invalid">
                                                                <div>{validation.errors.federalTaxId}</div>
                                                            </FormFeedback>
                                                        ) : null}
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
