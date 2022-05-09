
import './App.css';

import { useState, useEffect, useRef } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Button, Typography } from '@mui/material';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import IconButton from '@mui/material/IconButton';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import {DottedLines, OverLay, ImageButton, useWindowSize} from "./BasicComponents.js";
import {TimeLineData} from "./timelinecontent"

import coinjpg from "./images/coin.jpg";
import { display } from '@mui/system';
import { MarkEmailRead } from '@mui/icons-material';





function CoinEvent({pic, maxheight, startTime, coinPeriod, direction, empty, special, element, motion=false}){

  const [visible, setvisible] = useState("none");
  const [height, setheight] = useState(motion? 0: maxheight);
  const dir = useRef(-1)

  useEffect(() => {
    setTimeout(()=> setInterval(update_height, 5), startTime);

  
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
    visible === "none" ? setvisible('block') : setvisible('none')
 }

  // element.setAttribute('onClick', moreInfo);
  return empty? <div style={{minWidth:"80px", position:"absolute", margin:"0 20px"}}></div> : 
        (<div
            style = {{
              position:"absolute",
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
              margin:"0 20px", 
              left:`${coinPeriod}px`
            }}
          >
            <OverLay visible={visible} changeVisibility={changeVisibility}/>
            
            {direction === "up" ? (special? element : <ImageButton pic = {pic} on_click={moreInfo} /> ) : null}
            <DottedLines color="white" width={height}/>
            {/* <div style={{color:"orange", minHeight:`${height}px`, height:`${height}px`, minWidth:"5px", width:"5px", background:"linear-gradient(black, white);"}}></div> */}
            {direction === "down" ? (special? element : <ImageButton pic = {pic} on_click={moreInfo} /> ) : null}

          </div>)
  
}

function HistoryEvent({eventPeriod, width = 20}){

  
 
    return (
    <div 
     
      style={{
        width:`${width}px`,
        padding:"10px",
        border:"3px solid rgb(255, 217, 102)",
        borderRadius:"50px",
        background:"black",
        position:"absolute",
        left:`${eventPeriod}px`
      }}
      >

    </div>)

}


function MarkerEvent({name, eventPeriod}){

  
 
  return (
  <div 
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
      <Typography>{name}</Typography>
      <LocationOnIcon />

  </div>)

}

function App() {

  const [bg, setbg] = useState("black");
  const winSize = useWindowSize()

  
  const [content, setcontent] = useState(
    {upper_timeline:[], 
      middle_timeline:[], 
      lower_timeline:[]
    })
  

  useEffect(() => {
    document.body.style.background = 'black';
  }, [])

  useEffect(() => {
    console.log('resizeing')
    
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
    
    for (let i = 1; i <= Object.keys(TimeLineData).length; i++)
    {
      let plocation = timeToPixel(history_start - parseInt(TimeLineData[`${i}`].Start))
      if (TimeLineData[`${i}`].Type === "Coin") {
        
      
        if (TimeLineData[`${i}`].Location === "Above"){
          upper_timeline.push(
            <CoinEvent 
             key = {i}
             pic={coinjpg} 
             maxheight="40" 
             direction="up" 
             coinPeriod={plocation}
             startTime={0}/>)
        } 
        else if (TimeLineData[`${i}`].Location === "Below") {
          lower_timeline.push(
            <CoinEvent 
             key = {i}
             pic={coinjpg} 
             maxheight="40" 
             direction="down" 
             coinPeriod={plocation}
             startTime={0}/>)

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
    console.log(middle_timeline);
    setcontent( {middle_timeline:middle_timeline, lower_timeline:lower_timeline, upper_timeline:upper_timeline})    
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
    <div className="App" style={{overflowX:"auto", width:"1020%", marginLeft:"10px"}}>
        <div className="upper_time_line" style={{minHeight:'52vh', display:"flex", flexDirection: "column", justifyContent:"end"}}>
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
