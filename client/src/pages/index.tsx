import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import AssetCard from '../components/AssetCard'
import useSWR from 'swr'


const fetcher = (...args: [RequestInfo, RequestInit | undefined]) => fetch(...args).then((res) => res.json())

const Home: NextPage = () => {

  const { data, error } = useSWR('http://localhost:1337/api/assets?populate=cover_image&populate=address', fetcher);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  console.log(data);

  return (
    <div className={styles.container}>
      <Head>
        <title>Konkrete</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ResponsiveAppBar></ResponsiveAppBar>
      {
        data.data.map((element: any) => (<AssetCard
          key={element.id}
          uid={element.id}
          name={element.attributes.name}
          coverImage={element.attributes.cover_image}
          about={element.attributes.about}
          address={element.attributes.address}
          apr={element.attributes.apr}
          hasWaitlist={element.attributes.has_waitlist}
          isLeveraged={element.attributes.is_leveraged}
        ></AssetCard>))
      }
    </div >
  )
}

export default Home
