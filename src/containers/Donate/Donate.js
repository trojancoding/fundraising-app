import Header from '../../components/Header/Header';
import DonationInfo from '../../components/DonationInfo/DonationInfo';
import StripeCheckoutClientSide from '../../components/StripeCheckoutClientSide/StripeCheckoutClientSide';
import StripeCheckoutServer from '../../components/StripeCheckoutServer/StripeCheckoutServer';
import StripeCheckoutLink from '../../components/StripeCheckoutLink/StripeCheckoutLink';
import './Donate.scss';
import LatestDonations from '../../components/LatestDonations/LatestDonations';
import QuestionForm from '../../components/QuestionForm/QuestionForm';

function Donate(props) {
  const PageSettings = props.PageSettings;

  return (
    <div className='Donate-container'>
      <Header title='Create Ad Campaign in the Tram'/>
      <DonationInfo moneyRaised='US$ 20,712' />
      <LatestDonations />
      <QuestionForm />
      {/* {PageSettings.paymentMethod === "client-side" &&
         <StripeCheckoutClientSide priceList={PageSettings.clientSideMethodPriceList}
          buttonText={PageSettings.donateButtonText} removeLeadingZeros={PageSettings.removeLeadingZeros}
          zeroDecimalCurrencies={PageSettings.zeroDecimalCurrencies}
          threeDecimalCurrencies={PageSettings.threeDecimalCurrencies}
          divisableByHundredCurrencies={PageSettings.divisableByHundredCurrencies}
        />
      }
      {PageSettings.paymentMethod === "server" &&
        <StripeCheckoutServer priceList={PageSettings.serverMethodPriceList}
          buttonText={PageSettings.donateButtonText} removeLeadingZeros={PageSettings.removeLeadingZeros}
          zeroDecimalCurrencies={PageSettings.zeroDecimalCurrencies}
          threeDecimalCurrencies={PageSettings.threeDecimalCurrencies}
          divisableByHundredCurrencies={PageSettings.divisableByHundredCurrencies}
          createPaymentIntentUrl={PageSettings.createPaymentIntentUrl}
        />
      }
      {PageSettings.paymentMethod === "link" &&
        <StripeCheckoutLink priceList={PageSettings.linkMethodPriceList}
          buttonText={PageSettings.donateButtonText} /> 
      } */}
    </div>
  );
}

export default Donate;
