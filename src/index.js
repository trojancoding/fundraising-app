import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Donate from './containers/Donate/Donate'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

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
      - user can select his own donation amount on foundation site
      - no redirects
    cons:
      - server needed to generate payment links every time

*/
const paymentMethod = "client-side";


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
const zeroDecimalCurrencies = ["BIF", "CLP", "DJF", "GNF", "JPY", "KMF", "KRW", "MGA", "PYG", "RWF", "UGX", "VND", "VUV", "XAF", "XOF", "XPF"]; // currency shortNames

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
const divisableByHundredCurrencies = ["ISK", "UGX"]; // currency shortNames

// **********************************
// **********************************
// ********* WEBSITE DATA ***********
// **********************************
// **********************************

// Set website static/dynamic data

// **********************************
// ********* SERVER METHOD **********
// **********************************
/*
  URL of the server's createPaymentIntent method
  POST parameters: amount, currency, donationPath (works as id)
*/
const createPaymentIntentUrl = null;//"http://localhost:3003/api/create-payment-intent";


// **********************************
// ********* API ENDPOINTS **********
// **********************************
/*
  URL of the server's submitForm method
  POST parameters: message, email, donationPath (works as id)
  string or null
*/
const submitQuestionFormUrl = null;//'http://localhost:3003/api/submitForm';

// Url of API endpoint that gets DonationInfo data
// GET parameters: donationPath (works as id)
// returned data should be JSON
// DonationGoalData accepts array of donation info in different currencies at the same time
// DonationGoalData format: (array of objects)
//   {
//     goalArray:[
//         {
//             currencyShortName:"USD",// currency in which amount is stated
//             currencySymbol:"$",// string of donation currency symbol that is shown before donation amount
//             goalAmount: 10000, // goal amount number in the currency
//             raisedAmount: 500, // raised amount number in the currency
//         },
//         {
//             currencyShortName:"EUR",
//             currencySymbol:"€",
//             goalAmount: 9190,
//             raisedAmount: 460,
//         },
//     ]
// }
// null or url string
const getDonationGoalDataUrl =  null;//'http://localhost:3003/api/getDonationGoalData';
const donationGoalDataFetchInterval = 1000; //interval in ms

// Url of API endpoint that gets LatestDonations data
// GET parameters: donationPath (works as id)
// returned data should be JSON
// LatestDonationsData format: (array of objects)
// [
// {
//   donorName: "Anonymous",     //    String of donor name
//   donationAmount: 200, //   donation amount number
//   donationCurrency: "$", // string of donation currency that is shown before donation amount
//   donationTimestamp: 186400000, // unix timestamp of the donation
// },
// {
//   donorName: "Anonymous 2",     //    String of donor name
//   donationAmount: 100, //   donation amount number
//   donationCurrency: "$", // string of donation currency that is shown before donation amount
//   donationTimestamp: 126400000, // unix timestamp of the donation
// }
// ]
// null or url string
const getLatestDonationsDataUrl =  null;//'http://localhost:3003/api/getLatestDonationsData';
const latestDonationsDataFetchInterval = 1000; //interval in ms



// **********************************
// ********** FUNDRAISERS ***********
// **********************************
const fundraisersData = [
  {
    // Path to the fundraiser (example.com/path)
    path: "clean-water-project",
    newBadge: true,// [NEW] badge on the title
    // Title at the top of the page
    title: "Clean Water Project for Rural Communities",
    // Description under the title
    description: "Join us in providing access to clean and safe drinking water for rural communities. Your support will help install water purification systems and ensure that families have a sustainable source of clean water for their daily needs.",
    /*
    Donation amount input placeholder
    */
    donationAmountPlaceholder:"5.00",
    questionsAndAnswers: [
      {
        question: "Why is access to clean water crucial for rural communities?",
        answer: "Access to clean water is essential for health and well-being. It helps prevent waterborne diseases and provides a foundation for community development, education, and economic stability."
      },
      {
        question: "How will the funds be used in this clean water project?",
        answer: "The funds raised will be used to install water purification systems, drill wells, and implement sustainable water management practices in rural areas, ensuring a long-term solution to the water crisis."
      },
      {
        question: "What impact will my donation have on the community?",
        answer: "Your donation will directly contribute to improving the quality of life for people in rural communities by providing them with a basic necessity – clean and safe drinking water. It's a step towards breaking the cycle of poverty and promoting overall well-being."
      }
    ],
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
    clientSideMethodPriceList : [
      {
        "symbol": "€", // (string or null) Currency symbol shown before donation amount
        // if symbol is null currencyShortName is shown before donation amount
        "currencyShortName": "EUR", // (string) Currency shortName (Provide the same shortNames across settings)
        "currencyName": "Euro", // (string) Currency name shown in currency 
        "priceId": "price_1OZd5QAz4DzMSQxdsmQ8Y0BY", // (string) Stripe priceId from product
        "productPrice": 0.01, // (float) Stripe product price to calculate quantity for desired amount
        "minimumCharge": 0.50, // (float) Minimum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
        //(the lowest amount from the page doesn't always work, so boost it up in some cases)
        // ('Amount must convert to at least X.XX. CA$0.50 converts to approximately X.XX.')
        "maximumCharge": 999999.99,// (int) Maximum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
      },
      {
        "symbol": "$",
        "currencyShortName": "USD",
        "currencyName": "US Dollar",
        "priceId": "price_1OZd4xAz4DzMSQxdYlBvd0p7",
        "productPrice": 0.01,
        "minimumCharge": 0.50,
        "maximumCharge": 999999.99,
      },
      {
        "symbol": "£",
        "currencyShortName": "GBP",
        "currencyName": "British Pound",
        "priceId": "price_1OZd66Az4DzMSQxdSwUMbg8w",
        "productPrice": 0.01,
        "minimumCharge": 0.40,
        "maximumCharge": 999999.99,
      },
      {
        "symbol": null,
        "currencyShortName": "ISK",
        "currencyName": "Icelandic Króna",
        "priceId": "price_1OZd9iAz4DzMSQxdKmJXliFc",
        "productPrice": 0.01,
        "minimumCharge": 100,
        "maximumCharge": 999999.99,
      },
    ],
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
    linkMethodPriceList : [
      {
        "symbol": "€", // (string or null) Currency symbol shown before donation amount
        "currencyShortName": "EUR", // (string) Currency shortName (Provide the same shortNames across settings)
        "currencyName": "Euro", // (string) Currency name shown in currency 
        "productLink": "https://donate.stripe.com/test_5kAbIT6AedMs9GM145", // (string) Stripe productLink from product
      },
      {
        "symbol": "$",
        "currencyShortName": "USD",
        "currencyName": "US Dollar",
        "productLink": "https://donate.stripe.com/test_dR600bcYCdMsaKQ5kk",
      },
    ],
    // **********************************
    // ********* SERVER METHOD **********
    // **********************************

    /*
      List of currencies with their productLinks for link method
      Default value is the first value
    */
      serverMethodPriceList : [
      {
        "symbol": "€", // (string or null) Currency symbol shown before donation amount
        "currencyShortName": "EUR", // (string) Currency shortName (Provide the same shortNames across settings)
        // currencyShortName is used as ID in Checkout component
        "currencyName": "Euro", // (string) Currency name shown in currency 
        "minimumCharge": 0.50, // (float) Minimum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
        //(the lowest amount from the page doesn't always work, so boost it up in some cases)
        // ('Amount must convert to at least X.XX. CA$0.50 converts to approximately X.XX.')
        "maximumCharge": 999999.99,// (int) Maximum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
      },
      {
        "symbol": "$",
        "currencyShortName": "USD",
        "currencyName": "US Dollar",
        "minimumCharge": 0.50,
        "maximumCharge": 999999.99,
      },
    ],
    rewards: [
      {
        goal: "Donate $25", // Default goal when goalCurrencies is empty/doesn't have currency active
        goalCurrencies: [ // Goal in different currencies
          {
            currencyShortName:"USD",
            goal:"Donate $25",
          },
          {
            currencyShortName:"EUR",
            goal:"Donate €20",
          },
        ],
        title: "Receive a personalized digital certificate",
        description: "Receive a digital certificate expressing gratitude for your contribution to the Clean Water Project."
      },
      {
        goal: "Donate $50",
        goalCurrencies: [ // Goal in different currencies
          {
            currencyShortName:"USD",
            goal:"Donate $50",
          },
          {
            currencyShortName:"EUR",
            goal:"Donate €45",
          },
        ],
        title: "Get a photo book documenting the project",
        description: "Receive a photo book showcasing the progress of the Clean Water Project, including pictures of installations, community members, and the positive impact of your donation."
      },
      {
        goal: "Donate $200",
        goalCurrencies: [ // Goal in different currencies
        {
          currencyShortName:"USD",
          goal:"Donate $200",
        },
        {
          currencyShortName:"EUR",
          goal:"Donate €185",
        },
      ],
        title: "Name a water purification system after you",
        description: "Have a water purification system named after you or a person of your choice, recognizing your significant contribution to providing clean water to a community."
      }
    ]
  },

  // Second fundraiser

  {
    // Path to the fundraiser (example.com/path)
    path: "tram-ad-campaign",
    newBadge: false, // [NEW] badge on the title
    // Title at the top of the page
    title: "Create Ad Campaign in the Tram",
    // Description under the title
    description: "The campaign will feature posters and banners that highlight the benefits of meditation and mindfulness. We believe that by spreading awareness about the importance of mental health, we can help people lead happier and healthier lives.",
    /*
    Donation amount input placeholder
    */
    donationAmountPlaceholder:"10.00",
    questionsAndAnswers: [
      {
        question: "What is the purpose of a tram campaign promoting meditation and mindfulness?",
        answer: "A tram campaign promoting meditation and mindfulness could help raise awareness about these practices and encourage people to incorporate them into their daily lives."
      },
      {
        question: "What are some benefits of practicing meditation and mindfulness?",
        answer: "Meditation and mindfulness practices have been shown to have a variety of health benefits, including reducing stress and anxiety, improving sleep, and fostering compassion and empathy."
      },
      {
        question: "What are some mindfulness exercises?",
        answer: "Here are some mindfulness exercises you can try: Body scan meditation, Mindful breathing, Walking meditation, Loving-kindness meditation, Mindful listening."
      }
    ],
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
    clientSideMethodPriceList : [
      {
        "symbol": "€", // (string or null) Currency symbol shown before donation amount
        // if symbol is null currencyShortName is shown before donation amount
        "currencyShortName": "EUR", // (string) Currency shortName (Provide the same shortNames across settings)
        "currencyName": "Euro", // (string) Currency name shown in currency 
        "priceId": "price_1OXs7jAz4DzMSQxdkNE0vEcr", // (string) Stripe priceId from product
        "productPrice": 0.01, // (float) Stripe product price to calculate quantity for desired amount
        "minimumCharge": 0.50, // (float) Minimum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
        //(the lowest amount from the page doesn't always work, so boost it up in some cases)
        // ('Amount must convert to at least X.XX. CA$0.50 converts to approximately X.XX.')
        "maximumCharge": 999999.99,// (int) Maximum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
      },
      {
        "symbol": "$",
        "currencyShortName": "USD",
        "currencyName": "US Dollar",
        "priceId": "price_1OXqzwAz4DzMSQxdAVc2CAKt",
        "productPrice": 0.01,
        "minimumCharge": 0.50,
        "maximumCharge": 999999.99,
      },
      {
        "symbol": "CA$",
        "currencyShortName": "CAD",
        "currencyName": "Canadian Dollar",
        "priceId": "price_1OXs8dAz4DzMSQxdpq84Kq6X",
        "productPrice": 0.01,
        "minimumCharge": 0.50,
        "maximumCharge": 999999.99,
      },
      {
        "symbol": "£",
        "currencyShortName": "GBP",
        "currencyName": "British Pound",
        "priceId": "price_1OXs9kAz4DzMSQxdUCnSQry9",
        "productPrice": 0.01,
        "minimumCharge": 0.40,
        "maximumCharge": 999999.99,
      },
      {
        "symbol": null,
        "currencyShortName": "ISK",
        "currencyName": "Icelandic Króna",
        "priceId": "price_1OYG6PAz4DzMSQxdFonqWysw",
        "productPrice": 0.01,
        "minimumCharge": 100,
        "maximumCharge": 999999.99,
      },
    ],
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
    linkMethodPriceList : [
      {
        "symbol": "€", // (string or null) Currency symbol shown before donation amount
        "currencyShortName": "EUR", // (string) Currency shortName (Provide the same shortNames across settings)
        "currencyName": "Euro", // (string) Currency name shown in currency 
        "productLink": "https://donate.stripe.com/test_5kAbIT6AedMs9GM145", // (string) Stripe productLink from product
      },
      {
        "symbol": "$",
        "currencyShortName": "USD",
        "currencyName": "US Dollar",
        "productLink": "https://donate.stripe.com/test_dR600bcYCdMsaKQ5kk",
      },
    ],
    // **********************************
    // ********* SERVER METHOD **********
    // **********************************

    /*
      List of currencies with their productLinks for link method
      Default value is the first value
    */
      serverMethodPriceList : [
      {
        "symbol": "€", // (string or null) Currency symbol shown before donation amount
        "currencyShortName": "EUR", // (string) Currency shortName (Provide the same shortNames across settings)
        // currencyShortName is used as ID in Checkout component
        "currencyName": "Euro", // (string) Currency name shown in currency 
        "minimumCharge": 0.50, // (float) Minimum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
        //(the lowest amount from the page doesn't always work, so boost it up in some cases)
        // ('Amount must convert to at least X.XX. CA$0.50 converts to approximately X.XX.')
        "maximumCharge": 999999.99,// (int) Maximum charge amount from stripe website (https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts)
      },
      {
        "symbol": "$",
        "currencyShortName": "USD",
        "currencyName": "US Dollar",
        "minimumCharge": 0.50,
        "maximumCharge": 999999.99,
      },
    ],
    rewards: [
      {
        goal: "Donate $10",
        goalCurrencies: [ // Goal in different currencies
        {
          currencyShortName:"USD",
          goal:"Donate $10",
        },
        {
          currencyShortName:"EUR",
          goal:"Donate €9",
        },
      ],
        title: "Get an exclusive Discord Donor rank",
        description: "Discord Donor rank gives you access to a private channel and special emotes."
      },
      {
        goal: "Donate $25",
        goalCurrencies: [ // Goal in different currencies
        {
          currencyShortName:"USD",
          goal:"Donate $25",
        },
        {
          currencyShortName:"EUR",
          goal:"Donate €20",
        },
      ],
        title: "Get a personalized thank-you",
        description: "Get a personalized thank-you message from the organization and a shoutout on social media."
      },
      {
        goal: "Donate $100",
        goalCurrencies: [ // Goal in different currencies
        {
          currencyShortName:"USD",
          goal:"Donate $100",
        },
        {
          currencyShortName:"EUR",
          goal:"Donate €90",
        },
      ],
        title: "Get a custom-made T-shirt",
        description: "Get a custom-made T-shirt with the organization's logo."
      },
    ]
  },
]


// **********************************
// ********** UI SETTINGS ***********
// **********************************

// Adjust website appearance
/*
  You can change variables in Shared.scss file to change website appearance
*/

/*
  Remove leading zeros from donate amount on input
*/
const removeLeadingZeros = true;

/*
  Text on dotation form button
  Default value is "Donate"
*/
const donateButtonText = "Donate";

/*
  Text above donate button
*/
const donationInfoHeadingText = "Support this project";

/*
  Text between % and raisedValue
*/
const donationInfoProgressText = "raised of";

/*
  Max message length
*/
const maxFormCharacters = 300;
/*
  Text in question form heading
*/
const questionFormHeadingText = "Do you have any questions?";
/*
  Text above email input
*/
const questionFormEmailText = "Enter your email";
/*
  Text above question input
*/
const questionFormQuestionText = "Ask a question";
/*
  Email input placeholder
*/
const emailPlaceholder = "example@email.com";
/*
  Question input placeholder
*/
const questionPlaceholder = "What do you want to know?";

/*
  Text in Q&A header
*/
const questionsAndAnswersHeadingText = "Q&A";
/*
  Text in Rewards header
*/
const rewardsHeadingText = "Rewards";

/*
  Text above donations
*/
const latestDonationsHeadingText = "Latest donations";

/*
  No donations loaded message
*/
const latestDonationsNoDonationsText = "Be the first one to donate!";


// Import settings to props
const PageSettings = {
  paymentMethod: paymentMethod,

  createPaymentIntentUrl: createPaymentIntentUrl,
  getDonationGoalDataUrl: getDonationGoalDataUrl,
  getLatestDonationsDataUrl: getLatestDonationsDataUrl,
  submitQuestionFormUrl: submitQuestionFormUrl,

  donationGoalDataFetchInterval:donationGoalDataFetchInterval,
  latestDonationsDataFetchInterval: latestDonationsDataFetchInterval,

  // Now in fundraisersData for every fundraiser
  // serverMethodPriceList: serverMethodPriceList,
  // clientSideMethodPriceList: clientSideMethodPriceList,
  // linkMethodPriceList: linkMethodPriceList,

  rewardsHeadingText:rewardsHeadingText,
  questionsAndAnswersHeadingText:questionsAndAnswersHeadingText,
  questionPlaceholder:questionPlaceholder,
  emailPlaceholder:emailPlaceholder,
  questionFormQuestionText:questionFormQuestionText,
  questionFormEmailText:questionFormEmailText,

  questionFormHeadingText:questionFormHeadingText,
  donationInfoHeadingText:donationInfoHeadingText,
  // Now in fundraisersData
  //donationAmountPlaceholder:donationAmountPlaceholder,
  donationInfoProgressText:donationInfoProgressText,
  maxFormCharacters:maxFormCharacters,
  latestDonationsHeadingText:latestDonationsHeadingText,
  latestDonationsNoDonationsText:latestDonationsNoDonationsText,
  donateButtonText: donateButtonText,
  removeLeadingZeros: removeLeadingZeros,

  zeroDecimalCurrencies: zeroDecimalCurrencies,
  divisableByHundredCurrencies: divisableByHundredCurrencies,
  threeDecimalCurrencies: threeDecimalCurrencies,
}

// Create routes for every fundraiser
var pathArray = [];
for (let index = 0; index < fundraisersData.length; index++) {
  const fundraiserData = fundraisersData[index];
  pathArray.push({
    path: fundraiserData.path,
    element: <Donate PageSettings={PageSettings} fundraiserData={fundraiserData} />,
    errorElement: <Donate PageSettings={PageSettings} fundraiserData={fundraiserData} />,
  })
}

// On path "/" or fundraiser not found redirect to the first fundraiser
if (pathArray.length > 0) {
  pathArray.push(
    {
      path: "/",
      element: <Donate PageSettings={PageSettings} fundraiserData={fundraisersData[0]} />,
      errorElement: <Donate PageSettings={PageSettings} fundraiserData={fundraisersData[0]} />,
    }
  )
}

const router = createBrowserRouter(pathArray);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
