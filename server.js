const express = require('express');
const app = express();
const port = process.env.PORT || 63342;

app.use(express.static('app'));

app.listen(port, () => console.log(`Server is up on port ${port}`));