import './App.css'
import React from 'react'
import { useState, useEffect, useRef } from 'react'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import IconButton from '@mui/material/IconButton'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Typography } from '@mui/material'

import {
  DottedLines,
  OverLay,
  ImageButton,
  useWindowSize,
} from './components.js'

import { TimeLineData } from './timelinecontent'

function CoinEvent({
  title,
  subtitle,
  obverse,
  reverse,
  coinStartTime,
  coinSize,
  detail,
  referances,
  maxheight,
  animationStartTime,
  coinPeriodP,
  orientation,
  motion = false,
}) {
  const [visible, setvisible] = useState(false)
  const [height, setheight] = useState(motion ? 0 : maxheight)
  const [hoverVisibility, sethoverVisibility] = useState(false)
  const direction = useRef(-1)

  // Animation interval starter
  useEffect(() => {
    let interval = null
    setTimeout(() => {
      interval = setInterval(update_height, 5)
    }, animationStartTime)

    return () => {
      clearInterval(interval)
    }
  }, [])

  function update_height() {
    if (motion) {
      setheight((height) => {
        if (height >= maxheight || height === 0) {
          direction.current = direction.current * -1
        }

        return height + direction.current
      })
    }
  }

  let coinButton = (
    <ImageButton
      pic={obverse}
      on_click={() => {
        setvisible(!visible)
      }}
      className="clickable"
    />
  )

  return (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyItems: 'center',
        alignItems: 'center',
        margin: '0 20px',
        left: `${coinPeriodP}px`,
      }}
      onMouseOver={() => {
        sethoverVisibility(false)
      }}
      onMouseOut={() => {
        sethoverVisibility(true)
      }}
    >
      <div
        className="history_tooltip"
        style={{
          background: 'black',
          padding: '10px',
          width: '300px',
          border: '1px solid white',
          color: 'white',
          position: 'absolute',
          display: hoverVisibility ? 'flex' : 'none',
          top: orientation === 'up' ? '-80px' : '220px',
          left: '-100px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2 className="cnizel">{title}</h2> {/* // Coins mouseover box  */}
        <p className="cnizel">{coinStartTime}</p>
      </div>

      <OverLay
        title={title}
        subtitle={subtitle}
        period={coinStartTime}
        img1={obverse}
        img2={reverse}
        size={coinSize}
        detail={detail}
        visible={visible}
        referances={referances}
        changeVisibility={() => {
          setvisible(!visible)
        }}
      />

      {orientation === 'up' ? coinButton : null}

      <DottedLines color="white" width={height} />

      {orientation === 'down' ? coinButton : null}
    </div>
  )
}

function HistoryEvent({
  eventPeriod,
  title,
  startTime,
  endTime,
  detail,
  referances,
  width = 20,
}) {
  const [visible, setvisible] = useState(false)
  const [hoverVisibility, sethoverVisibility] = useState(false)

  return (
    <div
      className="clickable"
      style={{
        width: `${width}px`,
        padding: '12px', // event marker size
        border: '5px solid rgb(255, 217, 102)', // event marker stroke
        borderRadius: '50px',
        background: 'black',
        position: 'absolute',
        margin: '0 65px',
        left: `${eventPeriod}px`,
      }}
      onClick={() => {
        setvisible(!visible)
      }}
      onMouseOver={() => {
        sethoverVisibility(true)
      }}
      onMouseOut={() => {
        sethoverVisibility(false)
      }}
    >
      <div
        className="history_tooltip"
        style={{
          background: 'black',
          padding: '10px',
          width: '300px',
          border: '1px solid white',
          color: 'white',
          position: 'absolute',
          display: hoverVisibility ? 'flex' : 'none',
          top: '-110px',
          left: '-130px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2 className="cnizel">{title}</h2> {/* Event mouseover box */}
        <p className="cnizel">
          {startTime}
          {endTime ? ' - ' + endTime + ' BCE' : null}
        </p>
      </div>

      <OverLay
        title={title}
        period={startTime}
        image={false}
        detail={detail}
        visible={visible}
        referances={referances}
        changeVisibility={() => {
          setvisible(!visible)
        }}
      />
    </div>
  )
}

function MarkerEvent({ name, eventPeriod }) {
  return (
    <div
      className="cnizel"
      style={{
        padding: '10px',
        position: 'absolute',
        left: `${eventPeriod}px`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <Typography className="cnizel" variant="h5" sx={{ whiteSpace: 'nowrap' }}>
        {name}
      </Typography>
      <LocationOnIcon />
    </div>
  )
}

function App() {
  const [maxWidth, setmaxWidth] = useState(0)
  const [scrollLeft, setscrollLeft] = useState(0)
  const [scrollRight, setscrollRight] = useState(0)
  const winSize = useWindowSize()

  const [content, setcontent] = useState({
    upper_timeline: [],
    middle_timeline: [],
    lower_timeline: [],
  })

  useEffect(() => {
    document.body.style.background = 'black'
  }, [])

  useEffect(() => {
    function timeToPixel(period) {
      // 1 year = 25 pixels, when screen_width = 2000 can't be more than 100
      // and less than 15
      // To adjust screen ratio for different screen view, the base screen
      // width = 2000
      let base_ratio = Math.min(20, Math.min((30 * winSize.width) / 2000, 50))
      return period * base_ratio
    }

    let upper_timeline = []
    let middle_timeline = []
    let lower_timeline = []

    let history_start = parseInt(TimeLineData['1'].Start)
    let new_max = maxWidth

    for (let i = 1; i <= Object.keys(TimeLineData).length; i++) {
      let plocation = timeToPixel(
        history_start - parseInt(TimeLineData[`${i}`].Start),
      )
      if (plocation > new_max) {
        new_max = plocation
      }
      if (TimeLineData[`${i}`].Type === 'Coin') {
        if (TimeLineData[`${i}`].Location === 'Above') {
          upper_timeline.push(
            <CoinEvent
              key={i}
              title={TimeLineData[`${i}`].Name}
              subtitle={TimeLineData[`${i}`].Subtitle}
              reverse={TimeLineData[`${i}`].Reverse}
              coinStartTime={TimeLineData[`${i}`].Start + ' BCE'}
              coinSize={TimeLineData[`${i}`].Mass + ' g'}
              detail={TimeLineData[`${i}`].Detail}
              referances={TimeLineData[`${i}`].References}
              obverse={TimeLineData[`${i}`].Obverse}
              maxheight="90"
              orientation="up"
              coinPeriodP={plocation}
              animationStartTime={0}
            />,
          )
        } else if (TimeLineData[`${i}`].Location === 'Below') {
          lower_timeline.push(
            <CoinEvent
              key={i}
              title={TimeLineData[`${i}`].Name}
              subtitle={TimeLineData[`${i}`].Subtitle}
              reverse={TimeLineData[`${i}`].Reverse}
              coinStartTime={TimeLineData[`${i}`].Start + ' BCE'}
              coinSize={TimeLineData[`${i}`].Mass + ' g'}
              detail={TimeLineData[`${i}`].Detail}
              referances={TimeLineData[`${i}`].References}
              obverse={TimeLineData[`${i}`].Obverse}
              maxheight="90"
              direction="down"
              coinPeriodP={plocation}
              animationStartTime={0}
            />,
          )
        }
      } else if (TimeLineData[`${i}`].Type === 'Event') {
        middle_timeline.push(
          <HistoryEvent
            key={i}
            width={timeToPixel(
              parseInt(TimeLineData[`${i}`].Start) -
                parseInt(TimeLineData[`${i}`].End),
            )}
            title={TimeLineData[`${i}`].Name}
            startTime={TimeLineData[`${i}`].Start + ' BCE'}
            endTime={TimeLineData[`${i}`].End}
            detail={TimeLineData[`${i}`].Detail}
            referances={TimeLineData[`${i}`].References}
            eventPeriod={plocation}
          />,
        )
      } else if (TimeLineData[`${i}`].Type === 'Marker') {
        console.log(i, plocation, TimeLineData[`${i}`].Start + ' BCE')
        upper_timeline.push(
          <MarkerEvent
            name={TimeLineData[`${i}`].Start + ' BCE'}
            eventPeriod={plocation}
          />,
        )
      }
    }

    setcontent({
      middle_timeline: middle_timeline,
      lower_timeline: lower_timeline,
      upper_timeline: upper_timeline,
    })
    setmaxWidth(new_max)
  }, [winSize.width])

  return (
    <>
      <div
        className="App"
        style={{
          overflowX: 'auto',
          width: `${maxWidth + 200}px`,
          marginLeft: '10px',
        }}
      >
        <div
          style={{
            left: 'calc(50vw - 473px)',
            color: 'white',
            position: 'fixed',
            top: '30px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography className="cnizel" variant="h2">
            Coinage of the Roman Republic
          </Typography>{' '}
          {/* change className to change font */}
          <Typography className="cnizel" variant="h3">
            An interactive timeline
          </Typography>
          <br />
          <Typography className="cnizel" variant="h5">
            Click on coin or event to show detail
          </Typography>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            left: '0',
            background:
              'linear-gradient(90deg, black,#000000d4,#000000a1, #00000094, transparent)',
            height: '100vh',
            zIndex: '5',
          }}
        >
          <IconButton
            sx={{
              padding: '40px',
              fontSize: '40px',
              left: '0',
              borderRadius: '0',
              color: 'rgb(255, 217, 102)',
            }}
            onMouseOut={() => clearInterval(scrollLeft)}
            onMouseOver={() => {
              setscrollLeft(
                setInterval(() => {
                  window.scrollBy(-10, 0)
                }, 10),
              )
            }}
          >
            <ArrowBackIosIcon sx={{ fontSize: '3rem !important' }} />
          </IconButton>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            right: '0',
            background:
              'linear-gradient(90deg, transparent, #00000094, #000000a1, #000000d4, black)',
            height: '100vh',
            zIndex: '5',
          }}
        >
          <IconButton
            sx={{
              padding: '40px',
              fontSize: '3rem !important',
              right: '0',
              borderRadius: '0',
              color: 'rgb(255, 217, 102)',
            }}
            onMouseOut={() => clearInterval(scrollRight)}
            onMouseOver={() => {
              setscrollRight(
                setInterval(() => {
                  window.scrollBy(10, 0)
                }, 10),
              )
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: '3rem !important' }} />
          </IconButton>
        </div>

        <div
          className="upper_time_line"
          style={{
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
          }}
        >
          <div
            className="upper_lines"
            style={{ display: 'flex', alignItems: 'flex-end' }}
          >
            {/* Increase the width whenever more coins are added */}
            {/* background:"linear-gradient(0deg, grey, white)",  */}

            {content.upper_timeline.map((x) => x)}
          </div>
          <div
            className="time_line"
            style={{
              minHeight: '10px',
              height: '10px',
              minWidth: '100px',
              background: 'white',
              borderRadius: '10px',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            {content.middle_timeline.map((x) => x)}
          </div>
        </div>

        <div
          className="lower_lines"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          {content.lower_timeline.map((x) => x)}
        </div>
      </div>
      <footer>
        <p
          className="cnizel"
          style={{
            position: 'fixed',
            right: '10px',
            bottom: '8px',
            color: 'white',
            zIndex: '8',
          }}
        >
          &copy; 2022 Hileamlak Yitayew & Andrew Zhang
        </p>
      </footer>
    </>
  )
}

export default App
