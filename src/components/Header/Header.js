import './Header.scss';
import logo from '../../assets/logo.svg';

function Header(props) {
    const headerTitle = props.title;
    const headerDescription = props.description;
    const newBadge = props.newBadge;
    return (
        <div className='Header-container' id='Header-container'>
            <h1 className={newBadge ? "new-badge" : ""}>{headerTitle}</h1>
            <p className='description'>{headerDescription}</p>
        </div>
    );
}

export default Header;
