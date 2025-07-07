import { FaArchive } from "react-icons/fa";
import toggleArchive from "../actions/articles/toggle-archives";
import { Article } from "@prisma/client";

type ArchiveButtonProps = {
  articleData: Article;
};

export default function ArchiveButton({ articleData }: ArchiveButtonProps) {
  const handleToggleArchive = async (formData: FormData) => {
    try {
      const articleId = formData.get("articleId") as string;
      await toggleArchive(articleData.isArchived, articleId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form action={handleToggleArchive}>
      <input
        type="hidden"
        name="articleId"
        value={articleData.id}
      />
      <button
        type="submit"
        className="cursor-pointer"
      >
        {articleData.isArchived ? (
          <FaArchive className="text-red-500" />
        ) : (
          <FaArchive />
        )}
      </button>
    </form>
  );
}
