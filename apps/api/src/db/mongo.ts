import * as mongoose from 'mongoose';

async function openMongo() {
  await mongoose.connect('mongodb+srv://webuser:vxhxbwn3i3bXAk5@cluster0.s30ug.mongodb.net/nbamockdraft?retryWrites=true&w=majority&useUnifiedTopology=true', { useNewUrlParser: true });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log('Mongoose connection open');
  });
}

export { openMongo };
