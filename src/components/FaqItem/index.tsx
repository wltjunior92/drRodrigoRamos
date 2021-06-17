import { ReactElement, useState } from "react";
import { FiPlusCircle, FiMinusCircle } from 'react-icons/fi';

import styles from "./styles.module.scss";

interface FaqItemProps {
  question: string;
  children: ReactElement;
}

export function FaqItem({ children, question }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpenAnswer() {
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }
  return (
    <div className={styles.container}>
      <main className={styles.question}>
        <h1>{question}</h1>
        <button type="button" onClick={handleOpenAnswer}>
          {!isOpen ?
            <FiPlusCircle />
            :
            <FiMinusCircle />
          }
        </button>
      </main>
      <section className={`${styles.answer} ${isOpen && styles.openAnswer}`}>
        {children}
      </section>
    </div>
  )
}