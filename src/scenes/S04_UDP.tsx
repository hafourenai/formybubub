import {SceneFrame} from '../components/SceneFrame';
import {Beat} from '../components/Beat';
import {Host} from '../components/Host';
import {Icon} from '../components/Icons';
import {Avatar} from '../components/Avatar';
import {HeaderBar} from '../components/HeaderBar';
import {PacketFlight} from '../components/PacketFlight';
import {UdpSimulation} from '../components/TransportSimulation';
import {Label, Line, Reveal, Tag, Uses} from '../components/Primitives';
import {theme} from '../config/theme';
import {ease, mix, range} from '../lib/motion';

export const S04_UDP = () => <SceneFrame id="S04" title={<span style={{color: theme.udp}}>UDP</span>} color={theme.udp}>
  {/* “UDP, singkatan dari User Datagram Protocol ... connectionless.” */}
  <Beat scene="S04" id="intro">{({frame}) => <>
    <Reveal frame={frame} style={{marginTop: 65}}><div style={{fontSize: 76, fontWeight: 600, letterSpacing: '-2px'}}>User Datagram Protocol</div></Reveal>
    <Reveal frame={frame} delay={8} pop style={{marginTop: 36}}><Tag color={theme.udp}>Connectionless</Tag></Reveal>
    <Icon name="plane" size={220} color={theme.udp} style={{position: 'absolute', right: 50, top: 275}}/>
    <Line x1={0} y1={460} x2={1300} y2={460} dashed color={`${theme.udp}70`}/>
  </>}</Beat>
  {/* “tidak ada koneksi ... langsung mengirim ... datagram.” */}
  <Beat scene="S04" id="direct">{({p}) => <>
    <div style={{position: 'absolute', left: 0, top: 195}}><Host label="Host A" color={theme.udp}/></div>
    <div style={{position: 'absolute', right: 0, top: 195}}><Host label="Host B" color={theme.udp} server/></div>
    <Line x1={285} y1={270} x2={1440} y2={270} dashed color={`${theme.udp}80`}/>
    <div style={{position: 'absolute', left: 670, top: 20, display: 'flex', alignItems: 'center', gap: 24}}>
      <div style={{position: 'relative'}}><Icon name="handshake" size={90} color={theme.muted}/><Icon name="cross" size={90} color={theme.failure} style={{position: 'absolute', left: 0, top: 0}}/></div>
      <Label>Tanpa handshake</Label>
    </div>
    {[0.03, 0.25, 0.47, 0.69].map((start) => <PacketFlight key={start} start={{x: 360, y: 270}} end={{x: 1360, y: 270}}
      progress={(p - start) / 0.24} color={theme.udp} label="Datagram" ports/>)}
    <div style={{position: 'absolute', top: 470, left: 0, right: 0, textAlign: 'center'}}><Tag color={theme.udp}>Datagram independen</Tag></div>
  </>}</Beat>
  {/* “Analogi mudahnya adalah mengirim kartu pos ... lalu pergi ... tidak ada konfirmasi.” */}
  <Beat scene="S04" id="postcard">{({p}) => {
    const post = ease(range(p, 0.26, 0.48));
    return <>
      <div style={{position: 'absolute', left: 65 - range(p, 0.52, 0.7) * 80, top: 260, opacity: 1 - range(p, 0.52, 0.72)}}><Avatar/></div>
      <Line x1={900} y1={300} x2={1430} y2={300} dashed/>
      <div style={{position: 'absolute', left: 745, top: 190}}><Icon name="mailbox" size={210} color={theme.udp}/></div>
      <div style={{position: 'absolute', left: 1395, top: 195}}><Icon name="home" size={205}/></div>
      <div style={{position: 'absolute', left: mix(270, 800, post), top: mix(95, 270, post), transform: `rotate(${mix(-7, 0, post)}deg) scale(${1 - post * 0.7})`,
        opacity: 1 - range(p, 0.45, 0.50)}}>
        <svg width="330" height="220" viewBox="0 0 330 220" fill="none">
          <rect x="3" y="3" width="324" height="214" rx="8" fill={theme.surface} stroke={theme.udp} strokeWidth="3"/>
          <path d="M168 28v164M258 25h40v44h-40z" stroke={theme.udp} strokeWidth="2"/>
          {[105, 135, 165].map((y, i) => <line key={y} x1="190" y1={y} x2={190 + range(p, i * 0.06, i * 0.06 + 0.07) * 102} y2={y} stroke={theme.muted} strokeWidth="3"/>)}
          <text x="32" y="110" fill={theme.udp} fontSize="32">Alamat</text>
        </svg>
        {/* Tangan dan pena digambar lokal; gerak mengikuti penulisan alamat. */}
        {p < 0.27 && <svg width="110" height="150" viewBox="0 0 110 150" style={{position: 'absolute', left: 225 + Math.sin(p * 90) * 22, top: 100 + p * 180}}>
          <path d="M33 145 9 89q-5-12 5-15l18 14-6-56q0-13 10-10l17 43q31-16 42 13l8 57" fill={theme.surface} stroke={theme.muted} strokeWidth="3"/>
          <path d="m39 71 25-65 8 3-24 66" fill={theme.udp}/>
        </svg>}
      </div>
      <PacketFlight start={{x: 950, y: 300}} end={{x: 1390, y: 300}} progress={(p - 0.54) / 0.23} color={theme.udp} dot/>
      <div style={{position: 'absolute', left: 1470, top: 80, fontSize: 76, color: theme.muted, opacity: range(p, 0.64, 0.72)}}>?</div>
      <Label style={{position: 'absolute', left: 730, top: 440}} color={theme.udp}>Kotak pos</Label>
      <Label style={{position: 'absolute', left: 1420, top: 440}}>Tujuan</Label>
      <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center', opacity: range(p, 0.70, 0.77)}}><Tag>Tanpa konfirmasi</Tag></div>
    </>;
  }}</Beat>
  {/* “Paket bisa hilang atau tiba dengan urutan berbeda ... tidak ... pengiriman ulang.” */}
  <Beat scene="S04" id="datagrams">{({p}) => <UdpSimulation p={p}/>}</Beat>
  {/* “header UDP ... hanya delapan byte ... beban yang rendah.” */}
  <Beat scene="S04" id="header">{({frame}) => <>
    <div style={{padding: '55px 100px'}}><HeaderBar protocol="UDP" frame={frame}/></div>
    <Reveal frame={frame} delay={32} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18, marginTop: 22}}>
      <Icon name="bolt" size={54} color={theme.udp}/><Label color={theme.udp}>Cepat · beban rendah</Label>
    </Reveal>
  </>}</Beat>
  {/* “DNS, panggilan suara dan video, siaran langsung, serta game online.” */}
  <Beat scene="S04" id="uses">{({frame}) => <div style={{paddingTop: 95}}><Uses color={theme.udp} frame={frame} items={[
    {icon: 'search', label: 'DNS'}, {icon: 'video', label: 'Suara & video'},
    {icon: 'broadcast', label: 'Siaran langsung'}, {icon: 'game', label: 'Game online'},
  ]}/></div>}</Beat>
</SceneFrame>;
