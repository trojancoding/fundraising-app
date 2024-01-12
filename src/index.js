import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Donate from './containers/Donate/Donate'

/*
  List of currencies with their priceIds
  Default value is the first value
*/
const priceList = [
  {
    "symbol":"€", // (string or null) Currency symbol shown before donation amount
    // if symbol is null currencyShortName is shown before donation amount
    "currencyShortName": "EUR", // (string) Currency shortName
    "currencyName": "Euro", // (string) Currency name shown in currency 
    "priceId" : "price_1OXs7jAz4DzMSQxdkNE0vEcr" // (string) Stripe priceId from product
  },
  {
    "symbol":"$",
    "currencyShortName": "USD",
    "currencyName": "US Dollar",
    "priceId" : "price_1OXqzwAz4DzMSQxdAVc2CAKt"
  },
  {
    "symbol":"CA$",
    "currencyShortName": "CAD",
    "currencyName": "Canadian Dollar",
    "priceId" : "price_1OXs8dAz4DzMSQxdpq84Kq6X"
  },
  {
    "symbol":"£",
    "currencyShortName": "GBP",
    "currencyName": "British Pound",
    "priceId" : "price_1OXs9kAz4DzMSQxdUCnSQry9"
  },
];

/*
  Text on dotation form button
  Default value is "Donate"
*/
const donateButtonText = "Donate";

const PageSettings = {
  priceList:priceList,
  donateButtonText:donateButtonText
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
