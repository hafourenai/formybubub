import {SceneFrame} from '../components/SceneFrame';
import {Beat} from '../components/Beat';
import {Icon} from '../components/Icons';
import {Host} from '../components/Host';
import {PacketFlight} from '../components/PacketFlight';
import {Label, Line, ProtocolBadge, Reveal, Tag} from '../components/Primitives';
import {theme} from '../config/theme';
import {meta} from '../config/meta';
import {arrive, range} from '../lib/motion';

const EverydayNetwork = ({frame, question = false}: {frame: number; question?: boolean}) => <>
  {(['browser', 'chat', 'video'] as const).map((icon, i) => <Reveal frame={frame} delay={i * 8} key={icon}
    style={{position: 'absolute', left: 80, top: 20 + i * 175, display: 'flex', alignItems: 'center', gap: 28}}>
    <Icon name={icon} size={88}/><Label>{['Web', 'Pesan', 'Video'][i]}</Label>
  </Reveal>)}
  {[70, 245, 420].map((y, i) => <Line key={y} x1={380} y1={y} x2={855} y2={245} color={theme.line}
    progress={arrive(frame, i * 8)}/>)}
  <Line x1={950} y1={245} x2={1420} y2={245}/>
  <div style={{position: 'absolute', left: 780, top: 165, padding: 12, background: theme.background}}><Icon name="globe" size={160}/></div>
  <div style={{position: 'absolute', left: 1410, top: 145}}><Host label="Tujuan" size={200}/></div>
  {!question && [0, 1, 2].map((i) => <PacketFlight key={i} dot start={{x: 380, y: 70 + i * 175}} end={{x: 855, y: 245}}
    progress={((Math.max(0, frame - 20) + i * 34) % 100) / 100}/>) }
  <PacketFlight start={{x: 960, y: 245}} end={{x: 1430, y: 245}}
    progress={question ? range(frame, 0, 30) : ((frame + 30) % 100) / 100} dot={!question} label={question ? 'Data' : undefined}/>
  {question && <div style={{position: 'absolute', left: 1480, top: 8, fontSize: 80, fontWeight: 600,
    transform: `scale(${1 + Math.sin(frame / 12) * 0.06})`, opacity: range(frame, 8, 20)}}>?</div>}
</>;

export const S01_Opening = () => <SceneFrame id="S01" title={<><span style={{color: theme.tcp}}>TCP</span> vs <span style={{color: theme.udp}}>UDP</span></>}>
  {/* PRD S01: judul; “Setiap kali kamu membuka situs web ...” */}
  <Beat scene="S01" id="title">{({frame}) => <>
    <Reveal frame={frame} delay={8} style={{marginTop: 45, maxWidth: 1180}}>
      <div style={{fontSize: 68, lineHeight: 1.23, fontWeight: 600, letterSpacing: '-2px'}}>Dua Protokol Transport<br/>dalam Sistem Terdistribusi</div>
    </Reveal>
    <div style={{display: 'flex', gap: 20, marginTop: 48}}><div style={{width: 160, height: 5, background: theme.tcp}}/><div style={{width: 160, height: 5, background: theme.udp}}/></div>
    {meta.presenter.trim() && <Label style={{marginTop: 42}}>{meta.presenter}</Label>}
    <Icon name="globe" color={theme.line} size={380} style={{position: 'absolute', right: 0, top: 40, opacity: 0.6}}/>
  </>}</Beat>
  <Beat scene="S01" id="network">{({frame}) => <EverydayNetwork frame={frame}/>}</Beat>
  {/* “Tapi, bagaimana data itu bisa sampai dengan benar?” */}
  <Beat scene="S01" id="question">{({frame}) => <EverydayNetwork frame={frame} question/>}</Beat>
  {/* “Jawabannya ada pada protokol ... TCP dan UDP.” */}
  <Beat scene="S01" id="protocols">{({frame, p}) => <div style={{position: 'absolute', inset: 0, display: 'flex',
    justifyContent: 'center', alignItems: 'center', gap: 90, transform: `scale(${1.04 - p * 0.04})`}}>
    <div style={{opacity: arrive(frame), transform: `translateX(${(1 - arrive(frame)) * -140}px)`}}><ProtocolBadge protocol="TCP" large/></div>
    <Reveal frame={frame} delay={8}><Tag style={{fontSize: 48, padding: '22px 34px'}}>Protokol</Tag></Reveal>
    <div style={{opacity: arrive(frame, 8), transform: `translateX(${(1 - arrive(frame, 8)) * 140}px)`}}><ProtocolBadge protocol="UDP" large/></div>
  </div>}</Beat>
</SceneFrame>;
