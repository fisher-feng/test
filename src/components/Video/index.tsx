import React,{useState,useEffect,useRef} from "react";
import './index.scss'
let source = require('../../assert/flower.webm');
const Video:React.FC<{maxVolume:number}> = ({maxVolume}) => {
  const progress = useRef<HTMLDivElement|null>(null);
  const ball = useRef<HTMLDivElement|null>(null);
  const video = useRef<HTMLVideoElement|null>(null);
  const voice = useRef<HTMLDivElement|null>(null);
  const [progressHeight, setProgressHeight] = useState(maxVolume);
  const [isshowVoice,setIsshowVoice] = useState<boolean>(false);
  const [ismuted, setismuted] = useState<boolean>(false);
  const ballMouseDown = (event:any) => {
    let y0 = event.pageY;
    let y1 = event.pageY;
    document.onmousemove = function(e) {
      y0 = y1;
      y1 = e.pageY;
      const diff = y1-y0;
  
    setProgressHeight((value) => {
      const result = value + diff;
      if(video.current?.volume){
        if(result>maxVolume){
          video.current.volume = 0;
          // return maxVolume;
        }else
        if(result<0){
          video.current.volume = 1;
          // return 0;
        }else {
          video.current.volume = 1 - result/50;
        }
      }
      return value
    })

    // setProgressHeight((value) => {
    //   const result = value + diff;
    //   if(result>maxVolume)return maxVolume;
    //   if(result<0)return 0 ;
    //   return result
    // })
    }
    document.onmouseup = function() {
      document.onmousemove = null;
    }
  }
  const voiceMouseDown = (event: { pageY: number})=>{   
    const y0 = progressHeight;
    const top = voice.current?.offsetTop as number;    
    const y1 = event.pageY - top -30;//这里要注意..
    const diff = y1-y0;
    let result = progressHeight + diff;
    if(video.current?.volume){
      if(result>maxVolume){
        video.current.volume = 0;
        return
      };
      if(result<0){
        video.current.volume = 1;
        return
      } 
      video.current.volume = 1-result/50;
    }
   
    // setProgressHeight((value) => {
    //   const result = value + diff;
    //   if(result>maxVolume)return maxVolume;
    //   if(result<0)return 0 ;
    //   return result
    // })
 }
 useEffect(()=>{
  //  if(video.current?.volume||video.current?.volume === 0) {
  //    if(ismuted){
  //     return
  //    };//如果是点击了静音就不设值，用于保存上一次声音的值
  //    video.current.volume =(maxVolume- progressHeight)/maxVolume;
  //  } 
 }, [maxVolume, progressHeight])
  useEffect(()=>{
    if(ismuted){
      // setProgressHeight(maxVolume);
 
      // if(video.current?.muted){
      //   console.log();
      // }
    }else{
      // const volume = video.current?.volume as number;
      // console.log(volume*50);
      // setProgressHeight(maxVolume- volume*maxVolume);
    }
  },[ismuted])
 return (
  <div style={{width:'100%',height:"100%"}} className = 'contain'>
    <video width='100%' ref = {video} src= {source} controls muted ={ismuted}
     onVolumeChange = {(e)=>{
      if(video.current?.muted){
        setProgressHeight(maxVolume);
        setismuted(true)
      }else{
        const volume = video.current?.volume as number
        console.log('change',volume);
        setismuted(false)
        setProgressHeight(maxVolume - volume *50 )
      }
    }}></video>
    <div className="voice-contain" 
        onMouseEnter = {()=>{setIsshowVoice(true)}} 
        onMouseLeave = {()=>{setIsshowVoice(false)}}
        ref = {voice}
        >
      {isshowVoice?<div className="voice-outside">
        <div className ="voice"    onMouseDown = {voiceMouseDown}>
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
          setismuted((value)=>!value);
        }} 
      >{ismuted?'静音':'有声音'}</div>
    </div>
  </div>)   
}

export default Video
