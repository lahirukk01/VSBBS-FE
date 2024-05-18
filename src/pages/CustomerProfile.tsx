import {useOutletContext} from 'react-router-dom';
import {TOutletContext} from '~/types/common.ts';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import {useState} from 'react';
import OtpSubmitModal from '~/components/AuthForm/OtpSubmitModal.tsx';
import {useSubmitProfileUpdateOtpMutation, useActivateProfileMutation} from '~/store/UsersApiSlice.ts';
import {TOtpGenerateResponse, TOtpSubmitResponseData} from '~/components/AuthForm/types.ts';
import {storeSessionData} from '~/components/AuthForm/helpers.ts';


const CustomerProfile = () => {
  const { user, setAuth } = useOutletContext<TOutletContext>();

  const [ownerIdentifier, setOwnerIdentifier] = useState<string>('');
  const [showOtpSubmitModal, setShowOtpSubmitModal] = useState(false);

  const [activateProfile, { isLoading }] = useActivateProfileMutation();
  const [submitProfileUpdateOtp, { isLoading: isSubmitProfileUpdateOtpOngoing}] = useSubmitProfileUpdateOtpMutation();

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const mobile = form.formMobile.value;
    const email = form.formEmail.value;
    const id = parseInt(form.formCustomerId.value);

    const updatedUser = { ...user, mobile, email, id };

    try {
      const result: TOtpGenerateResponse = await activateProfile(updatedUser).unwrap();
      console.log('Profile update initiated: ', result);
      setOwnerIdentifier(result.data.ownerIdentifier);
      setShowOtpSubmitModal(true);
    } catch (error) {
      console.error('Failed to update profile: ', error);
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    console.log('OTP submitted: ', otp);
    try {
      const response: TOtpSubmitResponseData = await submitProfileUpdateOtp({ otp, ownerIdentifier }).unwrap();
      const jwtData = storeSessionData(response);
      setAuth(jwtData);
      console.log('JWT data: ', jwtData);
    } catch (error) {
      console.error('Failed to submit OTP: ', error);
    } finally {
      setShowOtpSubmitModal(false);
    }
  };

  const handleCloseOtpSubmitModal = () => setShowOtpSubmitModal(false);

  const needToUpdateProfile = user.id === 0;

  return (
    <Row>
      {user.id === 0 && <h4 className="my-3 text-center">Please update the profile details to activate account</h4>}
      <Col className="mx-3">
        <Form onSubmit={handleUpdateProfile}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={user.username} readOnly />
          </Form.Group>

          <Form.Group controlId="formFirstName" className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={user.firstName} readOnly />
          </Form.Group>

          <Form.Group controlId="formLastName" className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={user.lastName} readOnly />
          </Form.Group>

          <Form.Group controlId="formCustomerId" className="mb-3">
            <Form.Label>Customer ID</Form.Label>
            <Form.Control
              type="number"
              min={1}
              placeholder={user.id === 0 ? 'Enter Customer ID' : user.id.toString()}
              readOnly={!needToUpdateProfile} />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              placeholder={user.email ?? '********'}
              readOnly={user.email !== null}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group controlId="formMobile" className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="tel"
              required
              placeholder={user.mobile ?? '********'}
              readOnly={user.mobile !== null}
            />
          </Form.Group>

          {needToUpdateProfile &&
            <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
          >
            Update Profile
          </Button>}
        </Form>
      </Col>
      <OtpSubmitModal
        show={showOtpSubmitModal}
        onClose={handleCloseOtpSubmitModal}
        onSubmit={handleOtpSubmit}
        disableSubmit={isSubmitProfileUpdateOtpOngoing}
        />
    </Row>
  );
};

export default CustomerProfile;
