const genreUtils = require('../genreUtils')
const dbClient = require('../models/dbClient');

function filterDupMovies (moviesArray) {
  const filteredMoviesArray = moviesArray.filter((movie, index, array) => {
    let noDup = true;
    for (let i = index + 1; i < array.length; i++) {
      if (movie.name === array[i].name) {
        noDup = false;
        break;
      }
    }
    return (noDup);
  });
  return (filteredMoviesArray)
}

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
      processedDataArray.sort((a, b) => {
        return b.releaseDate - a.releaseDate
      })
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
      processedDataArray.sort((a, b) => {
        return b.releaseDate - a.releaseDate
      })
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
      dataArray.map(genreData => {
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
