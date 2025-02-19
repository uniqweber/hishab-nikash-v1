import { useCallback, useEffect } from "react";

export const useHandleClickOutside = (setShowItems, id) => {
  const handleClickOutside = useCallback(
    (e) => {
      if (e.target.id !== id) {
        setShowItems(false);
      }
    },
    [id, setShowItems]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);
};
