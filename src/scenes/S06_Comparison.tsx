import {Beat} from '../components/Beat';
import {ComparisonTable} from '../components/ComparisonTable';
import {SceneFrame} from '../components/SceneFrame';

export const S06_Comparison = () => <SceneFrame id="S06" title="Perbandingan">
  {/* Seluruh paragraf S06; setiap baris sesuai urutan kalimat naskah. */}
  <Beat scene="S06" id="table">{({p}) => <ComparisonTable p={p}/>}</Beat>
</SceneFrame>;
