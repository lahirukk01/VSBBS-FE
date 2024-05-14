import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import {useState} from 'react';

import {TAuthFormFields, TOtpGenerateResponse, TOtpSubmitResponseData} from '~/components/AuthForm/types.ts';
import {
  TLoginCredentials,
  TRegistrationDetails,
  useCustomerRegistrationMutation,
  useLoginMutation, useSubmitRegistrationOtpMutation
} from '~/store/AuthApiSlice.ts';
import {TErrorResponse} from '~/types/common.ts';
import OtpSubmitModal from "~/components/AuthForm/OtpSubmitModal.tsx";
import {getJwtPayload} from "~/helpers/common.ts";

const AuthForm = ({registration = false}) => {
  const [login] = useLoginMutation();
  const [customerRegistration] = useCustomerRegistrationMutation();
  const [submitRegistrationOtp] = useSubmitRegistrationOtpMutation();

  const [submitError, setSubmitError] = useState<string>('');
  const [ownerIdentifier, setOwnerIdentifier] = useState<string>('');
  const [showRegistrationSuccess, setShowRegistrationSuccess] = useState<boolean>(false);

  const displayError = (error: unknown) => {
    if (typeof error === 'object' && error !== null && 'data' in error) {
      const typedError = error as TErrorResponse;
      setSubmitError(typedError.data.error.message);
    }
  };

  const handleOtpSubmit = async (otp: string) => {
    try {
      const otpSubmitResponse = await submitRegistrationOtp({ otp, ownerIdentifier });
      const otpSubmitResponseData = otpSubmitResponse.data as TOtpSubmitResponseData;
      const decodedToken = getJwtPayload(otpSubmitResponseData.data.token);
      const payloadToStore = {
        bearerToken: otpSubmitResponseData.data.token,
        data: decodedToken
      };

      localStorage.setItem('vsbbaAuth', JSON.stringify(payloadToStore));
      setShowRegistrationSuccess(true);
      console.log('OTP submit response: ', decodedToken);
    } catch (error) {
      console.error('Failed to submit OTP: ', error);
      displayError(error);
    } finally {
      setOwnerIdentifier('');
    }
    console.log('OTP submitted: ', otp);
  }

  const processRegistration = async (details: TRegistrationDetails) => {
    try {
      const result: TOtpGenerateResponse = await customerRegistration(details).unwrap();
      setOwnerIdentifier(result.data.ownerIdentifier);
      console.log('Registration successful: ', result);
    } catch (error) {
      console.error('Failed to register: ', error);
      displayError(error);
    }
  };

  const processLogin = async ({ username, password }: TLoginCredentials) => {
    try {
      const result = await login({ username, password }).unwrap();
      console.log('Login successful: ', result);
    } catch (error) {
      console.error('Failed to login: ', error);
      displayError(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as typeof e.target & TAuthFormFields;
    const details = {
      username: form.formUsername.value,
      password: form.formBasicPassword.value,
      firstName: '',
      lastName: '',
      mobile: '',
      email: ''
    };

    if (registration) {
      details.firstName = form.formFirstName.value;
      details.lastName = form.formLastName.value;
      details.mobile = form.formMobileNumber.value;
      details.email = form.formEmail.value;

      await processRegistration(details);
    } else {
      await processLogin(details);
    }
  };

  const handleDismissError = () => setSubmitError('');

  const handlerOtpSubmitModalClose = () => setOwnerIdentifier('');

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {registration && (<>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter first name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter last name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formMobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter mobile number" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
        </>)}

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" required placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" required placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>

        <div className="mt-3">
        {submitError && (
          <Alert variant="danger" onClose={handleDismissError} dismissible>
            {submitError}
          </Alert>
        )}
          {showRegistrationSuccess &&
            <Alert
              variant="success"
              dismissible
              onClose={() => setShowRegistrationSuccess(false)}
            >
            Registration successful!!!. Please login.
          </Alert>}
        </div>
      </Form>
      <OtpSubmitModal
        show={ownerIdentifier !== ''}
        handleClose={handlerOtpSubmitModalClose}
        handleSubmit={handleOtpSubmit}
      />
    </>
    );
};

export default AuthForm;
