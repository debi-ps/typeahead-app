const HOST = 'http://localhost:3000';

(async () => {
	var bestPictures = new Bloodhound({
		initialize: true,
		limit: 10,
		sufficient: 1,
		datumTokenizer: function (obj) {
			return [obj.suburb_name, obj.town_name];
		},
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		identify: function (obj) {
			return obj.locality_id;
		},
		// prefetch: {
		// 	url: HOST + '/prefetch',
		// },
		remote: {
			url: HOST + '/%QUERY',
			wildcard: '%QUERY',
		},
	});

	$('.typeahead').typeahead(
		{
			minLength: 1,
			highlight: true,
			hint: true,
		},
		{
			name: 'pictures',
			display: function (suggestion) {
				return [suggestion.locality_name, suggestion.postal_code].join(',');
			},
			source: bestPictures,
			templates: {
				empty: [
					'<div class="empty-message">',
					'unable to find any Best Picture winners that match the current query',
					'</div>',
				].join('\n'),
				suggestion: Handlebars.compile(
					'<div>{{locality_name}}, {{suburb_name}}</div>'
				),
			},
		}
	);

	let choosen_adress;
	$('.typeahead').bind('typeahead:select', function (ev, suggestion) {
		console.log(suggestion.locality_id);
		$('.choosen_id').html(`<h1>CHOOSED ID: ${suggestion.locality_id}</h1>`);
		choosen_adress = suggestion;
		console.dir(suggestion);
	});
})();
