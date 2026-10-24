import {Easing, interpolate, spring} from 'remotion';
import {FPS} from '../config/scenes';

export const clamp = (value: number) => Math.min(1, Math.max(0, value));
export const range = (value: number, from: number, to: number) =>
  interpolate(value, [from, to], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
export const ease = (value: number) => Easing.inOut(Easing.cubic)(clamp(value));
export const mix = (from: number, to: number, progress: number) => from + (to - from) * progress;
export const arrive = (frame: number, delay = 0, pop = false) =>
  spring({frame: Math.max(0, frame - delay), fps: FPS, config: {damping: pop ? 12 : 200}});
export const fade = (frame: number, duration: number, frames = 10) =>
  Math.min(range(frame, 0, frames), 1 - range(frame, duration - frames - 1, duration - 1));

export type Point = {x: number; y: number};
export const pointOnCurve = (start: Point, end: Point, p: number, bend = 0): Point => ({
  x: mix(start.x, end.x, p),
  y: mix(start.y, end.y, p) + Math.sin(p * Math.PI) * bend,
});
