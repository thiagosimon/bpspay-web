import React from 'react'
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

import { GenericModalProps } from './GenericModal.types'

import i18n from '../../../i18n'

type Props = {
    text: string
}

const DescriptionComponent = ({ text }: Props) => {
    const formattedDescription = text
        .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>') // Substituir <b> e </b> por <strong> e </strong>
        .replace(/<br>/g, '<br/>') // Substituir <br> por <br/>

    return <div dangerouslySetInnerHTML={{ __html: formattedDescription }} />
}

const GenericModal = ({ show, title, description, acceptTerms, onCloseClick, onAcceptClick }: GenericModalProps) => {
    return (
        <Modal isOpen={show} centered scrollable className="custom-modal" size="xl">
            <ModalHeader toggle={onCloseClick} className="custom-header modal-title" tag="h5">
                {i18n.t(title).toUpperCase()}
            </ModalHeader>
            <ModalBody className="py-3 px-5 mb-4 mt-4">
                <DescriptionComponent text={description} />
            </ModalBody>
            <ModalFooter className="justify-content-center">
                <div className="form-check" onClick={onAcceptClick}>
                    <Input className="form-check-input" type="checkbox" id="agreement-check" checked={acceptTerms} />
                    <p agreement-check className="form-check-label accept-label">
                        {i18n.t<string>('descriptions.checkEmailRegistrationProblem')}
                    </p>
                </div>
            </ModalFooter>
        </Modal>
    )
}
export default GenericModal
