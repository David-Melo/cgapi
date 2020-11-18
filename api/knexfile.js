require('dotenv').config();

const KnexConfig = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_API_USER,
    password: process.env.POSTGRES_API_PASS
  },
  migrations: {
    tableName: 'migrations'
  }
}

module.exports = KnexConfig;