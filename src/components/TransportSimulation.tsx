import {theme} from '../config/theme';
import {range} from '../lib/motion';
import {Host} from './Host';
import {Icon} from './Icons';
import {Packet} from './Packet';
import {PacketFlight} from './PacketFlight';
import {Label, Line, Tag} from './Primitives';

const SimulationHosts = ({color}: {color: string}) => <>
  <div style={{position: 'absolute', left: 0, top: 175}}><Host label="Pengirim" color={color} size={160}/></div>
  <div style={{position: 'absolute', right: 0, top: 175}}><Host label="Penerima" color={color} server size={160}/></div>
</>;

// Nomor UDP hanya penanda ilustrasi, bukan sequence number dalam header UDP.
const datagrams = [
  {n: 1, start: 0.04, end: 0.21, y: 85},
  {n: 2, start: 0.11, end: 0.58, y: 170},
  {n: 3, start: 0.20, end: 0.45, y: 255, lost: true},
  {n: 4, start: 0.29, end: 0.47, y: 340},
  {n: 5, start: 0.58, end: 0.78, y: 425},
];

export const UdpSimulation = ({p}: {p: number}) => <>
  <SimulationHosts color={theme.udp}/>
  <Label color={theme.udp} style={{position: 'absolute', left: 305, top: 0}}>Datagram independen</Label>
  {datagrams.map((item) => <div key={item.n}>
    <Line x1={305} y1={item.y} x2={1410} y2={item.y} dashed/>
    <PacketFlight start={{x: 305, y: item.y}} end={{x: 1410, y: item.y}}
      progress={(p - item.start) / (item.end - item.start)} number={item.n} color={theme.udp} lost={item.lost}
      bend={item.n === 2 ? 25 : 0}/>
  </div>)}
  {p > 0.325 && <div style={{position: 'absolute', left: 810, top: 218, display: 'flex', alignItems: 'center', gap: 10,
    opacity: range(p, 0.325, 0.35)}}><Icon name="cross" color={theme.failure} size={64}/><Label color={theme.failure}>3 hilang</Label></div>}
  <div style={{position: 'absolute', left: 0, top: 510}}><Tag color={theme.udp}>
    {p < 0.45 ? 'Tanpa jaminan sampai' : p < 0.72 ? 'Tanpa jaminan urutan' : 'Tanpa pengiriman ulang'}
  </Tag></div>
  <div style={{position: 'absolute', left: 1030, top: 490}}>
    <Label style={{marginBottom: 12}}>Urutan tiba</Label>
    <div style={{display: 'flex', gap: 14}}>{datagrams.filter((item) => !item.lost && p >= item.end)
      .sort((a, b) => a.end - b.end).map((item) => <Packet key={item.n} number={item.n} color={theme.udp} compact/>)}</div>
  </div>
</>;

// Nomor 1–4 memvisualisasikan urutan potongan data, bukan detail byte/ACK TCP.
const segments = [
  {n: 1, start: 0.02, end: 0.12, y: 115},
  {n: 2, start: 0.16, end: 0.26, y: 200},
  {n: 3, start: 0.30, end: 0.48, y: 285, lost: true},
  {n: 4, start: 0.42, end: 0.55, y: 370},
];

export const TcpSimulation = ({p}: {p: number}) => {
  const timeout = range(p, 0.40, 0.65);
  return <>
    <SimulationHosts color={theme.tcp}/>
    {segments.map((item) => <div key={item.n}>
      <Line x1={320} y1={item.y} x2={1400} y2={item.y}/>
      <PacketFlight start={{x: 320, y: item.y}} end={{x: 1400, y: item.y}}
        progress={(p - item.start) / (item.end - item.start)} label="Segmen" number={item.n} color={theme.tcp} lost={item.lost}/>
    </div>)}
    {[{start: 0.12, end: 0.18}, {start: 0.26, end: 0.32}, {start: 0.78, end: 0.86}].map((ack) =>
      <PacketFlight key={ack.start} start={{x: 1400, y: 40}} end={{x: 320, y: 40}}
        progress={(p - ack.start) / (ack.end - ack.start)} color={theme.success} label="ACK"/>)}
    {p > 0.39 && p < 0.67 && <div style={{position: 'absolute', left: 785, top: 248, display: 'flex', alignItems: 'center', gap: 8}}>
      <Icon name="cross" color={theme.failure} size={64}/><Label color={theme.failure}>Segmen 3 hilang</Label>
    </div>}
    {p >= 0.40 && p < 0.79 && <div style={{position: 'absolute', left: 50, top: 380, display: 'flex', alignItems: 'center', gap: 16}}>
      <svg width="72" height="72" viewBox="0 0 72 72"><circle cx="36" cy="36" r="28" stroke={theme.line} strokeWidth="5" fill="none"/>
        <circle cx="36" cy="36" r="28" stroke={theme.warning} strokeWidth="5" fill="none" strokeDasharray={Math.PI * 56}
          strokeDashoffset={Math.PI * 56 * (1 - timeout)} transform="rotate(-90 36 36)"/></svg>
      <Label color={theme.warning}>{p >= 0.65 ? 'Timeout' : 'Menunggu ACK'}</Label>
    </div>}
    <PacketFlight start={{x: 320, y: 285}} end={{x: 1400, y: 285}} progress={(p - 0.66) / 0.12} color={theme.tcp} label="Segmen" number={3}/>
    <div style={{position: 'absolute', left: 0, top: 520, display: 'flex', gap: 18}}>
      <Tag color={theme.tcp}>Nomor urut</Tag>
      <Tag color={theme.success} style={{opacity: p >= 0.12 ? 1 : 0.3}}>ACK</Tag>
      <Tag color={theme.tcp} style={{opacity: p >= 0.66 ? 1 : 0.3}}>Kirim ulang</Tag>
    </div>
    <div style={{position: 'absolute', left: 1030, top: 470}}>
      <Label style={{marginBottom: 12}}>Urutan data</Label>
      <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
        {segments.map((segment) => {
          const arrived = p >= (segment.n === 3 ? 0.78 : segment.end);
          return <div key={segment.n} style={{opacity: arrived ? 1 : 0.18}}><Packet color={theme.tcp} number={segment.n} compact/></div>;
        })}
        {p >= 0.86 && <Icon name="check" color={theme.success} size={50}/>}
      </div>
    </div>
  </>;
};
