import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';
import { useState } from 'react';
import { FaqItem } from '../../components/FaqItem';
import SEO from '../../components/SEO';

type Item = {
  id: string;
  type: string;
  question: string;
  answer: string;
}

interface FaqProps {
  questions: any[];
}

export default function Faq({ questions }: FaqProps) {
  const [selectedList, setSelectedList] = useState([]);
  const [selectedType, setSelectedType] = useState('');

  function handleSelectType(type: string, index: number) {
    setSelectedType(type);
    setSelectedList(questions[index])
  }

  return (
    <>
      <SEO
        title="FAQ"
        image="/images/logo.svg"
      />

      <header className={styles.headerContent}>
        <main>
          <h1>FAQ</h1>
          <div>
            <span>?</span>
          </div>
        </main>
      </header>
      <div className={styles.content}>
        <header>
          <div>
            <h1>Titulo da página</h1>
            <p>Descrição e/ou instruções</p>
          </div>
        </header>
        <main>
          <nav>
            <ul>
              {questions.map((item, index) => (
                <li key={index}>
                  <button
                    className={selectedType === item[0].type ? styles.activeButton : ''}
                    onClick={() => handleSelectType(item[0].type, index)}
                    type="button">
                    {item[0].type}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <section>
            {selectedList.length !== 0 ?
              (selectedList.map(question => (
                <FaqItem
                  key={question.id}
                  question={question.question}
                >
                  <div dangerouslySetInnerHTML={{ __html: question.answer }} />
                </FaqItem>
              )))
              :
              <div className={styles.message}>
                <h1>Selecione uma categoria</h1>
              </div>
            }
          </section>
        </main>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    Prismic.predicates.at('document.type', 'faq'),
    {
      orderings: '[my.faq.tags]'
    }
  );

  const typesList = response.results.map(item => {
    return item.tags[0];
  }).sort()

  let types = [];

  typesList.forEach(item => {
    if (!types.includes(item)) {
      types.push(item);
    }
  })

  const unformatedQuestions = response.results.map(item => {
    return {
      id: item.id,
      type: item.tags[0],
      question: RichText.asText(item.data.question),
      answer: RichText.asHtml(item.data.answer),
    }
  })

  const questions = [];
  let list: Item[] = [];

  types.forEach(type => {
    unformatedQuestions.forEach(item => {
      if (item.type === type) {
        list.push(item);
      }
    })
    questions.push(list);
    list = []
  })

  return {
    props: {
      questions
    }
  }
}