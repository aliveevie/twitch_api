import './App.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  const [channelsData, setChannelsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const channelDataPromises = channels.map(async (channel) => {
          const streamResponse = await fetch(`https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${channel}`);
          const streamData = await streamResponse.json();
          const channelResponse = await fetch(`https://twitch-proxy.freecodecamp.rocks/twitch-api/channels/${channel}`);
          const channelData = await channelResponse.json();

          return {
            name: channelData.display_name || channel,
            logo: channelData.logo || "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
            game: streamData.stream ? streamData.stream.game : "Offline",
            status: streamData.stream ? "online" : "offline",
            description: streamData.stream ? ": " + channelData.status : "",
            url: channelData.url || "#",
          };
        });

        const channelDataList = await Promise.all(channelDataPromises);
        setChannelsData(channelDataList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="container">
   
      <h1 id>Twitch Streamers</h1>
      
      {channelsData.map((channel) => (
        <div key={channel.name} className='channel-container'>
          <div className="icon">
            <img src={channel.logo} className="logo" alt={channel.name} />
          </div>
          <div  id="name">
            <a href={channel.url} target="_blank">
              {channel.name}
            </a>
          </div>
          <div id="streaming">
            {channel.game}
            <span className="hidden-xs">{channel.description}</span>
          </div>
        </div> 
        
      ))}
     
     
   
    </div>
  );
}



export default App;
