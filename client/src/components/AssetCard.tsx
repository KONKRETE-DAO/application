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
    Typography
} from '@mui/material';
import Link from 'next/link'

// interface Props {
//     uid: string,
//     name: string,
//     coverImage: any,
//     about: string,
//     address: any,
//     apr: number,
//     hasWaitlist: boolean,
//     isLeveraged: boolean,
// }

const AssetCard = ({
    // uid,
    // name,
    // coverImage,
    // about,
    // address,
    // apr,
    // hasWaitlist,
    // isLeveraged,
    ...props }) => {

    const loc = `${props.address.city_name}, ${props.address.state}`

    return <Card sx={{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10, borderRadius: '5%' }}>
        <Container sx={{ height: 100, backgroundColor: '#A7A8FB' }} ></Container>
        <CardContent sx={{ pt: 0 }}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: 120, height: 95 }}>
                    <Avatar
                        sx={{ width: 120, height: 120, top: -30, border: '6px solid white' }}
                        src={`http://localhost:1337${props.coverImage.data.attributes.url}`}
                    />
                </Box>
                <CardContent sx={{ "&:last-child": { paddingBottom: 1 } }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {props.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignContent: 'flex-start', flexFlow: 'row wrap', gap: '12px' }}>
                        <Chip label={`${loc}`} variant="outlined" />
                        <Chip label={`${props.apr}% APR`} variant="outlined" />
                        {props.hasWaitlist ? <Chip label='Waitlist' variant="outlined" /> : <></>}
                        {props.isLeveraged ? <Chip label='Leveraged' variant="outlined" /> : <></>}
                    </Box>
                </CardContent>
            </Box>
            <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                    About {props.name}
                </Typography>
                <Typography variant="body2" paragraph>
                    {props.about}
                </Typography>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'center' }}
            >
                <Link href={`/assets/${props.uid}`}><Chip label='See More' color="primary" clickable /></Link>
            </CardActions>
        </CardContent>
    </Card>
}

export default AssetCard;