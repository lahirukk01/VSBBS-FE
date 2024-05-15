import Modal from 'react-bootstrap/Modal';
import {Spinner} from 'react-bootstrap';

type TLoadingOverlayProps = {
  show: boolean;
};

const LoadingOverlay = ({ show }: TLoadingOverlayProps) => {
  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      contentClassName="bg-transparent border-0"
    >
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Modal>
  );
};

export default LoadingOverlay;
