import {Composition} from 'remotion';
import {Main} from './Main';
import {FPS, HEIGHT, TOTAL_FRAMES, WIDTH} from './config/scenes';

export const RemotionRoot = () => <Composition id="TcpUdpExplainer" component={Main}
  width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={TOTAL_FRAMES}/>;
