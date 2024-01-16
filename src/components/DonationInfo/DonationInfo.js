import './DonationInfo.scss';
import StripeCheckoutClientSide from '../../components/StripeCheckoutClientSide/StripeCheckoutClientSide';
import StripeCheckoutServer from '../../components/StripeCheckoutServer/StripeCheckoutServer';
import StripeCheckoutLink from '../../components/StripeCheckoutLink/StripeCheckoutLink';
import React, { useState, useEffect, useRef } from 'react';

function useInterval(callback, delay, startImmediately) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    
    // Run first time without waiting.
    useEffect(() => {
        if(startImmediately){
            callback(true);
        }
    }, []);
    

    //Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function calculatePercentage(moneyRaised, moneyToRaise) {
    // Ensure moneyRaised and moneyToRaise are non-negative numbers
    moneyRaised = Math.max(0, moneyRaised);
    moneyToRaise = Math.max(0, moneyToRaise);
  
    // Calculate the percentage
    let percentage = (moneyRaised / moneyToRaise) * 100;
  
    // Ensure the percentage doesn't exceed 100%
    //percentage = Math.min(100, percentage);
  
    return Math.floor(percentage);
  }

function genRand(min, max, decimalPlaces) {  
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Number((Math.floor(rand*power) / power).toFixed(2));
}
function DonationInfo(props) {
    const PageSettings = props.PageSettings;
    const getDonationGoalDataUrl = props.getDonationGoalDataUrl;
    const donationPath = props.donationPath;

      // Data of selected currency
    const priceElementSelected = props.priceElementSelected;
    const setPriceElementSelected = props.setPriceElementSelected;

    const {
        donationData,
        setDonationData,
        currencyShortName,
        symbol,
        moneyRaised,
        moneyToRaise,
        percentRaised,
        moneyRaisedSpanValue,
        setCurrencyShortName,
        setSymbol,
        setMoneyRaised,
        setMoneyToRaise,
        setPercentRaised,
        setMoneyRaisedSpanValue,
      } = props;

    const progressBar = useRef(null);

    function getFakeDonationData() {
        if (Math.floor(Math.random() * 3) === 0 || donationData === null) {
            const result = ({
                goalArray:[
                    {
                        // currency in which amount is stated
                        currencyShortName:"USD",
                        // string of donation currency symbol that is shown before donation amount
                        currencySymbol:"$",
                        // goal amount number in the currency
                        goalAmount: donationData === null ? Math.floor(Math.random() * 100)*100 + 1000 : donationData.goalArray[0].goalAmount,
                        // raised amount number in the currency
                        raisedAmount: Number(Number(Number(moneyRaised) + genRand(1,200,2)).toFixed(2)),
                    },
                    {
                        // currency in which amount is stated
                        currencyShortName:"EUR",
                        // string of donation currency symbol that is shown before donation amount
                        currencySymbol:"€",
                        // goal amount number in the currency
                        goalAmount: donationData === null ? Math.floor(Math.random() * 100)*100 + 1000 : donationData.goalArray[1].goalAmount,
                        // raised amount number in the currency
                        raisedAmount: Number(Number(Number(moneyRaised) + genRand(1,200,2)).toFixed(2)),
                    },
                ]
            })
            return result;
        }else{
            return donationData;
        }
    }

// Define a function to animate a number from start to end
    const animateValue = (start, end, duration) => {
        const startTime = new Date().getTime();
        const interval = setInterval(() => {
          const currentTime = new Date().getTime();
          const elapsedTime = currentTime - startTime;
          const progress = elapsedTime / duration;
    
          if (progress >= 1) {
            clearInterval(interval);
            setMoneyRaisedSpanValue(end);
          } else {
            const newNumber = Math.floor(Math.ceil(start) + (Math.ceil(end) - Math.ceil(start)) * progress);
            if(newNumber < end){
                setMoneyRaisedSpanValue(newNumber);
            }
          }
        }, 16); // Using 16ms interval for smoother animation (60fps)
        
        return () => clearInterval(interval);
    }
  
    const handleDataUpdate = () => {
        if(donationData === null){
            return false;
        }
        // Check which currency is selected
        // If selected currency not in array select first one

        const findCurrency = donationData.goalArray.find(goal => goal.currencyShortName === priceElementSelected.currencyShortName);
        const goalObject = findCurrency != undefined ? findCurrency : donationData.goalArray[0];

        animateValue(moneyRaised,goalObject.raisedAmount,350)
        //Update values
        setMoneyRaised(goalObject.raisedAmount);
        setMoneyToRaise(goalObject.goalAmount);
        setCurrencyShortName(goalObject.currencyShortName);
        setSymbol(goalObject.currencySymbol);
        const percentage = calculatePercentage(goalObject.raisedAmount,goalObject.goalAmount);
        setPercentRaised(percentage);

        progressBar.current.style.maxWidth = `${percentage}%`;
    }

    useInterval(async (clear) => {
        // Fetch donations data here
        try {
            if(getDonationGoalDataUrl != null){
                const response = await fetch(getDonationGoalDataUrl + "?" + new URLSearchParams({
                    donationPath: donationPath,
                }));
                const responseJson = await response.json();
                setDonationData(responseJson);
            }else{
                const responseJson = await getFakeDonationData();
                setDonationData(responseJson);
            }
        } catch (error) {
            console.log("Something went wrong while trying to get donation goal data.")
        }
    }, 1000, true);

    useEffect(() => {
        handleDataUpdate();
      }, [donationData,priceElementSelected]);

      useEffect(() => {
        handleDataUpdate();
      }, []);
    return (
        <div className='DonationInfo-container'>
            {donationData === null &&
            <>
                <h2 className='money-raised'>Loading...</h2>
                <div className='progress-bar-container'>
                    <div className='progress-bar' ref={progressBar}></div>
                </div>
                <p className='text'>...% raised of ...</p>
            </>
            }
            {donationData != null &&
            <>
                <h2 className='money-raised'>{symbol != null ? symbol:currencyShortName}<span>{moneyRaisedSpanValue}</span></h2>
                <div className='progress-bar-container'>
                    <div className='progress-bar' ref={progressBar}></div>
                </div>
                <p className='text'>{percentRaised}% raised of {symbol != null ? symbol:currencyShortName}{moneyToRaise}</p>
            </>
            }
            <div className='separator'></div>
            <h3>Support this project</h3>

            {PageSettings.paymentMethod === "client-side" &&
                <StripeCheckoutClientSide priceList={PageSettings.clientSideMethodPriceList}
                    buttonText={PageSettings.donateButtonText} removeLeadingZeros={PageSettings.removeLeadingZeros}
                    zeroDecimalCurrencies={PageSettings.zeroDecimalCurrencies}
                    threeDecimalCurrencies={PageSettings.threeDecimalCurrencies}
                    divisableByHundredCurrencies={PageSettings.divisableByHundredCurrencies}
                    priceElementSelected={props.priceElementSelected} setPriceElementSelected={props.setPriceElementSelected}
                />
            }
            {PageSettings.paymentMethod === "server" &&
                <StripeCheckoutServer priceList={PageSettings.serverMethodPriceList}
                    buttonText={PageSettings.donateButtonText} removeLeadingZeros={PageSettings.removeLeadingZeros}
                    zeroDecimalCurrencies={PageSettings.zeroDecimalCurrencies}
                    threeDecimalCurrencies={PageSettings.threeDecimalCurrencies}
                    divisableByHundredCurrencies={PageSettings.divisableByHundredCurrencies}
                    createPaymentIntentUrl={PageSettings.createPaymentIntentUrl}
                    donationPath={donationPath}
                    priceElementSelected={priceElementSelected} setPriceElementSelected={setPriceElementSelected}
                />
            }
            {PageSettings.paymentMethod === "link" &&
                <StripeCheckoutLink priceList={PageSettings.linkMethodPriceList}
                    buttonText={PageSettings.donateButtonText}
                    priceElementSelected={priceElementSelected} setPriceElementSelected={setPriceElementSelected} />
            }
        </div>
    );
}

export default DonationInfo;
