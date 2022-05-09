import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import coinjpg from "./images/coin.jpg";
import CloseIcon from '@mui/icons-material/Close';


export function DottedLines({color, width, inverted=true}){
    const [dot_width, space_width] = [5,5]
    let dots = []
  
   
  
    let ndots = width / (dot_width+ space_width)
    
  
    for (let i = 0; i < ndots; i++){
      dots.push(
        <div 
          style={{
            background:color, 
            width:`${dot_width}px`, 
            minWidth:`${dot_width}px`,
            height:`${dot_width}px`, 
            marginBottom:inverted?`${space_width}px` : 0,
            marginRight:!inverted?`${space_width}px` : 0,}}>  </div>
      )
    }
     
    return (
      <div 
        style={{
          display:"flex", 
          width:`${width}px`,
          flexDirection:inverted?"column" : "row",
          alignItems:"center"}}>
        {
          dots.map(x => x)
        }
          
      </div>
    )
  
  }

export function OverLay({visible, changeVisibility}) {
  

 
    return (
  
      <div className="overlay" style={{width:"100%", top:"0", left:"0", position:"absolute", zIndex:"2", minHeight:"100vh", marginTop:"0", borderRadius:"10px", background:"rgba(255, 165, 0, 0.50)", display:`${visible}`}}>
        <IconButton color="warning" variant="contained" onClick={changeVisibility}><CloseIcon /></IconButton>
  
        <div className='coinInfo' style={{display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh"}}>
          <div className="contente" style={{display:"flex", background:"white", boxShadow:""}}>
            <div className='coinImages' style={{display:"flex", flexDirection:"column", margin:"20px", padding:"10px"}}>
              {/* figure out how you can layout information ontop of a coin */}
              <img src={coinjpg} alt="coin_name" style={{borderRadius:"50px", width:"80px", height:"80px"}}></img>
              <img src={coinjpg} alt="coin_name" style={{borderRadius:"50px", width:"80px", height:"80px"}}></img>
  
  
            </div>
            <div className="coinInfo" style={{maxWidth:"800px"}}>
              <Typography>Roman Republic</Typography>
              <Typography>M. Junius Brutus</Typography>
              <Typography>AE Denarius</Typography>
              <Typography>54 BCE</Typography>
              <model-viewer src="assets/cons.glb" alt="VR Headset" enable-pan auto-rotate rotation-per-second="300deg" camera-controls ar camera-target="0m 0m 0m" camera-orbit="-90deg 90deg 1.5m"></model-viewer>
                  
  
              <p>
                This first paragraph will describe the coin. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at libero vel neque pretium consectetur eget non metus. Morbi sapien massa, semper ut convallis ut, porttitor non nisl. Vestibulum ac ante erat.
  
                This second paragraph will provide historical context. Donec condimentum, augue egestas convallis auctor, leo nisl congue…
              </p>
            </div>
  
          </div>
         
  
        </div>
  
  
      </div>
    )
  }
  
export function ImageButton({pic, on_click}){
    return (<IconButton aria-label="fingerprint" color="warning" sx={{padding:0}} onClick={on_click}>
    <img src={pic} alt="coin_name" style={{borderRadius:"50px", width:"80px", height:"80px"}}></img>
    </IconButton>)
}

export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }