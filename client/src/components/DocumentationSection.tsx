import Typography from '@mui/material/Typography';
import { Box, Button, Chip, Container, Divider, TextField } from '@mui/material';

const DocumentationSection = ({ ...props }) => {

    return <Container maxWidth={false} sx={{ bgcolor: '#F8F8F8', pt: '50px', pb: '40px' }}>
        <Typography
            variant="h3"
            noWrap
            align="center"
            sx={{
                fontWeight: 400,
                textAlign: 'center',
                mb: 2,
            }}
        >
            FAQ
        </Typography>
        <Typography align="center" variant="body1">Have any question about our platform ?</Typography>
        <Typography align="center" variant="body1" paragraph>Check out our FAQ</Typography>
        <Box sx={{ textAlign: "center" }}>
            <Chip label="View FAQ" variant="outlined" clickable />
        </Box>
    </Container >
}

export default DocumentationSection;