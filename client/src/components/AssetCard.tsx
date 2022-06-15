import {
    Card, CardActions,
    CardContent,
    Container,
    Chip,
    Box,
    Avatar,
    Typography, Stack
} from '@mui/material';
import Link from 'next/link'
import ClockIcon from '../common/components/icons/ClockIcon';
import GraphAscendIcon from '../common/components/icons/GraphAscendIcon';
import MarkIcon from '../common/components/icons/MarkIcon';
import LightningIcon from '../common/components/icons/LightningIcon';
import HeaderGradient from '../common/components/elements/HeaderGradient';

const AssetCard = ({ ...props }) => {

    const loc = `${props.address.city_name}, ${props.address.state}`

    return <Card sx={{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10, borderRadius: '20px' }}>
        <Container sx={{ height: 100, backgroundColor: '#A7A8FB' }} >

        </Container>
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
                        <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><GraphAscendIcon size={20} color="white" /></span>} label={`${props.apr}% Yield`} color="primary" />
                        <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><LightningIcon size={20} color="#111029" /></span>} label={`${props.debt}% debt`} variant="outlined" />
                        {/* {props.hasWaitlist ? <Chip icon={<span style={{ margin: '7px 0px 0px 5px' }}><ClockIcon size={20} color="#111029" /></span>} label='Waitlist' variant="outlined" /> : <></>}
                        {props.isLeveraged ? <Chip label='Leveraged' variant="outlined" /> : <></>} */}
                    </Box>
                </CardContent>
            </Box>
            <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                    About
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                    <Chip label={props.propertyType} variant="outlined" />
                    <Chip label={`${props.bedroomsNumber} beds`} variant="outlined" />
                    <Chip label={`${props.surface}m²`} variant="outlined" />
                    <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><MarkIcon size={20} color="#111029" /></span>} label={loc} variant="outlined" />
                </Stack>
                <Typography variant="body2" paragraph>
                    {props.about}
                </Typography>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'center' }}
            >
                <Link href={`/assets/${props.index}`}><Chip label='Learn More' color="primary" variant="outlined" clickable /></Link>
            </CardActions>
        </CardContent>
    </Card >
}

export default AssetCard;