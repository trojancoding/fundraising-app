# Fundraising React App

## Overview

The Fundraising React App is a flexible single-page web application designed to support various fundraising initiatives. Whether you're raising funds for hiring personnel, launching ad campaigns, or developing new features, this app provides a versatile platform. The app allows you to set up multiple fundraisers with different goals and donation options. It seamlessly integrates with the Stripe payment gateway, offering multiple methods to handle donations.

## Table of Contents

- [Installation](#installation)
- [Settings](#settings)
  - [Main Settings](#main-settings)
  - [Currency Settings](#currency-settings)
  - [Website Data](#website-data)
  - [Server Method](#server-method)
  - [API Endpoints](#api-endpoints)
  - [Fundraisers](#fundraisers)
- [UI Settings](#ui-settings)
- [Example Backend Server](#example-backend-server)
- [Hosted Examples](#hosted-examples)

## Installation

To install and run the Fundraising React App locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/fundraising-app.git`
2. Navigate to the app directory: `cd fundraising-app`
3. Install dependencies: `npm install`
4. Start the app: `npm start`

## Settings

### Main Settings

In the `src/index.js` file, you can modify the following main settings:

#### Payment Method

Choose the payment method for handling donations:

- `"client-side"`: Create products on Stripe with a minimum price, allowing users to select their donation amount on the foundation site.
- `"link"`: Set Stripe links for products with "customer chooses price" on the Stripe website.
- `"server"`: Generate Stripe links on the server in real-time.

Example:
```javascript
const paymentMethod = "server";
```

### Currency Settings

Adjust currency settings, including zero-decimal currencies and divisible-by-hundred currencies.

Example:
```javascript
const zeroDecimalCurrencies = ["BIF", "CLP", "DJF", ...];
const divisableByHundredCurrencies = ["ISK", "UGX"];
```

### Website Data

Set static and dynamic data for the website.

### Server Method

Specify the URL for the server's `createPaymentIntent` method for the server payment method.

Example:
```javascript
const createPaymentIntentUrl = "http://localhost:3003/api/create-payment-intent";
```

### API Endpoints

Configure the URLs for server API endpoints for submitting forms and fetching donation information.

Example:
```javascript
const submitQuestionFormUrl = 'http://localhost:3003/api/submitForm';
const getDonationGoalDataUrl = 'http://localhost:3003/api/getDonationGoalData';
const getLatestDonationsDataUrl = 'http://localhost:3003/api/getLatestDonationsData';
```

### Fundraisers

Set up multiple fundraisers with specific details, including paths, titles, descriptions, donation amounts, and rewards.

Example:
```javascript
const fundraisersData = [
  {
    path: "clean-water-project",
    title: "Clean Water Project for Rural Communities",
    // ...other details
  },
  {
    path: "tram-ad-campaign",
    title: "Create Ad Campaign in the Tram",
    // ...other details
  },
  // Add more fundraisers as needed
];
```

## UI Settings

Adjust the appearance of the website by modifying variables in the `Shared.scss` file. Customize donation buttons, form text, and more.

Example:
```scss
// Example UI settings in Shared.scss
// Colors Variables
$font-main-color: #222222;
$font-text-color: #22222277;
$font-bright-color: #FFFFFF;

$container-background: #FFFFFF;

$color-main: #9C79E7;
$color-accent: #F5E6DC;
$color-accent-2: #E4B290;
$color-accent-3: #F0DDD1;
$color-mild: #2222221D;
$color-error: #e77979;
// ...other UI settings
```

## Example Backend Server

For a sample backend server using Express.js, check out the [fundraising-app-express-js-example](https://github.com/trojancoding/fundraising-app-express-js-example) repository.

## Hosted Examples

Explore hosted examples of the Fundraising React App on the following links:

- [Clean Water Project](https://fundraising-app.vercel.app/clean-water-project)
- [Tram Ad Campaign](https://fundraising-app.vercel.app/tram-ad-campaign)

### Hosting on Cloudflare Pages

To host the app on Cloudflare Pages, follow these general steps:

1. Connect your GitHub repository to Cloudflare Pages.
2. Configure the build settings for the React app.
3. Deploy the app on Cloudflare Pages.

For detailed instructions, refer to the [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/).