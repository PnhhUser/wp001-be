export default () => ({
    port: parseInt(process.env.PORT),
    secret: process.env.SECRET,

    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbUsername: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: process.env.DB_PORT
});