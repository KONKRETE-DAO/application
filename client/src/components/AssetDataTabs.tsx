import { useState, useEffect } from 'react'
import {
    Card,
    CardContent,
    Stack,
    Chip,
    Box,
    Avatar,
    Typography,
    Table, TableBody, TableRow, TableCell,
    ImageList, ImageListItem, CircularProgress
} from '@mui/material';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import TestIcon from '../common/components/icons/TestIcon';
import GraphAscendIcon from '../common/components/icons/GraphAscendIcon';
import LightningIcon from '../common/components/icons/LightningIcon';
import CoinIcon from '../common/components/icons/CoinIcon';
import DatabaseIcon from '../common/components/icons/DatabaseIcon';
import HomeIcon from '../common/components/icons/HomeIcon';
import MarkIcon from '../common/components/icons/MarkIcon';
import CalendarIcon from '../common/components/icons/CalendarIcon';
import SettingsIcon from '../common/components/icons/SettingsIcon';
import UserIcon from '../common/components/icons/UserIcon';
import ToolsIcon from '../common/components/icons/ToolsIcon';
import WritingPencilIcon from '../common/components/icons/WritingPencilIcon';
import ShareIcon from '../common/components/icons/ShareIcon';
import MegaphoneIcon from '../common/components/icons/MegaphoneIcon';
import CogIcon from '../common/components/icons/CogIcon';
import BookmarkIcon from '../common/components/icons/BookmarkIcon';
import { EstateModel } from '../models';
import { Storage } from 'aws-amplify';

const tabs = ['Highlights', 'Location', 'Financials', 'Gallery'];
const staticHighlights = [
    { highlight: 'Ranked 2nd best university city in France' },
    { highlight: 'Dynamic with 17% price increase in the past 5 years' },
    { highlight: 'Transaction volume 73% superior to the national average' },
    { highlight: 'Healthy long term investment' },
    { highlight: 'Dynamic short term investment' },
]

function humanize(str: string) {
    var i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase();
    }
    return frags.join(' ');
}

const AssetDataTabs = ({ ...props }) => {
    const [active, setActive] = useState(0);

    // const [highlights, updateHighlights] = useState<HighlightModel[]>([]);

    // useEffect(() => {
    //     fetchEstates()
    //     const subscription = DataStore.observe(HighlightModel).subscribe(() =>
    //         fetchEstates()
    //     );
    //     return () => subscription.unsubscribe();
    // });

    // const fetchEstates = async () => {
    //     const estate = props as EstateModel

    //     const highlights = await DataStore.query(HighlightModel, where: HighlightModel. EstateModel.ID.eq(props.id));
    //     updateHighlights(highlights);
    // }

    const [images, updateCover] = useState<string[]>([]);

    useEffect(() => {
        fetchImages()
    }, [images]);

    const fetchImages = async () => {
        const image1 = await Storage.get(`${props.slug}/gallery/image1.jpg`, {
            level: "public"
        });
        const image2 = await Storage.get(`${props.slug}/gallery/image2.jpg`, {
            level: "public"
        });
        const image3 = await Storage.get(`${props.slug}/gallery/image3.jpg`, {
            level: "public"
        });
        updateCover([image1, image2, image3]);
    }


    const loc = `${props.address.city_name}, ${props.address.state}`
    const handleClick = (index: number) => () => setActive(index);
    const nf = new Intl.NumberFormat('en-US');

    console.log(props.highlights)

    return <>
        <Stack direction='row' gap={2} sx={{ mb: '30px' }}>
            {
                tabs.map((tab, index) => <Chip key={index} label={tab} variant={index == active ? "filled" : "outlined"} color="primary" onClick={handleClick(index)} clickable />)
            }
        </Stack>
        <Card sx={{ borderRadius: '10px', display: active != 0 ? 'none' : 'block' }}>
            <CardContent sx={{ py: '20px', px: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Property highlights
                </Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell scope="row" align="right" padding="checkbox"><GraphAscendIcon /></TableCell>
                            <TableCell align="left">Gross Yield</TableCell>
                            <TableCell align="right">{`${props.grossYield}%`}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right" padding="checkbox"><HomeIcon /></TableCell>
                            <TableCell align="left">Property Type</TableCell>
                            <TableCell align="right">{humanize(props.propertyType)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" align="right" padding="checkbox"><CoinIcon /></TableCell>
                            <TableCell align="left">Return on capital employed</TableCell>
                            {/* <TableCell align="right">{new Date(props.rentStartDate).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" })}</TableCell> */}
                            <TableCell align="right">{`${props.returnOnCapitalEmployed}%`}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right" padding="checkbox"><MarkIcon /></TableCell>
                            <TableCell align="left">Neighborhood</TableCell>
                            <TableCell align="right">{props.neighborhood}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" align="right" padding="checkbox"><DatabaseIcon /></TableCell>
                            <TableCell align="left">Revenue per Token</TableCell>
                            <TableCell align="right">{`${nf.format(props.revenuePerToken as number)}€`}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right" padding="checkbox"><UserIcon /></TableCell>
                            <TableCell align="left">Bedrooms</TableCell>
                            <TableCell align="right">{props.bedrooms}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" align="right" padding="checkbox"><DatabaseIcon /></TableCell>
                            <TableCell align="left">Token Price</TableCell>
                            <TableCell align="right">{`${nf.format(props.tokenPrice as number)}€`}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right" padding="checkbox"><TestIcon /></TableCell>
                            <TableCell align="left">Rental Type</TableCell>
                            <TableCell align="right">{humanize(props.rentalType)}</TableCell>
                        </TableRow>
                        <TableRow sx={{ 'td, th': { border: 0 } }}>
                            <TableCell scope="row" align="right" padding="checkbox"><SettingsIcon /></TableCell>
                            <TableCell align="left">Total Tokens</TableCell>
                            <TableCell align="right">{nf.format(props.totalTokens as number)}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right" padding="checkbox"><LightningIcon /></TableCell>
                            <TableCell align="left">Acquisition Strategy</TableCell>
                            <TableCell align="right">{props.acquisitionStrategy}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card sx={{ borderRadius: '10px', display: active != 1 ? 'none' : 'block' }}>
            <CardContent sx={{ py: '20px', px: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Property location
                </Typography>
                <Box sx={{ display: 'flex', flexFlow: 'row' }}>
                    <CardContent sx={{ flex: 1, pl: 0 }} >
                        <Typography gutterBottom variant="h6" component="div">
                            Trust indice in {loc}
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex' }}>
                            <Box sx={{ width: 180, height: 180, position: 'relative', display: 'inline-flex', mt: 3, mx: 'auto' }}>
                                <CircularProgress size='180px' thickness={4.5} variant="determinate" value={props.trustIndice} sx={{ color: '#B3D768' }} />
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: 'absolute',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        variant="h2"
                                        component="div"
                                        color="#B3D768"
                                    >{`${Math.round(props.trustIndice)}`}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </CardContent>
                    <Table sx={{ flex: 2, mt: '20px' }} size="small">
                        <TableBody>

                            {
                                props.highlights.map((element: string, index: number) => (
                                    // <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableRow key={index} sx={{ 'td, th': { border: 0 } }}>
                                        <TableCell scope="row" align="right" padding="checkbox"><VerifiedOutlinedIcon sx={{ color: '#57596C' }} /></TableCell>
                                        <TableCell align="left">{element}</TableCell>
                                    </TableRow>)
                                )
                            }
                        </TableBody>
                    </Table>
                </Box>

            </CardContent>
        </Card >


        <Card sx={{ borderRadius: '10px', display: active != 2 ? 'none' : 'block' }}>
            <CardContent sx={{ py: '20px', px: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Property financials
                </Typography>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell scope="row" align="right" padding="checkbox"><HomeIcon /></TableCell>
                            <TableCell align="left">Acquisition Price</TableCell>
                            <TableCell align="right">{`${nf.format(props.acquisitionPrice as number)}€`}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right" padding="checkbox"><CoinIcon /></TableCell>
                            <TableCell align="left">Rental Income</TableCell>
                            <TableCell align="right">{`${nf.format(props.rentalIncome as number)}€`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" align="right" padding="checkbox"><ToolsIcon /></TableCell>
                            <TableCell align="left">Refurbishment</TableCell>
                            <TableCell align="right">{`+${nf.format(props.refurbishment as number)}€`}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right" padding="checkbox"><CogIcon /></TableCell>
                            <TableCell align="left">Property management</TableCell>
                            <TableCell align="right">{`${nf.format(props.propertyManagement as number)}€`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" align="right" padding="checkbox"><ShareIcon /></TableCell>
                            <TableCell align="left">Konkrete Fee</TableCell>
                            <TableCell align="right">{`${nf.format(props.fee as number)}€`}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right" padding="checkbox"><BookmarkIcon /></TableCell>
                            <TableCell align="left">Government Taxes</TableCell>
                            <TableCell align="right">{`${nf.format(props.governmentTaxes as number)}€`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell scope="row" align="right" padding="checkbox"><WritingPencilIcon /></TableCell>
                            <TableCell align="left">Mortgage</TableCell>
                            <TableCell align="right">{`${nf.format(props.mortgage as number)}€`}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right" padding="checkbox"><DatabaseIcon /></TableCell>
                            <TableCell align="left">Total token supply</TableCell>
                            <TableCell align="right">{`${nf.format(props.totalTokens as number)}`}</TableCell>
                        </TableRow>
                        <TableRow sx={{ 'td, th': { border: 0 } }}>
                            <TableCell scope="row" align="right" padding="checkbox"><MegaphoneIcon /></TableCell>
                            <TableCell align="left">Capital Call</TableCell>
                            <TableCell align="right">{`${nf.format(props.capitalCall as number)}€`}</TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right" padding="checkbox"><DatabaseIcon /></TableCell>
                            <TableCell align="left">Price per token</TableCell>
                            <TableCell align="right">{`${nf.format(props.tokenPrice as number)}€`}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card sx={{ borderRadius: '10px', display: active != 3 ? 'none' : 'block' }}>
            <CardContent sx={{ py: '20px', px: '50px' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Property gallery
                </Typography>
                <ImageList cols={3}>
                    {images.map((item: string, index) => (
                        <ImageListItem key={index}>
                            <img
                                src={item}
                                srcSet={item}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </CardContent>
        </Card>
    </>
}

export default AssetDataTabs;