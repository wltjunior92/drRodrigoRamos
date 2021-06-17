import { ReactElement } from "react";

import styles from './styles.module.scss';

interface BlogCardsProps {
  children: ReactElement | ReactElement[];
}

export function BlogCards({ children }: BlogCardsProps) {
  return (
    <section className={styles.content}>
      {children}
    </section>
  )
}