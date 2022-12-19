import styles from '../styles/CardHistory.module.css'
import Image from 'next/image'
import Loader from './laoder'

const CardHistory = ({ dClass }: { dClass: string }) => {

    const dataClass = {
        'SURGE': 'https://marketplace.crabada.com/static/media/dio.9dd28a11.png',
        'CRABOID': 'https://marketplace.crabada.com/static/media/cyborg.7aaa32b9.png',
        'PRIME': 'https://marketplace.crabada.com/static/media/icon_faction_lux.10f0b195.svg',
        'GEM': 'https://marketplace.crabada.com/static/media/pearl.517b0c57.png',
        'SUNKEN': 'https://marketplace.crabada.com/static/media/parapa.78697d60.png',
        'BULK': 'https://marketplace.crabada.com/static/media/coco.148c8887.png',
        'RUINED': 'https://marketplace.crabada.com/static/media/evil.ff0ff5bc.png',
        'ORGANIC': 'https://marketplace.crabada.com/static/media/arbre.b18cbaee.png'
    }


    return (
        <div className={styles.historyContainer}>
            {
                dClass ?
                    <div className={styles.historyWrapper}>
                        <Image
                            alt={dClass}
                            src={dataClass[dClass as keyof typeof dataClass]}
                            width={100}
                            height={120}
                        />
                        <div className={styles.badge}>
                            {dClass}
                        </div>
                    </div> : <Loader />
            }

        </div>
    )
}

export default CardHistory