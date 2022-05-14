import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
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

export function OverLay({title, subtitle, period, img1, img2, size, detail, referances, visible, changeVisibility, image=true}) {
  

 
    return (
  
      <div className="overlay" style={{width:"100vw", top:"0", left:"0", position:"fixed", zIndex:"20", minHeight:"100vh", marginTop:"0", borderRadius:"10px", background:"#00000099", display:`${visible}`, flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
       
  
        <div className='overlayInfo' style={{display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"black", color:"white",  maxWidth:"90vw", flexWrap:"wrap"}}>
          <div className="content" style={{display:"flex", fontFamily:`MonoLisa, Menlo, Monaco, "Courier New", monospace`, justifyContent:"center", alignItems:"center", boxShadow:"4px 2px 20px 0px white", padding:"40px", maxHeight:"90vw", overflowY:"auto", position:"relative"}}>
          <IconButton sx ={{alignSelf:"flex-start", position:"absolute", top:"10px", left:"10px", color:"rgb(255, 217, 102)"}} variant="contained" onClick={changeVisibility}><CloseIcon sx={{fontSize:"2rem"}} /></IconButton>
            {image?<div className='overlayImages' style={{display:"flex", flexDirection:"column", margin:"10px", padding:"10px"}}>
              {/* figure out how you can layout information ontop of a overlay */}
              <img src={img1} alt="overlay_name" style={{borderRadius:"50px", width:"400px" }}></img>
              <img src={img2} alt="overlay_name" style={{borderRadius:"50px", width:"400px"}}></img>
  
  
            </div>:null}
            <div className="overlayInfo" style={{maxWidth:"800px"}}>
              <Typography variant="h2">{title}</Typography>
              
              {image?<div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <Typography variant="h4">{subtitle}</Typography>
                <Typography variant="h5">{size}</Typography>
              </div>:null}
              <Typography>{period}</Typography>
              {/* <model-viewer src="assets/cons.glb" alt="VR Headset" enable-pan auto-rotate rotation-per-second="300deg" camera-controls ar camera-target="0m 0m 0m" camera-orbit="-90deg 90deg 1.5m"></model-viewer>
                   */}
  
              <p className="playfair" style={{textAlign:"jutify"}}>
                {detail}
                {/* <Typography variant="h5">Referances</Typography>
                {referances} */}
                
              </p>
            </div>
  
          </div>
         
  
        </div>
  
  
      </div>
    )
  }
  
export function ImageButton({pic, on_click}){
    return (<IconButton aria-label="fingerprint" color="warning" sx={{padding:0}} onClick={on_click}>
    <img src={pic} alt="overlay_name" style={{borderRadius:"50px", width:"120px", height:"120px"}}></img>
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