import {SceneFrame} from '../components/SceneFrame';
import {Beat} from '../components/Beat';
import {Host} from '../components/Host';
import {LayerStack} from '../components/LayerStack';
import {PortDoors} from '../components/PortDoors';
import {Icon} from '../components/Icons';
import {PacketFlight} from '../components/PacketFlight';
import {Label, Line, Tag} from '../components/Primitives';
import {theme} from '../config/theme';
import {range} from '../lib/motion';

export const S03_Transport = () => <SceneFrame id="S03" title="Transport & port">
  {/* “Data melewati beberapa lapisan. Protokol IP ... berdasarkan alamat IP.” */}
  <Beat scene="S03" id="layers">{({frame, p}) => <>
    <div style={{position: 'absolute', left: 0, top: 45}}><LayerStack active="ip" frame={frame}/></div>
    <Line x1={740} y1={230} x2={1510} y2={230}/>
    <div style={{position: 'absolute', left: 560, top: 135}}><Host label="Host A" sublabel="192.168.1.10"/></div>
    <div style={{position: 'absolute', left: 1400, top: 135}}><Host label="Host B" sublabel="10.0.0.5" server/></div>
    <div style={{position: 'absolute', left: 1015, top: 175, background: theme.background, padding: 12}}><Icon name="router" size={100}/></div>
    <PacketFlight start={{x: 800, y: 230}} end={{x: 1430, y: 230}} progress={range(p, 0.2, 0.8)} label="Paket" bend={-100}/>
    <div style={{position: 'absolute', left: 850, top: 450}}><Tag>IP → ke komputer</Tag></div>
  </>}</Beat>
  {/* “Di dalam satu komputer ada banyak program ...” */}
  <Beat scene="S03" id="applications">{({frame, p}) => <div style={{transform: `scale(${0.96 + range(p, 0, 0.4) * 0.04})`, padding: '10px 140px'}}>
    <Label style={{marginBottom: 35}}>Host B · 10.0.0.5</Label>
    <PortDoors frame={frame}/>
    <div style={{borderBottom: `2px solid ${theme.muted}`, borderLeft: `2px solid ${theme.muted}`, borderRight: `2px solid ${theme.muted}`, height: 50, marginTop: 30}}/>
    <Label style={{textAlign: 'center', marginTop: 20}}>Satu komputer · banyak aplikasi</Label>
  </div>}</Beat>
  {/* “Dengan bantuan nomor port ... ke proses atau aplikasi yang tepat.” */}
  <Beat scene="S03" id="routing">{({frame, p}) => <>
    <div style={{position: 'absolute', left: 0, top: 20, width: 490}}>
      <Label>Host B · 10.0.0.5</Label>
      <div style={{marginTop: 40}}><Tag>IP → ke komputer</Tag></div>
      <div style={{marginTop: 24}}><Tag color={p > 0.55 ? theme.success : theme.text}>Port → ke aplikasi</Tag></div>
    </div>
    <div style={{position: 'absolute', left: 600, right: 0, top: 5}}><PortDoors frame={frame} active={p > 0.55}/></div>
    <Line x1={1150} y1={480} x2={1150} y2={370}/><Line x1={1150} y1={370} x2={780} y2={370}/><Line x1={780} y1={370} x2={780} y2={285}/>
    <PacketFlight start={{x: 480, y: 480}} end={{x: 1150, y: 480}} progress={(p - 0.04) / 0.24} label="IP 10.0.0.5 · Port 80"/>
    <PacketFlight start={{x: 1150, y: 480}} end={{x: 1150, y: 370}} progress={(p - 0.28) / 0.08} label="Port 80"/>
    <PacketFlight start={{x: 1150, y: 370}} end={{x: 780, y: 370}} progress={(p - 0.36) / 0.12} label="Port 80"/>
    <PacketFlight start={{x: 780, y: 370}} end={{x: 780, y: 285}} progress={(p - 0.48) / 0.08} label="Port 80"/>
    <div style={{position: 'absolute', left: 860, top: 530}}><Tag>Lapisan Transport</Tag></div>
    {p > 0.58 && <Icon name="check" size={64} color={theme.success} style={{position: 'absolute', left: 740, top: 312}}/>}
  </>}</Beat>
  {/* “UDP yang sederhana dan cepat, serta TCP yang andal dan terstruktur.” */}
  <Beat scene="S03" id="choices">{({frame}) => <>
    <Label style={{textAlign: 'center', marginBottom: 28}}>Lapisan Transport</Label>
    <div style={{padding: '20px 150px'}}><PortDoors mode="protocols" frame={frame}/></div>
  </>}</Beat>
</SceneFrame>;
