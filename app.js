const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

const localityData = require('./storage/locality.json');

app.use(cors());

app.use(express.static(path.join(__dirname, './public')));

app.listen(PORT, 'localhost', () => {
	console.log(`Server is started on port ${PORT}`);
});

app.get('/prefetch', async (req, res) => {
	res.json(localityData);
});

app.get('/:query', async (req, res) => {
	const query = req.params.query.toLowerCase();

	res.json(
		localityData.filter((item) => {
			return item.locality_name.toLowerCase().search(query) !== -1;
		})
	);
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, './public/index.html'));
});
