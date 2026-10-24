import {loadFontFromInfo} from '@remotion/google-fonts/from-info';
import {getInfo as interInfo} from '@remotion/google-fonts/Inter';
import {getInfo as monoInfo} from '@remotion/google-fonts/JetBrainsMono';
import {staticFile} from 'remotion';

// Metadata & loader resmi @remotion/google-fonts; semua URL font diganti file lokal.
const localFont = (info: ReturnType<typeof interInfo> | ReturnType<typeof monoInfo>, name: string, weights: string[]) =>
  loadFontFromInfo({
    ...info,
    fonts: {normal: Object.fromEntries(weights.map((weight) => [
      weight, {latin: staticFile(`fonts/${name}-${weight}-latin.woff2`)},
    ]))},
  }, 'normal', {weights, subsets: ['latin']});

export const fonts = {
  text: localFont(interInfo(), 'Inter', ['400', '600', '700']).fontFamily,
  mono: localFont(monoInfo(), 'JetBrainsMono', ['400', '600']).fontFamily,
};
