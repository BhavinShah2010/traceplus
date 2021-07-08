import React, { useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import { Form, Input, Button, Checkbox } from 'antd';

//import 'antd/dist/antd.css'; 

import '../styles/login.scss'

import { emailPattern } from '../../common/utilities';
import { userLogin, forgotPassword } from '../actionMethods/actionMethods';

import traceplusLogo from '../../assets/traceplusImages/trace_logo.png'
import showPasswordEyeIcon from '../../assets/traceplusImages/show_password.png'


import infiniteLoader from '../../assets/images/infinite_loader.gif'
import { getLanguageTranslation, setSelectedLanguage } from '../../dashboard/actionMethods/actionMethods';

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
                            localStorage.setItem('selectedDate', new Date())

                            getLanguageTranslation('en' , res.data.session).then(res => {
                                //    console.log("Lang data : " , res)
                                if (res && res.status >= 200 && res.status <= 200) {
                                    localStorage.setItem('languageData', JSON.stringify(res.data))
                                    localStorage.setItem('selectedLanguage', 'en')
                                    props.setSelectedLanguage('en')
                                    
                                }
                            })
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
                }).catch(err => {
                    updateSomethingWrongWentFlag(true)
                    updateErrorMessage('Username and password do not match')
                })
            }
            else {
                updateIsEmailValid(false)
            }
        }
    }

    function toggleForgotPasswordView(flag) {
        updateIsForgotPasswordView(flag)
        updateEmailID('')
        updatePassword('')
        updateIsPasswordEmpty(false)
        updateIsEmailValid(true)
        updateErrorMessage('')
        updateSucessMessage('')
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
                    if (res && res.status == 200) {
                        updateSucessMessage(res.message)

                        setTimeout(() => {
                            //updateSucessMessage('')
                            updateEmailID('')
                        }, 3000);
                    }
                    else {
                        
                        updateErrorMessage(res.message)

                        setTimeout(() => {
                            //updateErrorMessage('')
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

    if (isLoggedIn) {
        return (
            <div>
                {props.history.push('/dashboard')}
            </div>
        )
    }

    else {

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
                                                        <input maxLength="150" type="text" name="email" value={emailID} onChange={(e) => handleEmailID(e.target.value)} placeholder="User Name" />

                                                        {
                                                            !isEmailValid ? <div className="dangerColor">Please Enter Valid Email ID !</div> : ''
                                                        }
                                                    </div>

                                                    <div className="eachElement">
                                                        <label>Password</label>
                                                        <input maxLength="150" id="password" type="password" name="password" value={password}
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
                                                        <input maxLength="150" type="text" name="email" value={emailID} onChange={(e) => handleEmailID(e.target.value)} placeholder="User Name" />

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

                                                    {
                                                        errorMessage ? <h6 className="dangerColor text-center m-t">{errorMessage}</h6> : ''
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


export default connect(null, { setSelectedLanguage })(withRouter(LoginComponent))