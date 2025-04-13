// knexfile.js
export const development = {
  client: 'pg',
  connection: {
    database: 'test',
    user: 'postgres',
    password: 'admin123'
  },
  migrations: {
    directory: './migrations'
  }
};
