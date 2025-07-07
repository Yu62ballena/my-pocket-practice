"use client";

import { FaRegTrashCan } from "react-icons/fa6";
import deleteArticle from "../actions/articles/delete-article";
import { Article } from "@prisma/client";

type DeleteButtonProps = {
  articleData: Article;
};

export default function DeleteButton({ articleData }: DeleteButtonProps) {
  const handleDelete = async (formData: FormData) => {
    const articleId = formData.get("articleId") as string;

    await deleteArticle(articleId);
  };

  return (
    <form
      action={handleDelete}
      onSubmit={(e) => {
        if (!confirm("この記事を削除しますか？")) {
          e.preventDefault();
        }
      }}
    >
      <input
        type="hidden"
        name="articleId"
        value={articleData.id}
      />
      <button
        type="submit"
        className="cursor-pointer"
      >
        <FaRegTrashCan />
      </button>
    </form>
  );
}
