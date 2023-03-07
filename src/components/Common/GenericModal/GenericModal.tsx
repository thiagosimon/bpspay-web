import React from 'react'
import { Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

import { DataProps, GenericModalProps } from './GenericModal.types'

import i18n from '../../../i18n'

const GenericModal = ({ show, title, data, onCloseClick, onAcceptClick }: GenericModalProps & { data: DataProps }) => {
    return (
        <Modal isOpen={show} centered scrollable className="custom-modal" size="xl">
            <ModalHeader toggle={onCloseClick} className="custom-header modal-title" tag="h5">
                {i18n.t(title).toUpperCase()}
            </ModalHeader>
            <ModalBody className="py-3 px-5 mb-4 mt-4">{data?.content}</ModalBody>
            <ModalFooter className="justify-content-center">
                <div className="form-check" onClick={onAcceptClick}>
                    <Input className="form-check-input" type="checkbox" value="" id="agreement-check" />
                    <p agreement-check className="form-check-label accept-label">
                        {i18n.t<string>('descriptions.checkEmailRegistrationProblem')}
                    </p>
                </div>
            </ModalFooter>
        </Modal>
    )
}
export default GenericModal
