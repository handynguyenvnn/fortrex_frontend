import React, { useEffect, useState } from "react";
import {useTradingStore} from "store";
import {socketSignalR} from "utils/utils";
import countdownSound from '../../../public/sound/entercommand.mp3';

const Time = (props) => {
  const [counter, setCounter] = useState(0);
  const [counterMain, setCounterMain] = useState(0);
  const [messageTime, setMessageTime] = useState('');
  const [, updateTradingStore] = useTradingStore();

  useEffect(() => {
    const socketConnect = socketSignalR();
    if (socketConnect) {
      if (socketConnect && socketConnect.state === "Disconnected") {
        socketConnect
          .start()
          .then(() => {
            socketConnect.on("serverTime", (e) => {
              setCounter(59 - parseInt(JSON.stringify(e)));
            });
          })
      }


      return () => {
        socketConnect.off("ServerTime");
        return null;
      };
    }
  }, []);

  useEffect( () => {
    if(counter > 30){
      updateTradingStore( draft => {
        draft.isShowButtonDownUp = false;
      });
      setCounterMain(counter-30);
      if ((counter - 30) < 10) {
        const audioEl = document.getElementsByClassName("audio-element-countdown")[0];
        audioEl.play();
      }
      setMessageTime(`Place Time remaining`)
    } else {
      updateTradingStore( draft => {
        draft.isShowButtonDownUp = true;
      });
      setCounterMain(counter);
      setMessageTime(`Next round in`)
    }

  }, [counter])

  return (
       <div className="time" style={{color: counter <= 30 ? "red" : ""}}  >
       <span>{messageTime}</span>
       <h3 style={{color: '#fff'}}>{counterMain} s</h3>
       <audio className="audio-element-countdown">
            <source src={countdownSound}></source>
        </audio>
     </div>
  );
};
export default Time;
