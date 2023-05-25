const pg = require('pg')
const client = new pg.Client('postgres://uslnxcyx:PI6uA_NUfIc81StK-ZVDRU359ZzTMAGP@john.db.elephantsql.com/uslnxcyx')
client.connect(function (err){
    console.log(`Connection error: ${err}`);
});
module.exports = client;