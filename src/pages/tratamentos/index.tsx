import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';
import { useState } from 'react';
import Head from 'next/head';

type Tratamento = {
  id: string;
  slug: string;
  title: string;
  author: string;
  updatedAt: string;
  banner: string;
  excerpt: string;
}

interface TratamentosProps {
  posts: Tratamento[];
}

export default function Tratamentos({ posts }: TratamentosProps) {
  return (
    <>
      <Head>
        <title>Dr. Rodrigo Ramos | Tratamentos</title>
      </Head>

      <div className={styles.blogContainer}>
        <main className={styles.blogContent}>
          {posts.map(post => (
            <div key={post.id} className={styles.postCard} style={{ backgroundImage: `url(${post.banner})` }}>
              <section>
                <h1>{post.title}</h1>
                <p>{post.excerpt}</p>
                <h5>Por <span>{post.author}</span>, {post.updatedAt}</h5>
              </section>
              <Link href={`/tratamentos/${post.slug}`}>
                <a />
              </Link>
            </div>
          ))}
        </main>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    Prismic.predicates.at('document.type', 'tratamentos'),
    {
      fetchLinks: 'author.author_name',
    }
  );

  console.log(JSON.stringify(response.results, null, 2));

  const blogPosts = response.results.map(content => {
    const firstParagraph = content.data.content[0].text_content.find(paragraph => paragraph.type === 'paragraph')?.text ?? '';

    let excerpt: string = '';
    const wordArray = firstParagraph.split(' ');
    for (let i = 0; i <= 15; i++) {
      excerpt += i !== 15 ? wordArray[i] + ' ' : wordArray[i] + '...';
    }

    return {
      id: content.id,
      slug: content.uid,
      title: RichText.asText(content.data.title),
      author: RichText.asText(content.data.author.data.author_name),
      updatedAt: new Date(content.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      banner: content.data.banner?.Card.url ?? '',
      excerpt,
    }
  })

  return {
    props: {
      posts: blogPosts,
    }
  }
}