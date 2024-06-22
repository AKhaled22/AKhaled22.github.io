import React, { useState } from 'react'
import MyForm from '../../MyForm'
import { login } from '../../Firebase'
import { useNavigate } from 'react-router-dom'






const Login = () => {
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')

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
        }
    ]







    const handleSubmit = (values, errors) => {
        setErrorMsg('')
        if (errors) {
            // setResult(" ")
            return
        }
        login(values.email, values.password)
            .then((response) => {
                console.log(response);
                localStorage.setItem('authenticated', 'true')
                window.location.reload()
                navigate('/home')
            })
            .catch((error) => {
                console.error(error);
                setErrorMsg(error)
                localStorage.setItem('authenticated', 'false')

            });

        // setResult(Math.round(values.bodyweight) / 10 >= 15 ? 15 : Math.round(values.bodyweight / 5) / 2)



    }



    return (
        <div className='d-flex justify-content-center align-items-center flex-column gap-5'>

            <MyForm
                buttText="Login"
                inputArr={inputArr}
                title="Login"
                type="Login"
                handleSub={handleSubmit}
                className={'respForm'}
            />
            <p className='fs-3 text-danger'>{errorMsg}</p>








        </div>
    )
}

export default Login