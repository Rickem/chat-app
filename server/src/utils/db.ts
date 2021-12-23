const Pool = require("pg").Pool;

const pool = new Pool ({
  user: "postgres",
  password: "Grfast69@",
  host: "localhost",
  port: 5432,
  database: "pernchat"
});

export default pool;