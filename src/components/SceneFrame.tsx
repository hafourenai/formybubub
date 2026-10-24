import type {ReactNode} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {getScene, type SceneId} from '../config/scenes';
import {theme} from '../config/theme';
import {fonts} from '../config/fonts';
import {arrive, fade} from '../lib/motion';

export const SceneFrame = ({id, title, color = theme.text, children}: {
  id: SceneId; title: ReactNode; color?: string; children: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const scene = getScene(id);
  const entrance = arrive(frame);
  return <AbsoluteFill data-scene={id} style={{fontFamily: fonts.text, color: theme.text, opacity: fade(frame, scene.durationInFrames)}}>
    <div style={{position: 'absolute', left: 96, top: 96, display: 'flex', alignItems: 'center', gap: 18}}>
      <span style={{width: 8, height: 30, background: color}}/>
      <span style={{fontSize: 32, color: theme.muted, fontWeight: 600}}>{scene.index + 1} · {scene.title}</span>
    </div>
    <div style={{position: 'absolute', right: 96, top: 96, color: theme.muted, fontFamily: fonts.mono, fontSize: 32}}>
      {String(scene.index + 1).padStart(2, '0')} / 08
    </div>
    <div style={{position: 'absolute', top: 175, left: 96, right: 96, fontSize: 96, fontWeight: 700,
      lineHeight: 1.12, letterSpacing: '-4px', transform: `translateY(${(1 - entrance) * 22}px)`}}>{title}</div>
    <div style={{position: 'absolute', left: 96, right: 96, top: 332, bottom: 150}}>{children}</div>
  </AbsoluteFill>;
};
