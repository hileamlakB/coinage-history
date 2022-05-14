import React from 'react'
import { useState, useEffect } from 'react'
import { Typography } from '@mui/material'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export function DottedLines({ color, width, inverted = true }) {
  const [dot_width, space_width] = [5, 5]
  let dots = []

  let ndots = width / (dot_width + space_width)

  for (let i = 0; i < ndots; i++) {
    dots.push(
      <div
        style={{
          background: color,
          width: `${dot_width}px`,
          minWidth: `${dot_width}px`,
          height: `${dot_width}px`,
          marginBottom: inverted ? `${space_width}px` : 0,
          marginRight: !inverted ? `${space_width}px` : 0,
        }}
      >
        {' '}
      </div>,
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        width: `${width}px`,
        flexDirection: inverted ? 'column' : 'row',
        alignItems: 'center',
      }}
    >
      {dots.map((x) => x)}
    </div>
  )
}

export function OverLay({
  title,
  subtitle,
  period,
  img1,
  img2,
  size,
  detail,
  referances,
  visible,
  changeVisibility,
  image = true,
}) {
  return (
    <div
      className="overlay"
      style={{
        width: '100vw',
        top: '0',
        left: '0',
        position: 'fixed',
        zIndex: '20',
        minHeight: '100vh',
        marginTop: '0',
        borderRadius: '10px',
        background: '#00000099',
        display: `${visible}`,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#E4E4E4',
      }}
    >
      <div
        className="overlayInfo"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: 'black',
          color: 'white',
          maxWidth: '90vw',
          flexWrap: 'wrap',
        }}
      >
        <div
          className="content"
          style={{
            display: 'flex',
            fontFamily: "'Playfair Display', serif",
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '4px 2px 20px 0px white',
            padding: '40px',
            maxHeight: '90vw',
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <IconButton
            sx={{
              alignSelf: 'flex-start',
              position: 'absolute',
              top: '10px',
              left: '10px',
              color: 'rgb(255, 217, 102)',
            }}
            variant="contained"
            onClick={changeVisibility}
          >
            <CloseIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
          {image ? (
            <div
              className="overlayImages"
              style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '10px',
                padding: '10px',
              }}
            >
              <img
                src={img1}
                alt="overlay_name"
                style={{ borderRadius: '50px', width: '400px' }}
              ></img>
              <img
                src={img2}
                alt="overlay_name"
                style={{ borderRadius: '50px', width: '400px' }}
              ></img>
            </div>
          ) : null}
          <div className="overlayInfo" style={{ maxWidth: '800px' }}>
            <Typography variant="h3" className="cnizel">
              {title}
            </Typography>

            {image ? (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h4" className="cnizel">
                  {subtitle}
                </Typography>
                <Typography variant="h4" className="cnizel">
                  {size}
                </Typography>
              </div>
            ) : null}
            <Typography variant="h5" className="cnizel">
              {period}
            </Typography>
            {/* <model-viewer src="assets/cons.glb" alt="VR Headset" enable-pan auto-rotate rotation-per-second="300deg" camera-controls ar camera-target="0m 0m 0m" camera-orbit="-90deg 90deg 1.5m"></model-viewer>
             */}

            <p
              className="playfair"
              style={{ textAlign: 'justify', whiteSpace: 'pre-wrap' }}
            >
              {detail}
            </p>
            <br />
            <Typography
              className="cnizel"
              variant="h5"
              style={{ whiteSpace: 'pre-wrap !important' }}
            >
              References
            </Typography>
            <p className="playfair" style={{ whiteSpace: 'pre-wrap' }}>
              {referances}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ImageButton({ pic, on_click }) {
  return (
    <IconButton
      aria-label="fingerprint"
      color="warning"
      sx={{ padding: 0 }}
      onClick={on_click}
    >
      <img
        src={pic}
        alt="overlay_name"
        style={{ borderRadius: '50px', width: '120px', height: '120px' }}
      ></img>
    </IconButton>
  )
}

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}
