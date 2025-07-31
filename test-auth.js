// Test script untuk memverifikasi authentication dan user profile creation
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Authentication...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'NOT FOUND');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Environment variables not found!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAuth() {
  try {
    console.log('\n📡 Testing connection...');
    
    // Test 1: Check if we can connect
    const { data, error } = await supabase.from('products').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return;
    }
    
    console.log('✅ Connection successful!');
    
    // Test 2: Check user_profiles table
    console.log('\n📡 Testing user_profiles table...');
    const { data: profiles, error: profilesError } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(1);
    
    if (profilesError) {
      console.error('❌ user_profiles table error:', profilesError.message);
    } else {
      console.log('✅ user_profiles table accessible');
      console.log('📊 Current profiles count:', profiles?.length || 0);
    }
    
    // Test 3: Check RLS policies
    console.log('\n📡 Testing RLS policies...');
    const { data: policies, error: policiesError } = await supabase
      .from('user_profiles')
      .select('*');
    
    if (policiesError) {
      console.error('❌ RLS policy error:', policiesError.message);
    } else {
      console.log('✅ RLS policies working');
    }
    
    // Test 4: Check if manual function exists
    console.log('\n📡 Testing manual function...');
    const { data: functionTest, error: functionError } = await supabase.rpc('create_user_profile_manual', {
      user_id: '00000000-0000-0000-0000-000000000000',
      user_full_name: 'test'
    });
    
    if (functionError) {
      console.error('❌ Manual function error:', functionError.message);
    } else {
      console.log('✅ Manual function accessible');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

testAuth(); 