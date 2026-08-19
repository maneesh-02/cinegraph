import { useEffect, useState, useCallback } from "react";

// Small shared hook so every page gets consistent loading/error/data
// handling without repeating the same three useState calls everywhere.
// `deps` controls when the fetch re-runs (e.g. when a route :id changes).
export function useFetch(fetchFn, deps = []) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setError(null);

    fetchFn()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus("success");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Something went wrong.");
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, reloadKey]);

  return { data, status, error, reload };
}
