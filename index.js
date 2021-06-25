const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://assinmentfull:ZfoYSkf5rjMqdydU@cluster0.obyna.mongodb.net/Book?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collectionAdmin = client.db("Book").collection("BookList");
  const collectionOrders = client.db("Book").collection("Order");
  const collectionAdminEmail = client.db("Book").collection("AdminEmail");
  app.post("/users", (req, res) => {
    const user = req.body;
    collectionAdmin.insertOne(user).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  app.get("/users", (req, res) => {
    collectionAdmin.find().toArray((err, result) => {
      res.send(result);
    });
  });
  app.get("/users/:id", (req, res) => {
    collectionAdmin
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, item) => {
        res.send(item[0]);
      });
  });
  app.delete("/delete/:id", (req, res) => {
    collectionAdmin
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      });
  });

  app.post("/order", (req, res) => {
    const user = req.body;
    collectionOrders.insertOne(user).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  app.get("/orders", (req, res) => {
    collectionOrders.find().toArray((err, result) => {
      res.send(result);
    });
  });
  app.get("/order", (req, res) => {
    collectionOrders.find({ email: req.query.email }).toArray((err, result) => {
      res.send(result);
    });
  });

  app.post("/admin", (req, res) => {
    const user = req.body;
    collectionAdminEmail.insertOne(user).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  app.get("/admin", (req, res) => {
    collectionAdminEmail
      .find({ email: req.query.email })
      .toArray((err, result) => {
        res.send(result[0]);
      });
  });
});

app.listen(port);
