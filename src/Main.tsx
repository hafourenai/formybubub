import {AbsoluteFill, Audio, Series, staticFile, useCurrentFrame} from 'remotion';
import {scenes, type SceneId} from './config/scenes';
import {theme} from './config/theme';
import {audio} from './config/audio';
import {ProgressBar} from './components/ProgressBar';
import {S01_Opening} from './scenes/S01_Opening';
import {S02_Protocol} from './scenes/S02_Protocol';
import {S03_Transport} from './scenes/S03_Transport';
import {S04_UDP} from './scenes/S04_UDP';
import {S05_TCP} from './scenes/S05_TCP';
import {S06_Comparison} from './scenes/S06_Comparison';
import {S07_Conclusion} from './scenes/S07_Conclusion';
import {S08_Closing} from './scenes/S08_Closing';

const sceneComponents: Record<SceneId, React.ComponentType> = {
  S01: S01_Opening, S02: S02_Protocol, S03: S03_Transport, S04: S04_UDP,
  S05: S05_TCP, S06: S06_Comparison, S07: S07_Conclusion, S08: S08_Closing,
};

export const Main = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill data-composition="TcpUdpExplainer" data-frame={frame} style={{background: theme.background, overflow: 'hidden'}}>
    {/* Grid SVG lokal, tanpa tekstur/gambar eksternal atau animasi CSS. */}
    <svg width="1920" height="1080" style={{position: 'absolute', opacity: 0.30}}>
      <defs><pattern id="blueprint-dots" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill={theme.muted}/></pattern></defs>
      <rect width="1920" height="1080" fill="url(#blueprint-dots)"/>
      <path d="M0 880h50V400H0M1920 200h-50v480h50" fill="none" stroke={theme.muted} strokeWidth="1.5" opacity={0.3 + Math.sin(frame / 45) * 0.1}/>
    </svg>
    <Series>{scenes.map((scene) => {
      const Scene = sceneComponents[scene.id];
      return <Series.Sequence
        key={scene.id}
        durationInFrames={scene.durationInFrames}
        name={`${scene.id} · ${scene.title}`}
        premountFor={0}
      >
        <Scene/>
      </Series.Sequence>;
    })}</Series>
    <ProgressBar/>
    {audio.voiceover.enabled && <Audio src={staticFile(audio.voiceover.file)} volume={audio.voiceover.volume} name="Voice over"/>}
    {audio.bgm.enabled && <Audio src={staticFile(audio.bgm.file)} volume={audio.bgm.volume} loop name="Musik latar"/>}
  </AbsoluteFill>;
};
