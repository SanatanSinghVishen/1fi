const { execSync } = require('child_process');

console.log('📦 Generating Prisma Client...');
try {
  execSync('prisma generate', { stdio: 'inherit' });
} catch (error) {
  console.log('Trying npx prisma generate...');
  execSync('npx --no-install prisma generate', { stdio: 'inherit' });
}

if (process.env.DATABASE_URL) {
  try {
    console.log('🔄 Syncing schema to PostgreSQL database...');
    execSync('prisma db push --skip-generate', { stdio: 'inherit' });
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
