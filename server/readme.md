# Wishlify API

## Tech Stack

### [Go](https://go.dev)

Programming language to do all of this

### [Fiber](https://gofiber.io)

Go framework for creating REST APIs

### [gorm](https://gorm.io)

ORM for SQL databases

### [Postgres](https://www.postgresql.org)

SQL database

## File Structure

```txt
auth/             // utility functions for authentication stuff
db/               // Db variable and db models
handle/           // controller functions for router
lib/              // kinda like utility functions
middleware/       // functions for running before end controllers in router
router/           // root router stuff
types/            // App-wide types
validation/       // functions and types for validating incoming requests
```
