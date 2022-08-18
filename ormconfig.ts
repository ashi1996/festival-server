module.exports = {
    name: process.env.DB_APP_NAME,
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT), // cast to number
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    options: {
      enableArithAbort: true,
      trustServerCertificate: true,
    },
    schema: 'dbo',
    synchronize: false,
    logging: true,
    logger: 'file',
    maxQueryExecutionTime: 1000,
    entities: process.env.ENV_NAME === 'LOCAL' ? ['dist/src/entities/*{.js,.ts}'] : ['../src/entities/*{.js,.ts}'],
   // entities: ['dist/src/models/dto/*{.ts,.js}'],
    //migrations: ['migrations/*{.js}'], // When running migration - change to '*{.ts}'
  };