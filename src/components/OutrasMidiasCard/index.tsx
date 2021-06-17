import Link from "next/link";
import { ReactElement } from "react";

import styles from './styles.module.scss';

interface OutrasMidiasCardProps {
  image?: string;
  slug: string;
  children: ReactElement | ReactElement[];
}

export function OutrasMidiasCard({
  children,
  image,
  slug,
}: OutrasMidiasCardProps) {
  return (
    <main className={styles.container}>
      <img src={image} />
      <section className={styles.content}>
        {children}
      </section>
      <Link href={`/outrasMidias/${slug}`}>
        <a />
      </Link>
    </main>
  )
}