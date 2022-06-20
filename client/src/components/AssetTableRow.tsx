import { useState, useEffect, useMemo, forwardRef } from 'react'
import {
    Box,
    Avatar,
    Typography, Stack, TableRow, TableCell
} from '@mui/material';
import Link from 'next/link'
import { Link as MUILink } from '@mui/material';
import { Storage } from '@aws-amplify/storage';

function humanize(str: string) {
    var i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase();
    }
    return frags.join(' ');
}

const AssetCard = ({ ...props }) => {
    const { id } = props
    const [cover, updateCover] = useState<string>();

    useEffect(() => {
        fetchCover()
    }, [cover, fetchCover]);

    // const CustomLink = useMemo(
    //     () =>
    //         forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'>>(function Link(
    //             linkProps,
    //             ref,
    //         ) {
    //             return <Link ref={ref} href={`/assets/${id}`} {...linkProps} />;
    //         }),
    //     [id],
    // );

    async function fetchCover() {
        const cover = await Storage.get(`${props.slug}/cover.jpg`, {
            level: "public"
        });
        updateCover(cover);
    }

    const loc = `${props.address.cityName || ''}, ${props.address.state || ''}`

    return (<TableRow
    >
        <TableCell scope="row" sx={{ display: "flex" }}>
            <Avatar
                sx={{ width: 120, height: 120, mr: 2 }}
                src={cover}
            />
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"

            }}>
                <Typography variant="body1" gutterBottom>
                    <Link href={`/assets/${props.id}`} passHref>
                        <MUILink underline="always">
                            {props.name}
                        </MUILink>
                    </Link>
                </Typography>
                <Typography variant="body2">{loc}</Typography>
            </Box>
        </TableCell>
        <TableCell>

        </TableCell>
        <TableCell align="center">-- USD-C</TableCell>
        <TableCell align="center">--</TableCell>
        <TableCell align="center">--</TableCell>
    </TableRow>)



    //         < Card sx = {{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10, borderRadius: '20px' }
    // }>
    //         <Container sx={{ height: 100, backgroundColor: '#A7A8FB' }} >

    //         </Container>
    //         <CardContent sx={{ pt: 0 }}>
    //             <Box sx={{ display: 'flex' }}>
    //                 <Box sx={{ width: 120, height: 95 }}>
    //                     <Avatar
    //                         sx={{ width: 120, height: 120, top: -30, border: '6px solid white' }}
    //                         src={cover}
    //                     />
    //                 </Box>
    //                 <CardContent sx={{ "&:last-child": { paddingBottom: 1 } }}>
    //                     <Typography gutterBottom variant="h6" component="div">
    //                         {props.name}
    //                     </Typography>
    //                     <Box sx={{ display: 'flex', alignContent: 'flex-start', flexFlow: 'row wrap', gap: '12px' }}>
    //                         <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><GraphAscendIcon size={20} color="white" /></span>} label={`${props.grossYield}% Yield`} color="primary" />
    //                         <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><LightningIcon size={20} color="#111029" /></span>} label={`${props.debt}% debt`} variant="outlined" />
    //                         {/* {props.hasWaitlist ? <Chip icon={<span style={{ margin: '7px 0px 0px 5px' }}><ClockIcon size={20} color="#111029" /></span>} label='Waitlist' variant="outlined" /> : <></>}
    //                         {props.isLeveraged ? <Chip label='Leveraged' variant="outlined" /> : <></>} */}
    //                     </Box>
    //                 </CardContent>
    //             </Box>
    //             <CardContent>
    //                 <Typography variant="subtitle1" gutterBottom>
    //                     About
    //                 </Typography>
    //                 <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
    //                     <Chip label={humanize(props.propertyType)} variant="outlined" />
    //                     <Chip label={`${props.bedrooms} beds`} variant="outlined" />
    //                     <Chip label={`${props.surface}m²`} variant="outlined" />
    //                     <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><MarkIcon size={20} color="#111029" /></span>} label={loc} variant="outlined" />
    //                 </Stack>
    //                 <Typography variant="body2" paragraph>
    //                     {props.description}
    //                 </Typography>
    //             </CardContent>
    //             <CardActions
    //                 sx={{ justifyContent: 'center' }}
    //             >
    //                 <Link href={`/assets/${props.id}`}><Chip label='Learn More' color="primary" variant="outlined" clickable /></Link>
    //             </CardActions>
    //         </CardContent>
    //     </Card >
}

export default AssetCard;