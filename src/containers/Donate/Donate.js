import Header from '../../components/Header/Header';
import StripeCheckoutClientSide from '../../components/StripeCheckoutClientSide/StripeCheckoutClientSide';
import './Donate.scss';

function Donate(props) {
  const PageSettings = props.PageSettings;
  
  return (
    <div className="App">
      <Header title="Edit containers\Donate\Donate.js and save to reload."/>
      <StripeCheckoutClientSide priceList={PageSettings.priceList} buttonText={PageSettings.donateButtonText} />
    </div>
  );
}

export default Donate;
