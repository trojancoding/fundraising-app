import Header from '../../components/Header/Header';
import DonationInfo from '../../components/DonationInfo/DonationInfo';
import './Donate.scss';
import LatestDonations from '../../components/LatestDonations/LatestDonations';
import QuestionsAnswers from '../../components/QuestionsAnswers/QuestionsAnswers';
import QuestionForm from '../../components/QuestionForm/QuestionForm';

import { useState, useEffect, useRef } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  //const { clientWidth: width, clientHeight: height } = document.documentElement;
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

  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const [showRewards, setShowRewards] = useState(false);

  const updateFormMessage = (newState) => {
    setFormMessage(newState);
  };
  const updateFormEmail = (newState) => {
    setFormEmail(newState);
  };

  const updateShowRewards = (newState) => {
    setShowRewards(newState);
  };

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


  // Currency
  const [priceElementSelected, setPriceElementSelected] = useState(
    PageSettings.paymentMethod === "client-side" ? fundraiserData.clientSideMethodPriceList[0] :
    PageSettings.paymentMethod === "server" ? fundraiserData.serverMethodPriceList[0] :
    PageSettings.paymentMethod === "server" ? fundraiserData.linkMethodPriceList[0] : ""
  );

  const updatePriceElementSelected = (newState) => {
    setPriceElementSelected(newState);
  };

  // Responsiveness
  const DonateContainerRef = useRef(null);

  useEffect(() => {
    if (width <= 1200) {
      DonateContainerRef.current.style.height = 'fit-content';
    }
    else if (width > 1200) {
      const headerContainerEl = document.getElementById("Header-container");
      const questionsAnswersContainerEl = document.getElementById("QuestionsAnswers-container");
      const questionFormContainerEl = document.getElementById("QuestionForm-container");
      
      const headerContainerHeight = headerContainerEl ? headerContainerEl.offsetHeight : 0;
      const questionsAnswersContainerHeight = questionsAnswersContainerEl ? questionsAnswersContainerEl.offsetHeight : 0;
      const questionFormContainerHeight = questionFormContainerEl ? questionFormContainerEl.offsetHeight : 0;

      DonateContainerRef.current.style.height = `${(headerContainerHeight+questionsAnswersContainerHeight+questionFormContainerHeight)+(100)}px`;
    }
  }, [width,showRewards]);

  return (
    <div className='Donate-container' ref={DonateContainerRef}>

            <Header title={fundraiserData.title} description={fundraiserData.description} newBadge={fundraiserData.newBadge} />
            <QuestionsAnswers questionsAndAnswers={fundraiserData.questionsAndAnswers} rewards={fundraiserData.rewards}
              showRewards={showRewards} setShowRewards={updateShowRewards} priceElementSelected={priceElementSelected}
              PageSettings={PageSettings} />
            {!showRewards &&
              <QuestionForm donationPath={fundraiserData.path} submitQuestionFormUrl={PageSettings.submitQuestionFormUrl}
                message={formMessage} email={formEmail} setMessage={updateFormMessage} setEmail={updateFormEmail}
                PageSettings={PageSettings}  />
            }
            <DonationInfo donationPath={fundraiserData.path} PageSettings={PageSettings} donationData={donationData} setDonationData={updateDonationData} getDonationGoalDataUrl={PageSettings.getDonationGoalDataUrl}
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
              priceElementSelected={priceElementSelected} setPriceElementSelected={updatePriceElementSelected}
              donationGoalDataFetchInterval={PageSettings.donationGoalDataFetchInterval}
              fundraiserData={fundraiserData}
            />
            <LatestDonations donationPath={fundraiserData.path} latestDonations={latestDonations}
            setLatestDonations={updateLatestDonations} getLatestDonationsDataUrl={PageSettings.getLatestDonationsDataUrl}
            latestDonationsDataFetchInterval={PageSettings.latestDonationsDataFetchInterval} PageSettings={PageSettings}
            />
    </div>
  );
}

export default Donate;
