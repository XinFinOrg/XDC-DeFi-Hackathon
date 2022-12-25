import styles from '../styles/CardImage.module.css'
import Image from "next/image"


const CardImage = ({ id }: { id: any }) => {
    return (
        <div className={styles.cardImageContainer}>
            <div className={styles.detailImage}>
                <Image
                    alt='cadabra'
                    src={`https://pro-crabada-photos.s3.ap-southeast-1.amazonaws.com/${id}.png`}
                    width={400}
                    height={400}
                />
            </div>

        </div>
    )
}

export default CardImage