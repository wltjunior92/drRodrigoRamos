import { FiXCircle } from 'react-icons/fi';
import styles from './styles.module.scss';

type VideoDataProps = {
  youtubeMediaId: string;
  videoTitle: string;
}

interface MidiaModalProps {
  videoData: VideoDataProps;
  closeModal: () => void;
}

export function MidiaModal({ closeModal, videoData }: MidiaModalProps) {
  return (
    <div className={styles.midiaModalContainer}>
      <div className={styles.midiasModalContent}>
        <main>
          <header>
            <h1>
              {videoData.videoTitle}
            </h1>
          </header>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoData.youtubeMediaId}`}
            title="YouTube video player"
            frameBorder={0}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </main>
        <button type="button" onClick={closeModal}>
          <FiXCircle size={25} />
        </button>
      </div>
    </div>
  )
}