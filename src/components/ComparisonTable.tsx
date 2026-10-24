import {theme} from '../config/theme';
import {range} from '../lib/motion';
import {Tag} from './Primitives';

const rows = [
  {label: 'Koneksi', udp: 'Connectionless', tcp: 'Connection-oriented', at: 4 / 30},
  {label: 'Pengiriman', udp: 'Tanpa jaminan', tcp: 'Dijamin: ACK dan kirim ulang', at: 8 / 30},
  {label: 'Urutan', udp: 'Tidak dijamin', tcp: 'Terjaga', at: 12 / 30},
  {label: 'Beban', udp: 'Header 8 byte, ringan', tcp: 'Header min. 20 byte, lebih berat', at: 16 / 30},
  {label: 'Cocok untuk', udp: 'DNS, suara/video, siaran, game', tcp: 'Web, email, transfer berkas', at: 21 / 30},
];

export const ComparisonTable = ({p}: {p: number}) => {
  const current = rows.filter((row) => p >= row.at).length - 1;
  return <div style={{position: 'absolute', inset: 0}}>
    <div style={{display: 'grid', gridTemplateColumns: '280px 1fr 1fr', height: 64, alignItems: 'center'}}>
      <div/>
      <div style={{fontSize: 48, fontWeight: 700, color: theme.udp, paddingLeft: 30}}>UDP</div>
      <div style={{fontSize: 48, fontWeight: 700, color: theme.tcp, paddingLeft: 30}}>TCP</div>
    </div>
    <div style={{display: 'grid', gridTemplateColumns: '280px 1fr 1fr', height: 4, marginTop: 12}}>
      <div style={{background: theme.line}}/><div style={{background: theme.udp}}/><div style={{background: theme.tcp}}/>
    </div>
    {rows.map((row, i) => {
      const shown = range(p, row.at, row.at + 0.02);
      const active = i === current || p >= 26 / 30;
      return <div key={row.label} style={{display: 'grid', gridTemplateColumns: '280px 1fr 1fr', alignItems: 'center',
        minHeight: 82, borderBottom: `1px solid ${theme.line}`, fontSize: 32,
        background: active ? theme.surface : 'transparent', opacity: shown * (active ? 1 : 0.48),
        transform: `translateY(${(1 - shown) * 15}px)`}}>
        <div style={{fontWeight: 600, paddingLeft: 18}}>{row.label}</div>
        <div style={{padding: '12px 30px', lineHeight: 1.3}}>{row.udp}</div>
        <div style={{padding: '12px 30px', lineHeight: 1.3, borderLeft: `1px solid ${theme.line}`}}>{row.tcp}</div>
      </div>;
    })}
    <div style={{display: 'grid', gridTemplateColumns: '280px 1fr 1fr', marginTop: 20, opacity: range(p, 26 / 30, 27 / 30)}}>
      <div/>
      <Tag color={theme.udp} style={{fontSize: 32, marginRight: 20, padding: '12px 20px'}}>Peka waktu, toleran kehilangan data</Tag>
      <Tag color={theme.tcp} style={{fontSize: 32, padding: '12px 20px'}}>Tidak boleh kehilangan data</Tag>
    </div>
  </div>;
};
