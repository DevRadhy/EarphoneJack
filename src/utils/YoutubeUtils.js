const api = require("../services/api")

async function seachVideos(query) {
  const { data } = await api.get('/search', {
    params: {
      part: 'snippet',
      type: 'video',
      maxResult: 10,
      q: query,
      key: process.env.YOUTUBE_KEY,
    }
  });

  return data.items.map(item => (
    {
      title: item.snippet.title,
      video_id: item.id.videoId,
    }
  ));
}

module.exports = {
  seachVideos,
}