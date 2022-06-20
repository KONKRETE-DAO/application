import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import AssetCard from '../components/AssetCard'
import useSWR from 'swr'
import _ from 'lodash'
import { Typography, Box, Container, Toolbar, TableRow, TableCell, TableBody, Table, TableHead, Avatar } from '@mui/material'
import { DataStore } from '@aws-amplify/datastore';
import { EstateModel } from '../models';
import AssetTableRow from '../components/AssetTableRow'

const Dashboard: NextPage = () => {

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
            <Head>
                <title>Konkrete</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container sx={{
                textAlign: 'center',
                marginTop: 5,
                mb: 10
            }} >
                <Typography gutterBottom variant="h4" component="div">My dashboard</Typography>
                <Typography gutterBottom variant="subtitle2" component="div">Invest any amount. Stake your tokens. Earn now.</Typography>
            </Container>
            <Container sx={{ mb: 10 }}>
                <Table>
                    <TableHead>
                        <TableRow
                        >
                            <TableCell scope="row" width="30%">Property info</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="center">Amount committed</TableCell>
                            <TableCell align="center">Staking</TableCell>
                            <TableCell align="center">Rewards</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            estates.map((estate: EstateModel) => {
                                return (
                                    <AssetTableRow key={estate.id} {...estate} />)
                            })
                        }
                    </TableBody>
                </Table>
            </Container>
        </>
    )
}

export default Dashboard