import './styles.css';

export const Header = ({ children }) => {
    return <header className="header">
        <div className="header__container header__wrapper">
            {children}
        </div>
    </header>
}