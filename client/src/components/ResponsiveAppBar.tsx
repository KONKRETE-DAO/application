import { useState } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import ethers from 'ethers'
import { AppBar, Chip, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Paper, Link } from '@mui/material';
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from "@web3-react/injected-connector"
import MenuIcon from '@mui/icons-material/Menu'

const pages = [
    {
        label: 'Property list',
        url: '/'
    },
    {
        label: 'Dashboard',
        url: '/dashboard'
    },
    {
        label: 'Resources',
        url: '#'
    },
];

const Injected = new InjectedConnector({
    supportedChainIds: [137] // Ethereum, Polygon (need to remove ethereum)
});

const ResponsiveAppBar = () => {
    const { activate, deactivate } = useWeb3React();
    const { active, library, chainId, account } = useWeb3React();
    const [isWalletValid, setIsWalletValid] = useState(false);

    const router = useRouter()

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleActivate = () => {
        activate(Injected, e => alert('Please switch to the Polygon Mainnet.'))
    }

    let shortAccount
    let button

    if (account == null) {
        shortAccount = ''
        button = <Chip component='button' label='Connect Wallet' color="primary" onClick={handleActivate} clickable />
    } else if (active == false) {
        shortAccount = ''
        button = <Chip component='button' label='Connect to Polygon' color="primary" onClick={handleActivate} clickable />
    } else {
        shortAccount = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
        button = <Chip avatar={<Avatar sx={{ backgroundColor: '#ffffff' }} src="/polygon-matic-logo.svg" />} component='button' label={shortAccount} color="primary" sx={{ my: 2, display: active ? 'inline-flex' : 'none' }} />
    }


    return (
        <AppBar position="static" color='transparent' elevation={0}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="https://www.konkretedao.com/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            textDecoration: 'none',
                        }}
                    >
                        Konkrete
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <Link key={page.label} href={router.asPath != page.url ? page.url : '#'} underline="none">
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.label}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            letterSpacing: '.3rem',

                            textDecoration: 'none',
                        }}
                    >
                        Konkrete
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Link key={page.label}
                                href={router.asPath != page.url ? page.url : '#'} underline="none">
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, display: 'block' }}
                                >
                                    {page.label}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {button}
                        {/* { if (account == null)
                        return () : <></>}
                        {account == null ? (<Chip component='button' label='Connect to Polygon' color="primary" onClick={handleActivate} clickable />) : <></>}
                        <Chip component='button' label='Connect to Polygon' color="primary" onClick={handleActivate} sx={{ my: 2, display: account != '' && !active ? 'inline-flex' : 'none' }} clickable /> */}
                    </Box >
                </Toolbar >
            </Container >
        </AppBar >
    );
};
export default ResponsiveAppBar;