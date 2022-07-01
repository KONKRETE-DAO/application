import React, { useState, useEffect, useRef } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Button, ButtonBase, Card, CardContent, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '../common/components/icons/CloseIcon'
import CheckIcon from '../common/components/icons/CheckIcon'

const mapping = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const url = "https://23tmla18e6.execute-api.eu-west-3.amazonaws.com/production/api"

const Home: NextPage = () => {
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isRegistered, setRegistered] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isValid, setValid] = useState(false)
  const [page, setPage] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClick = (value: number) => (event: any) => {
    if (value == -1) {
      setCode(code.slice(0, -1))
    } else if (code.length < 6 && value >= 0 && value <= 9) {
      setCode(code + mapping[value])
    }
  }

  const handleSubmit = (event: any) => {
    if (code.length == 6) {
      setLoading(true)
      fetch(`${url}/codes/${code}`)
        .then((res) => {
          if (res.status == 200)
            return res.json()
        })
        .then((data) => {
          setLoading(false)
          if (data) {
            setValid(true)
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
              setPage(1)
            }, 1000);
          } else {
            setCode('')
          }
        })
    }
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value)
  }

  const handleEmailSubmit = (event: any) => {
    event.preventDefault()
    setLoading(true)
    fetch(`https://open.kickbox.com/v1/disposable/${email}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.disposable) {
          alert('This email address is not allowed')
          setLoading(false)
        } else {
          fetch(`${url}/codes/`, {
            body: JSON.stringify({
              'code': code,
              'name': name,
              'email': email
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST'
          })
            .then((res) => {
              if (res.status == 200)
                return res.json()
            })
            .then((data) => {
              setLoading(false)
              if (data) {
                setRegistered(true)
                setName('')
                setEmail('')
                clearTimeout(timerRef.current);
                timerRef.current = setTimeout(() => {
                  window.location.replace('https://www.app.konkretedao.com');
                }, 1000);
              }
            })
        }
      })
  }

  const displayedCode = code.padEnd(6, '_')
  return (
    <>
      {page == 0 &&
        (
          <Container sx={{ textAlign: 'center', pt: 5 }}>
            <Typography sx={{ mx: 'auto', mb: 3, width: '400px' }} variant="h4" component="div" gutterBottom>Welcome to Konkrete private access</Typography>
            <Typography sx={{ mx: 'auto', mb: 5, width: '260px' }} variant="body1" component="div" gutterBottom>This access is reserved to secret code holders to unlock exclusive access to private launch</Typography>
            <Container maxWidth="xs">
              <Card sx={{ maxWidth: '350px', mx: 'auto', borderRadius: '40px' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography sx={{ mb: 2 }} gutterBottom>Enter code</Typography>
                  <Box sx={{ height: '50px', width: '100%', mb: 5 }}>
                    {
                      !isValid && (<Typography component="span" variant="h3" sx={{ color: '#4D4F61', fontFamily: 'Major Mono Display' }}>{displayedCode}</Typography>)
                    }
                    {
                      isValid && (
                        <Typography component="span" variant="h5" sx={{ color: '#74D79A', fontFamily: 'Major Mono Display', fontWeight: '600' }}>code accepted</Typography>
                      )
                    }
                  </Box>
                  <Grid container spacing={3}>
                    <Grid container item justifyContent="space-between">
                      <Grid item onClick={handleClick(1)}><IconButton size="large" sx={{ color: '#4D4F61', bgcolor: '#F7F7FC', width: 70, height: 70 }}>1</IconButton></Grid>
                      <Grid item onClick={handleClick(2)}><IconButton size="large" sx={{ color: '#4D4F61', bgcolor: '#F7F7FC', width: 70, height: 70 }}>2</IconButton></Grid>
                      <Grid item onClick={handleClick(3)}><IconButton size="large" sx={{ color: '#4D4F61', bgcolor: '#F7F7FC', width: 70, height: 70 }}>3</IconButton></Grid>
                    </Grid>
                    <Grid container item justifyContent="space-between">
                      <Grid item onClick={handleClick(4)}><IconButton size="large" sx={{ color: '#4D4F61', bgcolor: '#F7F7FC', width: 70, height: 70 }}>4</IconButton></Grid>
                      <Grid item onClick={handleClick(5)}><IconButton size="large" sx={{ color: '#4D4F61', bgcolor: '#F7F7FC', width: 70, height: 70 }}>5</IconButton></Grid>
                      <Grid item onClick={handleClick(6)}><IconButton size="large" sx={{ color: '#4D4F61', bgcolor: '#F7F7FC', width: 70, height: 70 }}>6</IconButton></Grid>
                    </Grid>
                    <Grid container item justifyContent="space-between">
                      <Grid item onClick={handleClick(7)}><IconButton size="large" sx={{ color: '#4D4F61', bgcolor: '#F7F7FC', width: 70, height: 70 }}>7</IconButton></Grid>
                      <Grid item onClick={handleClick(8)}><IconButton size="large" sx={{ color: '#4D4F61', bgcolor: '#F7F7FC', width: 70, height: 70 }}>8</IconButton></Grid>
                      <Grid item onClick={handleClick(9)}><IconButton size="large" sx={{ color: '#4D4F61', bgcolor: '#F7F7FC', width: 70, height: 70 }}>9</IconButton></Grid>
                    </Grid>
                    <Grid container item justifyContent="space-between">
                      <Grid item onClick={handleClick(-1)}><IconButton size="large" sx={{ bgcolor: '#F7F7FC', width: 70, height: 70 }}><CloseIcon size={22} color='#4D4F61' /></IconButton></Grid>
                      <Grid item onClick={handleClick(0)}><IconButton size="large" sx={{ color: '#4D4F61', bgcolor: '#F7F7FC', width: 70, height: 70 }}>0</IconButton></Grid>
                      <Grid item onClick={handleSubmit}><IconButton size="large" sx={{ bgcolor: '#F7F7FC', width: 70, height: 70 }}><CheckIcon size={22} color='#4D4F61' /></IconButton></Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Container>
          </Container>
        )
      }
      {
        page == 1 &&
        (
          <Container maxWidth="md" sx={{ mt: 20 }}>
            <Grid container spacing={1}>
              <Grid item md={5} xs={12}>
                <Typography variant="h4" sx={{ mb: 3 }} gutterBottom>Congrats, you’re in !</Typography>
                <Typography variant="subtitle1" gutterBottom>Almost there</Typography>
                <Typography variant="body2" sx={{ width: '75%' }} gutterBottom>Fill in the identification fields so that we know it’s you. Your data is protected and will only serve to unlock access to the platform. </Typography>
              </Grid>
              <Grid item md={7} xs={12}>
                <Card sx={{ borderRadius: '30px' }}>
                  <CardContent sx={{ p: 5 }}>
                    <Box component="form" onSubmit={handleEmailSubmit}>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <TextField
                            label="Name"
                            value={name}
                            onChange={handleNameChange}
                            fullWidth
                            required
                            sx={{
                              '& label': { paddingLeft: (theme) => theme.spacing(2) },
                              '& input': { paddingLeft: (theme) => theme.spacing(3.5) },
                              '& fieldset': {
                                paddingLeft: (theme) => theme.spacing(2.5),
                                borderRadius: '30px',
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            label="Email address"
                            placeholder="elon@tesla.com"
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            fullWidth
                            required
                            inputProps={{ type: 'email', inputMode: 'email' }}
                            sx={{
                              '& label': { paddingLeft: (theme) => theme.spacing(2) },
                              '& input': { paddingLeft: (theme) => theme.spacing(3.5) },
                              '& fieldset': {
                                paddingLeft: (theme) => theme.spacing(2.5),
                                borderRadius: '30px',
                              },
                            }}
                          />
                        </Grid>
                      </Grid>

                      <Box component="div" sx={{ mb: '10px', mt: '16px' }}>
                        <Grid container alignItems="center" justifyContent="space-between" spacing={1}>
                          <Grid item>
                            <Button variant="contained" size="large" type='submit' sx={{ borderRadius: '30px' }}>Submit</Button>
                          </Grid>
                          <Grid item>
                            {isRegistered && (
                              <Typography component="span" variant="h6" sx={{ color: '#74D79A', fontFamily: 'Major Mono Display', fontWeight: '600' }}>
                                unlocked
                              </Typography>
                            )}
                          </Grid>
                        </Grid>

                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

          </Container>
        )
      }
    </>
  )
}

export default Home

