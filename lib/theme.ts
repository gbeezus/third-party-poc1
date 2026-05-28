import { promises as fs } from 'node:fs';
import path from 'node:path';

const THEME_PATH = path.join(process.cwd(), '.data', 'current-theme.json');

type DtcgToken = { $value: string | number; $type?: string };
type DtcgNode = DtcgToken | { [key: string]: DtcgNode };

function isToken(node: unknown): node is DtcgToken {
  return (
    typeof node === 'object' &&
    node !== null &&
    '$value' in (node as Record<string, unknown>)
  );
}

export function flattenDtcg(
  node: unknown,
  prefix: string[] = [],
): Array<[string, string]> {
  if (isToken(node)) {
    return [[prefix.join('-'), String(node.$value)]];
  }
  if (typeof node !== 'object' || node === null) return [];
  const out: Array<[string, string]> = [];
  for (const [key, value] of Object.entries(node as Record<string, DtcgNode>)) {
    if (key.startsWith('$')) continue;
    out.push(...flattenDtcg(value, [...prefix, key]));
  }
  return out;
}

export function themeToCss(bundle: unknown): string {
  const tokens = flattenDtcg(bundle);
  const lines = tokens.map(([name, value]) => `  --${name}: ${value};`).join('\n');
  return `:root {\n${lines}\n}`;
}

export async function loadCurrentTheme(): Promise<unknown | null> {
  try {
    const buf = await fs.readFile(THEME_PATH, 'utf8');
    return JSON.parse(buf);
  } catch {
    return null;
  }
}

export async function saveTheme(bundle: unknown): Promise<void> {
  const dir = path.dirname(THEME_PATH);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(THEME_PATH, JSON.stringify(bundle, null, 2));
}
