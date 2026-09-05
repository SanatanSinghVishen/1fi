const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const prismaCli = path.join(__dirname, '..', 'node_modules', 'prisma', 'build', 'index.js');

// Ensure dependencies are installed if Render ran build without install
if (!fs.existsSync(prismaCli)) {
  console.log('📦 prisma package not found in node_modules, running npm install...');
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (err) {
    console.error('Failed to run npm install:', err.message);
  }
}

console.log('📦 Generating Prisma Client...');
try {
  if (fs.existsSync(prismaCli)) {
    execSync(`node "${prismaCli}" generate`, { stdio: 'inherit' });
  } else {
    execSync('npx -y prisma@6.19.3 generate', { stdio: 'inherit' });
  }
  console.log('✅ Prisma Client generated successfully.');
} catch (err) {
  console.warn('⚠️ Prisma Client generation warning:', err.message);
}

// Database schema push and seed if DATABASE_URL is set
if (process.env.DATABASE_URL) {
  try {
    console.log('🔄 Syncing schema to PostgreSQL database...');
    if (fs.existsSync(prismaCli)) {
      execSync(`node "${prismaCli}" db push --skip-generate`, { stdio: 'inherit' });
    } else {
      execSync('npx -y prisma@6.19.3 db push --skip-generate', { stdio: 'inherit' });
    }
    console.log('🌱 Seeding products into PostgreSQL...');
    execSync('node prisma/seed.js', { stdio: 'inherit' });
    console.log('✅ Database setup completed successfully.');
  } catch (err) {
    console.warn('⚠️ Database migration/seed skipped or failed during build:', err.message);
    console.warn('⚠️ Server will automatically use built-in fallback dataset.');
  }
} else {
  console.log('ℹ️ No DATABASE_URL provided during build. Fallback dataset will be used.');
}
