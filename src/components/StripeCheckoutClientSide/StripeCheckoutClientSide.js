import React from 'react';
import './StripeCheckoutClientSide.scss';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OXpJKAz4DzMSQxdYvJCa8y6OJX5Wrg5TZYrOb1dTlBaM9NfD5p6rYWfV29QB36ye0xFRDFqGa4LSVo3oGdjT8RX003uZec5L8');

function StripeCheckoutClientSide(props) {
  const priceList = props.priceList;
  const removeLeadingZeros = props.removeLeadingZeros ?? true;
  const donationAmountPlaceholder = props.donationAmountPlaceholder;

  const zeroDecimalCurrencies = props.zeroDecimalCurrencies;
  const divisableByHundredCurrencies = props.divisableByHundredCurrencies;
  const threeDecimalCurrencies = props.threeDecimalCurrencies;

  // Data of selected currency
  const priceElementSelected = props.priceElementSelected;
  const setPriceElementSelected = props.setPriceElementSelected;
  const [currencyValue, setCurrencyValue] = useState(priceElementSelected.priceId);


  // User inputed donate amount
  const [donationAmountValue, setDonationAmountValue] = useState("");


  // Messages
  const [errorMessage, setErrorMessage] = useState("");

  /*
    Function searches for priceElement by priceId
  */
  const getPriceElementByPriceId = (priceId) => {
    for (let index = 0; index < priceList.length; index++) {
      const priceElement = priceList[index];
      if (priceElement.priceId === priceId) {
        return priceElement;
      }
    }
    return null;
  }


  const handleAmountChange = (e) => {
    const input = e.target.value;

    var regex = /^[0-9]+(\.[0-9]{0,2})?$/;
    var regexOneMoreDecimal = /^[0-9]+(\.[0-9]{0,3})?$/;
    var regexDotPlacement = /^[0-9]+(\.[0-9]{3})$/;

    // Check for different decimal settings
    if(zeroDecimalCurrencies.includes(priceElementSelected.currencyShortName) || divisableByHundredCurrencies.includes(priceElementSelected.currencyShortName)){
      regex = /^[0-9]+$/;
      regexOneMoreDecimal = /^[0-9]+$/;
      regexDotPlacement = /^[0-9]+$/;
    }else if(threeDecimalCurrencies.includes(priceElementSelected.currencyShortName)){
      regex = /^[0-9]+(\.[0-9]{0,3})?$/;
      regexOneMoreDecimal = /^[0-9]+(\.[0-9]{0,4})?$/;
      regexDotPlacement = /^[0-9]+(\.[0-9]{4})$/;
    }

    if(input > priceElementSelected.maximumCharge){
      setErrorMessage(`The maximum donation amount is ${priceElementSelected.symbol != null ? priceElementSelected.symbol : priceElementSelected.currencyShortName}${priceElementSelected.maximumCharge}`);
    }else{
      setErrorMessage("");
    }
    // Check if input value matches with amount regex
    const isValid = regex.test(input);
    if (isValid) {
      /*
        REMOVE LEADING ZEROS IN INPUT
      */
      if (removeLeadingZeros) { // IF REMOVE LEADING ZEROS
        try {
          var parsedInput = parseFloat(input);
          if (parsedInput > 0) {
            // Replace zeros at the beginning of the string if there is a digit before a dot.
            var newInput = input.replace(/^0+/, "");
            if (parsedInput < 1) {
              newInput = "0" + newInput;
            }

            setDonationAmountValue(newInput);
          } else {
            setDonationAmountValue(input);
          }
          return true;
        } catch (error) {
          // Value cannot be parsed to float
          setDonationAmountValue(input);
        }
      } else {
        // Remove leading zeros denied
        setDonationAmountValue(input);
      }
    } else {
      // If user cleans input
      if (input === "") {
        setDonationAmountValue(input);
        setErrorMessage("");
      } else if (!zeroDecimalCurrencies.includes(priceElementSelected.currencyShortName) && !divisableByHundredCurrencies.includes(priceElementSelected.currencyShortName)
                && regexOneMoreDecimal.test(input) && regexDotPlacement.test(input)) { // If user tries to change digits after dot
        //Check if user changes digits or adds more
        if (input[input.length - 1] === (donationAmountValue.length > 0 ? donationAmountValue[donationAmountValue.length - 1] : "")) {
          const newInput = input.slice(0, -1);
          if(parseFloat(newInput) > priceElementSelected.maximumCharge){
            setDonationAmountValue(priceElementSelected.maximumCharge);
          }else{
            setDonationAmountValue(newInput);
          }
        }
      }
    }
  }

  const handleCurrencyChange = (e) => {
    const newCurrencyValue = e.target.value;
    const newPriceElement = getPriceElementByPriceId(newCurrencyValue);
    setCurrencyValue(newCurrencyValue);
    setPriceElementSelected(newPriceElement);
  };

  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.

    // Validate donation value
    if(donationAmountValue===""){
      setErrorMessage("Put in your donation amount.");
      return false;
    }
    try {
      const parsedAmountValue = parseFloat(donationAmountValue);
      // Check minimum and maximum values.
      if(parsedAmountValue < priceElementSelected.minimumCharge){
        setErrorMessage(`The minimum donation amount is ${priceElementSelected.symbol != null ? priceElementSelected.symbol : priceElementSelected.currencyShortName}${priceElementSelected.minimumCharge}`);
        return false;
      }else if(parsedAmountValue > priceElementSelected.maximumCharge){
        setErrorMessage(`The maximum donation amount is ${priceElementSelected.symbol != null ? priceElementSelected.symbol : priceElementSelected.currencyShortName}${priceElementSelected.maximumCharge}`);
        return false;
      }
    } catch (error) {
      // The value couldn't be parsed to float.
      setErrorMessage("Wrong donation amount format.");
      return false;
    }

    /*
        CLIENT-SIDE METHOD
        USING PRODUCTS WITH PRICE
    */
    try {
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price: priceElementSelected.priceId, // Price ID of the Product (Indicating Currency)
          quantity: Math.round(parseFloat(donationAmountValue) / priceElementSelected.productPrice), // Set donation price by multiplying product price by quantity
          //(Math round for floating-point arithmetic rounding errors)
        }],
        mode: 'payment',
        successUrl: window.location.href,
        cancelUrl: window.location.href,
      });
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      setErrorMessage("");
    } catch (error) {
      if (error) {
        setErrorMessage("Something went wrong, please try again later.");
        console.log(error.message);
        return false;
      }
    }
  };
  return (
    <>
      <select name="currency" id="currency" onChange={(e) => handleCurrencyChange(e)} value={currencyValue}>
        {priceList.map(priceElement =>
          <option value={priceElement.priceId}>{priceElement.currencyShortName + " - " + priceElement.currencyName}</option>
        )}
      </select>
      <div className='input-container'>
                <div className='currency-dropdown'>{priceElementSelected.symbol != null ? priceElementSelected.symbol : priceElementSelected.currencyShortName}</div>
                <input className='donation-input' type='text' placeholder={donationAmountPlaceholder} value={donationAmountValue} onChange={(e) => handleAmountChange(e)} />
      </div>
      {errorMessage && <div className='error'>{errorMessage}</div>}
      <button role="link" onClick={handleClick} className='donation-button'><p className='button-text'>{props.buttonText ?? "Donate"}</p><span className='icon-container'></span></button>

    </>
  );
}
export default StripeCheckoutClientSide;