"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Image from "next/image";
import ExtensionSuccess from "../components/ExtensionSuccess";

function SignInContent() {
  const { data: session, status } = useSession();

  const router = useRouter();

  const searchParams = useSearchParams();
  const fromExtension = searchParams.get("from") === "extension";

  useEffect(() => {
    if (status === "authenticated" && session) {
      if (fromExtension) {
        // 拡張機能からの場合は何もしない（成功ページを表示するため）
        return;
      } else {
        // 通常のアクセスの場合はホームページにリダイレクト
        router.push("/");
      }
    }
  }, [status, session, router, fromExtension]);

  // ログイン済み + 拡張機能からのアクセスの場合
  if (status === "authenticated" && session && fromExtension) {
    return <ExtensionSuccess />;
  }

  // Loading画面
  const Loading = () => {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "authenticated" && session && !fromExtension) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="relative h-20 w-20 mx-auto">
          <Image
            className="object-contain"
            src="/images/icon.png"
            alt="My Pocket Logo"
            fill={true}
            sizes="80px"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          my-pocketにサインイン
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          記事を保存・管理するためにサインインしてください
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <button
            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => signIn("google")}
          >
            Googleでサインイン
          </button>
        </div>
      </div>
    </div>
  );
}

function SignIn() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}

export default SignIn;
