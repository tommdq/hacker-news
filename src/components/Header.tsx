import { header, link } from './Header.css'

export const Header = () => {
  return (
    <nav className={header}>
      <img className='' src='/logo.svg' alt='Logo' />
      <a className={link} href='/'>
        Hacker News
      </a>
    </nav>
  )
}
