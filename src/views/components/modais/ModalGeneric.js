import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalLogout({ textButtonConfirm ,setShow, show, execute, title, image, text }) {
    return (
        <Modal style={{ marginTop: '10vh' }} size="sm" show={show} onHide={() => {
            setShow()
        }}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={image} />
                {/* <p>Tem certeza que deseja sair??</p> */}
                <p>{text}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={execute}>
                    {textButtonConfirm}
                </Button>
                <Button variant="outline-secondary" onClick={() => {
                    setShow()
                }}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalLogout;