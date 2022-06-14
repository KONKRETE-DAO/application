import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import AssetCard from '../components/AssetCard'
import useSWR from 'swr'
import _ from 'lodash'
import { Typography, Box, Container } from '@mui/material'
// import '../../public/fonts/Fontello-Regular.woff2'


const fetcher = (...args: [RequestInfo, RequestInit | undefined]) => fetch(...args).then((res) => res.json())

const Home: NextPage = () => {

  const { data, error } = useSWR('http://localhost:1337/api/assets?populate=cover_image&populate=address', fetcher);

  if (error) return <div>Failed to load</div>
  if (!data) return <></>

  return (
    <div className={styles.container}>
      <Head>
        <title>Konkrete</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Container sx={{
        textAlign: 'center',
        marginTop: 5
      }} >
        <Typography gutterBottom variant="h4" component="div">Our curated properties</Typography>
        <Typography gutterBottom variant="subtitle2" component="div">Invest any amount. Stake your tokens. Earn now.</Typography>
      </Container>
      {
        data.data.map((element: any) => {
          const attributes = _.mapKeys(element.attributes, (v, k) => _.camelCase(k))
          return (<AssetCard
            key={element.id}
            index={element.id}
            {...attributes}
          ></AssetCard>)
        })
      }
    </div >
  )
}

export default Home
