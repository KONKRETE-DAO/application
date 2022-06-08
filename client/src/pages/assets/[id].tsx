import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import ResponsiveAppBar from '../../components/ResponsiveAppBar'
import LargeAssetCard from '../../components/LargeAssetCard'
import AssetDataTabs from '../../components/AssetDataTabs'
import { Container } from '@mui/material';
import useSWR from 'swr'

const fetcher = (...args: [RequestInfo, RequestInit | undefined]) => fetch(...args).then((res) => res.json())

const Asset: NextPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { data, error } = useSWR(id ? `http://localhost:1337/api/assets/${id}?populate=cover_image&populate=gallery&populate=address&populate=highlights` : null, fetcher);

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>

    const attributes = data.data.attributes;
    console.log(data);
    return (
        <div>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Container>
                <LargeAssetCard
                    name={attributes.name}
                    coverImage={attributes.cover_image}
                    shortDescription={attributes.short_description}
                    address={attributes.address}
                    apr={attributes.apr}
                    hasWaitlist={attributes.has_waitlist}
                    isLeveraged={attributes.is_leveraged}
                ></LargeAssetCard>
                <AssetDataTabs
                    name={attributes.name}
                    gallery={attributes.gallery}
                    address={attributes.address}
                    apr={attributes.apr}
                    hasWaitlist={attributes.has_waitlist}
                    isLeveraged={attributes.is_leveraged}
                    expectedIncome={attributes.expected_income}
                    propertyType={attributes.property_type}
                    assetType={attributes.asset_type}
                    rentStartDate={new Date(attributes.rent_start_date)}
                    rentPerToken={attributes.rent_per_token}
                    tokenPrice={attributes.token_price}
                    tokensNumber={attributes.tokens_number}
                    neighborhood={attributes.neighborhood}
                    bedroomsNumber={attributes.bedrooms_number}
                    rentalType={attributes.rental_type}
                    rentalStrategy={attributes.rental_strategy}
                    trustIndice={attributes.trust_indice}
                    highlights={attributes.highlights}
                    acquisitionPrice={attributes.acquisition_price}
                    refurbishment={attributes.refurbishment}
                    totalPrice={attributes.total_price}
                    mortgage={attributes.mortgage}
                    rentalIncome={attributes.rental_income}
                    netRentalIncome={attributes.net_rental_income}
                    internalRateOfReturn={attributes.internal_rate_of_return}
                ></AssetDataTabs>
            </Container>
        </div >
    )
}

export default Asset
