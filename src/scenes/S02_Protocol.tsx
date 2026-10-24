import {SceneFrame} from '../components/SceneFrame';
import {Beat} from '../components/Beat';
import {Avatar} from '../components/Avatar';
import {Host} from '../components/Host';
import {Icon} from '../components/Icons';
import {NetworkGraph} from '../components/NetworkGraph';
import {Label, Line, ProtocolBadge, Reveal, Tag, Uses} from '../components/Primitives';
import {theme} from '../config/theme';
import {range} from '../lib/motion';

const applications = [
  {icon: 'browser' as const, label: 'Web', detail: 'HTTP'},
  {icon: 'email' as const, label: 'Email', detail: 'SMTP'},
  {icon: 'file' as const, label: 'Berkas', detail: 'FTP'},
];

export const S02_Protocol = () => <SceneFrame id="S02" title="Pengertian protokol">
  {/* “Apa itu protokol? ... aturan dan kesepakatan ...” */}
  <Beat scene="S02" id="definition">{({frame, p}) => <div style={{textAlign: 'center', paddingTop: 80}}>
    <div style={{fontSize: 96, fontWeight: 600, letterSpacing: '-3px', transform: `translateY(${-range(p, 0.12, 0.4) * 50}px)`}}>Apa itu protokol?</div>
    <Reveal frame={frame} delay={35}><div style={{display: 'inline-block', padding: '34px 50px', background: theme.surface,
      border: `1px solid ${theme.line}`, borderRadius: 10, fontSize: 40, marginTop: 30}}>
      <strong>Protokol</strong><span style={{color: theme.muted}}> = aturan dan kesepakatan komunikasi</span>
    </div></Reveal>
  </div>}</Beat>
  {/* “format pesan, urutan pengiriman, dan tindakan ...” */}
  <Beat scene="S02" id="rules">{({frame, p}) => <div style={{display: 'flex', gap: 32, paddingTop: 85}}>
    {(['Format pesan', 'Urutan pengiriman', 'Tindakan saat kirim/terima'] as const).map((rule, i) => {
      const active = Math.min(2, Math.floor(p * 3)) === i;
      return <Reveal key={rule} frame={frame} delay={i * 8} style={{flex: 1, opacity: active ? 1 : 0.38}}>
        <div style={{height: 340, padding: '40px 30px', background: theme.surface, borderTop: `3px solid ${active ? theme.text : theme.line}`}}>
          {i === 1 ? <div style={{fontSize: 64, height: 90, letterSpacing: 10}}>1–2–3</div> : <Icon name={i === 0 ? 'email' : 'arrows'} size={90}/>}
          <div style={{fontSize: 40, fontWeight: 600, marginTop: 46, lineHeight: 1.25}}>{rule}</div>
        </div>
      </Reveal>;
    })}
  </div>}</Beat>
  {/* “Bayangkan dua orang ... bahasa yang sama, bergantian bicara ...” */}
  <Beat scene="S02" id="conversation">{({p}) => <>
    <div style={{position: 'absolute', top: 150, left: 240}}><Avatar/></div>
    <div style={{position: 'absolute', top: 150, right: 240}}><Avatar mirrored/></div>
    <Line x1={550} y1={320} x2={1180} y2={320} dashed/>
    <div style={{position: 'absolute', left: p < 0.45 ? 450 : 870, top: 50, padding: '26px 38px',
      border: `2px solid ${theme.muted}`, borderRadius: '22px 22px 22px 0', background: theme.surface, fontSize: 44}}>
      {p < 0.25 ? 'Halo' : p > 0.76 ? 'Sampai jumpa' : 'Aa'}
    </div>
    <div style={{position: 'absolute', left: 590, right: 590, top: 400, display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center'}}>
      <Tag>Aa</Tag><span style={{fontSize: 40}}>=</span><Tag>Aa</Tag>
    </div>
    <Label style={{position: 'absolute', top: 505, left: 0, right: 0, textAlign: 'center'}}>Bahasa sama · bergantian bicara</Label>
  </>}</Beat>
  {/* “Komputer pun sama. Tanpa protokol ... tidak akan saling mengerti.” */}
  <Beat scene="S02" id="compatibility">{({p}) => {
    const compatible = p > 0.53;
    return <>
      {[260, 1240].map((x, i) => <div key={x} style={{position: 'absolute', left: x, top: 170}}>
        <div style={{opacity: 1 - range(p, 0, 0.16), position: 'absolute'}}><Avatar mirrored={i === 1}/></div>
        <div style={{opacity: range(p, 0, 0.16)}}><Host label={i ? 'Komputer B' : 'Komputer A'} size={200}/></div>
      </div>)}
      <Line x1={520} y1={260} x2={1200} y2={260} dashed/>
      <div style={{position: 'absolute', left: 665, top: 220, width: 80, height: 80, border: `3px solid ${theme.muted}`,
        borderRadius: compatible ? 10 : 50, background: theme.surface}}/>
      <div style={{position: 'absolute', left: 975, top: 220, width: 80, height: 80, border: `3px solid ${theme.muted}`, borderRadius: 10, background: theme.surface}}/>
      <Icon name={compatible ? 'check' : 'cross'} color={compatible ? theme.success : theme.failure} size={90} style={{position: 'absolute', left: 820, top: 215}}/>
      <div style={{position: 'absolute', top: 420, left: 0, right: 0, textAlign: 'center'}}><Tag color={compatible ? theme.success : theme.failure}>
        {compatible ? 'Dengan protokol' : 'Tanpa protokol'}
      </Tag></div>
    </>;
  }}</Beat>
  {/* “Dalam sistem terdistribusi ... fondasi komunikasinya.” */}
  <Beat scene="S02" id="distributed">{({frame, p}) => <>
    <div style={{position: 'absolute', inset: 0, transform: `scale(${1.05 - p * 0.05})`}}><NetworkGraph frame={frame}/></div>
    <div style={{position: 'absolute', left: 90, right: 90, bottom: 0, borderTop: `3px solid ${theme.muted}`, textAlign: 'center', paddingTop: 14, fontSize: 36}}>Protokol</div>
  </>}</Beat>
  {/* “HTTP untuk web, SMTP untuk email, dan FTP untuk transfer berkas.” */}
  <Beat scene="S02" id="applications">{({frame}) => <div style={{paddingTop: 100}}><Uses items={applications} frame={frame} color={theme.muted}/></div>}</Beat>
  {/* “... mengandalkan protokol lapisan transport ... TCP dan UDP.” */}
  <Beat scene="S02" id="transport">{({frame}) => <>
    <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 12}}>{applications.map((app) => <div key={app.label} style={{display: 'flex', alignItems: 'center', gap: 24}}>
      <Icon name={app.icon} size={64}/><Label>{app.detail}</Label>
    </div>)}</div>
    <Line x1={864} y1={100} x2={864} y2={215}/>
    <Reveal frame={frame} delay={8} style={{position: 'absolute', left: 140, right: 140, top: 215, padding: '32px 50px', border: `2px solid ${theme.line}`, background: theme.surface}}>
      <Label style={{textAlign: 'center', marginBottom: 30}}>Lapisan Transport</Label>
      <div style={{display: 'flex', justifyContent: 'center', gap: 70}}><ProtocolBadge protocol="TCP"/><ProtocolBadge protocol="UDP"/></div>
    </Reveal>
  </>}</Beat>
</SceneFrame>;
