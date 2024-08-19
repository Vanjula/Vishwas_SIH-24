import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import OtpPopup from './otpInput';
import './signup.css';
import image from '../../assets/2farmers.png';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormValues>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });

  const [isVerified, setVerified] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleverify = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/v1/farmer/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: formData.phoneNumber }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        alert("OTP sent successfully!");
        setIsPopupOpen(true);
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  }

  const handleChangeNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setVerified(false);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Confirm Password does not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/farmer/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);

        alert("Farmer Registered Successfully");
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Failed to sign up');
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
    console.log(formData);
  };

  return (

    <section className="signup-section" style={{ marginTop: '15vh' }}>
      {isPopupOpen && (
        <OtpPopup
          onClose={() => setIsPopupOpen(false)}
          onVerify={() => setVerified(true)}
          phoneNumber={formData.phoneNumber}
        />
      )}
      <div className="signup-image-container"><img className='signup-image' src={image} style={{ width: '100%', height: '100%' }} alt='signup'></img></div>

      <div className="signup-container">
        <h2 style={{ marginTop: '5vh' }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <div>
              <label htmlFor="name">FirstName:</label>
              <input
                type="text"
                className="signup-form-control"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="name">LastName:</label>
              <input
                type="text"
                className="signup-form-control"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="signup-form-group">
            <div>
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                className="signup-form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                minLength={10}
                maxLength={10}
                value={formData.phoneNumber}
                onChange={handleChangeNum}
                required
              />
            </div>
            <div>
              <label htmlFor="hi" style={{ color: 'white' }}>h</label>
              <button onClick={handleverify} className="signup-verify-button">Verify</button>
            </div>
          </div>

          <div className="signup-form-group">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                className="signup-form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                className="signup-form-control"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="signup-form-group">
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="signup-form-control"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                className="signup-form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {isVerified && <button type="submit" className="signup-button">Register</button>}
          <div className="signup-link-container">
            <p>
              <Link to="/login">Already have an account? Log In</Link>
            </p>
          </div>
        </form>
      </div>
    </section>

  );
};

export default Signup;
