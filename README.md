# Flexible Fundraising Single Web Page

Versatile single web page that can be adapted for various fundraising initiatives, such as hiring personnel, creating ad campaigns, or developing new features.

# Documentation

This documentation provides details on various settings and configurations that can be modified in the `index.js` and `Shared.scss` files to customize the appearance and behavior of the app.

Feel free to explore and modify settings to tailor the app to your specific needs. If you have any questions or need further assistance, refer to the comments or reach out to our team.

## Table of Contents
### 1. Main Settings
   1.1 [Payment Method](#payment-method)

### 2. Currency Settings
   2.1 [Zero-Decimal Currencies](#zero-decimal-currencies)  
   2.2 [Three-Decimal Currencies](#three-decimal-currencies)  
   2.3 [Divisible-by-Hundred Currencies](#divisible-by-hundred-currencies)

### 3. Website Data
   3.1 [Server Method](#server-method)  
   3.2 [API Endpoints](#api-endpoints)

### 4. Client-Side Method
   4.1 [Client-Side Method Price List](#client-side-method-price-list)

### 5. Link Method
   5.1 [Link Method Price List](#link-method-price-list)

### 6. Server Method
   6.1 [Server Method Price List](#server-method-price-list)

### 7. Fundraisers
   7.1 [Fundraiser Data Structure](#fundraiser-data-structure)  
   7.2 [Example Fundraisers](#example-fundraisers)

### 8. UI Settings
   8.1 [Remove Leading Zeros](#remove-leading-zeros)  
   8.2 [Donate Button Text](#donate-button-text)

### 9. Shared.scss
   - [Adjust Website Appearance](#adjust-website-appearance)

## Main Settings
### 1. Payment Method
```javascript
// Choose the payment method for the app
const paymentMethod = "client-side"; // Options: "client-side", "link", "server"
```
In the `paymentMethod` variable, choose the payment method for the app. Options are:
- `"client-side"`: Create products on Stripe with a minimum price and "sell multiple items" to achieve the end price for donation.
- `"link"`: Set Stripe links for products with "customer chooses price."
- `"server"`: Generate Stripe links on the server in real-time.
### Client-Side Method
#### Pros:
- Users can select their own donation amount on the foundation site, sent to the checkout page.
- Redirects after successful/unsuccessful payment.
- No server needed for payment processing.

#### Cons:
- "Qty 500, €0.01 each" info after the product description on the Stripe checkout page.

### Link Method
#### Pros:
- Donation amount choice is made on the Stripe website, which may seem more secure to the user.
- "Thanks for your donation" info on the Stripe website.

#### Cons:
- No redirect after successful/unsuccessful payment.
- Users cannot select the donation amount on the foundation site.

### Server Method
#### Pros:
- Users can select their own donation amount on the foundation site.
- No redirects needed.
- Allows real-time generation of Stripe links.

#### Cons:
- Requires a server to generate payment links every time.

## 2. Currency Settings
### Zero-Decimal Currencies
List of currencies (`zeroDecimalCurrencies`) without a decimal point in the input. Amounts should be provided in the currency’s smallest unit.
```javascript
// List of currencies without a decimal point in the input
const zeroDecimalCurrencies = ["BIF", "CLP", "DJF", /* ... */];
```
### Three-Decimal Currencies
List of currencies (`threeDecimalCurrencies`) that support three decimals. No specific implementation is necessary.
```javascript
// List of currencies supporting three decimals
const threeDecimalCurrencies = [];
```
### Divisible-by-Hundred Currencies
List of currencies (`divisableByHundredCurrencies`) where amounts must be evenly divisible by 100.
```javascript
// List of currencies where amounts must be evenly divisible by 100
const divisibleByHundredCurrencies = ["ISK", "UGX"];
```

## 3. Website Data
### Server Method
Set the URL of the server's `createPaymentIntent` method for the server method.
```javascript
// Set the URL of the server's createPaymentIntent method
const createPaymentIntentUrl = null; // or "http://localhost:3003/api/create-payment-intent";
```
### API Endpoints
- `submitQuestionFormUrl`: URL of the server's `submitForm` method for form submissions.
- `getDonationGoalDataUrl`: URL of the API endpoint for fetching DonationGoalData.
- `getLatestDonationsDataUrl`: URL of the API endpoint for fetching LatestDonationsData.
```javascript
// URL for form submission
const submitQuestionFormUrl = null; // or "http://localhost:3003/api/submitForm";

// URL for fetching DonationGoalData
const getDonationGoalDataUrl = null; // or "http://localhost:3003/api/getDonationGoalData";

// URL for fetching LatestDonationsData
const getLatestDonationsDataUrl = null; // or "http://localhost:3003/api/getLatestDonationsData";
```
## 4. Price List
### Client-Side Method Price List
List of currencies with their `priceIds` for the client-side method. Customize currency symbols, minimum/maximum charge amounts, and more.
```javascript
// List of currencies with their priceIds for client-side method
const clientSideMethodPriceList = [
  {
    // Example entry
    "symbol": "€",
    "currencyShortName": "EUR",
    "currencyName": "Euro",
    "priceId": "price_1OXs7jAz4DzMSQxdkNE0vEcr",
    // ... other properties
  },
  // ... other currencies
];
```
## 5. Link Method Price List
List of currencies with their `productLinks` for the link method.
```javascript
// List of currencies with their productLinks for link method
const linkMethodPriceList = [
  {
    // Example entry
    "symbol": "€",
    "currencyShortName": "EUR",
    "currencyName": "Euro",
    "productLink": "https://donate.stripe.com/test_5kAbIT6AedMs9GM145",
  },
  // ... other currencies
];
```
## 6. Server Method Price List
List of currencies for the server method. Customize currency symbols, minimum/maximum charge amounts, and more.
```javascript
// List of currencies with their properties for server method
const serverMethodPriceList = [
  {
    // Example entry
    "symbol": "€",
    "currencyShortName": "EUR",
    "currencyName": "Euro",
    "minimumCharge": 0.50,
    // ... other properties
  },
  // ... other currencies
];
```
## 7. Fundraisers
### Fundraiser Data Structure
Details on the structure of fundraiser data, including path, title, description, questionsAndAnswers, and rewards.
```javascript
// Example fundraiser data structure
const fundraiserData = {
  path: "clean-water-project",
  newBadge: true,
  title: "Clean Water Project for Rural Communities",
  description: "Join us in providing access to clean and safe drinking water...",
  questionsAndAnswers: [
    // ... questions and answers
  ],
  rewards: [
    // ... rewards
  ],
};
```
### Example Fundraisers
Example data for two fundraisers, including Clean Water Project and Tram Ad Campaign.

## 8. UI Settings
### Remove Leading Zeros
Option to remove leading zeros from the donate amount on input.
```javascript
// Option to remove leading zeros from the donate amount on input
const removeLeadingZeros = true;
```
### Donate Button Text
Customize the text on the donation form button.
```javascript
// Customize the text on the donation form button
const donateButtonText = "Donate";
```

## 9. Shared.scss
### Adjust Website Appearance

In the `Shared.scss` file, you can change variables to customize the overall appearance of the website. This file contains styling information that affects the visual presentation of the app. Below are some variables you can modify:

#### Example:

```scss
// Shared.scss

// Modify primary color
$primary-color: #3498db;

// Adjust font size
$font-size: 16px;

// Change background color
$background-color: #f2f2f2;

// Customize button styling
$button-background: $primary-color;
$button-color: #ffffff;
$button-hover-background: darken($button-background, 10%);

// Add custom styles as needed
// ...
```