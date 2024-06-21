

\db\index.js

const sql = require("mssql");
require("dotenv").config();

const config = {
  user: 'dev.user',
  password: 'Server123@' ,
  server: '10.107.48.18',
  database: 'CholaMS_DigitalSIT',
  port: process.env.PORT,
  options: {
    encrypt: true,
    enableArithAbort: true,
  },
  pool : {
    max: 10,
    min: 0,
    idleTimeoutMills : 30000
  }
};
// const  Connection = require("tedious").poolPromise;
const poolPromise = new sql.ConnectionPool(config)
 .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise,
};


\routes\user.js

const express = require("express");
const router = express.Router();
const { sql, poolPromise } = require("../db");

router.get("/:sp_code", async (req, res) => {
  const sp_code = req.params.sp_code;
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("sp_code", sql.VarChar, sp_code)
      .query(
        "SELECT IMD_Code from IMD_Code_sp_shaping WHERE sp_code = @sp_code"
      );
    if (!result.recordset || result.recordset.length === 0) {
      return res.status(404).send(`IMD_Code not found for sp_code: ${sp_code}`);
    }
    res.json(result.recordset[0].IMD_Code);
  } catch (err) {
    console.error("Error fetching IMD_Code:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;


\server.js

const express = require("express");
const bodyParser = require("body-parser");
const usersRoutes = require("./routes/user");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());

app.use("/imdcodebyspcode", usersRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});








