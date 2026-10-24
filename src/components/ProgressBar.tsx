import {useCurrentFrame} from 'remotion';
import {scenes, TOTAL_FRAMES} from '../config/scenes';
import {theme} from '../config/theme';

export const ProgressBar = () => {
  const frame = useCurrentFrame();
  return <div style={{position: 'absolute', left: 96, right: 96, bottom: 96, height: 4, background: theme.line}}>
    <div style={{height: 4, width: `${(frame + 1) / TOTAL_FRAMES * 100}%`, background: theme.text}}/>
    {scenes.slice(1).map((scene) => <div key={scene.id} style={{position: 'absolute', width: 3, height: 12,
      top: -4, left: `${scene.from / TOTAL_FRAMES * 100}%`, background: theme.background}}/>)}
  </div>;
};
