import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import './CheckoutForm.scss';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const options = props.options;
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
    });


    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit} className='stripeForm'>
      <div class="separator"></div>
      <p class="text">Donation Amount</p>
      <h3>{options.priceElementSelected.symbol != null ? options.priceElementSelected.symbol : options.priceElementSelected.currencyShortName}{options.donationAmountValue}</h3>
      <PaymentElement />
            {/* Show error message to your customers */}
            {errorMessage && <div className='error'>{errorMessage}</div>}

      <button disabled={!stripe} className='donation-button'><p className='button-text'>Confirm</p><span className='icon-container'></span></button>
    </form>
  )
};

export default CheckoutForm;