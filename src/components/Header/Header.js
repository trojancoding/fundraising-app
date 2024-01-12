import './Header.scss';
import logo from '../../assets/logo.svg';

function Header(props) {
    const headerTitle = props.title;
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                {headerTitle}
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                Learn React
            </a>
        </header>
    );
}

export default Header;
