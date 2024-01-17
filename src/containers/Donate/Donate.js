import Header from '../../components/Header/Header';
import DonationInfo from '../../components/DonationInfo/DonationInfo';
import './Donate.scss';
import LatestDonations from '../../components/LatestDonations/LatestDonations';
import QuestionsAnswers from '../../components/QuestionsAnswers/QuestionsAnswers';
import QuestionForm from '../../components/QuestionForm/QuestionForm';

import { useState, useEffect, useRef } from 'react';

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
    PageSettings.paymentMethod === "client-side" ? PageSettings.clientSideMethodPriceList[0] :
    PageSettings.paymentMethod === "server" ? PageSettings.serverMethodPriceList[0] :
    PageSettings.paymentMethod === "server" ? PageSettings.linkMethodPriceList[0] : ""
  );

  const updatePriceElementSelected = (newState) => {
    setPriceElementSelected(newState);
  };

  // Responsiveness
  const DonateContainerRef = useRef(null);
  const HeaderContainerRef = useRef(null);
  const QuestionsAnswersContainerRef = useRef(null);
  const DonateContainerHeight = '150vh';

  useEffect(() => {
    if (width <= 1200) {
      DonateContainerRef.current.style.height = 'fit-content';
    }
    else if (width > 1200) {
      DonateContainerRef.current.style.height = DonateContainerHeight;
    }
  }, [width]);

  return (
    <div className='Donate-container' ref={DonateContainerRef}>

          <Header title={fundraiserData.title} description={fundraiserData.description} newBadge={fundraiserData.newBadge} 
            ref={HeaderContainerRef} />
            <Header title={fundraiserData.title} description={fundraiserData.description} newBadge={fundraiserData.newBadge} />
            <QuestionsAnswers questionsAndAnswers={fundraiserData.questionsAndAnswers} rewards={fundraiserData.rewards}
              showRewards={showRewards} setShowRewards={updateShowRewards} priceElementSelected={priceElementSelected}
              ref={QuestionsAnswersContainerRef} PageSettings={PageSettings} />
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
            />
            <LatestDonations donationPath={fundraiserData.path} latestDonations={latestDonations}
            setLatestDonations={updateLatestDonations} getLatestDonationsDataUrl={PageSettings.getLatestDonationsDataUrl}
            latestDonationsDataFetchInterval={PageSettings.latestDonationsDataFetchInterval} PageSettings={PageSettings}
            />
    </div>
  );
}

export default Donate;
