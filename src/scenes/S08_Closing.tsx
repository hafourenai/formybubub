import {useCurrentFrame} from 'remotion';
import {Beat} from '../components/Beat';
import {SceneFrame} from '../components/SceneFrame';
import {Label, ProtocolBadge, Reveal} from '../components/Primitives';
import {meta, references} from '../config/meta';
import {getBeat} from '../config/scenes';
import {theme} from '../config/theme';
import {arrive, range} from '../lib/motion';

export const S08_Closing = () => {
  const frame = useCurrentFrame();
  const referenceStart = getBeat('S08', 'references').from;
  const titleOpacity = frame < referenceStart ? 1 - range(frame, referenceStart - 8, referenceStart - 1) : range(frame, referenceStart, referenceStart + 8);
  return <SceneFrame id="S08" title={<span style={{opacity: titleOpacity}}>{frame < referenceStart ? 'Terima kasih' : 'Referensi'}</span>}>
    {/* “Itulah perbedaan TCP dan UDP ... Terima kasih sudah menyimak.” */}
    <Beat scene="S08" id="thanks">{({frame: localFrame}) => <>
      <div style={{display: 'flex', justifyContent: 'center', gap: 30, marginTop: 120}}>
        <div style={{transform: `translateX(${(1 - arrive(localFrame)) * -250}px)`}}><ProtocolBadge protocol="TCP" large/></div>
        <div style={{transform: `translateX(${(1 - arrive(localFrame, 8)) * 250}px)`}}><ProtocolBadge protocol="UDP" large/></div>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', gap: 180, marginTop: 30}}>
        <Label color={theme.tcp}>Keandalan</Label><Label color={theme.udp}>Kecepatan</Label>
      </div>
    </>}</Beat>
    {/* Hening, referensi dan identitas mata kuliah sesuai PRD S08. */}
    <Beat scene="S08" id="references">{({frame: localFrame}) => <>
      {references.map((reference, i) => <Reveal key={reference.title} frame={localFrame} delay={i * 8}
        style={{padding: '24px 0 30px', marginBottom: 18, borderBottom: `1px solid ${theme.line}`}}>
        <Label>{reference.authors}</Label>
        <div style={{fontSize: 40, fontWeight: 600, margin: '12px 0', letterSpacing: '-0.5px'}}>{reference.title}</div>
        <Label>{reference.publication}</Label>
      </Reveal>)}
      <Label style={{marginTop: 30}}>{meta.course} · {meta.program} · {meta.meeting}</Label>
    </>}</Beat>
  </SceneFrame>;
};
