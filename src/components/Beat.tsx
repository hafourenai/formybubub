import type {ReactNode} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {getBeat, type SceneId} from '../config/scenes';
import {fade} from '../lib/motion';

export type BeatClock = {frame: number; p: number; duration: number};

// Fade antarbeat berada di dalam slot; tidak menambah frame atau overlap scene.
export const Beat = ({scene, id, children}: {
  scene: SceneId; id: string; children: (clock: BeatClock) => ReactNode;
}) => {
  const sceneFrame = useCurrentFrame();
  const beat = getBeat(scene, id);
  const frame = sceneFrame - beat.from;
  if (frame < 0 || frame >= beat.durationInFrames) return null;
  return <AbsoluteFill data-beat={`${scene}/${id}`} style={{opacity: fade(frame, beat.durationInFrames, 8)}}>
    {children({frame, p: frame / Math.max(1, beat.durationInFrames - 1), duration: beat.durationInFrames})}
  </AbsoluteFill>;
};
