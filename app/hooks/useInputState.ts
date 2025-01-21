"use client";
import { useState } from "react";

export function useInputState<T>(initialValue?: T): [T, (partialT?: Partial<T>) => void] {
  const [value, setValue] = useState<T>(initialValue ?? {} as T);

  const setValuePartial = (partialT?: Partial<T>) => {
    setValue((prevValue) => ({
      ...prevValue,
      ...(partialT ?? {})
    }));
  };

  return [value, setValuePartial];
}