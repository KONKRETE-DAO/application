import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from 'next/link'

interface Props {
    name: string
    coverImage: any,
    shortDescription: string,
    address: any,
    apr: number,
    hasWaitlist: boolean,
    isLeveraged: boolean,
}

const LargeAssetCard = ({
    name,
    coverImage,
    shortDescription,
    address,
    apr,
    hasWaitlist,
    isLeveraged,
    ...props }: Props) => {

    console.log(`hey : ${coverImage.data.attributes}`);

    const loc = `${address.city_name}, ${address.state}`

    return <Card sx={{
        maxWidth: 900, marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 10
    }}>
        <CardContent sx={{ display: 'flex' }} >
            <CardContent >
                <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={`http://localhost:1337${coverImage.data.attributes.url}`}
                />
            </CardContent>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    {shortDescription}
                </Typography>
            </CardContent>
            <CardContent sx={{ display: 'flex', alignContent: 'flex-start', flexFlow: 'row wrap', gap: '12px' }}>
                <Chip label={`${loc}`} variant="outlined" />
                <Chip label={`${apr}% APR`} variant="outlined" />
                {hasWaitlist ? <Chip label='Waitlist' variant="outlined" /> : <></>}
                {isLeveraged ? <Chip label='Leveraged' variant="outlined" /> : <></>}
            </CardContent>
        </CardContent>
    </Card>
}

export default LargeAssetCard;