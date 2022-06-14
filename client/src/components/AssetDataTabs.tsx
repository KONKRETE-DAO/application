import { useState } from 'react'
import {
    Card,
    CardContent,
    Stack,
    Chip,
    Box,
    Avatar,
    Typography,
    Table, TableBody, TableRow, TableCell,
    ImageList, ImageListItem,
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

const tabs = ['Highlights', 'Location', 'Financials', 'Gallery'];

const AssetDataTabs = ({ ...props }) => {
    const [active, setActive] = useState(0);
    const loc = `${props.address.city_name}, ${props.address.state}`
    const handleClick = (index: number) => () => setActive(index);
    const nf = new Intl.NumberFormat('en-US');

    return <>
        <Stack direction='row' gap={2} sx={{ mb: '30px' }}>
            {
                tabs.map((tab, index) => <Chip key={index} label={tab} variant={index == active ? "filled" : "outlined"} color="primary" onClick={handleClick(index)} clickable />)
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
                                <TableCell scope="row" align="right" padding="checkbox"><GraphAscendIcon /></TableCell>
                                <TableCell align="left">Expected Income</TableCell>
                                <TableCell align="right">{`${props.expectedIncome}%`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right" padding="checkbox"><HomeIcon /></TableCell>
                                <TableCell align="left">Property Type</TableCell>
                                <TableCell align="right">{props.propertyType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row" align="right" padding="checkbox"><CalendarIcon /></TableCell>
                                <TableCell align="left">Rent start date</TableCell>
                                <TableCell align="right">{new Date(props.rentStartDate).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" })}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right" padding="checkbox"><MarkIcon /></TableCell>
                                <TableCell align="left">Neighborhood</TableCell>
                                <TableCell align="right">{props.neighborhood}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row" align="right" padding="checkbox"><DatabaseIcon /></TableCell>
                                <TableCell align="left">Rent per Token</TableCell>
                                <TableCell align="right">{`${nf.format(props.rentPerToken as number)}$/token`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right" padding="checkbox"><UserIcon /></TableCell>
                                <TableCell align="left">Bedrooms</TableCell>
                                <TableCell align="right">{props.bedroomsNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row" align="right" padding="checkbox"><CoinIcon /></TableCell>
                                <TableCell align="left">Token Price</TableCell>
                                <TableCell align="right">{`${nf.format(props.tokenPrice as number)} USD-C`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right" padding="checkbox"><TestIcon /></TableCell>
                                <TableCell align="left">Rental Type</TableCell>
                                <TableCell align="right">{props.rentalType}</TableCell>
                            </TableRow>
                            <TableRow sx={{ 'td, th': { border: 0 } }}>
                                <TableCell scope="row" align="right" padding="checkbox"><SettingsIcon /></TableCell>
                                <TableCell align="left">Total Token</TableCell>
                                <TableCell align="right">{nf.format(props.tokensNumber as number)}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="right" padding="checkbox"><LightningIcon /></TableCell>
                                <TableCell align="left">Rental Strategy</TableCell>
                                <TableCell align="right">{props.rentalStrategy}</TableCell>
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
                    <Box sx={{ display: 'flex', flexFlow: 'row' }}>
                        <CardContent sx={{ flex: 1, pl: 0 }} >
                            <Typography gutterBottom variant="h6" component="div">
                                Trust indice in {loc}
                            </Typography>
                            <Avatar
                                sx={{ bgcolor: '#228DCA', width: 180, height: 180, mt: '30px' }}
                            >
                                <Typography variant="h1" color='white' sx={{ margin: 'auto' }}>
                                    {props.trustIndice}
                                </Typography>
                            </Avatar>
                        </CardContent>
                        <Table sx={{ flex: 1, mt: '20px' }} size="small">
                            <TableBody>
                                {
                                    props.highlights.map((element: { highlight: string }, index: number) => (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell scope="row" align="right" padding="checkbox"><VerifiedOutlinedIcon sx={{ color: '#57596C' }} /></TableCell>
                                            <TableCell align="left">{element.highlight}</TableCell>
                                        </TableRow>)
                                    )
                                }

                            </TableBody>
                        </Table>
                    </Box>

                </CardContent>
            </Card >
        }
        {
            active != 2 ? <></> :
                <Card sx={{ borderRadius: '10px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Property financials
                        </Typography>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell scope="row" align="right" padding="checkbox"><HomeIcon /></TableCell>
                                    <TableCell align="left">Acquisition Price</TableCell>
                                    <TableCell align="right">{`${nf.format(props.acquisitionPrice as number)}$`}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right" padding="checkbox"></TableCell>
                                    <TableCell align="left">Rental Income</TableCell>
                                    <TableCell align="right">{`${nf.format(props.rentalIncome as number)}$`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row" align="right" padding="checkbox"><ToolsIcon /></TableCell>
                                    <TableCell align="left">Refurbishment</TableCell>
                                    <TableCell align="right">{`${nf.format(props.refurbishment as number)}$`}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right" padding="checkbox"></TableCell>
                                    <TableCell align="left">Net rental income</TableCell>
                                    <TableCell align="right">{`${nf.format(props.netRentalIncome as number)}$`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row" align="right" padding="checkbox"><CoinIcon /></TableCell>
                                    <TableCell align="left">Total Price</TableCell>
                                    <TableCell align="right">{`${nf.format(props.totalPrice as number)}$`}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right" padding="checkbox"></TableCell>
                                    <TableCell align="left">Token Price</TableCell>
                                    <TableCell align="right">{`${nf.format(props.tokenPrice as number)} USD-C`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row" align="right" padding="checkbox"><WritingPencilIcon /></TableCell>
                                    <TableCell align="left">Mortgage</TableCell>
                                    <TableCell align="right">{`${nf.format(props.mortgage as number)}$`}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right" padding="checkbox"></TableCell>
                                    <TableCell align="left">Rent per Token</TableCell>
                                    <TableCell align="right">{`${nf.format(props.rentPerToken as number)}$`}</TableCell>
                                </TableRow>
                                <TableRow sx={{ 'td, th': { border: 0 } }}>
                                    <TableCell scope="row" align="right" padding="checkbox"><SettingsIcon /></TableCell>
                                    <TableCell align="left">Total Token</TableCell>
                                    <TableCell align="right">{nf.format(props.tokensNumber as number)}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right" padding="checkbox"></TableCell>
                                    <TableCell align="left">Internal rate of return</TableCell>
                                    <TableCell align="right">{`${props.internalRateOfReturn}%`}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
        }
        {
            active != 3 ? <></> :
                <Card sx={{ borderRadius: '10px' }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Property gallery
                        </Typography>
                        <ImageList cols={3}>
                            {props.gallery.data.map((item: any) => (
                                <ImageListItem key={item.id}>
                                    <img
                                        src={`http://localhost:1337${item.attributes.url}`}
                                        srcSet={`http://localhost:1337${item.attributes.url}`}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </CardContent>
                </Card>
        }
    </>
}

export default AssetDataTabs;