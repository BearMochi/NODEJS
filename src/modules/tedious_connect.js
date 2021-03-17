// http://dog0416.blogspot.com/2015/04/databasesql-server-microsoft-sql-server.html
const { Connection, Request, TYPES } = require("tedious");
const config = {
    server: "127.0.0.1",
    authentication: {
        type: "default",
        options: {
            userName: "sa",
            password: "P@ssw0rd",
        },
    },
    options: {
        encrypt: false, // If you are on Microsoft Azure, you need encryption:
        database: "TestDB",
    },
};
const connection = new Connection(config);
connection.on("connect", err => {
    if (err) {
        console.log('Tedious connection error:', err);
    } else {
        console.log("Tedious connected");
    }
});
console.log("Tedious test");
const getConnection = () => {
    return connection;
}


const myExecSql = (sql, params = []) => {
    /*
    params: [[type, value]...]
     */
    const connect = getConnection();
    const re = /@([a-z_]+)/ig;
    const matchAll = [...sql.matchAll(re)];
    const matches = matchAll.map(i => i[1]); // 取得 @以外的名稱
    if (matches.length !== params.length) {
        throw new Error('SQL參數數目不符');
    }

    return new Promise((resolve, reject) => {
        const results = {
            rows: []
        };
        const request = new Request(sql, function (err, rowCount) {
            console.log('sql: ', sql);
            if (err) {
                console.log(err);
                results.error = err;
            } else {
                results.rowCount = rowCount;
            }
            resolve(results);
        });

        if (params.length) {
            for (let i in matches) {
                request.addParameter(matches[i], params[i][0], params[i][1]);
            }
        }
        request.on('row', function (columns) {
            const row = {};
            columns.forEach(function (column) {
                row[column.metadata.colName] = column.value;
            });
            results.rows.push(row);
        });

        connect.execSql(request);
    });
}



module.exports = {
    getConnection,
    myExecSql
};