import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'mssql',

  connections: {
    mssql: {
      client: 'mssql',
      connection: {
        server: env.get('DB_HOST') as string,
        port: Number(env.get('DB_PORT', '1433')),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
        options: {
          encrypt: false,
          trustServerCertificate: true,
        },
        requestTimeout: 120000,
      },
      pool: {
        min: 0,
        max: 10,
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
