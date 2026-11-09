/**
 * Packs reading history into a short URL-safe string and back.
 * "z" + base64url(deflate-raw(JSON)) where CompressionStream exists, else
 * "j" + base64url(JSON). Works in browsers and in Node (tests).
 */
const toB64url = (bytes) => {
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromB64url = (s) => {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

async function pipe(bytes, stream) {
  return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());
}

export async function pack(data) {
  const json = new TextEncoder().encode(JSON.stringify(data));
  if (typeof CompressionStream === 'function') return `z${toB64url(await pipe(json, new CompressionStream('deflate-raw')))}`;
  return `j${toB64url(json)}`;
}

export async function unpack(text) {
  const kind = text[0];
  const bytes = fromB64url(text.slice(1));
  if (kind === 'z') return JSON.parse(new TextDecoder().decode(await pipe(bytes, new DecompressionStream('deflate-raw'))));
  if (kind === 'j') return JSON.parse(new TextDecoder().decode(bytes));
  throw new Error('알 수 없는 형식');
}
