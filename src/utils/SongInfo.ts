import ytdl from 'ytdl-core';

export async function getSongInfo(song: string) {
  const { videoDetails } = await ytdl.getBasicInfo(song);

  return {
    title: videoDetails.title,
    author: videoDetails.author.name,
  };
}