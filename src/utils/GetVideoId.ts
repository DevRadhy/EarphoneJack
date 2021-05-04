import ytdl from 'ytdl-core';

export function getVideoId(song: string) {
  const validateURL = ytdl.validateURL(song);

  if(!validateURL) return null;

  const video_id = ytdl.getVideoID(song);

  return video_id;
}