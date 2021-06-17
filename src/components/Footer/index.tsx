import Link from 'next/link';
import { FiInstagram, FiYoutube, FiFacebook } from 'react-icons/fi';

import styles from './styles.module.scss';

export function Footer() {
  return (
    <>
      <footer className={styles.container}>
        <img src="/images/line.svg" />
        <section className={styles.content}>
          <img src="/images/logo.svg" />
          <div>
            <nav>
              <Link href="/">
                <a>HOME</a>
              </Link>
              <Link href="/profissional">
                <a>PROFISSIONAL</a>
              </Link>
              <Link href="/psiquiatriaPage">
                <a>PSIQUIATRIA</a>
              </Link>
              <Link href="/psicodinamicaPage">
                <a>PSICODINAMICA</a>
              </Link>
              <Link href="/tratamentos">
                <a>TRATAMENTOS</a>
              </Link>
              <Link href="/faq">
                <a>FAQ</a>
              </Link>
              <Link href="/blog">
                <a>BLOG</a>
              </Link>
              <Link href="/contato">
                <a>CONTATO</a>
              </Link>
            </nav>
            <main>
              <a target="__blank" href="https://www.instagram.com/rodrigoramosmd/">
                <FiInstagram />
              </a>
              <a target="__blank" href="https://www.facebook.com/rodrigoramosmd/">
                <FiFacebook />
              </a>
              <a target="__blank" href="#">
                <FiYoutube />
              </a>
            </main>
          </div>
        </section>
        <footer>
          <span>Site criado por <a href="https://www.linkedin.com/in/wltjunior/" target="_blank">Walter Júnior</a></span>
        </footer>
      </footer>
    </>
  )
}