
export const platforms = {
  youtube:   { label: 'YouTube', endpoint: 'https://api.subscriberwars.space/search/youtube/channel/{query}', identifier: 'id', counterParam: 'channel' },
  tiktok:    { label: 'TikTok', endpoint: 'https://api.subscriberwars.space/search/tiktok/channel/{query}', identifier: 'id', counterParam: 'channel' },
  instagram: { label: 'Instagram', endpoint: 'https://api.subscriberwars.space/search/instagram/channel/{query}', identifier: 'username', counterParam: 'channel' },
  twitch:    { label: 'Twitch', endpoint: 'https://api.subscriberwars.space/search/twitch/channel/{query}', identifier: 'username', counterParam: 'channel' },
  kick:      { label: 'Kick', endpoint: null, identifier: 'username', counterParam: 'channel', directLookup: true },
  x:         { label: 'X / Twitter', endpoint: 'https://api.subscriberwars.space/search/x/channel/{query}', identifier: 'username', counterParam: 'channel' },
  bluesky:   { label: 'Bluesky', endpoint: 'https://api.subscriberwars.space/search/bluesky/channel/{query}', identifier: 'id', counterParam: 'channel' },
  truemaple: { label: 'TrueMaple', endpoint: 'https://api.subscriberwars.space/search/truemaple/user/{query}', identifier: 'id', counterParam: 'channel' },
  club:      { label: 'Club', endpoint: 'https://api.subscriberwars.space/search/club/{query}', identifier: 'id', counterParam: 'channel' },
  vidstur:   { label: 'Vidstur', endpoint: null, identifier: 'username', counterParam: 'channel', directLookup: true}
}
