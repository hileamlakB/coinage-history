import IconButton from '@mui/material/IconButton';
import coinjpg from "./images/coin.jpg";
import './App.css';

function Event({pic, height, direction, empty}){
  let coinImage = (<IconButton aria-label="fingerprint" color="warning" sx={{padding:0}}>
                  <img src={pic} alt="coin_name" style={{borderRadius:"50px", width:"80px", height:"80px"}}></img>
                </IconButton>)
  let to_return = empty? <div style={{minWidth:"80px", margin:"0 20px"}}></div> : 
  (<div
      style = {{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
        margin:"0 20px"
      }}
    >

      
      {direction === "up" ? coinImage : null}
      <div style={{color:"orange", minHeight:`${height}`, minWidth:"5px", width:"5px", background:"orange"}}></div>
      {direction === "down" ? coinImage : null}

    </div>)
  return to_return
  
}

function App() {
  return (
    <div className="App" style={{overflowX:"auto", width:"1020%"}}>
        <div className="upper_time_line" style={{minHeight:'52vh', display:"flex", flexDirection: "column", justifyContent:"end"}}>
          <div className="upper_lines" style={{display:"flex", alignItems:"flex-end"}}>
              <Event pic={coinjpg} height="40px" direction="up"/>
              <Event pic={coinjpg} height="110px" direction="up"/>
              <Event pic={coinjpg} height="180px" direction="up"/>
              <Event pic={coinjpg} height="110px" direction="up"/>
              <Event pic={coinjpg} height="40px" direction="up"/>

          </div>
          {/* Increase the width whenever more coins are added */}
          <div className="time_line" style={{minHeight:"10px", minWidth:"100px", background:"orange"}}></div>
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
        
        <Event pic={coinjpg} height="40px" direction="down"/>
        <Event pic={coinjpg} height="110px" direction="down"/>
        <Event pic={coinjpg} height="180px" direction="down"/>
        <Event pic={coinjpg} height="110px" direction="down"/>
        <Event pic={coinjpg} height="40px" direction="down"/>

      </div>
    </div>
 
  );
}

export default App;
