import { useOptimistic } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import toggleLike from "../actions/articles/toggle-like";
import { Article } from "@prisma/client";

type LikeButtonProps = {
  articleData: Article;
};

export default function LikeButton({ articleData }: LikeButtonProps) {
  const [optimisticLike, setOptimisticLike] = useOptimistic(
    articleData.isLiked,
    (currentState, newValue: boolean) => newValue
  );

  const handleToggleLike = async (formData: FormData) => {
    setOptimisticLike(!optimisticLike);

    try {
      const articleId = formData.get("articleId") as string;
      await toggleLike(articleData.isLiked, articleId);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form action={handleToggleLike}>
      <input
        type="hidden"
        name="articleId"
        value={articleData.id}
      />
      <button
        type="submit"
        className="cursor-pointer"
      >
        {optimisticLike ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </button>
    </form>
  );
}
