import React, {useState, useEffect} from 'react';
import './App.css';
import Input from './Components/Input';
import Messages from './Components/Messages';

const randomColor= () => {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
    };
  
    const randomName= ()=> {
      const adjectives = [
        "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
        "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
        "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
        "billowing", "broken", "cold", "damp", "falling", "frosty", "green", "long",
        "late", "lingering", "bold", "little", "morning", "muddy", "old", "red",
        "rough", "still", "small", "sparkling", "throbbing", "shy", "wandering",
        "withered", "wild", "black", "young", "holy", "solitary", "fragrant",
        "aged", "snowy", "proud", "floral", "restless", "divine", "polished",
        "ancient", "purple", "lively", "nameless"
      ];
      const nouns = [
        "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
        "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
        "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
        "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
        "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
        "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
        "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
        "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper", "frog",
        "smoke", "star"
      ];
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      return adjective + noun;
    };

  let addedMember={username:randomName(), color:randomColor()};
  let drone = new window.Scaledrone('2fZzT85Qh1eIXTvU',{data: addedMember}); 
  const room = drone.subscribe('observable-LetsChat');
  


export default function App() {
  
  const [messages, setMessages] = useState ([]);
  const [myID, setMyID] = useState ([]);

    useEffect(()=>{
          
// new member in the room
    drone.on('open', error => {
      if (error) {
        return console.error(error);
      };
        let copyId = myID;
        copyId.id = drone.clientId;
        setMyID(copyId);
        console.log(myID);
      
    });


// handeling messages
    room.on('message', message => {
      
      const {data, id, member} = message;

        let msgs = messages; 
        msgs.push({member: member, text: data, id:id}); 
        let newMsgs = [...msgs];
        setMessages(newMsgs);
    });

  },[]);
    

  const sendMessage=(txt)=>{
    drone.publish({
    room: 'observable-LetsChat',
    message:txt
    })
  };
     

  return (
      <div className='App'>
        <div className='App-header'>
          <h1>Let's chat together... right now...</h1>
        </div>
        <Messages messages= {messages} userId={myID} />
        <Input onSendMessage={sendMessage}/>

     </div>
  );
}



