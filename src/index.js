import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Donate from './containers/Donate/Donate'

// **********************************
// **********************************
// ****** SETTINGS FOR THE APP ******
// **********************************
// **********************************

// Here you can modify the variables to change page appearance and dynamic data.

// **********************************
// ******* CURRENCY SETTINGS ********
// **********************************

// Change currency settings 

/*
  https://stripe.com/docs/currencies#zero-decimal
  All API requests expect amounts to be provided in a currency’s smallest unit. For example, to charge 10 USD, provide an amount value of 1000 (that is, 1000 cents).
  For zero-decimal currencies, still provide amounts as an integer but without multiplying by 100. For example, to charge ¥500, provide an amount value of 500.

  A list of zero-decimal currencies (no decimal point in the input) 
*/
const zeroDecimalCurrencies = ["BIF","CLP","DJF","GNF","JPY","KMF","KRW","MGA","PYG","RWF","UGX","VND","VUV","XAF","XOF","XPF"]; // currency shortNames

/*
  https://stripe.com/docs/currencies#three-decimal
  The API supports three-decimal currencies for the standard payment flows, including Payment Intents, Refunds, and Disputes.
  However, to ensure compatibility with Stripe’s payments partners, these API calls require the least-significant (last) digit to be 0.
  Your integration must round amounts to the nearest ten. For example, 5.124 KWD must be rounded to 5120 or 5130.

  **********************************
  As it rounds up to the nearest ten,
  implementing threeDecimalCurrencies
  is not necessary.
  **********************************
*/
const threeDecimalCurrencies = [];

/*
  https://stripe.com/docs/currencies#special-cases
  
  For example, to charge 5 ISK/5 UGX, provide an amount value of 500.
  The amount value must be evenly divisible by 100: 100, 200, 300, and so on. 
*/
const divisableByHundredCurrencies = ["TWD","UGX"]; // currency shortNames

// **********************************
// ********* WEBSITE DATA ***********
// **********************************

// Set website static/dynamic data

/*
  List of currencies with their priceIds
  Default value is the first value
*/
const priceList = [
  {
    "symbol":"€", // (string or null) Currency symbol shown before donation amount
    // if symbol is null currencyShortName is shown before donation amount
    "currencyShortName": "EUR", // (string) Currency shortName (Provide the same shortNames across settings)
    "currencyName": "Euro", // (string) Currency name shown in currency 
    "priceId" : "price_1OXs7jAz4DzMSQxdkNE0vEcr", // (string) Stripe priceId from product
    "productPrice" : 0.01, // (float) Stripe product price to calculate quantity for desired amount
    "minimumCharge":0.50, // (float) Minimum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
    //(the lowest amount from the page doesn't always work, so boost it up in some cases)
    "maximumCharge":99999999,// (int) Maximum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
  },
  {
    "symbol":"$",
    "currencyShortName": "USD",
    "currencyName": "US Dollar",
    "priceId" : "price_1OXqzwAz4DzMSQxdAVc2CAKt",
    "productPrice" : 0.01,
    "minimumCharge":0.50,
    "maximumCharge":99999999,
  },
  {
    "symbol":"CA$",
    "currencyShortName": "CAD",
    "currencyName": "Canadian Dollar",
    "priceId" : "price_1OXs8dAz4DzMSQxdpq84Kq6X",
    "productPrice" : 0.01,
    "minimumCharge":0.50,
    "maximumCharge":99999999,
  },
  {
    "symbol":"£",
    "currencyShortName": "GBP",
    "currencyName": "British Pound",
    "priceId" : "price_1OXs9kAz4DzMSQxdUCnSQry9",
    "productPrice" : 0.01,
    "minimumCharge":0.40,
    "maximumCharge":99999999,
  },
];

// **********************************
// ********** UI SETTINGS ***********
// **********************************

// Adjust website appearance

/*
  Remove leading zeros from donate amount on input
*/
const removeLeadingZeros = true;

/*
  Text on dotation form button
  Default value is "Donate"
*/
const donateButtonText = "Donate";


// Import settings to props
const PageSettings = {
  priceList:priceList,

  donateButtonText:donateButtonText,
  removeLeadingZeros:removeLeadingZeros,

  zeroDecimalCurrencies:zeroDecimalCurrencies,
  divisableByHundredCurrencies:divisableByHundredCurrencies,
  threeDecimalCurrencies:threeDecimalCurrencies,
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Donate PageSettings={PageSettings} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
