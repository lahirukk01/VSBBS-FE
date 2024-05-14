import Modal from "react-bootstrap/Modal";
import {useState} from "react";

type TOtpSubmitModalProps = {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (otp: string) => void;
};

const OtpSubmitModal = ({ show, handleClose, handleSubmit }: TOtpSubmitModalProps) => {
  const [otp, setOtp] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setOtp(value);
    }
  }

  const handleOtpSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(otp);
    setOtp('');
  }

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default OtpSubmitModal;
