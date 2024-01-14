import Header from '../../components/Header/Header';
import DonationInfo from '../../components/DonationInfo/DonationInfo';
import './Donate.scss';
import LatestDonations from '../../components/LatestDonations/LatestDonations';

function Donate(props) {
  const PageSettings = props.PageSettings;
  const fundraiserData = props.fundraiserData;

  return (
    <div className='Donate-container'>
      <Header title={fundraiserData.title} description={fundraiserData.description} newBadge={fundraiserData.newBadge}/>
      <DonationInfo moneyRaised='US$ 20,712' PageSettings={PageSettings} />
      <LatestDonations />
    </div>
  );
}

export default Donate;
