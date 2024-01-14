import './DonationInfo.scss';
import StripeCheckoutClientSide from '../../components/StripeCheckoutClientSide/StripeCheckoutClientSide';
import StripeCheckoutServer from '../../components/StripeCheckoutServer/StripeCheckoutServer';
import StripeCheckoutLink from '../../components/StripeCheckoutLink/StripeCheckoutLink';

function DonationInfo(props) {
    const PageSettings = props.PageSettings;
    const moneyRaised = props.moneyRaised;
    return (
        <div className='DonationInfo-container'>
            <h2 className='money-raised'>{moneyRaised}</h2>
            <div className='progress-bar-container'>
                <div className='progress-bar'></div>
            </div>
            <p className='text'>69% raised of US$ 30,000</p>
            <div className='separator'></div>
            <h3>Support this project</h3>

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

export default DonationInfo;
