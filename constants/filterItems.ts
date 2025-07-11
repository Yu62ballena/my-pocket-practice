export interface FilterItemsInterface {
  id: string;
  name: string;
  href: string;
}

export const filterItems: FilterItemsInterface[] = [
  {
    id: "home",
    name: "ホーム",
    href: "/",
  },
  {
    id: "all",
    name: "すべて",
    href: "/?listtype=all",
  },
  {
    id: "favorite",
    name: "お気に入り",
    href: "/?listtype=liked",
  },
  {
    id: "archive",
    name: "アーカイブ",
    href: "/?listtype=archived",
  },
];
