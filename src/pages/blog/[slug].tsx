import { GetServerSideProps } from "next"
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from "next/router";
import { RichText } from "prismic-dom";
import Prismic from '@prismicio/client';

import { getPrismicClient } from "../../services/prismic";

import styles from '../../styles/pages/textContent.module.scss';
import { ShareBox } from "../../components/ShareBox";

type content = {
  imageReference: string;
  imageDescription: string;
  sectionSubtitle: string;
  textContent: string;
}

type BlogPosts = {
  id: string;
  slug: string;
  title: string;
  banner: string;
}

interface PostProps {
  post: {
    slug: string;
    title: string;
    subtitle: string;
    author: string;
    authorProfile: string;
    authorAvatar: string;
    authorDescription: string;
    updatedAt: string,
    banner: string;
    content: content[];
  };
  blogPosts: BlogPosts[];
}

export default function NeurocienciaPost({ post, blogPosts }: PostProps) {
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
          <h6>Por <span>{post.author}</span>, {post.updatedAt}</h6>
          <h4>{post.subtitle}</h4>
          {post.content.map((content, index) => (
            <section key={index}>
              {content.sectionSubtitle && <h5>{content.sectionSubtitle}</h5>}
              <div dangerouslySetInnerHTML={{ __html: content.textContent }} />
              {content.imageReference && <img src={content.imageReference} />}
              {content.imageDescription && <span>{content.imageDescription}</span>}
            </section>
          ))}
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
          {blogPosts.map(item => {
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

  const response = await prismic.getByUID('blogposts', String(slug), {
    fetchLinks: ['author.author_name', 'author.author_profile', 'author.author_description', 'author.author_avatar']
  })

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    subtitle: RichText.asText(response.data.subtitle),
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
    content: response.data.content.map(item => {
      return {
        imageReference: item.image_reference?.url ?? '',
        sectionSubtitle: RichText.asText(item.section_subtitle),
        imageDescription: RichText.asText(item.image_description),
        textContent: RichText.asHtml(item.text_content),
      }
    }),
  }

  const responseBlogContent = await prismic.query(
    Prismic.predicates.at('document.type', 'blogposts')
  );

  const blogPosts = responseBlogContent.results.map(content => {
    return {
      id: content.id,
      slug: content.uid,
      title: RichText.asText(content.data.title),
      banner: content.data.banner?.card.url ?? '',
    }
  })

  return {
    props: {
      post,
      blogPosts,
    }
  }
}
