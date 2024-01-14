import './LatestDonations.scss';
import logo from '../../assets/logo.svg';

function LatestDonations(props) {
    const moneyRaised = props.moneyRaised;
    return (
        <div className='LatestDonations-container'>
            <h3>Latest donations</h3>
            <div className='latest-donation-container'>
                <div className='latest-donation-value'>$2137</div>
                <div className='latest-donation-details'>
                    <p className='latest-donation-donor'>Hugo Bigos</p>
                    <p className='inline-separator'>●</p>
                    <p className='latest-donation-date'>2 hours ago</p>
                </div>
            </div>
            <div className='separator'></div>
            <div className='latest-donation-container'>
                <div className='latest-donation-value'>$2137</div>
                <div className='latest-donation-details'>
                    <p className='latest-donation-donor'>Hugo Bigos</p>
                    <p className='inline-separator'>●</p>
                    <p className='latest-donation-date'>2 hours ago</p>
                </div>
            </div>
            <div className='separator'></div>
            <div className='latest-donation-container'>
                <div className='latest-donation-value'>$2137</div>
                <div className='latest-donation-details'>
                    <p className='latest-donation-donor'>Hugo Bigos</p>
                    <p className='inline-separator'>●</p>
                    <p className='latest-donation-date'>2 hours ago</p>
                </div>
            </div>
            <button className='see-all-button'>See All</button>
        </div>
    );
}

export default LatestDonations;
