import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';

import styles from '../../styles/pages/contentPages.module.scss';
import { RichText } from 'prismic-dom';
import SEO from '../../components/SEO';

type Content = {
  image: string;
  textContent: string;
}

interface PsiquiatriaProps {
  psiquiatriaPage: {
    pageTitle: string;
    pageSubtitle: string;
    banner: string;
    title: string;
    content: Content[];
  }
}

export default function Psiquiatria({ psiquiatriaPage }: PsiquiatriaProps) {
  let invertContent = false;

  return (
    <>
      <SEO
        title="Psiquiatria"
        image="/images/logo.svg"
      />

      <div className={styles.banner} style={{ backgroundImage: `url(${psiquiatriaPage.banner})` }}>
        <section>
          <h1>{psiquiatriaPage.pageTitle}</h1>
          <h5>{psiquiatriaPage.pageSubtitle}</h5>
        </section>
      </div>
      <main className={styles.profissionalContent}>
        <h1>{psiquiatriaPage.title}</h1>
        {psiquiatriaPage.content.map((content, index) => {
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

  const { data } = await prismic.getSingle('psiquiatriapage', {});

  const psiquiatriaPage = {
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
      psiquiatriaPage,
    }
  }
}