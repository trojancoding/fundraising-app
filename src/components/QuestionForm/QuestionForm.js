import React from 'react';
import './QuestionForm.scss';
import logo from '../../assets/logo.svg';

function textCounter(field, maxlimit) {
    var countfield = document.querySelector('.characters-left');
    
    if (field.value.length > maxlimit) {
        field.value = field.value.substring(0, maxlimit);
        return false;
    } else {
        countfield.textContent = maxlimit - field.value.length + ' characters left';
    }
}

function QuestionForm(props) {
    return (
        <div className='QuestionForm-container'>
            <h3>Do you have any questions?</h3>
            <form className='form-container'>
                <div className='form-label'>Enter your email</div>
                <div className='email-input-container'>
                    <input className='email-input' type='email' placeholder='example@email.com' />
                    <p className='email-check-icon'></p>
                </div>
                <div className='form-label'>Ask a question</div>
                <textarea
                    className='message-input'
                    onKeyUp={(e) => textCounter(e.target, 300)}
                    name="message"
                    placeholder='What do you want to know?'
                />
                <span className='characters-left'>300 characters left</span>
                <button className='send-button'>
                    <p className='send-button-text'>Send</p>
                    <span className='send-icon-container'></span>
                </button>
            </form>
        </div>
    );
}

export default QuestionForm;
