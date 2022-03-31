const axios = require('axios');

async function getAllResults() {
	let currentPage = 1;
	let totalPages = 2;
	const odaList = [];

	while (currentPage <= totalPages) {
		const results = await getResults(currentPage);
		odaList.push(...results.map((el) => { return el._source }));
		currentPage++;
	}

	return odaList;
}

async function getResults(page) {
	const options = {
		url: `https://api.webescoladigital.com/api/1/search?q=*&per_page=50&page=${page}`,
		method: 'GET',
	};

	const response = await axios(options);

	return response.data.hits.hits;
}

(async () => {
	const results = await getAllResults();
	console.log(results[0]);
})();