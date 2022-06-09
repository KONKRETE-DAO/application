import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const LargeAssetCard = ({ ...props }) => {

    const loc = `${props.address.city_name}, ${props.address.state}`

    return <Card sx={{
        marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10
    }}>
        <CardContent sx={{ display: 'flex' }} >
            <CardContent >
                <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={`http://localhost:1337${props.coverImage.data.attributes.url}`}
                />
            </CardContent>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    {props.shortDescription}
                </Typography>
            </CardContent>
            <CardContent sx={{ display: 'flex', alignContent: 'flex-start', flexFlow: 'row wrap', gap: '12px' }}>
                <Chip label={`${loc}`} variant="outlined" />
                <Chip label={`${props.apr}% APR`} variant="outlined" />
                {props.hasWaitlist ? <Chip label='Waitlist' variant="outlined" /> : <></>}
                {props.isLeveraged ? <Chip label='Leveraged' variant="outlined" /> : <></>}
            </CardContent>
        </CardContent>
    </Card>
}

export default LargeAssetCard;