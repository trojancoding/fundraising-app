import './DonationInfo.scss';
import logo from '../../assets/logo.svg';

function DonationInfo(props) {
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
            <div className='input-container'>
                <div className='currency-dropdown'>US$</div>
                <input className='donation-input' type='text' placeholder='5.00'/>
            </div>
            <button className='donation-button'><p className='button-text'>Donate</p><span className='icon-container'></span></button>
        </div>
    );
}

export default DonationInfo;
