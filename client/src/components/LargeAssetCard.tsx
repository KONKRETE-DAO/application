import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MarkIcon from '../common/components/icons/MarkIcon';
import GraphAscendIcon from '../common/components/icons/GraphAscendIcon';
import ClockIcon from '../common/components/icons/ClockIcon';
import LightningIcon from '../common/components/icons/LightningIcon';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import HomeIcon from '../common/components/icons/HomeIcon';
import { AccountCircle } from '@mui/icons-material';
import Image from 'next/image'
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Storage } from '@aws-amplify/storage';
import { EstateModel } from '../models';

const Injected = new InjectedConnector({
    supportedChainIds: [137] // Ethereum, Polygon (need to remove ethereum)
});

const LargeAssetCard = ({ ...props }) => {
    const { activate, deactivate } = useWeb3React();
    const { active, library, chainId, account } = useWeb3React();
    // const [isWalletValid, setIsWalletValid] = useState(false);
    const [email, setEmail] = useState('')
    const [cover, updateCover] = useState<string>();

    useEffect(() => {
        fetchCover()
    }, [cover]);

    async function fetchCover() {
        const cover = await Storage.get(`${props.slug}/cover.jpg`, {
            level: "public"
        });
        updateCover(cover);
    }

    const handleEmailClick = async () => {
        if (!active) {
            await handleActivate()
        }
        if (email.length > 0) {
            const isWalletValid = await signAndVerifyMessage(email)
        }
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
    }

    const handleActivate = async () => {
        await activate(Injected, e => alert('Please switch to the Polygon Mainnet.'))
    }

    const signAndVerifyMessage = async (message: string) => {
        try {
            const signer = library.getSigner(account);
            const signature = await signer.signMessage(message);
            const signerAddr = await ethers.utils.verifyMessage(message, signature);
            return signerAddr == account
        } catch (err) {
            // console.log(err);    
        }
        return false
    };

    const loc = `${props.address.cityName || ''}, ${props.address.state || ''}`

    return <Card sx={{
        marginLeft: 'auto', marginRight: 'auto', marginTop: 10, marginBottom: 5, borderRadius: '20px'
    }}>
        <CardContent sx={{ display: 'flex', pb: 0 }} >
            <CardContent >
                <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={cover}
                />
            </CardContent>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography gutterBottom variant="h6" component="div">
                    {props.name} ({loc})
                </Typography>
                <Box sx={{ display: 'flex', alignContent: 'flex-start', flexFlow: 'row wrap', gap: '12px' }}>
                    <Chip icon={<span style={{ margin: '7px 0px 0px 7px' }}><GraphAscendIcon size={20} color="white" /></span>} label={`${props.grossYield}% Yield`} color="primary" />
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
        <CardContent sx={{ pt: 0, display: props.isWaitlist ? 'none' : 'block' }}>
            <CardContent sx={{
                display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', gap: 2, "&:last-child": { paddingBottom: 0 }, height: 80
            }} >
                <Box sx={{ flex: 1, alignSelf: 'center' }}>
                    <Typography variant="h6">Buy real estate tokens</Typography>
                    <Typography variant="body2">Use USD-C and receive real estate tokens</Typography>
                </Box>
                <TextField size="small" sx={{ width: '55%', alignSelf: 'center' }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Image src="/usdc.png" width="25px" height="25px" />
                            </InputAdornment>
                        ),
                    }}
                    placeholder='Amount'></TextField>
                <Button sx={{ alignSelf: 'center' }} variant="contained" color="secondary" disableElevation>Connect Wallet</Button>
            </CardContent>
        </CardContent>
        <CardContent sx={{ pt: 0, display: props.isWaitlist ? 'block' : 'none' }}>
            <CardContent sx={{
                display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', gap: 2, "&:last-child": { paddingBottom: 0 }, height: 80
            }} >
                <Box sx={{ flex: 1, alignSelf: 'center' }}>
                    <Typography variant="h6">Coming soon</Typography>
                    <Typography variant="body2">Join waitlist to unlock access</Typography>
                </Box>
                <TextField size="small" sx={{ width: '55%', alignSelf: 'center' }}
                    placeholder='Email address'
                    InputProps={{
                        value: email,
                        onChange: handleEmailChange
                    }}
                ></TextField>
                <Chip sx={{ alignSelf: 'center', ml: '20px' }} component='button' label='Join Waitlist' color="primary" onClick={handleEmailClick} clickable />
            </CardContent>
        </CardContent>
    </Card >
}

export default LargeAssetCard;