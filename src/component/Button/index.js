import { Link } from 'react-router-dom';
import styles from './Button.module.css'

const Button = ({ texto, tipo, to }) => {
  return (
    <Link to={to}>
      <button className={`${styles.botaoPrincipal} ${styles[tipo]}`} type='submit'>{texto}</button>
    </Link>
  )
}

export default Button;