# alt:V Login System

Simple Login System for alt:V by [ExXTreMe](https://github.com/ExXTreMe315)

## Features

- Login with Username and Password
- Register with Username and Password
- Database connection
- Hashed Passwords in Database

## Installation

1. Drag and drop the folder in your server resources folder
2. Add the resource to your "server.cfg"
3. Remove your old spawnsystem
4. add a "userdata" table to your database that contains "username" and "password"
5. Set up the Database at "./server/index.js:8"
    ```js
        const db = mysql.createConnection({
        host     : "localhost",
        user     : "root",
        password : "",
        database : "db_name"
        });
    ```
    replace the strings with your Database infos

## Configurables

You are able to configure:
- the spawn point ("./server/index.js:48")
- the spawn model ("./server/index.js:49")