import * as React from 'react';
import { useRouter } from 'next/router'
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, Paper, Link } from '@mui/material';
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
        url: '#'
    },
    {
        label: 'Resources',
        url: '#'
    },
];

const Injected = new InjectedConnector({
    supportedChainIds: [1, 137] // Polygon
});

const ResponsiveAppBar = () => {
    const { activate, deactivate } = useWeb3React();
    const { active, chainId, account } = useWeb3React();

    const router = useRouter()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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

    return (
        <AppBar position="static" color='transparent' elevation={0}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href={router.asPath != '/' ? '/' : '#'}
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
                        <Button onClick={() => activate(Injected)} sx={{ my: 2, display: active ? 'none' : 'block' }}>
                            Connect Wallet
                        </Button>
                        <Button onClick={deactivate} sx={{ my: 2, display: active ? 'block' : 'none' }}>Disconnect</Button>
                    </Box >
                </Toolbar >
            </Container >
        </AppBar >
    );
};
export default ResponsiveAppBar;