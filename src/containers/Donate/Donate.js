import Header from '../../components/Header/Header';
import DonationInfo from '../../components/DonationInfo/DonationInfo';
import StripeCheckoutClientSide from '../../components/StripeCheckoutClientSide/StripeCheckoutClientSide';
import './Donate.scss';

function Donate(props) {
  const PageSettings = props.PageSettings;
  
  return (
    <div className='Donate-container'>
      <Header title='Create Ad Campaign in the Tram'/>
      <DonationInfo moneyRaised='US$ 20,712'/>
      {/* <StripeCheckoutClientSide priceList={PageSettings.priceList}
      buttonText={PageSettings.donateButtonText} removeLeadingZeros={PageSettings.removeLeadingZeros}
      zeroDecimalCurrencies={PageSettings.zeroDecimalCurrencies}
      threeDecimalCurrencies={PageSettings.threeDecimalCurrencies}
      divisableByHundredCurrencies={PageSettings.divisableByHundredCurrencies} /> */}
    </div>
  );
}

export default Donate;
