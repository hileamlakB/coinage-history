import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import coinjpg from "./images/coin.jpg";
import { useState, useEffect } from 'react';
import './App.css';
import { Button, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ModeNightIcon from '@mui/icons-material/ModeNight';

function ImageButton({pic, on_click}){
  return (<IconButton aria-label="fingerprint" color="warning" sx={{padding:0}} onClick={on_click}>
  <img src={pic} alt="coin_name" style={{borderRadius:"50px", width:"80px", height:"80px"}}></img>
  </IconButton>)
}


function OverLay({visible, changeVisibility}) {
  

 
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

function Event({pic, maxheight, direction, empty, special, element}){

  const [visible, setvisible] = useState("none");
  const [height, setheight] = useState(0);

  useEffect(() => {
    setInterval(() => {
  
      setheight(height + 10)
    }, 100);
  }, [])
  

  function moreInfo (){
    changeVisibility();
    console.log("I am clicked")
  }

  function changeVisibility (){
    visible === "none" ? setvisible('block') : setvisible('none')
 }

  // element.setAttribute('onClick', moreInfo);


  
  
  return empty? <div style={{minWidth:"80px", margin:"0 20px"}}></div> : 
        (<div
            style = {{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center",
              margin:"0 20px"
            }}
          >
            <OverLay visible={visible} changeVisibility={changeVisibility}/>
            
            {direction === "up" ? (special? element : <ImageButton pic = {pic} on_click={moreInfo} /> ) : null}
            <div style={{color:"orange", minHeight:`${height}px`, minWidth:"5px", width:"5px", background:"orange"}}></div>
            {direction === "down" ? (special? element : <ImageButton pic = {pic} on_click={moreInfo} /> ) : null}

          </div>)
  
}

function App() {

  const [bg, setbg] = useState("white");

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
    <div className="App" style={{overflowX:"auto", width:"1020%", marginLeft:"80px"}}>
        <div className="upper_time_line" style={{minHeight:'52vh', display:"flex", flexDirection: "column", justifyContent:"end"}}>
          <div className="upper_lines" style={{display:"flex", alignItems:"flex-end"}}>
              <Event pic={coinjpg} height="40" direction="up"/>
              <Event pic={coinjpg} height="110" direction="up"/>
              <Event pic={coinjpg} height="180" direction="up"/>
              <Event pic={coinjpg} height="110" direction="up"/>
              <Event pic={coinjpg} height="40" direction="up"/>

              <Event empty="true"/>
              <Event empty="true"/>
              <Event empty="true"/>
              <Event empty="true"/>
              <Event empty="true"/>

              <Event special="true" element={ <IconButton onClick={addCoin} aria-label="fingerprint" sx={{padding:0, background:"orange", width:"40px", height:"40px"}}><AddIcon sx={{color:"white"}} /></IconButton> } height="40px" direction="up"/>
              
              
          </div>
          {/* Increase the width whenever more coins are added */}
          <div className="time_line" style={{minHeight:"10px", minWidth:"100px", background:"orange", borderRadius:"10px" }}></div>
      </div>
      <div className="lower_lines" style={{
        display: "flex",
        alignItems: "flex-start"
      }}>
        <Event empty="true"/>
        <Event empty="true"/>
        <Event empty="true"/>
        <Event empty="true"/>
        <Event empty="true"/>
        
        <Event pic={coinjpg} height="40" direction="down"/>
        <Event pic={coinjpg} height="110" direction="down"/>
        <Event pic={coinjpg} height="180" direction="down"/>
        <Event pic={coinjpg} height="110" direction="down"/>
        <Event pic={coinjpg} height="40" direction="down"/>

      </div>
    </div>
    <footer>

    <IconButton color="warning" variant="contained" onClick={changeTheam}><ModeNightIcon /></IconButton>
     
    </footer>
  </>
  );
}

export default App;
