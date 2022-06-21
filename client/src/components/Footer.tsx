import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MarkIcon from '../common/components/icons/MarkIcon';
import GraphAscendIcon from '../common/components/icons/GraphAscendIcon';
import ClockIcon from '../common/components/icons/ClockIcon';
import LightningIcon from '../common/components/icons/LightningIcon';
import { Box, Button, Container, Divider, TextField } from '@mui/material';
import HomeIcon from '../common/components/icons/HomeIcon';

const Footer = ({ ...props }) => {

    const style = {
        position: 'relative',
        marginTop: 'auto',
        bgcolor: '#111029',
    }

    return <Box sx={style}>
        <Container maxWidth="lg" sx={{
            display: 'flex', flexDirection: 'column', minHeight: '125px', padding: '12px'
        }}>
            <Typography
                variant="h5"
                noWrap
                sx={{
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    textDecoration: 'none',
                    color: 'white'
                }}
            >
                Konkrete
            </Typography>
            <Box sx={{ mt: 'auto' }}>
                <Divider sx={{ borderColor: '#557598', mb: '12px' }}></Divider>
                <Typography sx={{ color: 'white' }}>Copyright © Konkrete 2022</Typography>
            </Box>
        </Container>
    </Box>
}

export default Footer;