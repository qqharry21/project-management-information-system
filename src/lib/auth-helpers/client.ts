'use client';

import { type Provider } from '@supabase/supabase-js';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { getURL } from '@/lib/utils';

import { createClient } from '../supabase/client';
import { redirectToPath } from './server';

export async function handleFormRequest(
  formData: FormData,
  requestFunc: (formData: FormData) => Promise<string>,
  router?: AppRouterInstance
): Promise<boolean | void> {
  const redirectUrl: string = await requestFunc(formData);

  if (router) {
    // If client-side router is provided, use it to redirect
    return router.push(redirectUrl);
  } else {
    // Otherwise, redirect server-side
    return await redirectToPath(redirectUrl);
  }
}

export async function signInWithOAuth(e: React.FormEvent<HTMLFormElement>) {
  // Prevent default form submission refresh
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const provider = String(formData.get('provider')).trim() as Provider;

  // Create client-side supabase client and call signInWithOAuth
  const supabase = createClient();
  const redirectURL = getURL('/auth/callback');
  await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: redirectURL,
    },
  });
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('check_user_email_exists', {
    target_email: email,
  });

  if (error) {
    console.error('RPC error:', error);
    return false;
  }

  return data === true;
}

/**
 * Possible user verification statuses returned by getUserVerificationStatus.
 */
export const USER_VERIFICATION_STATUS = {
  NOT_FOUND: 'not_found',
  UNVERIFIED: 'unverified',
  VERIFIED: 'verified',
} as const;

/**
 * Checks the verification status of a user by email using a Supabase RPC call.
 * @param email - The user's email address to check.
 * @returns The user's verification status: 'not_found', 'unverified', or 'verified'.
 */
export async function getUserVerificationStatus(email: string) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_user_verification_status', {
    target_email: email,
  });

  if (error) {
    console.error('Failed to fetch user verification status:', error.message);
    return USER_VERIFICATION_STATUS.NOT_FOUND;
  }

  return data as (typeof USER_VERIFICATION_STATUS)[keyof typeof USER_VERIFICATION_STATUS];
}
