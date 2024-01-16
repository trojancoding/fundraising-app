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

  const [donationData, setDonationData] = useState(null);
  const [currencyShortName, setCurrencyShortName] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [moneyRaised, setMoneyRaised] = useState(0);
  const [moneyToRaise, setMoneyToRaise] = useState(0);
  const [percentRaised, setPercentRaised] = useState(0);
  const [moneyRaisedSpanValue, setMoneyRaisedSpanValue] = useState(0);



  const updateCurrencyShortName = (newState) => {
    setCurrencyShortName(newState);
  };
  const updateSymbol = (newState) => {
    setSymbol(newState);
  };
  const updateMoneyRaised = (newState) => {
    setMoneyRaised(newState);
  };
  const updateMoneyToRaise = (newState) => {
    setMoneyToRaise(newState);
  };
  const updatePercentRaised = (newState) => {
    setPercentRaised(newState);
  };
  const updateMoneyRaisedSpanValue = (newState) => {
    setMoneyRaisedSpanValue(newState);
  };
  const updateDonationData = (newState) => {
    setDonationData(newState);
  };

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
              <DonationInfo PageSettings={PageSettings} donationData={donationData} setDonationData={updateDonationData}
                currencyShortName={currencyShortName}
                symbol={symbol}
                moneyRaised={moneyRaised}
                moneyToRaise={moneyToRaise}
                percentRaised={percentRaised}
                moneyRaisedSpanValue={moneyRaisedSpanValue}
                setCurrencyShortName={updateCurrencyShortName}
                setSymbol={updateSymbol}
                setMoneyRaised={updateMoneyRaised}
                setMoneyToRaise={updateMoneyToRaise}
                setPercentRaised={updatePercentRaised}
                setMoneyRaisedSpanValue={updateMoneyRaisedSpanValue}
              />
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
            <DonationInfo PageSettings={PageSettings} donationData={donationData} setDonationData={updateDonationData}
              currencyShortName={currencyShortName}
              symbol={symbol}
              moneyRaised={moneyRaised}
              moneyToRaise={moneyToRaise}
              percentRaised={percentRaised}
              moneyRaisedSpanValue={moneyRaisedSpanValue}
              setCurrencyShortName={updateCurrencyShortName}
              setSymbol={updateSymbol}
              setMoneyRaised={updateMoneyRaised}
              setMoneyToRaise={updateMoneyToRaise}
              setPercentRaised={updatePercentRaised}
              setMoneyRaisedSpanValue={updateMoneyRaisedSpanValue}
            />
            <LatestDonations latestDonations={latestDonations} setLatestDonations={updateLatestDonations}
              />
            </div>
      </>
      }

    </div>
  );
}

export default Donate;
