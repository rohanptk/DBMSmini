const express = require("express");
const app = express();
const cors = require('cors')
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const client = require("./db-connect");
const bcrypt = require('bcrypt');


app.use(cors());
app.use(express.json())
app.use(express.urlencoded())

app.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password
  client.query(`SELECT * FROM users WHERE email = '${email}'`, function (err, result) {
    if (err) {
      console.log(`Query error: ${err}`);
    }
    if (result.rows.length == 0) {
      res.setHeader('Content-Type', 'application/json').status(404).send("User not found");
    } else {
      bcrypt.compare(password, result.rows[0].password, function (err, bcryptResult) {
        if (bcryptResult == true) {
          res.setHeader('Content-Type', 'application/json').status(200).send(result.rows[0])
        } else {
          res.setHeader('Content-Type', 'application/json').status(401).send("Email or Password is Incorrect");
        }
      });
    }
  });
});

app.post("/register", urlencodedParser, (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var hashedPassword = "";

  bcrypt.hash(password, 10, function (err, hash) {
    hashedPassword = hash;
  });

  client.query(`SELECT * FROM users WHERE email = '${email}'`, function (err, result) {
    if (err) {
      console.log(`Query Error: ${err}`);
    }

    if (result.rows.length == 0) {
      client.query(`INSERT INTO users(name,email,password)
      VALUES('${name}','${email}','${hashedPassword}')`, function (userCreationErr, createUserResult) {
        if (userCreationErr) {
          res.setHeader('Content-Type', 'application/json').status(500).send("User not created");
        } else {
          res.setHeader('Content-Type', 'application/json').status(200).send("User Created Successfully");
        }
      })
    } else {
      res.setHeader('Content-Type', 'application/json').status(403).send("User already exists")
    }

  })
})

app.put("/profile-update", (req, res) => {
  var name = req.body.name;
  var userID = req.body.userID;
  client.query(`UPDATE users SET name = '${name}' WHERE userid = '${userID}'`, function (profileUpdateError, profileUpdateResponse) {
    if (profileUpdateError) {
      res.setHeader('Content-Type', 'application/json').status(400).send("Updation Unsuccessful")
    } else {
      client.query(`SELECT * FROM users WHERE userid = '${userID}'`, function (returnedUserErr, returnedUserResult) {
        if (returnedUserErr) {
          console.log("Fetch Error");
        } else {
          res.setHeader('Content-Type', 'application/json').status(200).send(returnedUserResult.rows[0]);
        }
      })
    }
  })
})

app.post("/sell-book", (req, res) => {
  var bookName = req.body.bookName;
  var authorName = req.body.authorName;
  var bookPrice = req.body.bookPrice;
  var publisherName = req.body.publisherName;
  var coverUrl = req.body.coverUrl;
  var ownerId = req.body.ownerId;
  client.query(`INSERT INTO books (bookName, authorName, publisherName, ownerid, price, coverImageUrl) VALUES('${bookName}','${authorName}','${publisherName}',${parseInt(ownerId)}, ${parseInt(bookPrice)},'${coverUrl}')`,
    function (bookUploadError, setBookUploadResult) {
      if (bookUploadError) {
        res.setHeader('Content-Type', 'application/json').status(400).send("Unable to sell the book.")
      } else {
        res.setHeader('Content-Type', 'application/json').status(200).send("Book successfully uploaded");
      }
    })
})

app.post("/get-books", (req, res) => {
  var ownerId = req.body.ownerId;

  client.query(`SELECT * FROM books WHERE ownerid != ${parseInt(ownerId)}`, function(getBookError, getBookResult){
    if(getBookError){
      res.setHeader('Content-Type', 'application/json').status(400).send("Error with the Query")
    }else{
      if(getBookResult.rowCount == 0){
        res.setHeader('Content-Type', 'application/json').status(404).send("Books not found");
      }else{
        res.setHeader('Content-Type', 'application/json').status(200).send(getBookResult.rows);
      }
    }
  })
})

app.post("/search-books", (req, res) => {
  var ownerId = req.body.ownerId;
  var searchTerm = req.body.searchTerm;

  client.query(`SELECT * FROM books WHERE (ownerid != ${parseInt(ownerId)} AND bookname LIKE '%${searchTerm}%') OR (ownerid != ${parseInt(ownerId)} AND authorname LIKE '%${searchTerm}%') OR (ownerid != ${parseInt(ownerId)} AND publishername LIKE '%${searchTerm}%')`, function(getBookError, getBookResult){
    if(getBookError){
      res.setHeader('Content-Type', 'application/json').status(400).send("Error with the Query")
    }else{
      if(getBookResult.rowCount == 0){
        res.setHeader('Content-Type', 'application/json').status(404).send("Books not found");
      }else{
        res.setHeader('Content-Type', 'application/json').status(200).send(getBookResult.rows);
      }
    }
  })
})

app.listen(process.env.PORT);