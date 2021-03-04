function genreSwitcher(genreString) {
  switch (genreString) {
    case '動作':
    case '冒險':
    case '戰爭':
    case '武俠':
      return '動作';
    case '科幻':
    case '奇幻':
      return '奇幻';
    case '劇情':
    case '喜劇':
    case '勵志':
    case '戲劇':
    case '歷史/傳記':
      return '劇情';
    case '犯罪':
    case '恐怖':
    case '懸疑/驚悚':
      return '犯罪';
    case '愛情':
    case '溫馨/家庭':
    case '音樂/歌舞':
      return '愛情/溫馨';
    default:
      return genreString;
  }
}

function genreToArray(genreString) {
  switch (genreString) {
    case '動作':
      return ["'動作'", "'冒險'", "'戰爭'", "'武俠'"];
    case '奇幻':
      return ["'奇幻'", "'科幻'"];
    case '劇情':
      return ["'劇情'", "'勵志'", "'戲劇'", "'歷史/傳記'", "'喜劇'"];
    case '犯罪':
      return ["'犯罪'", "'恐怖'", "'懸疑/驚悚'"];
    case '愛情/溫馨':
      return ["'愛情'", "'溫馨/家庭'", "'音樂/歌舞'"];
    default:
      return [`'${genreString}'`];
  }
}

function genreProcessor(dataArray) {
  const resultArray = dataArray.map((movie) => {
    const processedGenreArray = [];
    const dataSet = new Set();
    movie.genre.forEach((genreData) => {
      const modifiedGenreData = genreData.replaceAll("'", '');
      dataSet.add(genreSwitcher(modifiedGenreData));
    });
    dataSet.forEach((genre) => {
      processedGenreArray.push(genre);
    });
    return { ...movie, genre: processedGenreArray };
  });
  return resultArray;
}

module.exports = {
  genreSwitcher,
  genreProcessor,
  genreToArray,
};
