import React, { useState, useRef } from 'react';
import './QuestionForm.scss';
import logo from '../../assets/logo.svg';

function QuestionForm(props) {
    const email = props.email;
    const setEmail = props.setEmail;
    const message = props.message;
    const setMessage = props.setMessage;

    const [textareaHeight, setTextareaHeight] = useState('46px');
    const submitQuestionFormUrl = props.submitQuestionFormUrl;
    const donationPath = props.donationPath;

    const textCounter = (field, maxlimit) => {
        if (field.length > maxlimit) {
            return field.substring(0, maxlimit);
        }
        return field;
    };

    const handleInputChange = (e, setFunction, maxlimit) => {
        const inputValue = e.target.value;
        const limitedValue = textCounter(inputValue, maxlimit);
        setFunction(limitedValue);
        setTextareaHeight(e.target.scrollHeight + 'px');
    };

    const isValidEmail = (email) => {
        // Regular expression for a basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const emailInput = useRef(null);
    const emailInputIcon = useRef(null);

    const emailInputOnChangeHandle = (isEmailValid) => {
        if (isEmailValid) {
            emailInputIcon.current.classList.add('valid');
        }
        else {
            emailInputIcon.current.classList.remove('valid');
        }
    }

    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    async function postData(url = "", data = {}) {
        try {
            // Default options are marked with *
            const response = await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                //   mode: "cors", // no-cors, *cors, same-origin
                //   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                //   credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                //   redirect: "follow", // manual, *follow, error
                //   referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });
            return response.json(); // parses JSON response into native JavaScript objects
        } catch (error) {
            console.log("Something went wrong while sending message to the server");
        }

    }
    const handleButtonClick = () => {
        if (!isValidEmail(email)) {
            setEmailErrorMessage('Invalid email.');
        }
        else if (message.length < 1) {
            setEmailErrorMessage('Message is empty.');
        }
        else if (message.length > 300) {
            setEmailErrorMessage('Too many characters.');
        }
        else {
            setEmailErrorMessage('');
            if (submitQuestionFormUrl != null) {
                postData(submitQuestionFormUrl, { message: message, email: email, donationPath:donationPath});
            }
            setMessage('');
            setEmail('');
        }
    }


    return (
        <div className='QuestionForm-container'>
            <h3>Do you have any questions?</h3>
            <div className='form-container'>
                <div className='form-label'>Enter your email</div>
                <div className='email-input-container'>
                    <input
                        className='email-input'
                        type='text'
                        placeholder='example@email.com'
                        value={email}
                        ref={emailInput}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            setEmail(inputValue);
                            // Check if the entered email is valid
                            const isEmailValid = isValidEmail(inputValue);
                            // You can use isEmailValid to display validation feedback if needed
                            emailInputOnChangeHandle(isEmailValid);
                        }}
                    />
                    <p className='email-check-icon' ref={emailInputIcon}></p>
                </div>
                <div className='form-label'>Ask a question</div>
                <textarea
                    className='message-input'
                    style={{ height: textareaHeight }}
                    value={message}
                    onChange={(e) => handleInputChange(e, setMessage, 300)}
                    placeholder='What do you want to know?'
                />
                <span className='characters-left'>{300 - message.length} characters left</span>
                {emailErrorMessage && <div className='error email-error'>{emailErrorMessage}</div>}
                <button className='send-button' onClick={handleButtonClick}>
                    <p className='send-button-text'>Send</p>
                    <span className='send-icon-container'></span>
                </button>
            </div>
        </div>
    );
}

export default QuestionForm;
