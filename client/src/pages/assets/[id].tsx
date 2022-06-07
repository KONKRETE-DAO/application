import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import LargeAssetCard from '../../components/LargeAssetCard'

import useSWR from 'swr'

const fetcher = (...args: [RequestInfo, RequestInit | undefined]) => fetch(...args).then((res) => res.json())

const Asset: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(id ? `http://localhost:1337/api/assets/${id}?populate=cover_image&populate=gallery&populate=address` : null, fetcher);

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const attributes = data.data.attributes;
    console.log(data);
    return (
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <LargeAssetCard
                name={attributes.name}
                coverImage={attributes.cover_image}
                shortDescription={attributes.short_description}
                address={attributes.address}
                apr={attributes.apr}
                hasWaitlist={attributes.has_waitlist}
                isLeveraged={attributes.is_leveraged}
            ></LargeAssetCard>
        </div >
    )
}

export default Asset
