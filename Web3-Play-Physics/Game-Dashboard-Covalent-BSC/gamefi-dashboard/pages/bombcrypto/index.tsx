import type { NextPage } from 'next'
import Head from 'next/head'
// import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import Card from '../../components/fragments/card'
import { FcAreaChart, FcBarChart, FcDoughnutChart, FcFlowChart, FcLineChart, FcComboChart } from 'react-icons/fc'
import CardListed from '../../components/fragments/elfins/cardListed'
import axios from "axios";
import { useEffect, useState } from 'react'
import Loader from '../../components/fragments/laoder'
import { AreaChart } from "@carbon/charts-react";
import "@carbon/charts/styles-g90.css";


const Home: NextPage = () => {

    // set variables
    const [isLoading, setLoading] = useState(false)
    const [dataLogs, setDataLogs] = useState([])
    const [tusPrice, setTusPrice] = useState(0)
    const [dataLogs7, setDataLogs7] = useState([])
    const [dataLogsBhouse, setDataLogBhouse] = useState([])


    // get last 24h timestmap to get block id
    const currentTime = new Date()
    currentTime.setDate(currentTime.getDate() - 1)
    const dateTime = new Date(currentTime).toISOString()

    // get 7 days timestamp to get block id

    currentTime.setDate(currentTime.getDate() - 6)
    const date7days = new Date(currentTime).toISOString()

    // pass to api block 
    const apiBlock = `https://api.covalenthq.com/v1/56/block_v2/${dateTime}/latest/?quote-currency=USD&format=JSON&key=${process.env.NEXT_PUBLIC_API_KEY}`

    const apiBlock7days = `https://api.covalenthq.com/v1/56/block_v2/${date7days}/latest/?quote-currency=USD&format=JSON&key=${process.env.NEXT_PUBLIC_API_KEY}`
    // calculate data laogs
    const calculateKPI = (data: any) => {
        let totalSale = 0
        let totalVolumes = 0
        let averagePrice = 0
        let totalUniqueWallet = 0
        let uniqueBuyyers: any[] = []
        let maxSales = 0
        let totalFee = 0

        data.map((item: any) => {
            const logData = item.raw_log_data.substring(2)
            totalSale += 1
            totalVolumes += parseInt(logData.substring(65, 65 + 63), 16)
            if (!uniqueBuyyers.includes(logData.substring(256))) {
                uniqueBuyyers.push(item.raw_log_topics[2])
                totalUniqueWallet += 1
            }
            if (parseInt(logData.substring(65, 65 + 63), 16) > maxSales) {
                maxSales = parseInt(logData.substring(65, 65 + 63), 16)
            }
        })

        totalVolumes = totalVolumes / Math.pow(10, 18)
        averagePrice = totalVolumes / totalSale
        maxSales = maxSales / Math.pow(10, 18)
        totalFee = totalVolumes * 0.1
        return {
            totalSale, totalVolumes, totalUniqueWallet, averagePrice, maxSales, totalFee
        }
    }

    const calculateCharts = (data: any) => {
        let dateValue: any = {}
        let dateSales: any = {}
        data.map((item: any) => {
            const logData = item.raw_log_data.substring(2)
            const datee = new Date(item.block_signed_at)
            if (Object.keys(dateValue).includes(datee.toDateString())) {
                dateValue[datee.toDateString()] += parseInt(logData.substring(65, 65 + 63), 16) / Math.pow(10, 18)

            } else {
                dateValue[datee.toDateString()] = parseInt(logData.substring(65, 65 + 63), 16) / Math.pow(10, 18)
            }
            if (Object.keys(dateSales).includes(datee.toDateString())) {
                dateSales[datee.toDateString()] += 1

            } else {
                dateSales[datee.toDateString()] = 1
            }
        })
        const chart1: any[] = []
        const chart2: any[] = []
        Object.keys(dateValue).map((item: any) => {
            chart1.push({
                group: 'Dataset 1',
                date: new Date(item),
                value: dateValue[item] * tusPrice
            })
        })
        Object.keys(dateSales).map((item: any) => {
            chart2.push({
                group: 'Dataset 1',
                date: new Date(item),
                value: dateSales[item]
            })
        })
        return {
            chart1,
            chart2
        }
    }

    useEffect(() => {

        const getBlockId = async () => {
            setLoading(true)
            const dataBlockapi = await axios.get(apiBlock).then((res) => {
                return res.data
            }).catch((err) => {
                return err
            })

            const dataBlock7days = await axios.get(apiBlock7days).then((res) => {
                return res.data
            }).catch((err) => {
                return err
            })


            // data log 7 days bheroes
            const apiURLLog7days = `https://api.covalenthq.com/v1/56/events/topics/0x95c89a9d10e4c04e4a14d2a484dba4070c7246be033fdc7797f5eac556eeb469/?quote-currency=USD&format=JSON&starting-block=${dataBlock7days.data.items[0].height}&ending-block=latest&sender-address=0x376a10e7f125a4e0a567cc08043c695cd8edd704&page-size=99999&key=${process.env.NEXT_PUBLIC_API_KEY}`

            const dataLog7days = await axios.get(apiURLLog7days).then((res) => {
                return res.data
            }).catch((err) => {
                return err
            })

            // data log 7 days bhouse
            const apiURLLog7daysbhouse = `https://api.covalenthq.com/v1/56/events/topics/0x95c89a9d10e4c04e4a14d2a484dba4070c7246be033fdc7797f5eac556eeb469/?quote-currency=USD&format=JSON&starting-block=${dataBlock7days.data.items[0].height}&ending-block=latest&sender-address=0x049896f350c802cd5c91134e5f35ec55fa8f0108&page-size=99999&key=${process.env.NEXT_PUBLIC_API_KEY}`

            const dataLog7daysbhouse = await axios.get(apiURLLog7daysbhouse).then((res) => {
                return res.data
            }).catch((err) => {
                return err
            })



            // pass return from block api to log api
            const apiURLLog = `https://api.covalenthq.com/v1/56/events/topics/0x95c89a9d10e4c04e4a14d2a484dba4070c7246be033fdc7797f5eac556eeb469/?quote-currency=USD&format=JSON&starting-block=${dataBlockapi.data.items[0].height}&ending-block=latest&sender-address=0x376a10e7f125a4e0a567cc08043c695cd8edd704&page-size=99999&key=${process.env.NEXT_PUBLIC_API_KEY}`

            const dataLogsApi = await axios.get(apiURLLog).then((res) => {
                return res.data
            }).catch((err) => {
                return err
            })

            // get $BOC price right now
            const apiPrice = `https://api.covalenthq.com/v1/pricing/historical_by_addresses_v2/56/USD/0x00e1656e45f18ec6747F5a8496Fd39B50b38396D/?quote-currency=USD&format=JSON&key=${process.env.NEXT_PUBLIC_API_KEY}`

            const dataPrice = await axios.get(apiPrice).then((res) => {
                return res.data
            }).catch((err) => {
                return err
            })

            // set data logs bhouse
            setDataLogBhouse(dataLog7daysbhouse.data.items)
            // set datalogs 7 days
            setDataLogs7(dataLog7days.data.items)
            // set data logs from API
            setDataLogs(dataLogsApi.data.items)
            // set data price from API
            setTusPrice(dataPrice.data[0].prices[0].price)
            // set loading false
            setLoading(false)

        }
        getBlockId()
    }, [])

    let dataKPI: any[] = []
    let dataChart: any[] = []
    let options: any = {}
    let dataChartBhouse: any[] = []
    let optionsBhouse: any = {}
    let dataSaleBhouse: any[] = []
    let optionSaleBhouse: any = {}
    let dataSaleBheroes: any[] = []
    let optionSaleBheroes: any = {}

    if (isLoading) {
        console.log('loading')
    } else {
        console.log('data loaded')
        dataChart = calculateCharts(dataLogs7).chart1
        dataChartBhouse = calculateCharts(dataLogsBhouse).chart1
        dataSaleBheroes = calculateCharts(dataLogs7).chart2
        dataSaleBhouse = calculateCharts(dataLogsBhouse).chart2

        options = {
            "title": "Daily Total Volumes in $USD BHeros Sales (Marketplace)",
            "axes": {
                "bottom": {
                    "title": "Daily Total Volumes in $USD BHeros Sales (Marketplace)",
                    "mapsTo": "date",
                    "scaleType": "time"
                },
                "left": {
                    "mapsTo": "value",
                    "scaleType": "linear"
                }
            },
            "curve": "curveNatural",
            "height": "400px"
        }
        optionsBhouse = {
            "title": "Daily Total Volumes in $USD Bhouse Sales (Marketplace)",
            "axes": {
                "bottom": {
                    "title": "Daily Total Volumes in $USD Bhouse Sales (Marketplace)",
                    "mapsTo": "date",
                    "scaleType": "time"
                },
                "left": {
                    "mapsTo": "value",
                    "scaleType": "linear"
                }
            },
            "curve": "curveNatural",
            "height": "400px"
        }
        optionSaleBheroes = {
            "title": "Daily Total Sale Bheroes (Marketplace)",
            "axes": {
                "bottom": {
                    "title": "Daily Total Sale Bheroes (Marketplace)",
                    "mapsTo": "date",
                    "scaleType": "time"
                },
                "left": {
                    "mapsTo": "value",
                    "scaleType": "linear"
                }
            },
            "curve": "curveNatural",
            "height": "400px"
        }
        optionSaleBhouse = {
            "title": "Daily Total Sale Bhouse (Marketplace)",
            "axes": {
                "bottom": {
                    "title": "Daily Total Sale Bhouse (Marketplace)",
                    "mapsTo": "date",
                    "scaleType": "time"
                },
                "left": {
                    "mapsTo": "value",
                    "scaleType": "linear"
                }
            },
            "curve": "curveNatural",
            "height": "400px"
        }
        const data = calculateKPI(dataLogs)
        dataKPI = [
            {
                title: 'Total Volumes',
                value: data.totalVolumes.toFixed(2),
                symbol: '$BCOIN',
                icon: FcBarChart,
                total: (data.totalVolumes * tusPrice).toFixed(2)
            },
            {
                title: 'Average Sale Price',
                value: data.averagePrice.toFixed(2),
                symbol: '$BCOIN',
                icon: FcDoughnutChart,
                total: (data.averagePrice * tusPrice).toFixed(2)
            },
            {
                title: 'Total Sale',
                value: data.totalSale,
                symbol: 'BHEROS',
                icon: FcAreaChart,
                total: ''
            },
            {
                title: 'Total Unique Buyers',
                value: data.totalUniqueWallet,
                symbol: 'ADDRESSES',
                icon: FcFlowChart,
                total: ''
            },
            {
                title: 'Highest Price Sale',
                value: data.maxSales.toFixed(2),
                symbol: '$BCOIN',
                icon: FcLineChart,
                total: (data.maxSales * tusPrice).toFixed(2)
            },
            {
                title: 'Fee Sale Collected',
                value: data.totalFee.toFixed(2),
                symbol: '$BCOIN',
                icon: FcComboChart,
                total: (data.totalFee * tusPrice).toFixed(2)
            },
        ]
    }


    return (
        <>
            <Head>
                <title>Bombcrypto</title>
            </Head>
            <div className={styles.mainLayout}>
                {!isLoading ?
                    (
                        <div className={styles.gridLayout}>
                            <div className={styles.gridKPI}>
                                {
                                    dataKPI && dataKPI.map((item, index) => {
                                        return (
                                            <div key={index} className={styles.itemCard}>
                                                <Card kpidata={item} />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className={styles.flexCharts}>
                                <div className={styles.itemChart}>
                                    <AreaChart
                                        data={dataChart}
                                        options={options} />
                                </div>
                                <div className={styles.itemChart}>
                                    <AreaChart
                                        data={dataChartBhouse}
                                        options={optionsBhouse} />
                                </div>
                                <div className={styles.itemChart}>
                                    <AreaChart
                                        data={dataSaleBheroes}
                                        options={optionSaleBheroes} />
                                </div>
                                <div className={styles.itemChart}>
                                    <AreaChart
                                        data={dataSaleBhouse}
                                        options={optionSaleBhouse} />
                                </div>
                            </div>
                        </div>

                    ) : <Loader />}

            </div>
        </>
    )
}

export default Home
