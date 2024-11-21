import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignupValidation';
import axios from 'axios';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleInput = (event) => {
        setValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validation(values);
        setErrors(validationErrors);

        if (
            !validationErrors.name &&
            !validationErrors.email &&
            !validationErrors.password
        ) {
            axios
                .post('http://localhost:8081/signup', values) // Updated port
                .then(() => navigate('/'))
                .catch((err) => console.log(err));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{backgroundColor:'pink'}}>
            <div className="bg-white p-3 rounded w-25">
                <h2 style={{textAlign:'center'}}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            className="form-control rounded-0"
                            onChange={handleInput}
                            style={{borderWidth:2,borderColor:'black'}} 
                        />
                        {errors.name && (
                            <span className="text-danger">{errors.name}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            className="form-control rounded-0"
                            onChange={handleInput}
                            style={{borderWidth:2,borderColor:'black'}} 
                        />
                        {errors.email && (
                            <span className="text-danger">{errors.email}</span>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            className="form-control rounded-0"
                            onChange={handleInput}
                            style={{borderWidth:2,borderColor:'black'}} 
                        />
                        {errors.password && (
                            <span className="text-danger">
                                {errors.password}
                            </span>
                        )}
                    </div>
                    <button type="submit" className="btn btn-success w-100" style={{backgroundColor:'paleturquoise', color:'black'}}>
                        <strong>Sign Up</strong>
                    </button>
                    <p style={{marginTop:10}}>You agree to our terms and policies.</p>
                    <Link
                        to="/"
                        className="btn btn-default border w-100 text-decoration-none"
                        style={{fontWeight:'bold',borderColor:'black'}}
                        
                    >
                        Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
