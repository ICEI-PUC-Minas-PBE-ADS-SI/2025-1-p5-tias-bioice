import {ConnectionOptions, DataSource} from 'typeorm';
import 'dotenv/config';

// const isPrimaryDown = process.env.DB_FAILOVER === 'true';

export const dbConnection: ConnectionOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/src/model/**/*.entity{.ts,.js}'],
  synchronize: true,
  logging: true
};
// export const supabaseConfig: DataSourceOptions = {
//   type: 'postgres',
//   host: process.env.SUPABASE_HOST, // like 'db.xyz.supabase.co'
//   port: 5432,
//   username: process.env.SUPABASE_USER,
//   password: process.env.SUPABASE_PASSWORD,
//   database: process.env.SUPABASE_DB,
//   entities: [__dirname + '/src/model/**/*.entity{.ts,.js}'],
//   synchronize: true,
//   logging: true,
//   ssl: {
//     rejectUnauthorized: false, // <--- ADD THIS LINE
//   },
// };

const dataSource: DataSource = new DataSource(dbConnection);
export default dataSource;
