import { JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from 'react'
import {
    Card, Paper, CardActions,
    CardHeader,
    CardContent,
    CardMedia,
    Stack,
    Button,
    Container,
    Chip,
    Box,
    Avatar,
    Typography,
    Table, TableBody, TableRow, TableCell
} from '@mui/material';
import Link from 'next/link'

const tabs = ['Highlights', 'Location', 'Financials', 'Gallery'];

interface Props {
    uid: string,
    name: string,
    coverImage: any,
    about: string,
    address: any,
    apr: number,
    hasWaitlist: boolean,
    isLeveraged: boolean,
    expectedIncome: number,
    propertyType: string,
    gallery: any,
    assetType: string,
    rentStartDate: Date,
    rentPerToken: number,
    tokenPrice: number,
    tokensNumber: number,
    neighborhood: string,
    bedroomsNumber: string,
    rentalType: string,
    rentalStrategy: string,
    trustIndice: number,
    highlights: any,
    acquisitionPrice: number,
    refurbishment: number,
    totalPrice: number,
    mortgage: number,
    rentalIncome: number,
    netRentalIncome: number,
    internalRateOfReturn: number
}

const AssetDataTabs = ({
    uid,
    name,
    coverImage,
    about,
    address,
    apr,
    hasWaitlist,
    isLeveraged,
    expectedIncome,
    propertyType,
    gallery,
    assetType,
    rentStartDate,
    rentPerToken,
    tokenPrice,
    tokensNumber,
    neighborhood,
    bedroomsNumber,
    rentalType,
    rentalStrategy,
    trustIndice,
    highlights,
    acquisitionPrice,
    refurbishment,
    totalPrice,
    mortgage,
    rentalIncome,
    netRentalIncome,
    internalRateOfReturn,
    ...props }: Props) => {

    const [active, setActive] = useState(0);

    const loc = `${address.city_name}, ${address.state}`

    const handleClick = (index: number) => () => setActive(index);

    return <>
        <Stack direction='row' gap={2}>
            {
                tabs.map((tab, index) => <Chip label={tab} variant={index == active ? "filled" : "outlined"} color="primary" onClick={handleClick(index)} clickable />)
            }
        </Stack>
        {active != 0 ? <></> :
            <Card sx={{ borderRadius: '10px' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Property highlights
                    </Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Expected Income</TableCell>
                                <TableCell align="right">{expectedIncome}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Property Type</TableCell>
                                <TableCell align="right">{propertyType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Rent start date</TableCell>
                                <TableCell align="right">{rentStartDate.toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" })}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Neighborhood</TableCell>
                                <TableCell align="right">{neighborhood}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Rent per Token</TableCell>
                                <TableCell align="right">{rentPerToken}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Bedrooms</TableCell>
                                <TableCell align="right">{bedroomsNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Token Price</TableCell>
                                <TableCell align="right">{tokenPrice}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Rental Type</TableCell>
                                <TableCell align="right">{rentalType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Total Token</TableCell>
                                <TableCell align="right">{tokensNumber}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Rental Strategy</TableCell>
                                <TableCell align="right">{rentalStrategy}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        }
        {active != 1 ? <></> :
            <Card sx={{ borderRadius: '10px' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Property location
                    </Typography>
                    <Table>
                        <TableBody>
                            {
                                highlights.map((element: { highlight: string }) => (
                                    <TableRow>
                                        <TableCell scope="row"></TableCell>
                                        <TableCell align="left">{element.highlight}</TableCell>
                                    </TableRow>)
                                )
                            }

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        }
        {active != 2 ? <></> :
            <Card sx={{ borderRadius: '10px' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Property financials
                    </Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Acquisition Price</TableCell>
                                <TableCell align="right">{acquisitionPrice}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Rental Income</TableCell>
                                <TableCell align="right">{rentalIncome}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Refurbishment</TableCell>
                                <TableCell align="right">{refurbishment}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Net rental income</TableCell>
                                <TableCell align="right">{netRentalIncome}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Total Price</TableCell>
                                <TableCell align="right">{totalPrice}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Token Price</TableCell>
                                <TableCell align="right">{tokenPrice}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Mortgage</TableCell>
                                <TableCell align="right">{mortgage}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Rent per Token</TableCell>
                                <TableCell align="right">{rentPerToken}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Total Token</TableCell>
                                <TableCell align="right">{tokensNumber}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Internal rate of return</TableCell>
                                <TableCell align="right">{internalRateOfReturn}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        }
        {active != 3 ? <></> :
            <Card sx={{ borderRadius: '10px' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Property gallery
                    </Typography>
                </CardContent>
            </Card>
        }
    </>
}

export default AssetDataTabs;