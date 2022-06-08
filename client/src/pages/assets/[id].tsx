import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import LargeAssetCard from '../../components/LargeAssetCard'
import AssetDataTabs from '../../components/AssetDataTabs'
import { Container } from '@mui/material'
import useSWR from 'swr'
import _ from 'lodash'

const fetcher = (...args: [RequestInfo, RequestInit | undefined]) => fetch(...args).then((res) => res.json())

const Asset: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(id ? `http://localhost:1337/api/assets/${id}?populate=cover_image&populate=gallery&populate=address&populate=highlights` : null, fetcher);

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const attributes = _.mapKeys(data.data.attributes, (v, k) => _.camelCase(k))

    return (
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Container>
                <LargeAssetCard
                    {...attributes}
                ></LargeAssetCard>
                <AssetDataTabs
                    {...attributes}
                ></AssetDataTabs>
            </Container>
        </div >
    )
}

export default Asset
