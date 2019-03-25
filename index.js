// play this: https://www.youtube.com/watch?v=d-diB65scQU

const express = require('express');
const projects = require('./projects/projectRouter.js');
const actions = require('./actions/actionRouter.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/projects', projects);
app.use('/actions', actions);

app.get('/', (req, res) => {
  res.send("Jake, why are you here? What confluence of powers and events conspired to bring you into existence at this very time?");
})

const port = process.env.PORT || 5555;
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
