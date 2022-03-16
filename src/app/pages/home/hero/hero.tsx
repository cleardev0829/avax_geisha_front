import React, { useEffect, useState } from "react";
import Web3 from "web3";

import TimerStyled from "./timer/TimerStyled";
import {environment} from "../../../../environment";

import "./hero.css";

const Mint = () => {

  const [remainTime, setRemainTime] = useState<number>(0);
  const [time, setTime] = useState<any>({ day: 0, hour: 0, minute: 0, second: 0 });
  const httpWeb3 = new Web3(new Web3.providers.HttpProvider(environment.rpcUrl));
  const startTime = 1645539742;

  useEffect(() => {
      let isSubscribed = true;
      httpWeb3.eth.getBlockNumber().then((blockNumber: any) => {
          httpWeb3.eth.getBlock(blockNumber).then((result: any) => {
              if(isSubscribed) {
                  setRemainTime((startTime - Number(result.timestamp)));
              }
          });
      });
      return () => {
          isSubscribed = false;
      };
  },[])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainTime((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(interval);
    },[])

    useEffect(() => {
        const formattedTime = getTimeFormat(remainTime);
        setTime(formattedTime);
    },[remainTime])

    const getTimeFormat = (time: number) => {
        if(time > 0) {
            let temp = time;
            const day = parseInt((temp / (3600 * 24)).toString());
            temp = temp - day * 3600 * 24;
            const hour = parseInt((temp / 3600).toString());
            temp = temp - hour * 3600;
            const minute = parseInt((temp / 60).toString());
            const second = temp - minute * 60;
            return{ day: day, hour: hour, minute: minute, second: second };
        }
        return { day: 0, hour: 0, minute: 0, second: 0 }
    }

  return (
    <section className="video-container" id="hero">
        <video src="/3d-geisha.mp4" autoPlay muted playsInline loop></video>
        <div className="callout">
            <div></div>
            <div className="mb-50">
                <p><img src="/logo_text.png" className="img-responsive animate__animated animate__heartBeat" alt="" /></p>
                <h3 className="animate__animated animate__bounceInUp animate__slower">LAUNCHING IN</h3>
                <TimerStyled seconds={time.second} minutes={time.minute} hours={time.hour} days={time.day}  />
            </div>
        </div>
    </section>
  );
};
//<TimerStyled seconds={time.second} minutes={time.minute} hours={time.hour} days={time.day}  />
export default Mint;
