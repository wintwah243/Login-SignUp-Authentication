import React, { useState } from 'react'
import { Link, Navigate, useNavigate, useNavigation } from 'react-router-dom'
import validation from './LoginValidation'; 
import axios from 'axios';

function Login() {
    const [values,setValues] = useState({
        email:'',
        password:''
    })

    const navigate = useNavigate();

    const [errors,setErrors] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Validate inputs
        const validationErrors = validation(values);
        setErrors(validationErrors);
    
        if (!validationErrors.email && !validationErrors.password) {
            axios
                .post('http://localhost:8081/login', values)
                .then((res) => {
                    console.log('Response:', res.data); // Debugging
                    if (res.data === 'success') {
                        navigate('/home'); // Redirect on success
                    } else {
                        alert('No record existed'); // Handle invalid credentials
                    }
                })
                .catch((err) => {
                    console.error('Axios error:', err);
                    alert('An error occurred. Please try again later.');
                });
        }
    };
    

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
  return (
    <div className='d-flex justify-content-center align-items-center  vh-100' style={{backgroundColor:'pink'}}>
        <div className=' p-3 rounded w-25' style={{backgroundColor:'white'}}>
            <h2 style={{textAlign:'center'}}>Log in</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type='email' onChange={handleInput} placeholder='Enter email' style={{borderWidth:2,borderColor:'black'}} className='form-control rounded-0' name='email'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span> }
                </div>
                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' onChange={handleInput} placeholder='Enter password' style={{borderWidth:2,borderColor:'black'}}  className='form-control rounded-0' name='password'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span> }
                </div>
                <button type='submit' className='btn btn-success w-100' style={{backgroundColor:'palegreen'}}><strong style={{color:'black'}}>Login</strong></button>
                <p>You are agreed to our terms and policies.</p>
                <Link to="/signup" className='btn btn-default border w-100 text-decoration-none' style={{borderWidth:2,borderColor:'black',fontWeight:'bold'}} >Create Account</Link>
            </form>
        </div>

    </div>
  )
}



export default Login