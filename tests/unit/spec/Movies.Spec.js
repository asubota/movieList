describe("MovieCollection", function(){

	it("MovieCollection should be sorted by movie name", function(){
		var movies = new MovieCollection(movieCollectionFixture);

		expect(movies.models[0].get('title_ru')).toEqual("47 ронинов");
		expect(movies.models[1].get('title_ru')).toEqual("Бойфренд из будущего");
		expect(movies.models[2].get('title_ru')).toEqual("Гонка");
		expect(movies.models[3].get('title_ru')).toEqual("Конец света 2013: Апокалипсис по-голливудски");
	});

});


describe("Movie", function(){

	it("should expose an attribute", function() {
		var movie = new Movie(movieFixture);

		expect(movie.get("id")).toEqual("push");
		expect(movie.get("image")).toEqual("push.jpg");
		expect(movie.get("title_en")).toEqual("Push");
		expect(movie.get("title_ru")).toEqual("Пятое измерение");
	});

});
