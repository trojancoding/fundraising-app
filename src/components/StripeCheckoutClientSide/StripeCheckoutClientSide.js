import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51OXpJKAz4DzMSQxdYvJCa8y6OJX5Wrg5TZYrOb1dTlBaM9NfD5p6rYWfV29QB36ye0xFRDFqGa4LSVo3oGdjT8RX003uZec5L8');

function StripeCheckoutClientSide(props) {
  const priceList = props.priceList;
  
  // Data of selected currency
  const [priceElementSelected, setPriceElementSelected] = useState(priceList[0]);
  const [currencyValue, setCurrencyValue] = useState(priceElementSelected.priceId);

  // User inputed donate amount
  const [donationAmountValue, setDonationAmountValue] = useState(0);

  /*
    Function searches for priceElement by priceId
  */
  const getPriceElementByPriceId = (priceId) => {
    for (let index = 0; index < priceList.length; index++) {
      const priceElement = priceList[index];
      if(priceElement.priceId === priceId){
        return priceElement;
      }
    }
    return null;
  }

  const handleAmountChange = (e) => {
    //TODO: Validation
    setDonationAmountValue(e.target.value);
  }

  const handleCurrencyChange = (e) => {
    const newCurrencyValue = e.target.value;
    const newPriceElement = getPriceElementByPriceId(newCurrencyValue);
    setCurrencyValue(newCurrencyValue);
    setPriceElementSelected(newPriceElement);
  };

  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.

    /*
        CLIENT-SIDE METHOD
        USING PRODUCTS WITH PRICE SET TO 0.01
    */
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: priceElementSelected.priceId, // Price ID of the Product (Indicating Currency)
        quantity: Math.round(donationAmountValue * 100), // Set donation price by multiplying product price by quantity
        //(Math round for floating-point arithmetic rounding errors)
      }],
      mode: 'payment',
      successUrl: window.location.href,
      cancelUrl: window.location.href,
    });
    
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  return (
    <div>
      <select name="currency" id="currency" onChange={(e) => handleCurrencyChange(e)} value={currencyValue}>
        {priceList.map(priceElement => 
          <option value={priceElement.priceId}>{priceElement.currencyShortName + " - " + priceElement.currencyName}</option>
        )}
      </select>
      <div>{priceElementSelected.symbol != null ? priceElementSelected.symbol : priceElementSelected.currencyShortName}</div>
      <input type='number' value={donationAmountValue} onChange={(e)=> handleAmountChange(e)}></input>
      <button role="link" onClick={handleClick}>
        {props.buttonText ?? "Donate"}
      </button>
    </div>
  );
}
export default StripeCheckoutClientSide;