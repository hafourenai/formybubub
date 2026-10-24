import {SceneFrame} from '../components/SceneFrame';
import {Beat} from '../components/Beat';
import {Host} from '../components/Host';
import {Icon} from '../components/Icons';
import {HeaderBar} from '../components/HeaderBar';
import {SequenceDiagram} from '../components/SequenceDiagram';
import {TcpSimulation} from '../components/TransportSimulation';
import {TransportControls} from '../components/TransportControls';
import {Label, Line, Reveal, Tag, Uses} from '../components/Primitives';
import {theme} from '../config/theme';
import {ease, range} from '../lib/motion';

export const S05_TCP = () => <SceneFrame id="S05" title={<span style={{color: theme.tcp}}>TCP</span>} color={theme.tcp}>
  {/* “TCP, singkatan dari Transmission Control Protocol ... connection-oriented.” */}
  <Beat scene="S05" id="intro">{({frame}) => <>
    <Reveal frame={frame} style={{marginTop: 65}}><div style={{fontSize: 76, fontWeight: 600, letterSpacing: '-2px'}}>Transmission Control Protocol</div></Reveal>
    <Reveal frame={frame} delay={8} pop style={{marginTop: 36}}><Tag color={theme.tcp}>Connection-oriented</Tag></Reveal>
    <Icon name="arrows" size={220} color={theme.tcp} style={{position: 'absolute', right: 50, top: 275}}/>
    <Line x1={0} y1={460} x2={1300} y2={460} color={`${theme.tcp}70`}/>
  </>}</Beat>
  {/* “sebuah koneksi harus dibangun lebih dulu sebelum data dikirim.” */}
  <Beat scene="S05" id="connection">{({p}) => <>
    <div style={{position: 'absolute', left: 150, top: 170}}><Host label="Host A" color={theme.tcp}/></div>
    <div style={{position: 'absolute', right: 150, top: 170}}><Host label="Host B" color={theme.tcp} server/></div>
    <Line x1={430} y1={245} x2={1298} y2={245} color={theme.tcp} progress={ease(range(p, 0.08, 0.7))}/>
    <div style={{position: 'absolute', left: 0, right: 0, top: 435, textAlign: 'center'}}><Tag color={theme.tcp}>Koneksi dulu, data kemudian</Tag></div>
  </>}</Beat>
  {/* “Analogi mudahnya adalah menelepon ... memastikan lawan bicara siap ...” */}
  <Beat scene="S05" id="telephone">{({frame, p}) => <>
    <Line x1={480} y1={265} x2={1270} y2={265} dashed={p < 0.4} color={p < 0.4 ? theme.line : theme.tcp}/>
    <Icon name="phone" size={200} color={theme.tcp} style={{position: 'absolute', left: 220, top: 165,
      transform: `rotate(${p < 0.36 ? Math.sin(frame * 0.7) * 5 : 0}deg)`}}/>
    <Icon name="phone" size={200} color={theme.tcp} style={{position: 'absolute', right: 220, top: 165}}/>
    <div style={{position: 'absolute', top: 40, left: p < 0.4 ? 380 : 1100}}><Tag>{p < 0.4 ? 'Memanggil' : 'Halo?'}</Tag></div>
    {p > 0.6 && <>
      <Icon name="chat" size={90} style={{position: 'absolute', left: 650 + range(p, 0.6, 0.78) * 260, top: 180}}/>
      <Icon name="chat" size={75} color={theme.muted} style={{position: 'absolute', left: 990 - range(p, 0.76, 0.94) * 260, top: 315}}/>
    </>}
    <Label style={{position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center'}}>Menghubungi → siap → berbicara</Label>
  </>}</Beat>
  {/* “three-way handshake. ... SYN ... SYN-ACK ... ACK ... koneksi terbentuk.” */}
  <Beat scene="S05" id="handshake">{({p}) => <SequenceDiagram progress={p} completeAt={0.81} messages={[
    {label: 'SYN', direction: 'right', at: 0.08},
    {label: 'SYN-ACK', direction: 'left', at: 0.32},
    {label: 'ACK', direction: 'right', at: 0.57, color: theme.success},
  ]}/>}</Beat>
  {/* “Setiap segmen diberi nomor urut ... ACK ... mengirim ulang ... urutan yang benar.” */}
  <Beat scene="S05" id="reliability">{({p}) => <TcpSimulation p={p}/>}</Beat>
  {/* “kendali alur ... penerima, dan kendali kemacetan ... jaringan ...” */}
  <Beat scene="S05" id="control">{({p}) => <TransportControls p={p}/>}</Beat>
  {/* “koneksi ditutup secara teratur menggunakan sinyal FIN.” */}
  <Beat scene="S05" id="close">{({p}) => <SequenceDiagram closing progress={p} completeAt={0.83} messages={[
    {label: 'FIN', direction: 'right', at: 0.03},
    {label: 'ACK', direction: 'left', at: 0.23, color: theme.success},
    {label: 'FIN', direction: 'left', at: 0.43},
    {label: 'ACK', direction: 'right', at: 0.63, color: theme.success},
  ]}/>}</Beat>
  {/* “header minimal dua puluh byte ... waktu tunggu ... web, email, dan transfer berkas.” */}
  <Beat scene="S05" id="overhead">{({p, frame, duration}) => <>
    <div style={{position: 'absolute', inset: 0, opacity: 1 - range(p, 0.48, 0.53)}}>
      <div style={{position: 'absolute', left: 0, top: 0}}><HeaderBar protocol="TCP" comparison/></div>
      <div style={{position: 'absolute', left: 0, top: 290}}><HeaderBar protocol="UDP" comparison/></div>
      <div style={{position: 'absolute', left: 850, top: 340, display: 'flex', alignItems: 'center', gap: 28}}>
        <Icon name="clock" size={80} color={theme.tcp}/><Label>Waktu tunggu handshake</Label>
      </div>
    </div>
    <div style={{position: 'absolute', inset: 0, paddingTop: 95, opacity: range(p, 0.53, 0.58)}}>
      <Uses frame={Math.max(0, frame - duration * 0.53)} color={theme.tcp} items={[
        {icon: 'browser', label: 'Web'}, {icon: 'email', label: 'Email'}, {icon: 'file', label: 'Transfer berkas'},
      ]}/>
    </div>
  </>}</Beat>
</SceneFrame>;
