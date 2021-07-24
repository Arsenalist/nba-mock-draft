import * as express from 'express';
import { draftOrder } from './data/draft-order';
import { teams } from './data/teams';
import { players } from './data/players';
import { openMongo } from './db/mongo';
import { EntryModel } from './db/entries';
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded());

app.use(cors({
  origin: function (origin, callback) {
    callback(null, ['http://localhost:4200', 'https://mockdraft.raptorsrepublic.com'])
  }
}))


openMongo()

app.post('/api/save', async(req, res) => {
  const entry = {
    players: req.body
  }
  const model = await EntryModel.create(entry)
  res.send({hash: model.id})
});


app.get('/api/players', (req, res) => {
  res.send(players);
});

app.get('/api/entry/:id', async (req, res) => {
  res.send(await EntryModel.findById(req.params.id));
});


app.get('/api/draft-order', (req, res) => {
  res.send(draftOrder);
});

app.get('/api/teams', (req, res) => {
  res.send(teams);
});

const port = process.env.port || 3334;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
