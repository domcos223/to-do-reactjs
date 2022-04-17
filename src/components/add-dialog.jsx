import { Modal, Button } from 'react-bootstrap';
import React from 'react';


class AddDialog extends React.Component {
    state = {
        isOpen: false
    };

    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
   
    render() {
        return (
            <Modal show={this.state.isOpen} onHide={this.closeModal}>
            <Modal.Header>Modal Head</Modal.Header>
            <Modal.Body>Test modal</Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={this.closeModal}>
                    Close 
                </Button>
            </Modal.Footer>
            </Modal>
        )}

};

export default AddDialog;