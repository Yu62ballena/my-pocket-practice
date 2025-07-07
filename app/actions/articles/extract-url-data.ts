"use server";

import { JSDOM } from "jsdom";

export async function extractUrlData(formData: FormData) {

  const url = formData.get("url") as string;

  try {
    // ブラウザとしてリクエストを送る
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    //取得したresponseをJavaScriptで操作できる形に変換する
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // サイトのメタデータを取得する関数
    const getMetaContent = (property: string) => {
      const selectors = [
        `meta[property="${property}"]`,
        `meta[name="${property}"]`,
        `meta[property="og:${property}"]`,
        `meta[name="og:${property}"]`,
        `meta[property="twitter:${property}"]`,
        `meta[name="twitter:${property}"]`,
      ];

      for (const selector of selectors) {
        const element = document.querySelector(selector);

        if (element) {
          return element.getAttribute("content") || "";
        }
      }

      return "";
    };

    // サイトの本文部分を取得する関数
    const getContent = (): string => {
      const contentSelectors = [
        "article",
        ".post-content",
        ".entry-content",
        ".content",
        ".post",
        "main",
        ".article-body",
      ];

      for (const selector of contentSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          // スクリプトタグとスタイルタグを削除
          const scripts = element.querySelectorAll(
            "script, style, nav, header, footer, aside"
          );
          scripts.forEach((el) => el.remove());

          return element.textContent?.trim().slice(0, 300) || ""; // 最初の300文字
        }
      }

      return "";
    };

    const articleData = {
      url,
      siteName:
        getMetaContent("site_name") ||
        getMetaContent("og:site_name") ||
        document.querySelector("title")?.textContent?.split(" | ")[1] ||
        new URL(url).hostname,
      title:
        getMetaContent("title") ||
        getMetaContent("og:title") ||
        document.querySelector("h1")?.textContent ||
        document.querySelector("title")?.textContent ||
        "タイトルなし",
      description:
        getMetaContent("description") ||
        getMetaContent("og:description") ||
        getMetaContent("twitter:description") ||
        "",
      updatedAt:
        getMetaContent("article:modified_time") ||
        getMetaContent("article:published_time") ||
        document.querySelector("time")?.getAttribute("datetime") ||
        new Date().toISOString(),
      thumbnail:
        getMetaContent("image") ||
        getMetaContent("og:image") ||
        getMetaContent("twitter:image") ||
        "",
      content: getContent(),
    };

    return articleData;
  } catch (err) {
    console.error(err);
  }
}
