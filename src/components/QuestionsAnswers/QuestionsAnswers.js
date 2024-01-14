import './QuestionsAnswers.scss';
import logo from '../../assets/logo.svg';
import { useState, useRef } from 'react';

function QuestionsAnswers(props) {
    const questionsAndAnswers = props.questionsAndAnswers;
    const rewards = props.rewards;

    const [showRewards, setShowRewards] = useState(false);
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
        rewardsHeader.current.classList.add('disabled');
        questionsHeader.current.classList.remove('disabled');
        setShowRewards(false);
    }
    const rewardsHeaderOnClickHandle = (e) =>{
        rewardsHeader.current.classList.remove('disabled');
        questionsHeader.current.classList.add('disabled');
        setShowRewards(true);
    }
    return (
        <div className='QuestionsAnswers-container'>
            <div className='QuestionsAnswers-header'>
                <div className='QuestionsAnswers-header-choice' onClick={questionsHeaderOnClickHandle} ref={questionsHeader}>
                    <h2>Q&A</h2>
                    <span className='icon icon-help'></span>
                </div>
                <div className='QuestionsAnswers-header-choice disabled' onClick={rewardsHeaderOnClickHandle} ref={rewardsHeader}>
                    <h2>Rewards</h2>
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
                    {rewards.map(reward =>
                        <div className='reward'>
                            <h3 className={`goal`}>{reward.goal}</h3>
                            <h4 className={`title`}>{reward.title}</h4>
                            <p className={`description`}>{reward.description}</p>
                        </div>
                    )}
            </div>
            }
        </div>
    );
}

export default QuestionsAnswers;