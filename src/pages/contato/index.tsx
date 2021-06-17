import { GetStaticProps } from "next";
import Head from "next/head";
import { RichText } from "prismic-dom";
import { FiPhone } from "react-icons/fi";
import { getPrismicClient } from "../../services/prismic";

import styles from './styles.module.scss';

interface ContatoProps {
  location: string;
  phone1: string;
  phone2: string;
  email: string;
}

export default function Contato(props: ContatoProps) {
  const whatsappMessage = 'Olá Dr. Rodrigo. Preciso da sua ajuda.'

  const cellphone = `(${props.phone1.substr(0, 2)}) ${props.phone1.substr(2, 5)}-${props.phone1.substr(5, 4)}`;
  const phone = `(${props.phone2.substr(0, 2)}) ${props.phone2.substr(2, 4)}-${props.phone2.substr(4, 4)}`;

  console.log(cellphone)

  return (
    <>
      <Head>
        <title>Dr. Rodrigo Ramos | Blog</title>
      </Head>

      <section className={styles.contatoContainer}>
        <main className={styles.contatoContent}>
          <section className={styles.location}>
            <div dangerouslySetInnerHTML={{ __html: props.location }} />
          </section>
          <section className={styles.contatoForm}>
            <header>
              <div>
                <h3>Email</h3>
                <h4>{props.email}</h4>
              </div>
              <div>
                <h3>Telefones</h3>
                <section>
                  <h4>{cellphone}</h4>
                  <span>/</span>
                  <h4>{phone}</h4>
                </section>
              </div>
            </header>
            <footer>
              <a target="__blank" href={`https://api.whatsapp.com/send?phone=55${props.phone1}&text=${whatsappMessage}`}>
                <span>Entre em contato com o Dr. Rodrigo pelo whatsapp</span>
                <FiPhone />
              </a>
            </footer>
          </section>
        </main>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const { data } = await prismic.getSingle('contatopage', {});

  return {
    props: {
      location: RichText.asText(data.location),
      phone1: RichText.asText(data.phone_1),
      phone2: RichText.asText(data.phone_2),
      email: RichText.asText(data.email),
    }
  }
}