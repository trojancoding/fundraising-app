import React from 'react';
import { useState } from 'react';

function StripeCheckoutClientSide(props) {
  const priceList = props.priceList;

  // Data of selected currency
  const priceElementSelected = props.priceElementSelected;
  const setPriceElementSelected = props.setPriceElementSelected;
  const [currencyValue, setCurrencyValue] = useState(priceElementSelected.productLink);


  // Messages
  const [errorMessage, setErrorMessage] = useState("");

  /*
    Function searches for priceElement by productLink
  */
  const getPriceElementByProductLink = (productLink) => {
    for (let index = 0; index < priceList.length; index++) {
      const priceElement = priceList[index];
      if (priceElement.productLink === productLink) {
        return priceElement;
      }
    }
    return null;
  }

  const handleCurrencyChange = (e) => {
    const newCurrencyValue = e.target.value;
    const newPriceElement = getPriceElementByProductLink(newCurrencyValue);
    setCurrencyValue(newCurrencyValue);
    setPriceElementSelected(newPriceElement);
  };

  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    /*
        LINK METHOD
        USING STRIPE LINK
        WITH CUSTOMER CHOOSES PRICE
    */
    window.open(priceElementSelected.productLink, '_blank').focus();
  };
  return (
    <>
      <select name="currency" id="currency" onChange={(e) => handleCurrencyChange(e)} value={currencyValue}>
        {priceList.map(priceElement =>
          <option value={priceElement.productLink}>{priceElement.currencyShortName + " - " + priceElement.currencyName}</option>
        )}
      </select>
      {errorMessage ?? <div>{errorMessage}</div>}
      <button role="link" onClick={handleClick} className='donation-button'><p className='button-text'>{props.buttonText ?? "Donate"}</p><span className='icon-container'></span></button>
    </>
  );
}
export default StripeCheckoutClientSide;