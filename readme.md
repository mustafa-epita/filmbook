# FILMBOOK

Filmbook is a platform for watching movies!

## Getting started!

To get Filmbook working you need to follow these steps:

1- Have a postgress server running on your localhost on port 5432, and create a database called `filmbookDB` .

2- Run all the SQL queries from the `filmbook-sql-db.sql` file, it will create all the required tables and fill them with default data.

3- Have a mongodb server running on your localhost on port 27017, and create a collection called `filmbook`

4- Create the collection, import the file `movies-collection.json` to the collection as json, to load all the movies to the database.

5- Run the server-side-java project using `intelliJ IDEA`, then start the main luncher of the project, it should be live on your localhost on port 8092.

6- Run the server-side-nodejs project using the following commands in your terminal:
```bash
npm install
npm run dev
```
once it successfully execute it should be running on your localhost on port 4500.

7- Run the client-side project using the following commands in your terminal:
```bash
npm install
npm run dev
```
once it successfully execute it should be running on your localhost on port 5173.


And voilà, you should be up and running to watch movies!
