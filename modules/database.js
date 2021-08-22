/**
 * database.js
 * 
 * (c) 2020-2021 Wnynya
 * 
 * @summary mysql database query
 * @author Wany <wnynya@gmail.com>
 */

 const mysql = require('mysql');
 const log = require('./log');
 const config = require('../config.json');
 exports.config = config.database;
 
 const pool = mysql.createPool({
   host: config.database.host,
   port: config.database.port,
   user: config.database.user,
   password: config.database.password,
   database: config.database.database,
   connectionLimit: 100,
   connectTimeout: 2000,
   multipleStatements: true
 });
 
 pool.on('connection', (con) => { });
 
 pool.on('error', (error) => {
   log.error('Database ERROR: ' + error);
 });
 
 /**
  * @desc Database Query (Promise)
  * @param {query} string Query String
  * @param {values} string Values String
  * @returns {result} Prmoise
  */
 const query = (query, values) => {
   return new Promise((resolve, reject) => {
     pool.getConnection((error, connection) => {
       if (error) {
         reject(new Error('Connection error: ' + error.message));
       }
       connection.query(query, values, (error, res) => {
         connection.release();
         if (error) {
           reject(new Error('Query error: ' + error.message));
         }
         resolve(res);
       });
     });
   });
 }
 exports.query = query;
 
 /**
  * @desc Encode string (HTML escape)
  * @param {string} string 
  * @returns {string} Encoded string
  */
 function encode(string) {
   try {
     string = string.replace(/\</g, "&lt;");
     string = string.replace(/\>/g, "&gt;");
     string = string.replace(/\\\\\\/g, "&#92;");
     string = string.replace(/\\/g, "&#92;");
     string = string.replace(/\"/g, "&quot;");
     string = string.replace(/\'/g, "&apos;");
     string = string.replace(/\=/g, "&#61;");
     string = string.replace(/\`/g, "&#96;");
     string = string.replace(/\(/g, "&#40;");
     string = string.replace(/\)/g, "&#41;");
     string = string.replace(/\[/g, "&#91;");
     string = string.replace(/\]/g, "&#93;");
     string = string.replace(/\{/g, "&#123;");
     string = string.replace(/\}/g, "&#125;");
     string = string.replace(/\|/g, "&#124;");
   } catch (error) { }
   return string;
 }
 
 /**
  * @desc Decode string (HTML escape)
  * @param {string} string 
  * @returns {string} Decoded string
  */
 function decode(string) {
   try {
     string = string.replace(/&lt;/g, "<");
     string = string.replace(/&gt;/g, ">");
     string = string.replace(/&#92;/g, "\\\\\\");
     string = string.replace(/&quot;/g, "\"");
     string = string.replace(/&apos;/g, "\'");
     string = string.replace(/&#61;/g, "=");
     string = string.replace(/&#96;/g, "`");
     string = string.replace(/&#40;/g, "(");
     string = string.replace(/&#41;/g, ")");
     string = string.replace(/&#91;/g, "[");
     string = string.replace(/&#93;/g, "]");
     string = string.replace(/&#123;/g, "{");
     string = string.replace(/&#125;/g, "}");
     string = string.replace(/&#124;/g, "|");
   } catch (error) { }
   return string;
 }
 
 /**
  * @desc Trim string
  * @param {string} string 
  * @returns {string} Trimmed string
  */
 function trim(string) {
   try {
     string = string.replace(/^[ 　\s]*|[ 　\s]*$/g, "");
   } catch (error) { }
   return string;
 }
 
 exports.encode = encode;
 exports.decode = decode;
 exports.trim = trim;
 
 /*
 export default {
   module: mysql,
   config: config,
   query: query,
   callbackQuery: callbackQuery
 }
 */
 
 // Backup
 const time = require('./time');
 const backup = () => {
 
   return new Promise((resolve, reject) => {
 
     const spawn = require('child_process').spawn;
     const filepath = global.wanyne.dataPath + "/dump/database/mysqldump-" + config.database + "-" + time("YYYYMMDDssssss") + ".sql";
     const stream = fs.createWriteStream(filepath);
 
     const dump = spawn('mysqldump', ['-h', config.host, '-u', config.user, '-p', config.password, config.database]);
 
     dump.stdout.pipe(stream).on('finish', () => {
       log.info("Dump database " + config.database + " => " + filepath);
       return resolve(filepath);
     }).on('error', (error) => {
       log.error(error);
       return reject(error);
     });
 
   });
 
 }