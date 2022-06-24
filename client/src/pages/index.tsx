import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import AssetCard from '../components/AssetCard'
import _ from 'lodash'
import { Typography, Container } from '@mui/material'
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
  }, [fetchEstates]);

  async function fetchEstates() {
    const estates = await DataStore.query(EstateModel);
    updateEstates(estates);
  }

  if (estates.length == 0) return <></>

  return (
    <>
      <Container sx={{ mb: 10 }}>
        <Container sx={{ textAlign: 'center', mb: 7 }} >
          <Typography gutterBottom variant="h4" component="div">Our curated properties</Typography>
          <Typography gutterBottom variant="subtitle2" component="div">Invest any amount. Stake your tokens. Earn now.</Typography>
        </Container>
        {
          estates.map((estate: EstateModel) => {
            return (<AssetCard
              key={estate.id}
              {...estate}
            ></AssetCard>)
          })
        }
      </Container>
    </>
  )
}

export default Home
