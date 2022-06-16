import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import AssetCard from '../components/AssetCard'
import useSWR from 'swr'
import _ from 'lodash'
import { Typography, Box, Container, Toolbar } from '@mui/material'
import Footer from '../components/Footer'
// import '../../public/fonts/Fontello-Regular.woff2'
import { DataStore } from '@aws-amplify/datastore';
import { EstateModel } from '../models';

// const fetcher = (...args: [RequestInfo, RequestInit | undefined]) => fetch(...args).then((res) => res.json())

const Home: NextPage = () => {

  // const { data, error } = useSWR('http://localhost:1337/api/assets?populate=cover_image&populate=address', fetcher);
  const [estates, updateEstates] = useState<EstateModel[]>([]);

  useEffect(() => {
    fetchEstates()
    const subscription = DataStore.observe(EstateModel).subscribe(() =>
      fetchEstates()
    );
    return () => subscription.unsubscribe();
  });

  const fetchEstates = async () => {
    const estates = await DataStore.query(EstateModel);
    updateEstates(estates);
  }


  if (estates.length == 0) return <></>

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
        estates.map((estate: EstateModel) => {
          // const attributes = _.mapKeys(element.attributes, (v, k) => _.camelCase(k))
          return (<AssetCard
            key={estate.id}
            // index={estate.id}
            {...estate}
          ></AssetCard>)
        })
      }
    </div >
  )
}

export default Home
