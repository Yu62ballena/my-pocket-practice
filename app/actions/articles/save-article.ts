"use server";

import prisma from "@/lib/prisma";
import { ArticleDataType } from "@/types/articleDataType";
import { checkUrlExists } from "./checkUrlExists";
import { revalidatePath } from "next/cache";
import { getCurrentUserId } from "@/lib/getCurrentUserId";

type SaveResult = {
  success: boolean;
  errorMessage?: string; 
};

export async function saveArticle(
  articleData: ArticleDataType,
  userId?: string
): Promise<SaveResult> {
  try {
    const isDuplicate = await checkUrlExists(articleData.url);

    const finalUserId = userId || await getCurrentUserId();

    if (isDuplicate) {
      return {
        errorMessage: "この記事はすでに登録されています",
        success: false,
      };
    }

    await prisma.article.create({
      data: {
        userId: finalUserId,
        url: articleData.url,
        title: articleData.title,
        siteName: articleData.siteName,
        description: articleData.description,
        thumbnail: articleData.thumbnail,
        content: articleData.content,
        updatedAt: articleData.updatedAt,
      },
    });

    revalidatePath('/');

    return {
      errorMessage: undefined,
      success: true,
    };
  } catch (err) {
    console.error(err);

    return {
      errorMessage: "記事の保存がうまくいきませんでした",
      success: false,
    };
  }
}
