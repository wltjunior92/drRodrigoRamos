import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';

import styles from '../../styles/pages/contentPages.module.scss';
import { RichText } from 'prismic-dom';

type Content = {
  image: string;
  textContent: string;
}

interface PsicodinamicaProps {
  psicodinamicaPage: {
    pageTitle: string;
    pageSubtitle: string;
    banner: string;
    title: string;
    content: Content[];
  }
}

export default function Psicodinamica({ psicodinamicaPage }: PsicodinamicaProps) {
  let invertContent = false;

  return (
    <>
      <Head>
        <title>Dr. Rodrigo Ramos | Psiquiatria</title>
      </Head>

      <div className={styles.banner} style={{ backgroundImage: `url(${psicodinamicaPage.banner})` }}>
        <section>
          <h1>{psicodinamicaPage.pageTitle}</h1>
          <h5>{psicodinamicaPage.pageSubtitle}</h5>
        </section>
      </div>
      <main className={styles.profissionalContent}>
        <h1>{psicodinamicaPage.title}</h1>
        {psicodinamicaPage.content.map((content, index) => {
          if (content.image) {
            invertContent = invertContent ? false : true;
          }
          return (
            <section
              key={index}
              className={`${styles.content} ${invertContent ? styles.contentRight : styles.contentLeft}`}
            >
              {content.image &&
                <header>
                  <img src={content.image} />
                </header>
              }
              <div dangerouslySetInnerHTML={{ __html: content.textContent }} />
            </section>
          )
        })}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const { data } = await prismic.getSingle('psicodinamicapage', {});

  const psicodinamicaPage = {
    pageTitle: RichText.asText(data.page_title),
    pageSubtitle: RichText.asText(data.page_subtitle),
    banner: data.banner.url,
    title: RichText.asText(data.content_title),
    content: data.content.map(item => {
      return {
        image: item.image?.url ?? '',
        textContent: RichText.asHtml(item.text_content),
      }
    })
  }

  return {
    props: {
      psicodinamicaPage,
    }
  }
}