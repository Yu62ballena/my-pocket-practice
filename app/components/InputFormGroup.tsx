import { useState, useEffect } from "react";
import { extractUrlData } from "../actions/articles/extract-url-data";
import { saveArticle } from "../actions/articles/save-article";
import FormMessage from "./FormMessage";
import { urlRegistrationSchema } from "@/lib/validations/urlRegistrationSchema";
import ToggleSwitch from "./ToggleSwitch";
import { redirect } from "next/navigation";
import { searchKeywordRegistrationSchema } from "@/lib/validations/searchKeywordRegistrationSchema";
import InputForm from "./InputForm";

function InputFormGroup() {
  const [error, setError] = useState<string>("");
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleInput = async (formData: FormData) => {
    try {
      const url = formData.get("url") as string;
      const validationResult = urlRegistrationSchema.safeParse({ url });

      if (!validationResult.success) {
        const errorMessage = validationResult.error.errors
          .map((error) => error.message)
          .join(", ");

        setError(errorMessage);
        return;
      }

      const articleData = await extractUrlData(formData);

      if (!articleData) {
        return;
      }

      const result = await saveArticle(articleData);

      if (!result.success) {
        setError(result.errorMessage || "予期しないエラーが発生しました");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (formData: FormData) => {
    const keyword = formData.get("keyword") as string;
    const validationResult = searchKeywordRegistrationSchema.safeParse({
      keyword,
    });

    if (!validationResult.success) {
      const errorMessage = validationResult.error.errors
        .map((error) => error.message)
        .join(", ");

      setError(errorMessage);
      return;
    }

    if (!keyword || keyword.trim() === "") {
      return;
    }

    const redirectUrl = `/?keyword=${encodeURIComponent(keyword)}`;

    redirect(redirectUrl);
  };

  return (
    <div className="flex gap-3 w-3/5 items-center relative">
      <div className="flex gap-3 items-center w-full">
        {/* トグルスイッチ */}
        <ToggleSwitch
          isRegisterMode={isRegisterMode}
          setIsRegisterMode={setIsRegisterMode}
        />

        {/* インプットフォーム */}
        <InputForm
          isRegisterMode={isRegisterMode}
          handleInput={handleInput}
          handleSearch={handleSearch}
        />
      </div>

      {error && <FormMessage error={error} />}
    </div>
  );
}

export default InputFormGroup;
