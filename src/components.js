import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

/* DottedLines - Vertical/Horizontal Dotted Lines that are
 * created by stacking multiple divs
 * The dots and the space between them are spaced out evenly
 * @color - determines the color of the dots
 * @width - eidth determines the length of the dotted line
 * @inverted - determines if the dotted line is Horizontal or Vertical
 */

export const DottedLines = ({ color, width, inverted = true }) => {
  // Size of each dot and the space between dots
  const [dot_width, space_width] = [5, 5]

  // Number of dots
  let ndots = useMemo(() => width / (dot_width + space_width), [width])

  // Create the dots by stacking divs
  let dots = useMemo(() => {
    let dots = []

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
    return dots
  }, [color, ndots, inverted])

  return (
    <div
      style={{
        display: 'flex',
        width: `${width}px`,
        flexDirection: inverted ? 'column' : 'row',
        alignItems: 'center',
        zIndex: '-1',
      }}
    >
      {dots.map((x) => x)}
    </div>
  )
}

/* 
Overlay - A customer overlay component to explain details on 
about each coin component.
*/
export const OverLay = ({
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
}) => {
  return (
    <div
      className="overlay"
      style={{
        minWidth: '100vw',
        top: '0',
        left: '0',
        position: 'fixed',
        zIndex: '20',
        minHeight: '100vh',
        marginTop: '0',
        background: '#00000099',
        display: visible ? 'flex' : 'none',
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
          background: '#00000052',
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
            background: 'black',
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

/*
 * ImageButton - Component to make a button with an image

 */
export const ImageButton = ({ pic, on_click }) => {
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
      />
    </IconButton>
  )
}

/*
useWindowSize - A custom hook to get tha
listenes to window size changes
*/
export const useWindowSize = () => {
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
