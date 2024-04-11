import styles from './Header.module.css'

export const Header = ({count, callback}) => {
 
    return <header className={styles.header}>
        <div className={styles.logo}>CurrencyConverter</div>
    </header>
}