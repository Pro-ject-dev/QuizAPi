var sql = require('mssql');

var config = {
  user: 'techq23',
  password: 'Mz@9182123',
  server: '103.207.1.94',
  database: 'Quiz',
  options: {
    encrypt: false,
  },
};

async function query(query) {
  try {
    await sql.connect(config);
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

var dbConn = new sql.ConnectionPool(config);
dbConn.connect();

module.exports = {
  query: query
};

