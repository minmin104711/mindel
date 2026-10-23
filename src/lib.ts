import { getCollection } from 'astro:content';

// 최근 연도가 먼저, 같은 연도면 나중에 올린 작업물이 먼저
export async function getWorks() {
  const works = await getCollection('works');
  return works.sort((a, b) => b.data.year - a.data.year || b.id.localeCompare(a.id));
}
