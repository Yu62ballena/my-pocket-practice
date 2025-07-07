import getWhereCondition from "@/lib/getWhereCondition";
import { getArticles } from "../actions/articles/get-articles";
import ArticleCard from "./ArticleCard";
import getPageTitle from "@/lib/getPageTitle";
import getSearchWhereCondition from "@/lib/getSearchWhereCondition";
import { getCurrentUserId } from "@/lib/getCurrentUserId";


interface ArticleListsProps {
  searchParams: {
    listtype?: string;
    keyword?: string;
  };
}

async function ArticleLists({ searchParams }: ArticleListsProps) {
  const listtype = searchParams.listtype || "default";
  const keyword = searchParams.keyword;

  let pageTitle;
  let whereCondition;

  const userId = await getCurrentUserId();

  if (keyword) {
    // 検索処理
    pageTitle = `検索結果：${keyword}`;
    whereCondition = getSearchWhereCondition(keyword, userId);

  } else {
    // フィルター（ページタイトル）
    pageTitle = getPageTitle(listtype);
    whereCondition = getWhereCondition(listtype, userId);
  }
  
  // 記事取得
  const articlesData = await getArticles(whereCondition);

  if (!articlesData) {
    return (
      <div className="w-full lg:w-4/5 px-4">データを取得できませんでした</div>
    );
  }

  return (
    <div className="w-full lg:w-4/5 px-4">
      {/* タイトル */}
      <div className="flex justify-between mb-4">
        <h2 className="text-4xl font-bold">{pageTitle}</h2>
      </div>

      <hr />

      <div className="p-4 flex flex-col gap-4">
        {articlesData.map((articleData) => (
          <ArticleCard
            key={articleData.id}
            articleData={articleData}
          />
        ))}
      </div>
    </div>
  );
}

export default ArticleLists;
