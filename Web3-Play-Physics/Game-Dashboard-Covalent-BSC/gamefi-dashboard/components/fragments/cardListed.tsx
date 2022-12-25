import { useEffect, useState } from 'react'
import styles from '../styles/cardListed.module.css'
import Image from 'next/image'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Loader from './laoder';

const CardListed = ({ dataListed }: { dataListed: any }) => {
    const [itemClass, setClass] = useState('')
    const [isLoading, setLoading] = useState(false)


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
    useEffect(() => {
        const data = (async () => {
            setLoading(true)
            await axios.get(`https://api.covalenthq.com/v1/43114/tokens/0x1b7966315ef0259de890f38f1bdb95acc03cacdd/nft_metadata/${dataListed.id}/?quote-currency=USD&format=JSON&key=${process.env.NEXT_PUBLIC_API_KEY}`)
                .then((res) => {
                    setClass(res.data.data.items[0].nft_data[0].external_data.attributes[1].value)
                    setLoading(false)
                }).catch((err) => {
                    console.log(err)
                    setLoading(false)
                })
        })
        data()
    }, [dataListed.id])
    return (
        <div className={styles.cardListedContainer}>
            {
                !isLoading && itemClass ? (
                    <div className={styles.cardListedBody}>
                        <Image
                            alt={dataListed.id}
                            src={`https://pro-crabada-photos.s3.ap-southeast-1.amazonaws.com/${dataListed.id}.png`}
                            width={100}
                            height={100}
                        />
                        <div className={styles.classType}>
                            <div>Class</div>
                            <Image
                                alt={itemClass}
                                src={dataClass[itemClass as keyof typeof dataClass]}
                                width={30}
                                height={30}
                            />
                        </div>
                        <div className={styles.classType}>
                            <div>{dataListed.status == 'Listed' ? 'Listed Price' : 'Sold Price'}</div>
                            <div>
                                <NumberFormat value={Math.round(dataListed.price)} displayType={'text'} thousandSeparator={true} />
                                <span style={{ color: '#a1a6b6', fontSize: 12 }}> $TUS</span>
                            </div>
                        </div>
                        <div><BsFillArrowRightCircleFill size={24} /></div>
                    </div>
                ) : <Loader />
            }

        </div>
    )
}

export default CardListed