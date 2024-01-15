import Header from '../../components/Header/Header';
import DonationInfo from '../../components/DonationInfo/DonationInfo';
import './Donate.scss';
import LatestDonations from '../../components/LatestDonations/LatestDonations';
import QuestionsAnswers from '../../components/QuestionsAnswers/QuestionsAnswers';
import QuestionForm from '../../components/QuestionForm/QuestionForm';

function Donate(props) {
  const PageSettings = props.PageSettings;
  const fundraiserData = props.fundraiserData;

  return (
    <div className='Donate-container'>
      <div className='column'>
      <Header title={fundraiserData.title} description={fundraiserData.description} newBadge={fundraiserData.newBadge}/>
      <QuestionsAnswers questionsAndAnswers={fundraiserData.questionsAndAnswers} rewards={fundraiserData.rewards} />
      <QuestionForm />
      </div>
      <div className='column'>
      <DonationInfo moneyRaised='US$ 20,712' PageSettings={PageSettings} />
      <LatestDonations />
      </div>
    </div>
    // <div className='Donate-container'>
    //   <Header title={fundraiserData.title} description={fundraiserData.description} newBadge={fundraiserData.newBadge}/>
    //   <DonationInfo moneyRaised='US$ 20,712' PageSettings={PageSettings} />
    //   <LatestDonations />
    //   <QuestionsAnswers questionsAndAnswers={fundraiserData.questionsAndAnswers} rewards={fundraiserData.rewards} />
    //   <QuestionForm />
    // </div>
  );
}

export default Donate;
