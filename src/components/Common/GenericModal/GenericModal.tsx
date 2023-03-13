import React from 'react'
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

import { GenericModalProps } from './GenericModal.types'

import i18n from '../../../i18n'

const logoLight = require('../../../assets/images/logo-light.png')

type Props = {
    text: string
}

const DescriptionComponent = ({ text }: Props) => {
    const formattedDescription = text.replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>').replace(/<br>/g, '<br/>')

    return <div dangerouslySetInnerHTML={{ __html: formattedDescription }} />
}

const GenericModal = ({ show, title, description, acceptTerms, acceptTitle, headerCloseIcon, onCloseClick, onAcceptClick }: GenericModalProps) => {
    return (
        <Modal isOpen={show} centered scrollable className="custom-modal" size="xl">
            <ModalHeader className="custom-header modal-title d-flex justify-content-between" tag="h5">
                <span>{i18n.t(title).toUpperCase()}</span>
                <img src={logoLight} alt="logo" height={60} className="logo" />
            </ModalHeader>
            <ModalBody className="py-3 px-5 mb-4 mt-4">
                <DescriptionComponent text={description} />
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <div className="form-check" onClick={onAcceptClick}>
                    <Input className="form-check-input" type="checkbox" id="agreement-check" defaultChecked={acceptTerms} />
                    <p agreement-check className="form-check-label accept-label">
                        {acceptTitle}
                    </p>
                </div>
            </ModalFooter>
        </Modal>
    )
}

export default GenericModal
