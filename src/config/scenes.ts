export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const FADE_FRAMES = 10;

// Satu-satunya sumber durasi. Ubah durationSeconds setelah merekam voice over.
// seconds pada beat adalah bobot storyboard; seluruh beat ikut diskalakan.
export const sceneDefinitions = [
  {id: 'S01', title: 'Pembuka', durationSeconds: 20, beats: [
    {id: 'title', seconds: 3}, {id: 'network', seconds: 7},
    {id: 'question', seconds: 4}, {id: 'protocols', seconds: 6},
  ]},
  {id: 'S02', title: 'Pengertian Protokol', durationSeconds: 48, beats: [
    {id: 'definition', seconds: 6}, {id: 'rules', seconds: 9},
    {id: 'conversation', seconds: 10}, {id: 'compatibility', seconds: 6},
    {id: 'distributed', seconds: 7}, {id: 'applications', seconds: 6},
    {id: 'transport', seconds: 4},
  ]},
  {id: 'S03', title: 'Lapisan Transport dan Port', durationSeconds: 30, beats: [
    {id: 'layers', seconds: 7}, {id: 'applications', seconds: 7},
    {id: 'routing', seconds: 10}, {id: 'choices', seconds: 6},
  ]},
  {id: 'S04', title: 'UDP · Connectionless', durationSeconds: 55, beats: [
    {id: 'intro', seconds: 6}, {id: 'direct', seconds: 8},
    {id: 'postcard', seconds: 12}, {id: 'datagrams', seconds: 14},
    {id: 'header', seconds: 7}, {id: 'uses', seconds: 8},
  ]},
  {id: 'S05', title: 'TCP · Connection-oriented', durationSeconds: 75, beats: [
    {id: 'intro', seconds: 6}, {id: 'connection', seconds: 4},
    {id: 'telephone', seconds: 7}, {id: 'handshake', seconds: 15},
    {id: 'reliability', seconds: 14}, {id: 'control', seconds: 10},
    {id: 'close', seconds: 6}, {id: 'overhead', seconds: 13},
  ]},
  {id: 'S06', title: 'Perbandingan', durationSeconds: 30, beats: [
    {id: 'table', seconds: 30},
  ]},
  {id: 'S07', title: 'Kesimpulan', durationSeconds: 22, beats: [
    {id: 'distributed', seconds: 8}, {id: 'balance', seconds: 6},
    {id: 'decision', seconds: 8},
  ]},
  {id: 'S08', title: 'Penutup', durationSeconds: 12, beats: [
    {id: 'thanks', seconds: 6}, {id: 'references', seconds: 6},
  ]},
] as const;

export type SceneId = typeof sceneDefinitions[number]['id'];
export type SceneDefinition = typeof sceneDefinitions[number];

export const scenes = sceneDefinitions.map((scene, index) => {
  if (!Number.isFinite(scene.durationSeconds) || scene.durationSeconds * FPS < FADE_FRAMES * 2 + 1) {
    throw new Error(`Durasi ${scene.id} harus lebih panjang dari dua fade.`);
  }
  const durationInFrames = Math.round(scene.durationSeconds * FPS);
  const from = sceneDefinitions.slice(0, index).reduce(
    (total, item) => total + Math.round(item.durationSeconds * FPS), 0,
  );
  const weight = scene.beats.reduce((total, beat) => total + beat.seconds, 0);
  let elapsed = 0;
  const beats = scene.beats.map((beat) => {
    const start = Math.round(elapsed / weight * durationInFrames);
    elapsed += beat.seconds;
    const end = Math.round(elapsed / weight * durationInFrames);
    return {...beat, from: start, durationInFrames: end - start};
  });
  return {...scene, index, from, durationInFrames, beats};
});

export const TOTAL_FRAMES = scenes.reduce((total, scene) => total + scene.durationInFrames, 0);

export const getScene = (id: SceneId) => {
  const scene = scenes.find((item) => item.id === id);
  if (!scene) throw new Error(`Scene tidak ditemukan: ${id}`);
  return scene;
};

export const getBeat = (sceneId: SceneId, beatId: string) => {
  const beat = getScene(sceneId).beats.find((item) => item.id === beatId);
  if (!beat) throw new Error(`Beat tidak ditemukan: ${sceneId}/${beatId}`);
  return beat;
};
