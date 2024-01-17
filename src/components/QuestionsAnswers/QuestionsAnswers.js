import './QuestionsAnswers.scss';
import logo from '../../assets/logo.svg';
import { useState, useRef } from 'react';

function QuestionsAnswers(props) {
    const questionsAndAnswers = props.questionsAndAnswers;
    const rewards = props.rewards;

    const showRewards = props.showRewards;
    const setShowRewards = props.setShowRewards;
    
    // Data of selected currency
    const priceElementSelected = props.priceElementSelected;


    const PageSettings = props.PageSettings;
    
    const questionsAndAnswersHeadingText = PageSettings.questionsAndAnswersHeadingText;
    const rewardsHeadingText = PageSettings.rewardsHeadingText;


    const questionsHeader = useRef(null);
    const rewardsHeader = useRef(null);
    
    const questionOnClickHandle = (e) =>{
        var questionParentElement = e.target.parentElement;
        var answerElements = questionParentElement.getElementsByClassName("answer");
        if(answerElements.length == 0){
            questionParentElement = questionParentElement.parentElement;
            answerElements = questionParentElement.getElementsByClassName("answer");
        }
        const iconElements = questionParentElement.getElementsByClassName("icon");
        iconElements[0].classList.toggle("icon-more");
        iconElements[0].classList.toggle("icon-less");

        answerElements[0].classList.toggle("question-hidden");
    } 

    const questionsHeaderOnClickHandle = (e) =>{
        // rewardsHeader.current.classList.add('disabled');
        // questionsHeader.current.classList.remove('disabled');
        setShowRewards(false);
    }
    const rewardsHeaderOnClickHandle = (e) =>{
        // rewardsHeader.current.classList.remove('disabled');
        // questionsHeader.current.classList.add('disabled');
        setShowRewards(true);
    }
    return (
        <div className='QuestionsAnswers-container'>
            <div className='QuestionsAnswers-header'>
                <div className={`QuestionsAnswers-header-choice ${showRewards && 'disabled'}`} onClick={questionsHeaderOnClickHandle} ref={questionsHeader}>
                    <h2>{questionsAndAnswersHeadingText}</h2>
                    <span className='icon icon-help'></span>
                </div>
                <div className={`QuestionsAnswers-header-choice ${!showRewards && 'disabled'}`} onClick={rewardsHeaderOnClickHandle} ref={rewardsHeader}>
                    <h2>{rewardsHeadingText}</h2>
                    <span className='icon icon-redeem'></span>
                </div>
            </div>
            {!showRewards &&
                    <div className='questions'>
                    {questionsAndAnswers.map((questionAndAnswer, idx) =>
                        <div className='question'>
                            <div className='question-clickable' onClick={questionOnClickHandle}>
                                <h4>{questionAndAnswer.question}</h4>
                                <span className={`icon ${idx === 0 ? "icon-less":"icon-more"}`}></span>
                            </div>
                            <p className={`answer ${idx === 0 ? "":"question-hidden"}`}>{questionAndAnswer.answer}</p>
                        </div>
                    )}
    
                </div>
            }
            {showRewards &&
            <div className='rewards'>
                    <div className={`reward-background`}></div>
                    {rewards.map(reward => {
                        const findCurrency = reward.goalCurrencies.find(goal => goal.currencyShortName === priceElementSelected.currencyShortName);
                        return <>
                        <div className='reward'>
                            <h3 className={`goal`}>{findCurrency != undefined ? findCurrency.goal : reward.goal}</h3>
                            <h4 className={`title`}>{reward.title}</h4>
                            <p className={`description`}>{reward.description}</p>
                        </div>
                        </>
                    }

                    )}
            </div>
            }
        </div>
    );
}

export default QuestionsAnswers;