import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import AssetCard from '../components/AssetCard'
import useSWR from 'swr'
import _ from 'lodash'


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
