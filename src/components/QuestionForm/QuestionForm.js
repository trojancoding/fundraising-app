import React, { useState, useRef } from 'react';
import './QuestionForm.scss';
import logo from '../../assets/logo.svg';

function QuestionForm(props) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [textareaHeight, setTextareaHeight] = useState('46px');

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

    const emailInputOnChangeHandle = (isEmailValid) =>{
        if (isEmailValid) {
            emailInputIcon.current.classList.add('valid');
        }
        else {
            emailInputIcon.current.classList.remove('valid');
        }
    }

    const [emailErrorMessage, setEmailErrorMessage] = useState("");
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
                {emailErrorMessage ?? <div className='error'>{emailErrorMessage}</div>}
                <button className='send-button' onClick={handleButtonClick}>
                    <p className='send-button-text'>Send</p>
                    <span className='send-icon-container'></span>
                </button>
            </div>
        </div>
    );
}

export default QuestionForm;
