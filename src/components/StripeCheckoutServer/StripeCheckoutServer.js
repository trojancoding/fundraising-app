import React from 'react';
import { useState } from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'
import CheckoutForm from '../CheckoutForm/CheckoutForm';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OXpJKAz4DzMSQxdYvJCa8y6OJX5Wrg5TZYrOb1dTlBaM9NfD5p6rYWfV29QB36ye0xFRDFqGa4LSVo3oGdjT8RX003uZec5L8');

function StripeCheckoutServer(props) {
  const priceList = props.priceList;

  const createPaymentIntentUrl = props.createPaymentIntentUrl;
  
  const removeLeadingZeros = props.removeLeadingZeros ?? true;

  const zeroDecimalCurrencies = props.zeroDecimalCurrencies;
  const divisableByHundredCurrencies = props.divisableByHundredCurrencies;
  const threeDecimalCurrencies = props.threeDecimalCurrencies;

  // Data of selected currency
  const [priceElementSelected, setPriceElementSelected] = useState(priceList[0]);
  const [currencyValue, setCurrencyValue] = useState(priceElementSelected.currencyShortName);


  // User inputed donate amount
  const [donationAmountValue, setDonationAmountValue] = useState("0");

  // Stripe elements
  const [showStripeElements, setShowStripeElements] = useState(false);
  /*
    https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements&client=react
    const options = {
      clientSecret: '{{CLIENT_SECRET}}',
      appearance: {...},
    };
  */
  const [stripeOptions, setStripeOptions] = useState(null);

  
  // Messages
  const [errorMessage, setErrorMessage] = useState("");

  /*
    Function searches for priceElement by currencyShortName
  */
  const getPriceElementByCurrencyShortName = (currencyShortName) => {
    for (let index = 0; index < priceList.length; index++) {
      const priceElement = priceList[index];
      if (priceElement.currencyShortName === currencyShortName) {
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


    // Check if input value matches with amount regex
    const isValid = regex.test(input) && input <= priceElementSelected.maximumCharge;
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
    const newPriceElement = getPriceElementByCurrencyShortName(newCurrencyValue);
    setCurrencyValue(newCurrencyValue);
    setPriceElementSelected(newPriceElement);
  };

  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.

    // Validate donation value
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
        SERVER METHOD
        USING SERVER TO GET CLIENT-SECRET
    */
    try {
      // Send amount and currency values to the server
      // On the server based on the currencies you need to adjust
      // amount multiplier to their decimal type or other special cases
      // https://stripe.com/docs/currencies

      const intentResponse = await fetch(createPaymentIntentUrl,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency:priceElementSelected.currencyShortName,
          amount:parseFloat(donationAmountValue),
        }),
      });
      const intentResponseJson = await intentResponse.json();

      /*
        https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements&client=react
        const options = {
          clientSecret: '{{CLIENT_SECRET}}',
          appearance: {...},
        };
      */
      setStripeOptions({clientSecret:intentResponseJson.client_secret})
      setShowStripeElements(true);
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
    <div>
      <select name="currency" id="currency" onChange={(e) => handleCurrencyChange(e)} value={currencyValue}>
        {priceList.map(priceElement =>
          <option value={priceElement.currencyShortName}>{priceElement.currencyShortName + " - " + priceElement.currencyName}</option>
        )}
      </select>
      <div>{priceElementSelected.symbol != null ? priceElementSelected.symbol : priceElementSelected.currencyShortName}</div>
      <input type='text' value={donationAmountValue} onChange={(e) => handleAmountChange(e)}></input>
      {errorMessage ?? <div>{errorMessage}</div>}
      <button role="link" onClick={handleClick}>
        {props.buttonText ?? "Donate"}
      </button>
      {showStripeElements &&
      <Elements stripe={stripePromise} options={stripeOptions}>
        <CheckoutForm />
      </Elements>
      }

    </div>
  );
}
export default StripeCheckoutServer;