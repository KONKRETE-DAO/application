import { ReactElement } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import LargeAssetCard from '../../components/LargeAssetCard'
import AssetDataTabs from '../../components/AssetDataTabs'
import MyMapComponent from '../../components/MyMapComponent'
import { Container, Box } from '@mui/material'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import useSWR from 'swr'
import _ from 'lodash'

const fetcher = (...args: [RequestInfo, RequestInit | undefined]) => fetch(...args).then((res) => res.json())

const render = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <h3>{status} ..</h3>;
    return <h3>{status} ...</h3>;
};

const Asset: NextPage = ({ }) => {
    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(id ? `http://localhost:1337/api/assets/${id}?populate=cover_image&populate=gallery&populate=address&populate=coordinates&populate=highlights` : null, fetcher);

    if (error) return <div>Failed to load</div>
    if (!data) return <></>

    const attributes = _.mapKeys(data.data.attributes, (v, k) => _.camelCase(k))

    return (
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Container>
                <LargeAssetCard
                    {...attributes}
                ></LargeAssetCard>
                <Wrapper apiKey={"AIzaSyDlw8AtkvLkV3WNnfB6Rm7qKyII5j56k00"} render={render}>
                    <MyMapComponent center={{ lat: attributes.coordinates.latitude, lng: attributes.coordinates.longitude }} zoom={17} />
                </Wrapper>
                <AssetDataTabs
                    {...attributes}
                ></AssetDataTabs>
            </Container>
        </div >
    )
}

export default Asset
