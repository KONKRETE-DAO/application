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

const AssetTableRow = ({ ...props }) => {
    const { id } = props
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
}

export default AssetTableRow;