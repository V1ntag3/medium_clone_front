import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Logout from '../../../assets/svgs/logout.svg'

function ModalLogout(props) {
    return (
        <Modal style={{marginTop:'10vh'}} size="sm" show={props.show} onHide={() => {
            props.setShow()
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Sair???</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={Logout} />
                <p>Tem certeza que deseja sair??</p>
            </Modal.Body>
            <Modal.Footer>
               
                <Button variant="dark" onClick={props.execute}>
                    Logout
                </Button>
                <Button variant="outline-secondary" onClick={() => {
                    props.setShow()
                }}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalLogout;