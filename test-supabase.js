// Test script untuk memverifikasi koneksi Supabase
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('Testing Supabase connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'NOT FOUND');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Environment variables not found!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n🔍 Testing connection...');
    
    // Test 1: Check if we can connect
    const { data, error } = await supabase.from('products').select('count').limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      
      if (error.message.includes('Invalid API key')) {
        console.error('💡 Check your REACT_APP_SUPABASE_ANON_KEY');
      } else if (error.message.includes('not found')) {
        console.error('💡 Check your REACT_APP_SUPABASE_URL');
      } else if (error.message.includes('relation "products" does not exist')) {
        console.log('✅ Connection successful! But database schema not set up.');
        console.log('💡 Run the database schema in Supabase SQL Editor');
      }
    } else {
      console.log('✅ Connection successful!');
      console.log('✅ Database schema is set up correctly');
    }
    
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

testConnection(); 