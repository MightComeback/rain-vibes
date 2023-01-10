import React, { useState, useEffect, useRef } from 'react';
import { BsPlay, BsPause } from 'react-icons/bs';
import heavyRainSound from '../assets/sounds/heavy-raining-rain-on-tree-natural-clear-sound-abbas-ali-quiet-life-relaxing-music-11938.mp3';

import { videoData } from '../data/data';


const Hero = () => {
  const [videoArray, setVideoArray] = useState([]);
  const [videoId, setVideoId] = useState(0);
  const [playbackStatus, setPlaybackStatus] = useState(false);
  const [playbackVolume, setPlaybackVolume] = useState(1);

  const audioRef = useRef();

  useEffect(() => {
    videoData.map((video) => {
      setVideoArray(oldArray => [...oldArray, (video.url)])
    })
  }, []);

  return (
    <div className='overflow-hidden'>
      <div>
        <video src={videoArray[videoId]} autoPlay loop muted className='min-w-[100%] h-screen object-cover' />
      </div>
      <div className=''>
        <audio loop ref={audioRef}>
          <source src={heavyRainSound} id='audioTag' />
        </audio>
      </div>
      <div className='flex justify-center align-center w-full absolute top-[10%]'>
        <div className='w-[500px] h-[400px] rounded-xl flex flex-col gap-8 pt-12 p-2'>
          <p className='text-4xl text-white text-center'>Listen to relaxing rain sounds.</p>
          <div className='flex justify-between'>
            <p className='text-gray-300 text-xl'>Change volume</p>
            <input type='range' min='0' max='1' step='0.01' value={playbackVolume} onChange={event => {
              setPlaybackVolume(event.target.valueAsNumber);
              audioRef.current.volume = playbackVolume;
            }} />
          </div>
          <div className='flex justify-center gap-12'>
            <button type='button' className='text-gray-300 p-4 bg-white/20 w-60 rounded-2xl text-xl hover:motion-safe:animate-pulse'
            onClick={() => {
              if (videoId !== videoArray.length - 1) {
                setVideoId((prev) => prev + 1);
              } else setVideoId(0);
            }}>Next video</button>
            <button type='button' onClick={() => {
              audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause();
              setPlaybackStatus((prev) => !prev);
            }}  className='p-4 bg-white/20 rounded-full hover:motion-safe:animate-pulse'>
              <BsPlay size={30} className={`text-white pl-1 ${playbackStatus ? 'hidden' : 'block'} `} />
              <BsPause size={30} className={`text-white ${playbackStatus ? 'block' : 'hidden'} `} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero