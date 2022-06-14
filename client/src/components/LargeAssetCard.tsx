import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MarkIcon from '../common/components/icons/MarkIcon';
import GraphAscendIcon from '../common/components/icons/GraphAscendIcon';
import ClockIcon from '../common/components/icons/ClockIcon';
import LightningIcon from '../common/components/icons/LightningIcon';
import { Box, Button, TextField } from '@mui/material';
import HomeIcon from '../common/components/icons/HomeIcon';

const LargeAssetCard = ({ ...props }) => {

    const loc = `${props.address.city_name}, ${props.address.state}`

    return <Card sx={{
        marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 5, borderRadius: '20px'
    }}>
        <CardContent sx={{ display: 'flex' }} >
            <CardContent >
                <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={`http://localhost:1337${props.coverImage.data.attributes.url}`}
                />
            </CardContent>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h6" component="div">
                    {props.name} ({loc})
                </Typography>
                <Box sx={{ display: 'flex', alignContent: 'flex-start', flexFlow: 'row wrap', gap: '12px' }}>
                    <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><GraphAscendIcon size={20} color="white" /></span>} label={`${props.apr}% Yield`} color="primary" />
                    <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><LightningIcon size={20} color="#111029" /></span>} label={`${props.debt}% debt`} variant="outlined" />
                    {/* {props.hasWaitlist ? <Chip icon={<span style={{ margin: '7px 0px 0px 5px' }}><ClockIcon size={20} color="#111029" /></span>} label='Waitlist' variant="outlined" /> : <></>}
                        {props.isLeveraged ? <Chip label='Leveraged' variant="outlined" /> : <></>} */}
                </Box>
                {/* <Typography variant="body2" color="text.secondary" paragraph>
                    {props.shortDescription}
                </Typography> */}
            </CardContent>
            {/* <CardContent sx={{ display: 'flex', alignContent: 'flex-start', flexFlow: 'row wrap', gap: '12px' }}>
                <Chip icon={<span style={{ margin: '7px 0px 0px 5px' }}><MarkIcon size={20} color="#111029" /></span>} label={`${loc}`} variant="outlined" />
                <Chip label={`${props.apr}% APR`} variant="outlined" />
                {props.hasWaitlist ? <Chip icon={<span style={{ margin: '7px 0px 0px 5px' }}><ClockIcon size={20} color="#111029" /></span>} label='Waitlist' variant="outlined" /> : <></>}
                {props.isLeveraged ? <Chip label='Leveraged' variant="outlined" /> : <></>}
            </CardContent> */}
        </CardContent>
        <CardContent>
            <CardContent sx={{
                display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', gap: 2, "&:last-child": { paddingBottom: 1 }, height: 80
            }} >
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">Buy real estate tokens</Typography>
                    <Typography variant="subtitle2">Use USD-C and receive real estate tokens</Typography>
                </Box>
                <TextField sx={{ width: '40%' }} placeholder='Amount'></TextField>
                <Button variant="contained" color="secondary" disableElevation>Connect Wallet</Button>
            </CardContent>
        </CardContent>
    </Card >
}

export default LargeAssetCard;