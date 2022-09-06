import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function DeleteModal({Show, Close, id}) {
  return (
    <Modal
      size="sm"
      aria-labelledby="DeleteModal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Remove Order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure want to remove this order ?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn-green' onClick={Close()}>Cancel</Button>
        <Button className='btn-red' onClick={Close()}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}
