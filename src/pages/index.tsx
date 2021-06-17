import { useState } from 'react';
import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Head from 'next/head';

import { ArtesCard } from '../components/ArtsCard';
import { BlogCards } from '../components/BlogCards';
import { MidiasCard } from '../components/MidiasCard';
import { TextCardContent } from '../components/TextCardContent';
import { PostsBlogContent } from '../components/PostsBlogContent';
import { PsiquiatriaEArtesContent } from '../components/PsiquiatriaEArtesContent';
import { TextContent } from '../components/TextContent';
import { MidiasContent } from '../components/MidiasContent';

import styles from '../styles/pages/home.module.scss';
import { MidiaModal } from '../components/MidiaModal';
import { getPrismicClient } from '../services/prismic';
import Link from 'next/link';
import { OutrasMidiasCard } from '../components/OutrasMidiasCard';
import { useRouter } from 'next/router';

type BioContent = {
  title: string;
  subtitle: string;
  textContent: string;
}

type NeurocienciaPosts = {
  id: string;
  slug: string;
  title: string;
  banner: string;
  updatedAt: string;
  excerpt: string;
}

type PsiquiatriaPosts = {
  id: string;
  slug: string;
  title: string;
  banner: string;
  updatedAt: string;
  excerpt: string;
}

type PsicodinamicaPosts = {
  id: string;
  slug: string;
  title: string;
  banner: string;
  updatedAt: string;
  excerpt: string;
}

type PsiquiatriaEArtesPosts = {
  id: string;
  slug: string;
  title: string;
  updatedAt: string;
  author: string;
  poster: string;
  excerpt: string;
}

type Videos = {
  id: string;
  title: string;
  description: string;
  youtubeVideoId: string;
  banner: string;
}

type OutrasMidias = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  banner: string;
}

type Post = {
  id: string;
  slug: string;
  title: string;
  author: string;
  updatedAt: string;
  banner: string;
  excerpt: string;
}

interface HomeProps {
  bioContent: BioContent;
  neurocienciaPosts: NeurocienciaPosts[];
  psiquiatriaPosts: PsiquiatriaPosts[];
  psicodinamicaPosts: PsicodinamicaPosts[];
  psiquiatriaEArtesPosts: PsiquiatriaEArtesPosts[];
  videosPosts: Videos[];
  outrasMidiasPosts: OutrasMidias[];
  blogPosts: Post[];
}

interface VideoDataProps {
  youtubeMediaId: string;
  videoTitle: string;
}

export default function Home({
  bioContent,
  neurocienciaPosts,
  psiquiatriaPosts,
  psicodinamicaPosts,
  psiquiatriaEArtesPosts,
  videosPosts,
  outrasMidiasPosts,
  blogPosts,
}: HomeProps) {
  const [isMidiaModalOpen, setIsMidiaModalOpen] = useState(false);
  const [videoData, setvideoData] = useState<VideoDataProps>({ youtubeMediaId: '', videoTitle: '' });

  const router = useRouter();

  function closeMidiaModal() {
    setIsMidiaModalOpen(false)
  }

  function openMidiaModal(videoData: VideoDataProps) {
    setvideoData(videoData);
    setIsMidiaModalOpen(true)
  }

  return (
    <>
      <Head>
        <title>Dr. Rodrigo Ramos</title>
      </Head>

      <main className={styles.homeContainer}>
        <section className={styles.homeContent}>
          <div>
            <p>
              SAÚDE MENTAL <br />
              <span>EM PRIMEIRO</span> <br />
              LUGAR
            </p>
            <button onClick={() => router.push('/profissional')}>SAIBA MAIS</button>
          </div>
          <img src="/images/foto.png" />
        </section>
      </main>

      <section className={styles.bioContent}>
        <h1>{bioContent.title}</h1>
        <h4>{bioContent.subtitle}</h4>
        <div
          className={styles.bioParagraph}
          dangerouslySetInnerHTML={{ __html: bioContent.textContent }}
        />

        <div>

          <Link href="/tratamentos">
            <a>VER TRATAMENTOS</a>
          </Link>
          <Link href="/blog">
            <a>VISITE O BLOG DO DR RODRIGO</a>
          </Link>
        </div>
      </section>

      <TextCardContent
        titulo="Neurociência"
        image="/neurociencia-logo.svg"
      >
        {neurocienciaPosts.map(content => (
          <TextContent key={content.id} banner={content.banner}>
            <h1>{content.title}</h1>
            <Link href={`/neurociencia/${content.slug}`}>
              <a />
            </Link>
          </TextContent>
        ))}
      </TextCardContent>

      <TextCardContent
        titulo="Psiquiatria"
        image="/psiquiatria-logo.svg"
      >
        {psiquiatriaPosts.map(content => (
          <TextContent key={content.id} banner={content.banner}>
            <h1>{content.title}</h1>
            <Link href={`/psiquiatria/${content.slug}`}>
              <a />
            </Link>
          </TextContent>
        ))}
      </TextCardContent>

      <TextCardContent
        titulo="Psicodinâmica"
        image="/psicodinamica-logo.svg"
      >
        {psicodinamicaPosts.map(content => (
          <TextContent key={content.id} banner={content.banner}>
            <h1>{content.title}</h1>
            <Link href={`/psicodinamica/${content.slug}`}>
              <a />
            </Link>
          </TextContent>
        ))}
      </TextCardContent>

      <PsiquiatriaEArtesContent>
        {psiquiatriaEArtesPosts.map(content => (
          <ArtesCard key={content.id} image={content.poster}>
            <div>
              <h1>{content.title}</h1>
              <p>
                {content.excerpt}
              </p>
              <span>Por <strong>{content.author}</strong> {content.updatedAt}</span>
            </div>
            <Link href={`/psiquiatriaEArtes/${content.slug}`}>
              <a>LEIA MAIS</a>
            </Link>
          </ArtesCard>
        ))}
      </PsiquiatriaEArtesContent>

      <img className={styles.divider} src="/images/divider.png" />

      {isMidiaModalOpen &&
        <MidiaModal
          closeModal={closeMidiaModal}
          videoData={videoData}
        />
      }

      <MidiasContent
        titulo="Vídeos"
        image="/videos-logo.svg"
      >
        {videosPosts.map(video => (
          <MidiasCard
            key={video.id}
            image={video.banner}
            openModal={openMidiaModal}
            youtubeMediaId={video.youtubeVideoId}
            videoTitle={video.title}
          >
            <h1>{video.title}</h1>
            <p>
              {video.description}
            </p>
          </MidiasCard>
        ))}
      </MidiasContent>

      <MidiasContent
        titulo="Outras mídias"
        image="/midias-logo.svg"
      >
        {outrasMidiasPosts.map(midia => (
          <OutrasMidiasCard
            key={midia.id}
            image={midia.banner}
            slug={midia.slug}
          >
            <h1>{midia.title}</h1>
            <p>
              {midia.excerpt}
            </p>
          </OutrasMidiasCard>
        ))}
      </MidiasContent>

      <PostsBlogContent
        image="/blog-logo.svg"
      >
        {blogPosts.map(post => (
          <BlogCards key={post.id}>
            <div className={styles.postCard} style={{ backgroundImage: `url(${post.banner})` }}>
              <section>
                <h1>{post.title}</h1>
                <p>{post.excerpt}</p>
                <h5>Por <span>{post.author}</span>, {post.updatedAt}</h5>
              </section>
              <Link href={`/blog/${post.slug}`}>
                <a />
              </Link>
            </div>
          </BlogCards>
        ))}
      </PostsBlogContent>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  //Bio content query
  const responseBioContent = await prismic.query(
    Prismic.predicates.at('document.type', 'biocontent')
  );

  const bioContentResult = responseBioContent.results.map(content => {
    return {
      title: RichText.asText(content.data.title),
      subtitle: RichText.asText(content.data.subtitle),
      textContent: RichText.asHtml(content.data.content),
    }
  })

  //Neurociencia content query
  const responseNeurocienciaContent = await prismic.query(
    Prismic.predicates.at('document.type', 'neurocienciaposts'), {
    orderings: '[my.neurocienciaposts.first_publication_date desc]',
    pageSize: 4
  }
  );

  const neurocienciaPosts = responseNeurocienciaContent.results.map(content => {
    return {
      id: content.id,
      slug: content.uid,
      title: RichText.asText(content.data.title),
      banner: content.data.banner?.card.url ?? '',
      updatedAt: new Date(content.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      excerpt: content.data.content[0].text_content.find(paragraph => paragraph.type === 'paragraph')?.text ?? '',
    }
  })

  //Psiquiatria content query
  const responsePsiquiatriaContent = await prismic.query(
    Prismic.predicates.at('document.type', 'psiquiatriaposts'), {
    orderings: '[my.psiquiatriaposts.first_publication_date desc]',
    pageSize: 4
  }
  );

  const psiquiatriaPosts = responsePsiquiatriaContent.results.map(content => {
    return {
      id: content.id,
      slug: content.uid,
      title: RichText.asText(content.data.title),
      banner: content.data.banner?.card.url ?? '',
      updatedAt: new Date(content.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      excerpt: content.data.content[0].text_content.find(paragraph => paragraph.type === 'paragraph')?.text ?? '',
    }
  })

  //Psicodinamica content query
  const responsePsicodinamicaContent = await prismic.query(
    Prismic.predicates.at('document.type', 'psicodinamicaposts'), {
    orderings: '[my.psicodinamicaposts.first_publication_date desc]',
    pageSize: 4
  }
  );

  const psicodinamicaPosts = responsePsicodinamicaContent.results.map(content => {
    return {
      id: content.id,
      slug: content.uid,
      title: RichText.asText(content.data.title),
      banner: content.data.banner?.card.url ?? '',
      updatedAt: new Date(content.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
      excerpt: content.data.content[0].text_content.find(paragraph => paragraph.type === 'paragraph')?.text ?? '',
    }
  })

  //Psiquiatria e artes content query
  const responsePsiquiatrieEArtesContent = await prismic.query(
    Prismic.predicates.at('document.type', 'psiquiatriaeartesposts'),
    {
      fetchLinks: ['author.author_name', 'author.author_profile', 'author.author_description', 'author.author_avatar'],
      orderings: '[my.psiquiatriaeartesposts.first_publication_date desc]',
      pageSize: 4
    }
  );

  const psiquiatriaEArtesPosts = responsePsiquiatrieEArtesContent.results.map(content => {
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
      author: RichText.asText(content.data.author.data.author_name),
      poster: content.data.poster.url,
      excerpt,
    }
  })

  //Videos content query
  const responseVideosContent = await prismic.query(
    Prismic.predicates.at('document.type', 'videos'),
    {
      orderings: '[my.videos.first_publication_date desc]',
      pageSize: 4,
    }
  );

  const videosPosts = responseVideosContent.results.map(content => {
    return {
      id: content.id,
      title: RichText.asText(content.data.title),
      banner: content.data.banner.url,
      youtubeVideoId: RichText.asText(content.data.youtube_video_id),
      description: RichText.asText(content.data.description),
    }
  })

  //Outras Midias content query
  const responseOutrasMidiasContent = await prismic.query(
    Prismic.predicates.at('document.type', 'outrasmidiasposts'),
    {
      orderings: '[my.outrasmidiasposts.first_publication_date desc]',
      pageSize: 4,
    }
  );

  const outrasMidiasPosts = responseOutrasMidiasContent.results.map(content => {
    const firstParagraph = content.data.description.find(paragraph => paragraph.type === 'paragraph')?.text ?? '';

    let excerpt: string = '';
    const wordArray = firstParagraph.split(' ');
    let range = wordArray.length >= 15 ? 15 : wordArray.length;

    for (let i = 0; i < range; i++) {
      excerpt += i !== (range - 1) ? wordArray[i] + ' ' : wordArray[i] + '...';
    }
    return {
      id: content.id,
      slug: content.uid,
      title: RichText.asText(content.data.title),
      excerpt,
      banner: content.data.banner.url,
    }
  })

  //Posts do blog content query
  const blogPostResponse = await prismic.query(
    Prismic.predicates.at('document.type', 'blogposts'),
    {
      fetchLinks: 'author.author_name',
      orderings: '[my.blogposts.first_publication_date desc]',
      pageSize: 4,
    }
  );

  const blogPosts = blogPostResponse.results.map(content => {
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
      banner: content.data.banner?.card.url ?? '',
      excerpt,
    }
  })

  return {
    props: {
      bioContent: bioContentResult[0],
      neurocienciaPosts,
      psiquiatriaPosts,
      psicodinamicaPosts,
      psiquiatriaEArtesPosts,
      videosPosts,
      outrasMidiasPosts,
      blogPosts
    }
  }
}