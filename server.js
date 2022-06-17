const { MongoClient } = require('mongodb');
const express = require('express');
const multer = require('multer');
const upload = multer();
let db;

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function passwordProtected(req, res, next) {
  res.set('WWW-Authenticate', "Basic realm='Our MERN App'");
  if (req.headers.authorization == 'Basic YWRtaW46YWRtaW4=') {
    next();
  } else {
    console.log(req.headers.authorization);
    res.status(401).send('Try again');
  }
}

app.get('/', async (req, res) => {
  const allAnimals = await db.collection('animals').find().toArray();
  res.render('home', { allAnimals });
});

app.use(passwordProtected);

app.get('/admin', (req, res) => {
  res.render('admin');
});

app.get('/api/animals', async (req, res) => {
  const allAnimals = await db.collection('animals').find().toArray();
  res.json(allAnimals);
});

app.post('/create-animal', upload.single('photo'), async (req, res) => {
  console.log(req.body);
  res.send('Thank you');
});

async function start() {
  // mongodb://localhost:27017
  // "mongodb://root:root@localhost:27017/AmazingMernApp?&authSource=admin"
  // "mongodb://localhost:27017/AmazingMernApp?&authSource=admin"
  const client = new MongoClient(
    'mongodb://localhost:27017/AmazingMernApp?&authSource=admin'
  );
  await client.connect();
  db = client.db();
  app.listen(3000);
}
start();
