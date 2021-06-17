import { GetServerSideProps } from "next"
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import Prismic from '@prismicio/client';

import { getPrismicClient } from "../../services/prismic";

import styles from './styles.module.scss';
import { ShareBox } from "../../components/ShareBox";

type OutrasMidiasPosts = {
  id: string;
  slug: string;
  title: string;
  banner: string;
}

interface OutrasMidiasProps {
  post: {
    slug: string,
    title: string;
    description: string;
    author: string;
    authorProfile: string;
    authorAvatar: string;
    authorDescription: string;
    updatedAt: string;
    banner: string;
    embed: string;
  };
  outrasMidiasPosts: OutrasMidiasPosts[];
}

export default function NeurocienciaPost({ post, outrasMidiasPosts }: OutrasMidiasProps) {
  const router = useRouter();

  const path = router.asPath;

  return (
    <>
      <Head>
        <title>Dr. Rodrigo Ramos | {post.title}</title>
      </Head>

      {post.banner &&
        <div className={styles.banner} style={{ backgroundImage: `url(${post.banner})` }} />
      }
      <main className={styles.contentContainer}>
        <article className={styles.textContentContent}>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.description }} />
          <section>
            <div className={styles.embedContent} dangerouslySetInnerHTML={{ __html: post.embed }} />
          </section>
          <ShareBox
            author={post.author}
            postLink={path}
            authorLink={post.authorProfile}
            authorAvatar={post.authorAvatar}
          >
            <p>{post.authorDescription}</p>
          </ShareBox>
        </article>
        <nav className={styles.navContent}>
          <div className={styles.title}>
            <h1>Outras publicações</h1>
          </div>
          {outrasMidiasPosts.map(item => {
            if (post.slug !== item.slug) {
              return (
                <main key={item.id} style={{ backgroundImage: `url(${item.banner})` }}>
                  <div className={styles.navTextContent}>
                    <h1>{item.title}</h1>
                  </div>
                  <Link href={`/outrasMidias/${item.slug}`}>
                    <a />
                  </Link>
                </main>
              )
            }
          })}
        </nav>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;

  const prismic = getPrismicClient();

  const response = await prismic.getByUID('outrasmidiasposts', String(slug), {
    fetchLinks: ['author.author_name', 'author.author_profile', 'author.author_description', 'author.author_avatar']
  })

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    description: RichText.asHtml(response.data.description),
    author: RichText.asText(response.data.author.data.author_name),
    authorProfile: RichText.asText(response.data.author.data.author_profile),
    authorAvatar: response.data.author.data.author_avatar?.url ?? '',
    authorDescription: response.data.author.data.author_description ? RichText.asText(response.data.author.data.author_description) : '',
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
    banner: response.data.banner?.url ?? '',
    embed: RichText.asText(response.data.embed),
  }

  const responseOutrasMidiasContent = await prismic.query(
    Prismic.predicates.at('document.type', 'outrasmidiasposts')
  );

  const outrasMidiasPosts = responseOutrasMidiasContent.results.map(content => {
    return {
      id: content.id,
      slug: content.uid,
      title: RichText.asText(content.data.title),
      banner: content.data.banner?.url ?? '',
    }
  })

  return {
    props: {
      post,
      outrasMidiasPosts,
    }
  }
}
