const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const localityData = require('./storage/locality.json');

app.use(cors());

app.use(express.static('./public'));

app.listen(PORT, 'localhost', () => {
	console.log(`Server is started on port ${PORT}`);
});

app.get('/locality', async (req, res) => {
	const query = req.params.query;

	res.send(
		localityData.filter((item) => {
			return item.locality_name.search(new RegExp(query));
		})
	);
});

app.get('*', (req, res) => {
	res.sendFile('./public/index.html');
});
