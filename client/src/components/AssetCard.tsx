import { useState, useEffect } from 'react'
import {
    Card, CardActions,
    CardContent,
    Chip,
    Box,
    Avatar,
    Typography, Stack
} from '@mui/material';
import Link from 'next/link'
import GraphAscendIcon from '../common/components/icons/GraphAscendIcon';
import MarkIcon from '../common/components/icons/MarkIcon';
import LightningIcon from '../common/components/icons/LightningIcon';
import { Storage } from '@aws-amplify/storage';

function humanize(str: string) {
    var i, frags = str.split('_');
    for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1).toLowerCase();
    }
    return frags.join(' ');
}

const AssetCard = ({ ...props }) => {

    const [cover, updateCover] = useState<string>();

    useEffect(() => {
        fetchCover()
    }, []);

    const fetchCover = async () => {
        const cover = await Storage.get(`${props.slug}/cover.jpg`, {
            level: "public"
        });
        updateCover(cover);
    }

    const loc = `${props.address.cityName || ''}, ${props.address.state || ''}`

    return <Card sx={{ maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', marginBottom: 4, borderRadius: '20px' }}>
        <Box sx={{ height: '100px', backgroundColor: '#A7A8FB' }} >
        </Box>
        <CardContent sx={{ pt: 0 }}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: 120, height: 95 }}>
                    <Avatar
                        sx={{ width: 120, height: 120, top: -30, border: '6px solid white' }}
                        src={cover}
                    />
                </Box>
                <CardContent sx={{ "&:last-child": { paddingBottom: 1 } }}>
                    <Typography gutterBottom variant="h6" component="div">
                        {props.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignContent: 'flex-start', flexFlow: 'row wrap', gap: '12px' }}>
                        <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><GraphAscendIcon size={20} color="white" /></span>} label={`${props.grossYield}% Yield`} color="primary" />
                        <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><LightningIcon size={20} color="#111029" /></span>} label={`${props.debt}% debt`} variant="outlined" />
                    </Box>
                </CardContent>
            </Box>
            <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                    About
                </Typography>
                <Box sx={{ display: 'flex', alignContent: 'flex-start', flexFlow: 'row wrap', gap: '12px', mb: 3 }}>
                    <Chip label={humanize(props.propertyType)} variant="outlined" />
                    <Chip label={`${props.bedrooms} beds`} variant="outlined" />
                    <Chip label={`${props.surface}m²`} variant="outlined" />
                    <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><MarkIcon size={20} color="#111029" /></span>} label={loc} variant="outlined" />
                </Box>
                <Typography variant="body2" paragraph>
                    {props.description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{ justifyContent: 'center' }}
            >
                <Link href={`/assets/${props.id}`}><Chip label='Learn More' color="primary" variant="outlined" clickable /></Link>
            </CardActions>
        </CardContent>
    </Card >
}

export default AssetCard;