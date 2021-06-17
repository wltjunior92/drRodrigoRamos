import Link from "next/link";

import styles from './styles.module.scss';

interface DrawerMenuProps {
  closeDrawer: () => void;
}

export function DrawerMenu({ closeDrawer }: DrawerMenuProps) {
  return (
    <>
      <section className={styles.container}>
        <nav>
          <Link href="/">
            <a onClick={closeDrawer}>HOME</a>
          </Link>
          <Link href="/profissional">
            <a onClick={closeDrawer}>PROFISSIONAL</a>
          </Link>
          <Link href="/psiquiatriaPage">
            <a onClick={closeDrawer}>PSIQUIATRIA</a>
          </Link>
          <Link href="/psicodinamicaPage">
            <a onClick={closeDrawer}>PSICODINÂMICA</a>
          </Link>
          <Link href="/tratamentos">
            <a onClick={closeDrawer}>TRATAMENTOS</a>
          </Link>
          <Link href="/faq">
            <a onClick={closeDrawer}>FAQ</a>
          </Link>
          <Link href="/blog">
            <a onClick={closeDrawer}>BLOG</a>
          </Link>
          <Link href="/contato">
            <a onClick={closeDrawer}>CONTATO</a>
          </Link>
        </nav>
      </section>
      <div className={styles.bgModal}>
        <button type="button" onClick={closeDrawer}></button>
      </div>

    </>
  )
}