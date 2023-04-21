import React from 'react'
import { Modal } from 'react-bootstrap'
import ResourceForm from './ResourceForm'


export default function ResourceEdit(props) {
  return (
    <Modal
        show={props.showEdit}
        onHide={() => props.setShowEdit(false)}
    >
        <Modal.Header>
            <h3>Editing {props.resource.name}</h3>
        </Modal.Header>
        <Modal.Body>
            <ResourceForm
                resource={props.resource}
                setShowEdit={props.setShowEdit}
                getResource={props.getResource}
            />
        </Modal.Body>
    </Modal>
  )
}
