import { ReactElement } from "react";
import { FiFacebook, FiPhone, FiTwitter, FiLinkedin } from 'react-icons/fi';

import styles from './styles.module.scss';

interface ShareBoxProps {
  authorAvatar?: string;
  author: string;
  authorLink?: string;
  postLink: string;
  children?: ReactElement;
}

export function ShareBox({ children, author, authorLink, postLink, authorAvatar }: ShareBoxProps) {
  const link = postLink.substr(1);

  return (
    <footer className={styles.container}>
      <main>
        {authorAvatar ?
          <img src={authorAvatar} />
          :
          <img src="/images/alt_image.png" />
        }
        <div>
          <h3>Escrito por <a href={authorLink} target="__blank">{author}</a></h3>
          {children}
        </div>
      </main>
      <section>
        <h4>Compartilhe em suas redes sociais</h4>
        <main>
          <a target="__blank" href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.URL_LINK}${link}`}>
            <div className={styles.facebookButton}>
              <FiFacebook />
            </div>
          </a>
          <a target="__blank" href={`https://api.whatsapp.com/send?text=${process.env.URL_LINK}${link}`}>
            <div className={styles.whatsappButton}>
              <FiPhone />
            </div>
          </a>
          <a target="__blank" href={`https://twitter.com/intent/tweet?url=${process.env.URL_LINK}${link}`}>
            <div className={styles.twitterButton}>
              <FiTwitter />
            </div>
          </a>
          <a target="__blank" href={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.URL_LINK}${link}`}>
            <div className={styles.linkedinButton}>
              <FiLinkedin />
            </div>
          </a>
        </main>
      </section>
    </footer>
  )
}