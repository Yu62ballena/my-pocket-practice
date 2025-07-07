"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function toggleLike( isLiked: boolean, articleId : string) {
  try {
    const reversedIsLiked = !isLiked;

    await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        isLiked: reversedIsLiked,
      },
    });

    revalidatePath("/");

    const result = isLiked ? "お気に入りが解除されました" : "お気に入りしました";
    console.log(result);

    return {
      success: true,
    };
  } catch (err) {
    console.error(err);
    return {
      error: "お気に入りの更新に失敗しました",
      success: false,
    };
  }
}

export default toggleLike;
