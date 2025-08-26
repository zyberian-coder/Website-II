import { Pool, neonConfig } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';
import { config } from 'dotenv';
import ws from 'ws';

// Load environment variables
config();

// Configure WebSocket for Neon
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function createAdmin() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    // Insert admin user
    const result = await pool.query(`
      INSERT INTO users (id, username, password) 
      VALUES (gen_random_uuid(), 'admin', $1)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username;
    `, [hashedPassword]);
    
    if (result.rows.length > 0) {
      console.log('✅ Admin user created successfully!');
      console.log('Username: admin');
      console.log('Password: admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await pool.end();
  }
}

createAdmin();