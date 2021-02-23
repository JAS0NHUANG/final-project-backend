const genreUtils = require('../genreUtils')
const dbClient = require('../models/dbClient');

const filterDupMovies = moviesArray => moviesArray.reduce((filteredMovies, moviePayload) => {
  const inFilteredMovies = filteredMovies.some(movie => movie.name === moviePayload.name)

  if(!inFilteredMovies) filteredMovies.push(moviePayload)
  return filteredMovies
}, [])

const movieController = {
  getMovies: async (request, response) => {
    const genreStr = request.query.genre;
    let dataArray = [];
    try {
      if (genreStr) {
        const genreArray = genreUtils.genreToArray(genreStr);
        dataArray = await dbClient.db('test')
          .collection('movies')
          .find({ genre: { $in: genreArray }}).toArray();
      } else {
        dataArray = await dbClient.db('test').collection('movies').find().toArray();
      }
      const processedDataArray = genreUtils.genreProcessor(dataArray)
      processedDataArray.sort((a, b) => b.releaseDate - a.releaseDate)
      const filteredDataArray = filterDupMovies(processedDataArray) 
      response.json(filteredDataArray);
      console.log('Movies intheaters Data Sent.');
    } catch (error) {
      response.json({ ok: 0, errorMessage: 'Server error' });
      console.log(error);
    }
  },

  getMoviesThisweek: async (request, response) => {
    try {
      const dataArray = await dbClient.db('test').collection('movies_thisweek').find().toArray();
      const processedDataArray = genreUtils.genreProcessor(dataArray)
      processedDataArray.sort((a, b) => b.releaseDate - a.releaseDate)
      const filteredDataArray = filterDupMovies(processedDataArray) 
      response.json(filteredDataArray);
      console.log('Data Sent');
    } catch (error) {
      response.json({ ok: 0, errorMessage: 'Server error' });
      console.log(error);
    }
  },

  getMovieGenres: async (request, response) => {
    console.log(request.query.genre);
    try {
      const dataArray = await dbClient.db('test').collection('movie_genres').find().toArray();
      console.log(JSON.stringify(dataArray))
      const dataSet = new Set();
      dataArray.forEach(genreData => {
        dataSet.add(genreUtils.genreSwitcher(genreData.genre));
      })
      const processedDataArray = [];
      dataSet.forEach(genre => {
        processedDataArray.push(genre)
      })
      response.json(processedDataArray);
      console.log('Genre data sent successfully.');
    } catch (error) {
      response.json({ ok: 0, errorMessage: 'Server error' });
      console.log(error);
    }
  },
};

module.exports = movieController;
