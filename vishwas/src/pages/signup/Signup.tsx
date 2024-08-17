import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import img from '../../assets/cereals.jpg';

interface SignupFormValues {
  firstName: string;
  lastName: string;
  middleName: string;
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
    middleName: '',
    phoneNumber: '',
    email: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  });


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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
        alert("Farmer Successfully R  egistered");        // Optionally, you can redirect the user or show a success message
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
    <section className="signup-section">
      <div className="regimage-container" style={{marginTop:'10vh'}}><img src={img} alt='login'></img></div>

      <div className="image-container" style={{ marginTop: '10vh' }}><img src={img} alt='login'></img></div>
      <div className="signup-container">
        <h2 style={{ marginTop: '10vh' }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="middleName">Middle Name:</label>
            <input
              type="text"
              className="form-control"
              id="middleName"
              name="middleName"
              placeholder="Enter your middle name (optional)"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber"className='signupl'>Phone Number:</label>
            <input
              type="tel"
              className="signup-control"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email"className='signupl'>Email:</label>
            <input
              type="email"
              className="singup-control"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="dateOfBirth"className='signupl'>Date of Birth:</label>
            <input
              type="date"
              className="signup-control"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className='signupl'>Password:</label>
            <input
              type="password"
              className="signup-control"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className='signupl'>Confirm Password:</label>
            <input
              type="password"
              className="singup-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="regbutton">Register</button>
          <div className="signlink-container">
            <p className='sign-p'>
              <Link to="/login">Already have an account? Log In</Link>
            </p>
          </div>
        </form>
      </div>


    </section>
  );
};

export default Signup;