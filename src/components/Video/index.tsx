import React,{useState,useEffect,useRef} from "react";
import './index.scss'
let source = require('../../assert/flower.webm');
const Video:React.FC<{maxVolume:number}> = ({maxVolume=300}) => {
  const progress = useRef<HTMLDivElement|null>(null);
  const ball = useRef<HTMLDivElement|null>(null);
  const video = useRef<HTMLVideoElement|null>(null);
  const voice = useRef<HTMLDivElement|null>(null);
  const [progressHeight, setProgressHeight] = useState(maxVolume);
  const [isshowVoice,setIsshowVoice] = useState<boolean>(false);
  const [ispause, setIspause] = useState<boolean>(true);
  const ballMouseDown = (event:any) => {
    let y0 = event.pageY;
    let y1 = event.pageY;
    document.onmousemove = function(e) {
      y0 = y1;
      y1 = e.pageY;
      const diff = y1-y0;
      setProgressHeight((value) => {
        const result = value + diff;
        if(result > maxVolume)return maxVolume;
        if(result<0)return 0 ;
        return result
      })
    }
    document.onmouseup = function() {
      document.onmousemove = null;
    }
}

 useEffect(()=>{
   if(video.current?.volume||video.current?.volume ===0) {
     video.current.volume =(maxVolume- progressHeight)/maxVolume;
   } 
 }, [progressHeight])

 return (
  <div style={{width:'100%',height:"100%"}} className = 'contain'>
    <video width='100%' ref = {video} src= {source} controls></video>
    <div className="voice-contain" 
        onMouseEnter = {()=>{setIsshowVoice(true)}} 
        onMouseLeave = {()=>{setIsshowVoice(false)}}
        ref = {voice}
        >
      {isshowVoice?<div className="voice-outside">
        <div className ="voice"    onMouseDown = {(event)=>{   
          const y0 = progressHeight;
          const top = voice.current?.offsetTop as number;    
           console.log('进来了',top,event.pageY);
          const y1 = event.pageY - top -30;//这里要注意..
          const diff = y1-y0;
          setProgressHeight((value) => {
            const result = value + diff;
            if(result>maxVolume)return maxVolume;
            if(result<0)return 0 ;
            return result
            })
          }}>
          <div 
            className="progress"  
            ref={progress}
            style = {{
              height:progressHeight,
            }}
            >
          </div>
          <div 
          className="ball" 
          ref = {ball}
          onMouseDown = {ballMouseDown}
          ></div>
        </div> 
      </div>:null
      }
      <div className="icon" 
        style={{width:20,height:20,backgroundColor:'#ffff',position:'absolute',bottom:10}}
        onClick = {()=>{
          video.current?.pause()
          setIspause(!ispause);
        }} 
        >ss</div>
    </div>
  </div>)   
}

export default Video
