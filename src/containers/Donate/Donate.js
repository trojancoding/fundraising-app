import Header from '../../components/Header/Header';
import StripeCheckoutClientSide from '../../components/StripeCheckoutClientSide/StripeCheckoutClientSide';
import StripeCheckoutServer from '../../components/StripeCheckoutServer/StripeCheckoutServer';
import StripeCheckoutLink from '../../components/StripeCheckoutLink/StripeCheckoutLink';
import './Donate.scss';

function Donate(props) {
  const PageSettings = props.PageSettings;

  return (
    <div className="App">
      <Header title="Edit containers\Donate\Donate.js and save to reload." />

      {PageSettings.paymentMethod === "client-side" &&
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
      }
    </div>
  );
}

export default Donate;
