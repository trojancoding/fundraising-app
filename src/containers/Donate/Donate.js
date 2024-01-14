import Header from '../../components/Header/Header';
import DonationInfo from '../../components/DonationInfo/DonationInfo';
import './Donate.scss';
import LatestDonations from '../../components/LatestDonations/LatestDonations';
import QuestionsAnswers from '../../components/QuestionsAnswers/QuestionsAnswers';

function Donate(props) {
  const PageSettings = props.PageSettings;
  const fundraiserData = props.fundraiserData;

  return (
    <div className='Donate-container'>
      <Header title={fundraiserData.title} description={fundraiserData.description} newBadge={fundraiserData.newBadge}/>
      <DonationInfo moneyRaised='US$ 20,712' PageSettings={PageSettings} />
      <LatestDonations />
      <QuestionsAnswers questionsAndAnswers={fundraiserData.questionsAndAnswers} rewards={fundraiserData.rewards} />
    </div>
  );
}

export default Donate;
