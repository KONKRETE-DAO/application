import React, { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Container } from '@mui/material'

const mapping = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

const Home: NextPage = () => {

  const [code, setCode] = useState('')


  const handleClick = (value: number) => (event: any) => {
    console.log(value)
    if (value == -1) {
      setCode('')
    } else if (code.length < 6 && value >= 0 && value <= 9) {
      setCode(code + mapping[value])
    }
  }

  return (
    <div>
      <Head>
        <title>???</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <div id="keypad">
          <div id="panel">
            <p className="innahpanel">{code}</p>
          </div>
          <div className="button-row">
            <div className="button" id="b1" data-value="1" onClick={handleClick(1)}>1<span>&nbsp;</span></div>
            <div className="button" id="b2" data-value="2" onClick={handleClick(2)}>2<span>ABC</span></div>
            <div className="button" id="b3" data-value="3" onClick={handleClick(3)}>3<span>DEF</span></div>
          </div>
          <div className="button-row">
            <div className="button" id="b4" data-value="4" onClick={handleClick(4)}>4<span>GHI</span></div>
            <div className="button" id="b5" data-value="5" onClick={handleClick(5)}>5<span>JKL</span></div>
            <div className="button" id="b6" data-value="6" onClick={handleClick(6)}>6<span>MNO</span></div>
          </div>
          <div className="button-row">
            <div className="button" id="b7" data-value="7" onClick={handleClick(7)}>7<span>PQRS</span></div>
            <div className="button" id="b8" data-value="8" onClick={handleClick(8)}>8<span>TUV</span></div>
            <div className="button" id="b9" data-value="9" onClick={handleClick(9)}>9<span>WXYZ</span></div>
          </div>
          <div className="button-row">
            <div className="button" id="bx" data-value="x" onClick={handleClick(-1)}>X<span>CLEAR</span></div>
            <div className="button" id="b0" data-value="0" onClick={handleClick(0)}>0<span>+</span></div>
            <div className="button" id="bg" data-value="g">🔑<span>GO!</span></div>
          </div>
        </div>
      </Container >
    </div>
  )
}

export default Home

