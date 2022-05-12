
import './App.css';
import React from 'react'
import { useState, useEffect, useRef } from 'react';


import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Typography } from '@mui/material';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import {DottedLines, OverLay, ImageButton, useWindowSize} from "./BasicComponents.js";
import {TimeLineData} from "./timelinecontent"






function CoinEvent({title, subtitle, obverse, reverse, coinStartTime, coinSize, detail, referances, maxheight, animationStartTime, coinPeriodP, direction, empty, special, element, motion=false}){

  const [visible, setvisible] = useState("none");
  const [height, setheight] = useState(motion? 0: maxheight);
  const [hover_visibility, sethover_visibility] = useState("none");
  const dir = useRef(-1)

  useEffect(() => {
    setTimeout(()=> setInterval(update_height, 5), animationStartTime);

  
  }, []);
  
  function update_height(){

   
    if (motion){
      setheight(height => {
    
        if (((height >= maxheight || height === 0))){
         dir.current = dir.current * -1;
       } 
     
         return height + dir.current});

    }
     
  }

  

  function moreInfo (){
    changeVisibility();
    
  }

  function changeVisibility (){
    visible === "none" ? setvisible('flex') : setvisible('none')
 }

  // element.setAttribute('onClick', moreInfo);
  return empty? <div style={{minWidth:"100px", position:"absolute", margin:"0 20px"}}></div> : 
        (<div
            style = {{
              position:"absolute",
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
              margin:"0 20px", 
              left:`${coinPeriodP}px`
              
            }}
            onMouseOver={() => {sethover_visibility("block")}} 
            onMouseOut={() => {sethover_visibility("none")}}
        
          >
             <div
          className='history_tooltip' 
          style={{
            background:"black", 
            padding:"10px", 
            width:"300px",
            border:"1px solid white", 
            color:"white", position:"absolute", 
            display:`${hover_visibility}`,
            top: direction=="up"?"-80px":"220px",
            left: "-100px",
            justifyContent: "center",
            alignItems: "center"
            
            }}>
          <h2 className='cnizel'>{title}</h2> {/* // Coins mouseover box  */}
          <p className='cnizel'>{coinStartTime}</p>

        </div>
            <OverLay title= {title} subtitle={subtitle} period={coinStartTime} img1={obverse} img2={reverse} size={coinSize} detail={detail} visible={visible} referances = {referances} changeVisibility={changeVisibility}/>
            
            {direction === "up" ? (special? element : <ImageButton pic = {obverse} on_click={moreInfo} className="clickable" /> ) : null}
            <DottedLines color="white" width={height}/>
            {/* <div style={{color:"orange", minHeight:`${height}px`, height:`${height}px`, minWidth:"5px", width:"5px", background:"linear-gradient(black, white);"}}></div> */}
            {direction === "down" ? (special? element : <ImageButton pic = {obverse} on_click={moreInfo} className="clickable" /> ) : null}

          </div>)
  
}

function HistoryEvent({eventPeriod, title, startTime, endTime, detail, referances, width = 20}){

  const [visible, setvisible] = useState("none");
  const [hover_visibility, sethover_visibility] = useState("none");

  function changeVisibility (){
    visible === "none" ? setvisible('flex') : setvisible('none')
  }
  
  
 
  return (
    <div 
     className="clickable"
      style={{
        width:`${width}px`,
        padding:"15px", // event marker size
        border:"5px solid rgb(255, 217, 102)", // event marker stroke
        borderRadius:"50px",
        background:"black",
        position:"absolute",
        left:`${eventPeriod}px`
      }}
      onClick={changeVisibility}
      onMouseOver={() => {sethover_visibility("block")}} 
      onMouseOut={() => {sethover_visibility("none")}}
      >
        <div
          className='history_tooltip' 
          style={{
            background:"black", 
            padding:"10px", 
            width:"300px",
            border:"1px solid white", 
            color:"white", position:"absolute", 
            display:`${hover_visibility}`,
            top: "-110px",
            left: "-130px",
            justifyContent: "center",
            alignItems: "center"
            
            }}>
          <h2 className='cnizel'>{title}</h2> {/* Event mouseover box */}
          <p className='cnizel'>{startTime}{endTime?" - "+endTime + " BCE":null}</p>

        </div>
  <OverLay title= {title} period={startTime} image={false} detail={detail} visible={visible} referances = {referances} changeVisibility={changeVisibility}/>
          
    </div>)

}


function MarkerEvent({name, eventPeriod}){

  
 
  return (
  <div 
  className='cnizel'
    style={{
      padding:"10px",
      position:"absolute",
      left:`${eventPeriod}px`,
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",
      color:"white"

      
    }}
    >
      <Typography className="cnizel" sx={{whiteSpace:"nowrap"}}>{name}</Typography>
      <LocationOnIcon />

  </div>)

}

function App() {

  const [bg, setbg] = useState("black");
  const [maxWidth, setmaxWidth] = useState(0);
  const [scrollLeft, setscrollLeft] = useState(0);
  const [scrollRight, setscrollRight] = useState(0);
  const winSize = useWindowSize();

  
  const [content, setcontent] = useState(
    {upper_timeline:[], 
      middle_timeline:[], 
      lower_timeline:[]
    })
  

  useEffect(() => {
    document.body.style.background = 'black';
  }, [])

 
  

  useEffect(() => {

    function timeToPixel(period){
      // 1 year = 25 pixels, when screen_width = 2000 can't be more than 100
      // and less than 15
      // To adjust screen ration for different screen view, the bench screen
      // width = 2000
      let base_ratio = Math.min(20, Math.min(25 * winSize.width/2000, 50)); 
      return period * base_ratio
    }
    
    let upper_timeline = []
    let middle_timeline = []
    let lower_timeline = []

      



    let history_start = parseInt(TimeLineData['1'].Start);;
    let new_max = maxWidth;
    
    for (let i = 1; i <= Object.keys(TimeLineData).length; i++)
    {
      let plocation = timeToPixel(history_start - parseInt(TimeLineData[`${i}`].Start))
      if (plocation > new_max){
        new_max = plocation
      }
      if (TimeLineData[`${i}`].Type === "Coin") {
        
      
        if (TimeLineData[`${i}`].Location === "Above"){
          upper_timeline.push(
            <CoinEvent 


             key = {i}

             title={TimeLineData[`${i}`].Name} 
             subtitle={TimeLineData[`${i}`].Subtitle} 
             reverse={TimeLineData[`${i}`].Reverse} 
             coinStartTime={TimeLineData[`${i}`].Start + " BCE"}
             coinSize={TimeLineData[`${i}`].Mass+" g"} 
             detail={TimeLineData[`${i}`].Detail} 
             referances={TimeLineData[`${i}`].References}
             obverse={TimeLineData[`${i}`].Obverse} 

             maxheight="90" 
             direction="up" 
             coinPeriodP={plocation}
             animationStartTime={0}/>)
        } 
        else if (TimeLineData[`${i}`].Location === "Below") {
          lower_timeline.push(
            <CoinEvent 
             key = {i}
             
             title={TimeLineData[`${i}`].Name} 
             subtitle={TimeLineData[`${i}`].Subtitle} 
             reverse={TimeLineData[`${i}`].Reverse} 
             coinStartTime={TimeLineData[`${i}`].Start  + " BCE"}
             coinSize={TimeLineData[`${i}`].Mass+" g"} 
             detail={TimeLineData[`${i}`].Detail} 
             referances={TimeLineData[`${i}`].References}
             obverse={TimeLineData[`${i}`].Obverse} 

             maxheight="90" 
             direction="down" 
             coinPeriodP={plocation}
             animationStartTime={0}/>)

        }
        
        
       
      }
      else if (TimeLineData[`${i}`].Type === "Event") {
      
        middle_timeline.push(
          <HistoryEvent
            key = {i}
            width = {
              timeToPixel(
                parseInt(TimeLineData[`${i}`].Start) - 
                parseInt(TimeLineData[`${i}`].End))}
            
            title={TimeLineData[`${i}`].Name} 
            startTime={TimeLineData[`${i}`].Start  + " BCE"}
            endTime={TimeLineData[`${i}`].End}
            detail={TimeLineData[`${i}`].Detail} 
            referances={TimeLineData[`${i}`].References}

            eventPeriod={plocation}
          />
        )
       
      }
      else if (TimeLineData[`${i}`].Type === "Marker") {
        console.log(i, plocation, TimeLineData[`${i}`].Start + " BCE" )
        upper_timeline.push(
          <MarkerEvent name={ TimeLineData[`${i}`].Start + " BCE"} eventPeriod={plocation}/>
        )
       
      }
      

    }
    
    setcontent( {middle_timeline:middle_timeline, lower_timeline:lower_timeline, upper_timeline:upper_timeline})   
    setmaxWidth(new_max); 
  }, [winSize.width])
  

  function changeTheam(){
    if (bg === "white"){
      setbg("black");
      document.body.style.background = 'black';
    }
    else {
      setbg("white");
      document.body.style.background = 'white';
    }
  }

  

  function addCoin(){
      console.log("clicked")
  }
  return (
  <>
    <div className="App" style={{overflowX:"auto", width:`${maxWidth + 200}px`, marginLeft:"10px"}}>

      <div style={{left:"calc(50vw - 417px)", color:"white", position:"fixed", top:"30px", padding:"10px", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
        <Typography className="cnizel" variant='h2'>Coinage of the Roman Republic</Typography> {/* change className to change font */}
        <Typography className="cnizel" variant='h3'>An interactive timeline</Typography>
        <br/>
        <p className="cnizel" variant='h4'>Click on coin or event to show detail</p>
      </div>
     
      <div style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          position:"fixed",
          left:"0",
          background: "linear-gradient(90deg, black,#000000d4,#000000a1, #00000094, transparent)",
          height:"100vh",
          zIndex:"5"
          


      }
      }>
            <IconButton  
        sx={{
        
          padding:"40px",
          fontSize:"40px",
          left: "0",
          color:"white",
          borderRadius:"0",
        color:"rgb(255, 217, 102)"}}   
        onMouseOut={()=>clearInterval(scrollLeft)} 
        onMouseOver={()=>{setscrollLeft(setInterval(() =>{window.scrollBy(-10, 0)}, 10))}}>
          <ArrowBackIosIcon sx={{fontSize:"3rem !important"}}/></IconButton>
      </div>

      <div style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          position:"fixed",
          right:"0",
          background: "linear-gradient(90deg, transparent, #00000094, #000000a1, #000000d4, black)",
          height:"100vh",
          zIndex:"5"


      }
      }>

<IconButton 
        sx={{
          padding:"40px",
          fontSize:"3rem !important",
          right: "0",
          color:"white",
          borderRadius:"0",
          color:"rgb(255, 217, 102)"}}    
        onMouseOut={()=>clearInterval(scrollRight)} 
        onMouseOver={()=>{setscrollRight(setInterval(() =>{window.scrollBy(10, 0)}, 10))}}>
          <ArrowForwardIosIcon sx={{fontSize:"3rem !important"}} /></IconButton>
        </div>
    
      
      
      


      
        <div className="upper_time_line" style={{minHeight:'50vh', display:"flex", flexDirection: "column", justifyContent:"end"}}>
          <div className="upper_lines" style={{display:"flex", alignItems:"flex-end"}}>
          {/* Increase the width whenever more coins are added */}
          {/* background:"linear-gradient(0deg, grey, white)",  */}
              
             
             { content.upper_timeline.map(x => x)}

              {/* <CoinEvent special="true" element={ <IconButton onClick={addCoin} aria-label="fingerprint" sx={{padding:0, background:"orange", width:"40px", height:"40px"}}><AddIcon sx={{color:"white"}} /></IconButton> } maxheight="40" direction="up" motion={false}/> */}
          </div> 
          <div 
            className="time_line" 
            style={{
              minHeight:"10px",
              height:"10px", 
              minWidth:"100px", 
              background:"white", 
              borderRadius:"10px",
              alignItems:"center",
              display:"flex"}}>
              
              { content.middle_timeline.map(x => x)}

          </div>
      </div>

      <div className="lower_lines" style={{
        display: "flex",
        alignItems: "flex-start"
      }}>

          { content.lower_timeline.map(x => x)}
        
      </div>
      
    </div>
    <footer>

    <IconButton color="warning" variant="contained" onClick={()=>{changeTheam()}}><ModeNightIcon /></IconButton>
     
    </footer>
  </>
  );
}

export default App;
