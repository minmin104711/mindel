// 작업물 종류: Pages CMS에서 고르는 이름(ko)과 사이트에 보이는 영어 이름(label)
export const CATEGORIES = [
  { key: 'graphic', ko: '그래픽', label: 'Graphic' },
  { key: 'photo', ko: '사진', label: 'Photo' },
  { key: 'package', ko: '패키지', label: 'Package' },
  { key: 'logo', ko: '로고', label: 'Logo' },
  { key: 'character', ko: '캐릭터', label: 'Character' },
] as const;

export type CategoryKo = (typeof CATEGORIES)[number]['ko'];

export const categoryOf = (ko: string) => CATEGORIES.find((c) => c.ko === ko) ?? CATEGORIES[0];
