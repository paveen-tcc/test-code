import 'dotenv/config';
import sql from 'mssql';
import { drizzle } from 'drizzle-orm/node-mssql';

function parseJdbcUrl(jdbcUrl: string) {
  const withoutPrefix = jdbcUrl.replace(/^jdbc:sqlserver:\/\//, '');
  const [hostPort, ...paramParts] = withoutPrefix.split(';');
  const [server, portStr] = hostPort.split(':');

  const params: Record<string, string> = {};
  for (const part of paramParts) {
    const eqIndex = part.indexOf('=');
    if (eqIndex !== -1) {
      const key = part.substring(0, eqIndex).trim().toLowerCase();
      const value = part.substring(eqIndex + 1).trim();
      params[key] = value;
    }
  }

  return {
    server,
    port: parseInt(portStr || '1433', 10),
    database: params['database'] || '',
    user: params['user'] || '',
    password: params['password'] || '',
    options: {
      encrypt: params['encrypt'] === 'true',
      trustServerCertificate: params['trustservercertificate'] === 'true',
    },
  };
}

const jdbcUrl = process.env.DATABASE_URL || 'jdbc:sqlserver://az-gcp-migrate-server-01.database.windows.net:1433;database=az-gcp-migrate-db-01;user=sql-owner@az-gcp-migrate-server-01;password=admin@123;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;';
const config = parseJdbcUrl(jdbcUrl);

let pool: sql.ConnectionPool | null = null;

export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await new sql.ConnectionPool(config).connect();
  }
  return pool;
}

export async function getDb() {
  const p = await getPool();
  return drizzle({ client: p });
}

export async function rawQuery<T = any>(query: string): Promise<T[]> {
  const p = await getPool();
  const result = await p.request().query(query);
  return result.recordset as T[];
}

export async function rawExecute(
  query: string,
  params: Record<string, { type: any; value: any }>
): Promise<any> {
  const p = await getPool();
  const request = p.request();
  for (const [name, param] of Object.entries(params)) {
    request.input(name, param.type, param.value);
  }
  return request.query(query);
}

export { sql };