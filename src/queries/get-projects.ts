import { TypedSupabaseClient } from '@/types/supabase';

export function getProjects(client: TypedSupabaseClient) {
  return client.from('projects').select(`*, clients(name)`).throwOnError();
}
