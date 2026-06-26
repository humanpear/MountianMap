import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const browseExe = resolve(process.env.USERPROFILE ?? '', '.codex/skills/gstack/browse/dist/browse.exe');
const serverScript = resolve(process.env.USERPROFILE ?? '', '.codex/skills/gstack/browse/dist/server-node.mjs');
const seqs = process.argv.slice(2);
const areas = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13'];

function runBrowse(args) {
  return execFileSync(browseExe, args, {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      BROWSE_SERVER_SCRIPT: serverScript
    },
    maxBuffer: 10 * 1024 * 1024
  });
}

for (const seq of seqs) {
  for (const area of areas) {
    const url = `https://www.foresttrip.go.kr/pot/cc/hm/selectHndfmsmtnMngmeDtl.do?fmmntArcd=${area}&fmmntSeq=${seq}&nowPage=1&preSrchArea=${area}&preSrchWrd=&srchArea=${area}&srchWrd=`;
    try {
      runBrowse(['goto', url]);
      const text = runBrowse(['text']);
      const title = text.match(/100대 명산\s+([^\n]+)/)?.[1]?.trim();
      const notFound = text.includes('요청하신 페이지를 찾을수 없습니다');
      if (title && !notFound) {
        console.log(`${seq}:${area}:${title}:${url}`);
        break;
      }
    } catch {
      // Keep probing other area codes.
    }
  }
}
