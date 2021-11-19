import { useEffect, useState, Dispatch, SetStateAction } from "react";

type Response<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistedState<T>(key: string, defaultValue: any): Response<T> {
	const [state, setState] = useState(() => {
		  const storedValue = localStorage.getItem(key);
		  return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
		});
	useEffect(() => {
	  localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);
	return [state, setState];
}