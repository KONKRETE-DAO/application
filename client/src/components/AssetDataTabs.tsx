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
import ImageGallery from 'react-image-gallery';


const tabs = ['Highlights', 'Location', 'Financials', 'Gallery'];

const AssetDataTabs = ({ ...props }) => {
    const [active, setActive] = useState(0);
    const loc = `${props.address.city_name}, ${props.address.state}`
    const handleClick = (index: number) => () => setActive(index);
    const nf = new Intl.NumberFormat('en-US');


    const images = props.gallery.data.map((el: any) => {
        return {
            original: `http://localhost:1337${el.attributes.url}`,
            originalWidth: '500px',
        };
    })

    console.log(images)
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
                                <TableCell align="right">{`${props.expectedIncome}%`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Property Type</TableCell>
                                <TableCell align="right">{props.propertyType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Rent start date</TableCell>
                                <TableCell align="right">{new Date(props.rentStartDate).toLocaleString('en-US', { year: "numeric", month: "long", day: "numeric" })}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Neighborhood</TableCell>
                                <TableCell align="right">{props.neighborhood}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Rent per Token</TableCell>
                                <TableCell align="right">{`${nf.format(props.rentPerToken as number)}$/token`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Bedrooms</TableCell>
                                <TableCell align="right">{props.bedroomsNumber}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Token Price</TableCell>
                                <TableCell align="right">{`${nf.format(props.tokenPrice as number)} USD-C`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Rental Type</TableCell>
                                <TableCell align="right">{props.rentalType}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Total Token</TableCell>
                                <TableCell align="right">{nf.format(props.tokensNumber as number)}</TableCell>
                                <TableCell></TableCell>
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
                    <Table>
                        <TableBody>
                            {
                                props.highlights.map((element: { highlight: string }) => (
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
                                <TableCell align="right">{`${nf.format(props.acquisitionPrice as number)}$`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Rental Income</TableCell>
                                <TableCell align="right">{`${nf.format(props.rentalIncome as number)}$`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Refurbishment</TableCell>
                                <TableCell align="right">{`${nf.format(props.refurbishment as number)}$`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Net rental income</TableCell>
                                <TableCell align="right">{`${nf.format(props.netRentalIncome as number)}$`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Total Price</TableCell>
                                <TableCell align="right">{`${nf.format(props.totalPrice as number)}$`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Token Price</TableCell>
                                <TableCell align="right">{`${nf.format(props.tokenPrice as number)} USD-C`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Mortgage</TableCell>
                                <TableCell align="right">{`${nf.format(props.mortgage as number)}$`}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Rent per Token</TableCell>
                                <TableCell align="right">{`${nf.format(props.rentPerToken as number)}$`}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell scope="row"></TableCell>
                                <TableCell align="left">Total Token</TableCell>
                                <TableCell align="right">{nf.format(props.tokensNumber as number)}</TableCell>
                                <TableCell></TableCell>
                                <TableCell align="left">Internal rate of return</TableCell>
                                <TableCell align="right">{`${props.internalRateOfReturn}%`}</TableCell>
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
                    <Container>
                        <ImageGallery items={images} showFullscreenButton={false} showNav={false} showPlayButton={false} />
                    </Container>
                </CardContent>
            </Card>
        }
    </>
}

export default AssetDataTabs;