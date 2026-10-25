import { getCollection } from 'astro:content';

// 작업기간에서 "가장 늦은 날짜"를 숫자로 (예: "2026.03 – 2026.05" → 202605)
// "현재 / 진행중 / ongoing / present"가 있으면 가장 최신으로 봐요.
// 작업기간이 비어 있으면 연도만 써요 (같은 연도에서는 작업기간 있는 작업물 뒤로).
export function periodKey(period: string, year: number): number {
  if (/현재|진행|ongoing|present|now/i.test(period)) return 999999;

  let latest = 0;
  let lastYear = 0;
  // 연도(4자리)와 그 뒤의 월, 또는 연도 없이 월만 있는 경우("2026.03 – 05", "3월 ~ 5월")
  for (const m of period.matchAll(/(\d{4})(?:\s*[.\-/년]\s*(\d{1,2}))?|(?:^|[^\d])(\d{1,2})\s*월?(?=[^\d]|$)/g)) {
    let y: number;
    let mo: number;
    if (m[1]) {
      y = Number(m[1]);
      mo = m[2] ? Number(m[2]) : 0;
      lastYear = y;
    } else {
      if (!lastYear) continue;
      y = lastYear;
      mo = Number(m[3]);
    }
    if (mo > 12) continue;
    latest = Math.max(latest, y * 100 + mo);
  }
  return latest || year * 100;
}

// 작업기간 기준 최신순, 같으면 나중에 올린 작업물이 먼저
export async function getWorks() {
  const works = await getCollection('works');
  return works
    .map((w) => ({ w, key: periodKey(w.data.period, w.data.year) }))
    .sort((a, b) => b.key - a.key || b.w.id.localeCompare(a.w.id))
    .map(({ w }) => w);
}
