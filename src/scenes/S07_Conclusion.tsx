import {Beat} from '../components/Beat';
import {SceneFrame} from '../components/SceneFrame';
import {NetworkGraph} from '../components/NetworkGraph';
import {Label, ProtocolBadge, Reveal} from '../components/Primitives';
import {theme} from '../config/theme';
import {range} from '../lib/motion';

export const S07_Conclusion = () => <SceneFrame id="S07" title="Sesuai kebutuhan aplikasi">
  {/* “komponen-komponen yang tersebar ... bertukar pesan lewat jaringan ...” */}
  <Beat scene="S07" id="distributed">{({frame}) => <NetworkGraph frame={frame} distributed/>}</Beat>
  {/* “Tidak ada yang selalu lebih baik. Semua tergantung kebutuhan aplikasi.” */}
  <Beat scene="S07" id="balance">{({p}) => {
    const tilt = Math.sin(p * Math.PI * 4) * 7 * (1 - range(p, 0.4, 0.72));
    return <>
      <svg width="1728" height="590" style={{position: 'absolute'}}>
        <path d="M864 205v295M715 505h298M864 450l-75 55m75-55 75 55" fill="none" stroke={theme.muted} strokeWidth="5"/>
        <circle cx="864" cy="205" r="14" fill={theme.text}/>
      </svg>
      <div style={{position: 'absolute', inset: 0, transform: `rotate(${tilt}deg)`, transformOrigin: '864px 205px'}}>
        <svg width="1728" height="590" style={{position: 'absolute'}}>
          <path d="M390 205h948M430 205v140m868-140v140M280 350h300m568 0h300" fill="none" stroke={theme.muted} strokeWidth="4"/>
        </svg>
        <div style={{position: 'absolute', left: 300, top: 65}}><ProtocolBadge protocol="TCP"/></div>
        <div style={{position: 'absolute', left: 1165, top: 65}}><ProtocolBadge protocol="UDP"/></div>
      </div>
      <Label style={{position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center'}}>Kebutuhan aplikasi</Label>
    </>;
  }}</Beat>
  {/* “Jika butuh keandalan, pilih TCP. Jika butuh kecepatan ... toleransi ... pilih UDP.” */}
  <Beat scene="S07" id="decision">{({frame, p, duration}) => <>
    <Reveal frame={frame} style={{position: 'absolute', left: 90, right: 90, top: 20, display: 'flex', alignItems: 'center', gap: 64}}>
      <div style={{width: 980, background: theme.surface, padding: '40px 48px', border: `1px solid ${theme.line}`, fontSize: 52, fontWeight: 600}}>Butuh keandalan?</div>
      <svg width="100" height="40"><path d="M0 20h88L70 4m18 16L70 36" stroke={theme.tcp} strokeWidth="4" fill="none"/></svg>
      <ProtocolBadge protocol="TCP"/>
    </Reveal>
    <Reveal frame={frame} delay={duration * 0.4} style={{position: 'absolute', left: 90, right: 90, top: 290, display: 'flex', alignItems: 'center', gap: 64,
      opacity: range(p, 0.4, 0.48)}}>
      <div style={{width: 980, background: theme.surface, padding: '34px 48px', border: `1px solid ${theme.line}`, fontSize: 48, fontWeight: 600, lineHeight: 1.3}}>
        Butuh kecepatan dan<br/>toleran kehilangan data?
      </div>
      <svg width="100" height="40"><path d="M0 20h88L70 4m18 16L70 36" stroke={theme.udp} strokeWidth="4" fill="none"/></svg>
      <ProtocolBadge protocol="UDP"/>
    </Reveal>
  </>}</Beat>
</SceneFrame>;
