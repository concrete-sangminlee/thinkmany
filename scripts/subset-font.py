#!/usr/bin/env python3
"""
Builds the reader's font: assets/fonts/thinkmany-sans.woff2.

The book uses about 1,550 different characters; Pretendard Variable ships
more than 14,000. This cuts the font down to the characters the site really
shows (scripts/lib/font-chars.mjs decides which) and to the weights the
design uses (400 to 800), so a reader downloads one file of under 200 KB
instead of two dozen subset files from a CDN.

Run it when the build says the font lacks characters (after new text):

    pip install fonttools brotli
    npm run fonts

Nothing here runs in the normal build or in CI. Until the font is rebuilt,
the build fills the gap by loading Pretendard from the CDN as a fallback.

License. Pretendard is under the SIL Open Font License 1.1 with the Reserved
Font Name "Pretendard". A subset is a modified version, so it carries its own
name (Thinkmany Sans) and ships with the license text (assets/fonts/OFL.txt).
"""
import hashlib
import io
import json
import os
import subprocess
import sys
import tempfile
import urllib.request

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(ROOT, 'assets', 'fonts')
OUT_FONT = os.path.join(OUT_DIR, 'thinkmany-sans.woff2')
OUT_META = os.path.join(OUT_DIR, 'thinkmany-sans.json')

SOURCE_NAME = 'Pretendard Variable 1.3.9'
SOURCE_URL = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard/dist/public/variable/PretendardVariable.ttf'
SOURCE_SHA256 = '3090ccde0442bb347aa7685d9ba8b17436a60682df6e8f92a9a670de14056e22'

FAMILY = 'Thinkmany Sans'
WEIGHTS = (400, 800)  # css/styles.css uses 400, 500, 600, 650, 700 and 800
# OpenType features to keep beyond fontTools' defaults (kerning, marks, ligatures, ...):
# ss06 is switched on for the whole page, tnum by "font-variant-numeric: tabular-nums".
FEATURES = ['ss06', 'tnum', 'case']


def source_font(path_arg):
    """The pinned source font: a local path if given, otherwise downloaded and checked."""
    if path_arg:
        path = path_arg
    else:
        path = os.path.join(tempfile.gettempdir(), 'PretendardVariable-1.3.9.ttf')
        if not os.path.exists(path):
            print(f'{SOURCE_NAME} 내려받는 중...')
            urllib.request.urlretrieve(SOURCE_URL, path)
    with open(path, 'rb') as f:
        digest = hashlib.sha256(f.read()).hexdigest()
    if digest != SOURCE_SHA256:
        sys.exit(f'원본 글꼴이 예상과 다릅니다 ({path}): sha256 {digest}')
    return path


def needed_chars():
    out = subprocess.run(['node', os.path.join(ROOT, 'scripts', 'lib', 'font-chars.mjs')], check=True, capture_output=True, text=True, encoding='utf-8')
    return json.loads(out.stdout)


def rename(font):
    """Give the modified font its own name; keep the copyright, credit and license records."""
    style = 'Regular'
    compact = FAMILY.replace(' ', '')
    names = {
        1: FAMILY,
        2: style,
        3: f'{compact};subset',
        4: FAMILY,
        6: f'{compact}-{style}',
        16: FAMILY,
        17: style,
        25: compact,
    }
    table = font['name']
    # Where it came from goes in the description (10), next to the original credits.
    table.setName(f'A subset of {SOURCE_NAME} (https://github.com/orioncactus/pretendard) with only the characters of one book.', 10, 3, 1, 0x409)
    for record in list(table.names):
        if record.nameID in names:
            text = names[record.nameID]
        elif record.nameID >= 256:  # names of the weight instances
            text = record.toUnicode().replace('PretendardVariable', compact).replace('Pretendard Variable', FAMILY)
        else:
            continue
        table.setName(text, record.nameID, record.platformID, record.platEncID, record.langID)


def main():
    chars = needed_chars()
    font = TTFont(source_font(sys.argv[1] if len(sys.argv) > 1 else None), recalcTimestamp=False)

    cmap = font.getBestCmap()
    covered = ''.join(ch for ch in chars if ord(ch) in cmap)
    unavailable = ''.join(ch for ch in chars if ord(ch) not in cmap)

    # Narrow the weight axis, then reload from bytes: the subsetter needs the
    # instanced tables in their compiled form.
    narrowed = io.BytesIO()
    instancer.instantiateVariableFont(font, {'wght': WEIGHTS}).save(narrowed)
    narrowed.seek(0)
    font = TTFont(narrowed, recalcTimestamp=False)

    options = subset.Options()
    options.layout_features = options.layout_features + FEATURES
    options.name_IDs = ['*']  # keep copyright (0) and license (13, 14)
    options.name_languages = [0x409]
    options.hinting = False
    options.notdef_outline = True
    options.recalc_timestamp = False
    subsetter = subset.Subsetter(options)
    subsetter.populate(text=covered)
    subsetter.subset(font)

    rename(font)
    os.makedirs(OUT_DIR, exist_ok=True)
    font.flavor = 'woff2'
    font.save(OUT_FONT)

    meta = {
        'family': FAMILY,
        'source': SOURCE_NAME,
        'license': 'SIL Open Font License 1.1 (OFL.txt)',
        'weights': list(WEIGHTS),
        'chars': covered,
        'unavailable': unavailable,
    }
    with open(OUT_META, 'w', encoding='utf-8') as f:
        json.dump(meta, f, ensure_ascii=False, indent=1)
        f.write('\n')

    size = os.path.getsize(OUT_FONT)
    print(f'{os.path.relpath(OUT_FONT, ROOT)}: {len(covered)}자, {size / 1024:.0f} KB')
    if unavailable:
        print(f'원본 글꼴에 없는 글자 {len(unavailable)}개 (시스템 글꼴로 표시됨): {" ".join(unavailable)}')


if __name__ == '__main__':
    main()
