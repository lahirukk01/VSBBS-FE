import Modal from 'react-bootstrap/Modal';
import {useState} from 'react';

type TOtpSubmitModalProps = {
  show: boolean;
  onClose: () => void;
  onSubmit: (otp: string) => void;
  disableSubmit: boolean;
};

const OtpSubmitModal = ({ show, onClose, onSubmit, disableSubmit = false }: TOtpSubmitModalProps) => {
  const [otp, setOtp] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(otp);
    setOtp('');
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>OTP Submission</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleOtpSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="otp">Enter OTP you received via email or phone</label>
            <input
              onChange={handleChange}
              type="text"
              className="form-control mt-2"
              id="otp"
              name="otp"
              value={otp} />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={disableSubmit || otp.length < 6}
          >
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default OtpSubmitModal;
