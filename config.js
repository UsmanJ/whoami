var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/whoami_development';

module.exports = connectionString;
