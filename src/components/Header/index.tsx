import Link from 'next/link';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

import { ActiveLink } from '../ActiveLink';
import { DrawerMenu } from '../DrawerMenu';
import styles from './styles.module.scss';

export function Header() {
  const [isDrawerMenuOpen, setIsDrawerMenuOpen] = useState(false);

  function openDrawerMenu() {
    setIsDrawerMenuOpen(true)
  }

  function closeDrawerMenu() {
    setIsDrawerMenuOpen(false)
  }

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <a>
            <img src="/images/logo.svg" alt="Rodrigo Ramos" />
          </a>
        </Link>
        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>HOME</a>
          </ActiveLink>
          <ActiveLink href="/profissional" activeClassName={styles.active}>
            <a>PROFISSIONAL</a>
          </ActiveLink>
          <ActiveLink href="/psiquiatriaPage" activeClassName={styles.active}>
            <a>PSIQUIATRIA</a>
          </ActiveLink>
          <ActiveLink href="/psicodinamicaPage" activeClassName={styles.active}>
            <a>PSICODINÂMICA</a>
          </ActiveLink>
          <ActiveLink href="/tratamentos" activeClassName={styles.active}>
            <a>TRATAMENTOS</a>
          </ActiveLink>
          <ActiveLink href="/faq" activeClassName={styles.active}>
            <a>FAQ</a>
          </ActiveLink>
          <ActiveLink href="/blog" activeClassName={styles.active}>
            <a>BLOG</a>
          </ActiveLink>
          <ActiveLink href="/contato" activeClassName={styles.active}>
            <a>CONTATO</a>
          </ActiveLink>
        </nav>
        <button
          type="button"
          onClick={openDrawerMenu}
        >
          <FiMenu size={30} />
        </button>
        {isDrawerMenuOpen &&
          <DrawerMenu closeDrawer={closeDrawerMenu} />
        }
      </div>
    </header>
  );
}