import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getEnvUrl = (envVar: string) => process?.env?.[envVar]?.trim() || '';
export const getURL = (path: string = '') => {
  // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
  let url =
    getEnvUrl('NEXT_PUBLIC_SITE_URL') ||
    // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
    getEnvUrl('NEXT_PUBLIC_VERCEL_URL') ||
    // If neither is set, default to localhost for local development.
    'http://localhost:3000/';

  // Trim the URL and remove trailing slash if exists.
  url = url.replace(/\/+$/, '');
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Ensure path starts without a slash to avoid double slashes in the final URL.
  path = path.replace(/^\/+/, '');

  // Concatenate the URL and the path.
  return path ? `${url}/${path}` : url;
};

/**
 * debounce: 傳回一個防抖動的函式，僅在最後一次呼叫後延遲指定毫秒才執行。
 * @param fn 要執行的函式
 * @param delay 延遲毫秒數
 */
export const debounce = <T extends unknown[]>(fn: (...args: T) => void, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: T) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
