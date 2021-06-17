import { ReactElement } from "react";

import styles from './styles.module.scss';

type VideoDataProps = {
  youtubeMediaId: string;
  videoTitle: string;
}

interface MidiasCardProps {
  image?: string;
  openModal?: (videoData: VideoDataProps) => void;
  youtubeMediaId?: string;
  videoTitle: string;
  children: ReactElement | ReactElement[];
}

export function MidiasCard({ children, image, openModal, youtubeMediaId, videoTitle }: MidiasCardProps) {
  return (
    <main className={styles.container}>
      <img src={image} />
      <section className={styles.content}>
        {children}
      </section>
      <button type="button" onClick={() => openModal({ youtubeMediaId, videoTitle })} />
    </main>
  )
}