import React, { useState } from 'react'
import MyForm from '../../MyForm'
import { register } from '../../Firebase'
import { useNavigate } from 'react-router-dom'






const Register = () => {

    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const inputArr = [
        {
            label: "Email",
            type: "email",
            name: "email"
        },
        {
            label: "Password",
            type: "password",
            name: "password"
        },
        {
            label: "Confirm Password",
            type: "password",
            name: "confirmPassword"
        }
    ]








    const handleSubmit = (values, errors) => {
        setMessage('')
        setErrorMessage('')
        if (errors) {
            // setResult(" ")
            return
        }
        register(values.email, values.password)
            .then((response) => {
                console.log(response);
                setMessage(response)
                // localStorage.setItem('authenticated', 'true')
                // navigate('/home')

            })
            .catch((error) => {
                console.error(error);
                setErrorMessage(error)
                localStorage.setItem('authenticated', 'false')

            });

        // setResult(Math.round(values.bodyweight) / 10 >= 15 ? 15 : Math.round(values.bodyweight / 5) / 2)



    }



    return (
        <div className='d-flex justify-content-center align-items-center flex-column gap-5'>

            <MyForm
                buttText="Register"
                inputArr={inputArr}
                title="Register"
                type="Register"
                handleSub={handleSubmit}
                className={'respForm'}
            />
            {message && <p className='fs-3'>{message}</p>}
            {errorMessage && <p className='fs-3 text-danger'>{errorMessage}</p>}









        </div>
    )
}

export default Register