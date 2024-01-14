import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Donate from './containers/Donate/Donate'

// **********************************
// **********************************
// **********************************
// ****** SETTINGS FOR THE APP ******
// **********************************
// **********************************
// **********************************

// Here you can modify the variables to change page appearance and dynamic data.

// **********************************
// **********************************
// ********* MAIN SETTINGS **********
// **********************************
// **********************************

// Change main settings 
/*
  Set which method of stripe are you going to use

  "client-side" - create products on Stripe with minimum price and "sell multiple items" to acheive end price for donation
    pros:
      - user can select his own donation amount on foundation site which is send to checkout page
      - redirect after successful/unsuccessful payment
      - no server needed
    cons:
      - "Qty 500, €0.01 each" info after product description on stripe checkout page

  "link" - set Stripe links for products with "customer chooses price"
    pros:
      - donation amount choice is made on Stripe website, which may seem more secure to the user
      - "Thanks for your donation" info on Stripe website
      - no server needed
    cons:
      - no redirect after successful/unsuccessful payment
      - user cannot select donation amount on foundation site

  "server" - generate stripe links on the server real-time
    pros:
      - user can select his own donation amount on foundation site which is send to checkout page
    cons:
      - server needed to generate payment links every time

*/
const paymentMethod = "server";


// **********************************
// **********************************
// ******* CURRENCY SETTINGS ********
// **********************************
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

  In that case divisableByHundredCurrencies are treated as zeroDecimalCurrencies
  In CLIENT-SIDE METHOD the lowest price is set to minimal 0.01
*/
const divisableByHundredCurrencies = ["ISK","UGX"]; // currency shortNames

// **********************************
// **********************************
// ********* WEBSITE DATA ***********
// **********************************
// **********************************

// Set website static/dynamic data



// **********************************
// ****** CLIENT-SIDE METHOD ********
// **********************************
    /*
        USING PRODUCTS WITH PRICE
    */
/*
  List of currencies with their priceIds for client-side method
  Default value is the first value
*/
const clientSideMethodPriceList = [
  {
    "symbol":"€", // (string or null) Currency symbol shown before donation amount
    // if symbol is null currencyShortName is shown before donation amount
    "currencyShortName": "EUR", // (string) Currency shortName (Provide the same shortNames across settings)
    "currencyName": "Euro", // (string) Currency name shown in currency 
    "priceId" : "price_1OXs7jAz4DzMSQxdkNE0vEcr", // (string) Stripe priceId from product
    "productPrice" : 0.01, // (float) Stripe product price to calculate quantity for desired amount
    "minimumCharge":0.50, // (float) Minimum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
    //(the lowest amount from the page doesn't always work, so boost it up in some cases)
    // ('Amount must convert to at least X.XX. CA$0.50 converts to approximately X.XX.')
    "maximumCharge":999999.99,// (int) Maximum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
  },
  {
    "symbol":"$",
    "currencyShortName": "USD",
    "currencyName": "US Dollar",
    "priceId" : "price_1OXqzwAz4DzMSQxdAVc2CAKt",
    "productPrice" : 0.01,
    "minimumCharge":0.50,
    "maximumCharge":999999.99,
  },
  {
    "symbol":"CA$",
    "currencyShortName": "CAD",
    "currencyName": "Canadian Dollar",
    "priceId" : "price_1OXs8dAz4DzMSQxdpq84Kq6X",
    "productPrice" : 0.01,
    "minimumCharge":0.50,
    "maximumCharge":999999.99,
  },
  {
    "symbol":"£",
    "currencyShortName": "GBP",
    "currencyName": "British Pound",
    "priceId" : "price_1OXs9kAz4DzMSQxdUCnSQry9",
    "productPrice" : 0.01,
    "minimumCharge":0.40,
    "maximumCharge":999999.99,
  },
  {
    "symbol":null,
    "currencyShortName": "ISK",
    "currencyName": "Icelandic Króna",
    "priceId" : "price_1OYG6PAz4DzMSQxdFonqWysw",
    "productPrice" : 0.01,
    "minimumCharge":100,
    "maximumCharge":999999.99,
  },
];
// **********************************
// ********* LINK METHOD ************
// **********************************
    /*
        USING STRIPE LINKS FOR CURRENCIES
    */
/*
  List of currencies with their productLinks for link method
  Default value is the first value
*/
const linkMethodPriceList = [
  {
    "symbol":"€", // (string or null) Currency symbol shown before donation amount
    "currencyShortName": "EUR", // (string) Currency shortName (Provide the same shortNames across settings)
    "currencyName": "Euro", // (string) Currency name shown in currency 
    "productLink" : "https://donate.stripe.com/test_5kAbIT6AedMs9GM145", // (string) Stripe productLink from product
  },
  {
    "symbol":"$",
    "currencyShortName": "USD",
    "currencyName": "US Dollar",
    "productLink" : "https://donate.stripe.com/test_dR600bcYCdMsaKQ5kk",
  },
];

// **********************************
// ********* SERVER METHOD **********
// **********************************
/*
  URL of the server's createPaymentIntent method
  POST parameters: amount, currency
*/
const createPaymentIntentUrl = "http://localhost:3003/api/create-payment-intent";
/*
  List of currencies with their productLinks for link method
  Default value is the first value
*/
const serverMethodPriceList = [
  {
    "symbol":"€", // (string or null) Currency symbol shown before donation amount
    "currencyShortName": "EUR", // (string) Currency shortName (Provide the same shortNames across settings)
    // currencyShortName is used as ID in Checkout component
    "currencyName": "Euro", // (string) Currency name shown in currency 
    "minimumCharge":0.50, // (float) Minimum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
    //(the lowest amount from the page doesn't always work, so boost it up in some cases)
    // ('Amount must convert to at least X.XX. CA$0.50 converts to approximately X.XX.')
    "maximumCharge":999999.99,// (int) Maximum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
  },
  {
    "symbol":"$",
    "currencyShortName": "USD",
    "currencyName": "US Dollar",
    "minimumCharge":0.50,
    "maximumCharge":999999.99,
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
  paymentMethod:paymentMethod,

  createPaymentIntentUrl:createPaymentIntentUrl,

  serverMethodPriceList:serverMethodPriceList,
  clientSideMethodPriceList:clientSideMethodPriceList,
  linkMethodPriceList:linkMethodPriceList,

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
