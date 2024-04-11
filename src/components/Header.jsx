import styles from './Header.module.css'

export const Header = ({count, callback}) => {
 
    console.log("render")
    return <header className={styles.header}>
        <div className={styles.logo}>CurrencyConverter</div>
    </header>
}