import { DataSource } from 'typeorm';
import entities from './typeorm';
import * as process from 'process';
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
export const Appdatasource = new DataSource({
  type: 'postgres',
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: true,
  logging: false,
  entities: entities,
});

// export const Appdatasource = new DataSource({
//   type: 'mongodb',
//   url: 'mongodb+srv://abhinav200218:y0PIkHMOhhDOXDck@cluster0.4kxoad7.mongodb.net/?retryWrites=true&w=majority',
//   synchronize: true,
//   logging: true,
//   entities: entities,
// });
