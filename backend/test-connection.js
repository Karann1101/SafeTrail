const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
)

async function testConnection() {
    try {
        console.log('Testing Supabase connection...')
        
        // Test connection by trying to access the tourists table directly
        const { data, error } = await supabase
            .from('tourists')
            .select('*')
            .limit(1)

        if (error) {
            console.error('Connection error:', error.message)
            console.log('\nTroubleshooting steps:')
            console.log('1. Verify your SUPABASE_URL and SUPABASE_ANON_KEY in .env')
            console.log('2. Check if "tourists" table exists in your database')
            console.log('3. Verify Row Level Security (RLS) policies')
            return
        }

        console.log('Connection successful!')
        console.log('Tourist table is accessible')
        console.log('Number of records:', data.length)
        if (data.length > 0) {
            console.log('Sample record:', data[0])
        }

    } catch (error) {
        console.error('Connection failed:', error.message)
    }
}

testConnection()