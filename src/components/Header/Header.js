import './Header.scss';
import logo from '../../assets/logo.svg';

function Header(props) {
    const headerTitle = props.title;
    return (
        <div className='Header-container'>
            <h1>{headerTitle}</h1>
            <p className='description'>The campaign will feature posters and banners that highlight the benefits of meditation and mindfulness. We believe that by spreading awareness about the importance of mental health, we can help people lead happier and healthier lives.</p>
        </div>
    );
}

export default Header;
