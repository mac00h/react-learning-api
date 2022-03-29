import { useCallback, useState } from "react";

const useHttp = (applyData: (data: any) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (options) => {
      setIsLoading(true);
      setError(null);

      const { url } = options;

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Request failed.");
        }

        const data = await response.json();
        applyData(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    [applyData]
  );

  return { isLoading, error, sendRequest };
};

export default useHttp;
