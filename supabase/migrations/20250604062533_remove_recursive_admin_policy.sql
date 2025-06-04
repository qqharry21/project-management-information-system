-- Migration to fix recursive admin policies
-- This migration fixes the recursive admin check in user management policies
-- 1. First, create a function to check admin status without recursion
CREATE
OR REPLACE FUNCTION is_admin() RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $$ BEGIN RETURN EXISTS (
  SELECT
    1
  FROM
    auth.users au
    JOIN public.users u ON u.id = au.id
  WHERE
    au.id = auth.uid()
    AND u.role = 'admin'
);
END;
$$;
-- 2. Drop existing user policies
DROP POLICY IF EXISTS "Users can view their own user row" ON users;
DROP POLICY IF EXISTS "Users can update their own user row" ON users;
DROP POLICY IF EXISTS "Admins can manage all users" ON users;
-- 3. Create new user management policies using the is_admin() function
-- Allow admins to perform all operations on users
CREATE POLICY "Admins can manage all users" ON users FOR ALL USING (is_admin());
-- Allow users to view and update their own data
CREATE POLICY "Users can view their own data" ON users FOR
SELECT
  USING (id = auth.uid());
CREATE POLICY "Users can update their own data" ON users FOR
UPDATE
  USING (id = auth.uid());
-- 4. Update user_profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can manage all profiles" ON user_profiles;
-- Allow admins to perform all operations on user profiles
CREATE POLICY "Admins can manage all profiles" ON user_profiles FOR ALL USING (is_admin());
-- Allow users to view and update their own profile
CREATE POLICY "Users can view their own profile" ON user_profiles FOR
SELECT
  USING (user_id = auth.uid());
CREATE POLICY "Users can update their own profile" ON user_profiles FOR
UPDATE
  USING (user_id = auth.uid());
-- 5. Grant necessary permissions
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION is_admin() TO service_role;
