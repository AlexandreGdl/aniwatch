
import { useState, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { CONFIG } from '../config';
import { GOGO_SERVER_ENUM } from '../config/gogo_anime';

export const Home = () => {
  const [count, setCount] = useState(0);
  
  const [streamUrl, setStreamUrl] = useState(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const abort = new AbortController();
    const abort2 = new AbortController();
    (async () => {
      const r = await fetch(CONFIG.gogo_anime.recent, {
        signal: abort.signal
      });
      const data = await r.json();
      const episode = data.results[7];
      console.log(episode)
      const epServers = await (await fetch(CONFIG.gogo_anime.episode(episode.episodeId, GOGO_SERVER_ENUM.GOGOCDN), {
        signal: abort2.signal
      })).json();
      setStreamUrl(epServers.sources[3].url);
      console.log(epServers);
      initHLS();
    })();

    return () => {
      abort.abort();
      abort2.abort();
    }
  }, []);

  function initHLS() {
    if (Hls.isSupported() && streamUrl && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(videoRef.current);
    }
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p>{streamUrl}</p>
      <video controls width="640" height="360" autoPlay ref={videoRef}/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}