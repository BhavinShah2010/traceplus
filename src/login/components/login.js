import React, { useState } from 'react'

import { Container, Row, Col } from 'react-bootstrap';
import { Form, Input, Button, Checkbox } from 'antd';

//import 'antd/dist/antd.css'; 

import '../styles/login.scss'
import { traceplusLogo, showPasswordEyeIcon } from '../../common/images';
import { emailPattern } from '../../common/utilities';
import { userLogin, forgotPassword } from '../actionMethods/actionMethods';

import infiniteLoader from '../../assets/images/infinite_loader.gif'

function LoginComponent(props) {

    const [emailID, updateEmailID] = useState('')
    const [password, updatePassword] = useState('')

    const [isEmailValid, updateIsEmailValid] = useState(true)
    const [isPasswordEmpty, updateIsPasswordEmpty] = useState(false)

    const [isForgotPasswordView, updateIsForgotPasswordView] = useState(false)

    const [somethingWentWrongFlag, updateSomethingWrongWentFlag] = useState(false)
    const [errorMessage, updateErrorMessage] = useState('')

    const [successMessage, updateSucessMessage] = useState('')

    const [isLoading, updateIsLoading] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()

        if (emailID == '') {
            updateIsEmailValid(false)
        }

        if (password == '') {
            updateIsPasswordEmpty(true)
        }


        if (emailID && password) {

            let isValid = emailPattern.test(emailID)

            if (isValid) {
                updateIsLoading(true)
                updateIsPasswordEmpty(false)
                updateIsEmailValid(true)

                let requestBody = {}
                requestBody.username = emailID
                requestBody.password = password

                userLogin(requestBody).then(res => {
                    updateIsLoading(false)
                    if (res && res.status >= 200 && res.status <= 299) {
                        if (res.data && res.data.status == 200) {
                            localStorage.setItem('userLoginDetails', JSON.stringify(res.data))
                            localStorage.setItem('isLoggedIn', true)
                            props.history.push('/dashboard')
                        }
                        else {
                            updateSomethingWrongWentFlag(true)
                            updateErrorMessage(res.data.message)

                            setTimeout(() => {
                                updateSomethingWrongWentFlag(false)
                            }, 3000);
                        }
                    }
                }).catch( err => {
                    updateSomethingWrongWentFlag(true)
                    updateErrorMessage('Username and password do not match')
                })
            }
        }
    }

    function toggleForgotPasswordView(flag) {
        updateIsForgotPasswordView(flag)
        updateEmailID('')
        updatePassword('')
        updateIsPasswordEmpty(false)
        updateIsEmailValid(true)
    }


    function togglePasswordTypeChange() {
        if (document.getElementById('password')) {
            document.getElementById('password').type == 'text' ? document.getElementById('password').type = "password" : document.getElementById('password').type = 'text'
        }
    }

    function handleForgotPassword(event) {

        event.preventDefault()

        if (emailID == '') {
            updateIsEmailValid(false)
        }

        if (emailID) {
            let isValid = emailPattern.test(emailID)

            if (isValid) {
                let requestBody = {}
                requestBody.email = emailID

                updateIsLoading(true)

                forgotPassword(requestBody).then(res => {
                    updateIsLoading(false)

                    if(res && res.status >= 200){
                        updateSucessMessage(res.data.message)

                        setTimeout(() => {
                            updateSucessMessage('')
                            updateEmailID('')
                        }, 3000);
                    }
                })
            }

        }
    }

    function handleEmailID(value) {
        updateEmailID(value)

    }

    function handlePassword(value) {
        updatePassword(value)
        updateIsPasswordEmpty(false)
    }

    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))

    if(isLoggedIn){
        return(
            <div>
            {props.history.push('/dashboard')}
            </div>
        )
    }

    else{
        
            return (
                <div className="loginComponentMainDiv">
                    <div className="firstRowDiv">
        
                    </div>
        
                    <div className="secondRowDiv">
        
                    </div>
        
                    <div className="loginFormWithLogoDiv">
        
                        <Row>
                            <Col lg={3}>
                            </Col>
                            <Col lg={6}>
                                <div className="logoDiv">
                                    <img src={traceplusLogo} />
                                </div>
                                <div className="loginFormMainDiv">
                                    {
                                        !isForgotPasswordView ?
        
                                            <React.Fragment>
        
                                                <div className="loginText">Log In</div>
                                                <div className="loginForm">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="eachElement">
                                                            <label>User Name</label>
                                                            <input type="text" name="email" value={emailID} onChange={(e) => handleEmailID(e.target.value)} placeholder="User Name" />
        
                                                            {
                                                                !isEmailValid ? <div className="dangerColor">Please Enter Valid Email ID !</div> : ''
                                                            }
                                                        </div>
        
                                                        <div className="eachElement">
                                                            <label>Password</label>
                                                            <input id="password" type="password" name="password" value={password}
                                                                onChange={(e) => handlePassword(e.target.value)} placeholder="Password" />
                                                            <img src={showPasswordEyeIcon} onClick={togglePasswordTypeChange} />
        
                                                            {
                                                                isPasswordEmpty ? <div className="dangerColor">Please Enter Password !</div> : ''
                                                            }
                                                        </div>
                                                        <div className="">
                                                            <span className="forgetPasswordText" onClick={() => toggleForgotPasswordView(true)}>    Forgot Password ?</span>
                                                        </div>
        
                                                        {
                                                            isLoading ?
                                                                <img src={infiniteLoader} /> :
                                                                <button type="submit" class="loginFormButton">Log In</button>
        
                                                        }
        
                                                        {
                                                            somethingWentWrongFlag ?
        
                                                                <div className="dangerColor text-center">{errorMessage}</div> : ''
                                                        }
        
                                                    </form>
        
                                                </div>
                                            </React.Fragment> :
        
                                            <React.Fragment>
                                                <div className="loginText">Forgot Password</div>
                                                <div className="loginForm">
                                                    <form onSubmit={handleForgotPassword}>
                                                        <div className="eachElement">
                                                            <label>User Name</label>
                                                            <input type="text" name="email" value={emailID} onChange={(e) => handleEmailID(e.target.value)} placeholder="User Name" />
        
                                                            {
                                                                !isEmailValid ? <div className="dangerColor">Please Enter Valid Email ID !</div> : ''
                                                            }
                                                        </div>
        
        
                                                        <div className="">
                                                            <span className="forgetPasswordText" onClick={() => toggleForgotPasswordView(false)}>
                                                                Have an Account ? Go Back To Login
                                                              </span>
                                                        </div>

                                                        
                                                        {
                                                            isLoading ?
        
                                                                <img src={infiniteLoader} /> :
        
                                                                <button type="submit" class="loginFormButton">Send Email</button>
                                                        }

                                                        {
                                                            successMessage ? <h6 className="successTextColor text-center m-t">{successMessage}</h6> : ''
                                                        }
        
        
                                                    </form>
        
                                                </div>
                                            </React.Fragment>
                                    }
                                </div>
                            </Col>
                            <Col lg={3}>
                            </Col>
                        </Row>
        
                    </div>
                </div>
            )

    }
}

export default LoginComponent