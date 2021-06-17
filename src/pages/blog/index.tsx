import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';

import styles from './styles.module.scss';
import { useState } from 'react';
import Head from 'next/head';

type Post = {
  id: string;
  slug: string;
  title: string;
  updatedAt: string;
  banner: string;
  excerpt: string;
}

interface BlogProps {
  posts: Post[];
  next_page: string;
}

export default function Blog({ posts, next_page }: BlogProps) {
  const [blogPosts, setBlogPosts] = useState<Post[]>(posts);
  const [nextPage, setNextPage] = useState(next_page)

  async function handleLoadNextPage(page: string): Promise<void> {
    const clonePosts = [...blogPosts];

    await fetch(page)
      .then(response => response.json())
      .then(data => {
        const nextPosts = data.results.map(post => {
          const firstParagraph = post.data.content[0].text_content.find(paragraph => paragraph.type === 'paragraph')?.text ?? '';

          let excerpt: string = '';
          const wordArray = firstParagraph.split(' ');
          for (let i = 0; i <= 15; i++) {
            excerpt += i !== 15 ? wordArray[i] + ' ' : wordArray[i] + '...';
          }

          return {
            id: post.id,
            slug: post.uid,
            title: RichText.asText(post.data.title),
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            }),
            banner: post.data.banner?.card.url ?? '',
            excerpt,
          }
        })

        const newPosts = clonePosts.concat(nextPosts);
        setNextPage(data.next_page);
        setBlogPosts(newPosts);
      })
  }

  return (
    <>
      <Head>
        <title>Dr. Rodrigo Ramos | Blog</title>
      </Head>

      <div className={styles.blogContainer}>
        <main className={styles.blogContent}>
          {blogPosts.map(post => (
            <div key={post.id} className={styles.postCard} style={{ backgroundImage: `url(${post.banner})` }}>
              <section>
                <h1>{post.title}</h1>
                <p>{post.excerpt}</p>
              </section>
              <Link href={`/blog/${post.slug}`}>
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
    Prismic.predicates.at('document.type', 'blogposts'),
    {
      pageSize: 20,
      fetchLinks: 'author.author_name',
    }
  );

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
      updatedAt: new Date(content.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      banner: content.data.banner?.card.url ?? '',
      excerpt,
    }
  })

  return {
    props: {
      posts: blogPosts,
      next_page: response.next_page,
    }
  }
}