// Setup saja, tidak diimpor bundel video. Font disimpan agar preview/render offline.
import {mkdir, writeFile, access} from 'node:fs/promises';
import {getInfo as inter} from '@remotion/google-fonts/Inter';
import {getInfo as mono} from '@remotion/google-fonts/JetBrainsMono';

await mkdir(new URL('../public/fonts/', import.meta.url), {recursive: true});
for (const [name, info, weights] of [
  ['Inter', inter(), ['400', '600', '700']],
  ['JetBrainsMono', mono(), ['400', '600']],
]) {
  for (const weight of weights) {
    const destination = new URL(`../public/fonts/${name}-${weight}-latin.woff2`, import.meta.url);
    try {await access(destination); continue;} catch { /* Unduh hanya bila belum tersedia. */ }
    const response = await fetch(info.fonts.normal[weight].latin);
    if (!response.ok) throw new Error(`Gagal menyiapkan ${name}: ${response.status}`);
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
    console.log(`Font lokal: ${name} ${weight}`);
  }
  const licenseFile = new URL(`../public/fonts/${name}-OFL.txt`, import.meta.url);
  try {await access(licenseFile);} catch {
    const response = await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${name.toLowerCase()}/OFL.txt`);
    if (!response.ok) throw new Error(`Gagal mengambil lisensi ${name}`);
    await writeFile(licenseFile, await response.text());
  }
}
