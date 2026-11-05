/**
 * Site URLs. Every page lives under one base path ("/thinkmany/" on GitHub
 * Pages, configurable at build time), and both the build and the browser set
 * it once before rendering anything.
 *
 *   home      /thinkmany/
 *   part      /thinkmany/#part-2
 *   chapter   /thinkmany/ch05/
 *   section   /thinkmany/ch05/#3-pass-읽기-방법
 */
let base = '/';

export function setBase(path) {
  base = path.endsWith('/') ? path : `${path}/`;
}

export const getBase = () => base;
export const homeHref = () => base;
export const partHref = (id) => `${base}#${id}`;
export const chapterHref = (id, anchor = '') => `${base}${id}/${anchor ? `#${anchor}` : ''}`;
export const assetHref = (path) => `${base}${path}`;
