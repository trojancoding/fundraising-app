import Header from '../../components/Header/Header';
import DonationInfo from '../../components/DonationInfo/DonationInfo';
import './Donate.scss';
import LatestDonations from '../../components/LatestDonations/LatestDonations';
import QuestionsAnswers from '../../components/QuestionsAnswers/QuestionsAnswers';
import QuestionForm from '../../components/QuestionForm/QuestionForm';

import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function Donate(props) {
  const PageSettings = props.PageSettings;
  const fundraiserData = props.fundraiserData;
  const { height, width } = useWindowDimensions();
  const [latestDonations, setLatestDonations] = useState([]);

  const updateLatestDonations = (newState) => {
    setLatestDonations(newState);
  };
  // const updateLatestDonationsInHtml = (newState) => {
  //   setLatestDonationsInHtml(newState);
  // };

  return (
    <div className='Donate-container'>
      {width <= 1200 &&
      <>
            <div className='Donate-container'>
              <Header title={fundraiserData.title} description={fundraiserData.description} newBadge={fundraiserData.newBadge}/>
              <DonationInfo moneyRaised='US$ 20,712' PageSettings={PageSettings} />
              <LatestDonations latestDonations={latestDonations} setLatestDonations={updateLatestDonations}
              />
              <QuestionsAnswers questionsAndAnswers={fundraiserData.questionsAndAnswers} rewards={fundraiserData.rewards} />
              <QuestionForm />
            </div>
      </>
      }
      {width > 1200 &&
      <>
            <div className='column'>
            <Header title={fundraiserData.title} description={fundraiserData.description} newBadge={fundraiserData.newBadge}/>
            <QuestionsAnswers questionsAndAnswers={fundraiserData.questionsAndAnswers} rewards={fundraiserData.rewards} />
            <QuestionForm />
            </div>
            <div className='column'>
            <DonationInfo moneyRaised='US$ 20,712' PageSettings={PageSettings} />
            <LatestDonations latestDonations={latestDonations} setLatestDonations={updateLatestDonations}
              />
            </div>
      </>
      }

    </div>
  );
}

export default Donate;
