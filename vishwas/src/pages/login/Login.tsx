import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import image from '../../assets/cereals.jpg';


interface LoginFormValues {
  mobileNumber: string; // Update the interface name
  password: string;
}

const Login = () => {

  const [formData, setFormData] = useState<LoginFormValues>({
    mobileNumber: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <section className="login-section">
  <div className="imagelogin-container"></div>
  <div className="login-container">
    <h2>Sign In</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="mobileNumber" className="loginlabel">Mobile Number:</label>
        <input
          type="tel"
          className="login-control"
          id="mobileNumber"
          placeholder="Enter your mobile number"
        />
      </div>
      <div>
        <label htmlFor="password" className="loginlabel">Password:</label>
        <input
          type="password"
          className="login-control"
          id="password"
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className="loginbutton">Login</button>
      <div className="loginlink-container">
        <p className='login-p'>
          <Link to="/signup">Don't have an account? Register</Link>
        </p>
      </div>
    </form>
  </div>
</section>

  );
};

export default Login;
