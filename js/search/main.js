import { platforms } from './config.js';
const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
const requested = params.get('platform');
const initial = platforms[requested] ? requested : (platforms[localStorage.getItem('sw:search:platform')] ? localStorage.getItem('sw:search:platform') : 'youtube');
$('platform').value = initial;
$('query').value = params.get('q') || '';
const youtubeMode = $('youtube-mode');
youtubeMode.value = ['api', 'estimate'].includes(params.get('type')) ? params.get('type') : (localStorage.getItem('sw:search:youtube-mode') || 'estimate');
function updateModeVisibility() { $('youtube-mode-wrap').hidden = $('platform').value !== 'youtube'; }
updateModeVisibility();
youtubeMode.addEventListener('change', () => {
  localStorage.setItem('sw:search:youtube-mode', youtubeMode.value);
  updateURL($('platform').value, $('query').value.trim());
  render(currentUsers);
});
let currentUsers = [];
let controller;
const pick = (...values) => values.find(v => v !== null && v !== undefined && v !== '');
const get = (o, path) => path.split('.').reduce((v, k) => v?.[k], o);
function extract(data) {
  if (Array.isArray(data)) return data;
  for (const path of ['data.items', 'data.results', 'data.users', 'data.channels', 'data.list', 'data', 'items', 'results', 'users', 'channels', 'list', 'item']) {
    const value = get(data, path);
    if (Array.isArray(value)) return value;
  }
  return [];
}
function normalise(item, platform) {
  const d = item?.data || item?.user || item?.channel || item?.author || item?.snippet || item.users || item.channelData || item;
  const rawId = pick(d?.channelId, d?.channel_id, d?.userId, d?.user_id, d?.id?.channelId, d?.id?.channel_id, d.itemsid, d?._id, typeof d?.id === 'string' || typeof d?.id === 'number' ? d.id : null);
  const rawUsername = pick(d?.uniqueId, d?.unique_id, d?.username, d?.login, d?.display_id, d?.handle, d?.screen_name, d?.customUrl, d?.uid, d?.channelHandle);
  const id = rawId == null ? '' : String(rawId);
  const username = rawUsername == null ? '' : String(rawUsername).replace(/^@/, '');
  const handle = username;
  const name = pick(d?.nickname, d?.displayName, d?.display_name, d?.title, d?.name, d?.channelName, d?.channel_name, handle, id);
  const avatar = pick(d?.avatar?.url, d?.avatar?.url_list?.[0], d?.avatar_medium?.url_list?.[0], d?.avatarMedium, d?.pfp, d?.avatar_url, d?.profile_image_url, d?.profileImageUrl, d?.thumbnail?.url, d?.thumbnails?.default?.url, d?.thumbnails?.medium?.url, d?.profile_image, d?.avatar, d?.channelProfile);
  const count = pick(d?.subscriberCount, d?.subscribers, d?.followerCount, d?.followers, d?.followers_count, d?.statistics?.subscriberCount, d?.stats?.followers);
  return { id, username, name: String(name || 'Unknown'), handle, avatar: typeof avatar === 'string' ? avatar : '', count, platform };
}

function accountIdentifier(user) {
  const cfg = platforms[user.platform];
  return cfg.identifier === 'username' ? user.username : user.id;

}
function counterURL(user) {
  const cfg = platforms[user.platform];
  const url = new URL('/counter.html', location.origin);
  url.searchParams.set('platform', user.platform);
  url.searchParams.set(cfg.counterParam || 'channel', accountIdentifier(user));
  if (user.platform === 'youtube') url.searchParams.set('type', youtubeMode.value);
  return url.href;
}

function render(users) {
  const container = $('results');
  currentUsers = users;
  container.replaceChildren();
  $('empty').hidden = users.length > 0;
  if (!users.length) { $('empty').querySelector('h3').textContent = 'No results found'; $('empty').querySelector('p').textContent = 'Try a different search term or platform.'; return; }
  for (const user of users) {
    const card = document.createElement('a'); card.className = 'card'; card.href = counterURL(user);
    let avatar;
    if (user.avatar) { avatar = document.createElement('img'); avatar.className = 'avatar'; avatar.src = user.avatar; avatar.alt = ''; avatar.loading = 'lazy'; avatar.referrerPolicy = 'no-referrer'; avatar.onerror = () => { avatar.replaceWith(makeFallback(user.name)); }; }
    else avatar = makeFallback(user.name);
    const body = document.createElement('div'); body.className = 'card-body';
    const title = document.createElement('div'); title.className = 'card-title'; title.textContent = user.name;
    const handle = document.createElement('div'); handle.className = 'card-handle'; handle.textContent = user.handle ? (user.handle.startsWith('@') ? user.handle : '@' + user.handle) : user.id;
    body.append(title, handle);
    if (user.count !== null && user.count !== undefined && user.count !== '' && Number.isFinite(Number(user.count))) {
      const count = document.createElement('div'); count.className = 'card-count'; count.textContent = Number(user.count).toLocaleString('en-GB') + ' followers / subscribers'; body.append(count);
    }
    const arrow = document.createElement('span'); arrow.className = 'card-arrow'; arrow.textContent = '›'; arrow.setAttribute('aria-hidden', 'true');
    card.append(avatar, body, arrow); container.append(card);
  }
}

function makeFallback(name) { const div = document.createElement('div'); div.className = 'avatar fallback'; div.textContent = (name || '?').slice(0, 1).toUpperCase(); return div; }
function setStatus(message) { $('status').textContent = message; }

async function search(query, platform) {
  controller?.abort(); controller = new AbortController(); const signal = controller.signal;
  const cfg = platforms[platform];
  $('search-button').disabled = true;
  $('results').replaceChildren(); $('empty').hidden = true; setStatus('Searching ' + cfg.label + '…');
  //kick NO Search
  if (platform === 'kick') {
    const username = query.trim()
      .replace(/^@/, '')
      .replace(/^https?:\/\/(?:www\.)?kick\.com\//i, '')
      .replace(/\/.*$/, '');

    if (!username) return;

    const results = [{
      id: username,
      username: username,
      name: username,
      handle: `@${username}`,
      avatar: '',
      count: null,
      platform: 'kick'
    }];

    render(results);
    return;
  }
  //Vidstur NO Search
  else if (platform === 'vidstur') {
    const username = query.trim()
      .replace(/^@/, '')
      .replace(/^https?:\/\/(?:www\.)?vidstur\.com\//i, '')
      .replace(/\/.*$/, '');

    if (!username) return;

    const results = [{
      id: username,
      username: username,
      name: username,
      handle: `@${username}`,
      avatar: '',
      count: null,
      platform: 'vidstur'
    }];

    render(results);
    return;
  }
  try {
    if (!cfg.endpoint) throw new Error('No search endpoint configured for ' + cfg.label);
    const url = cfg.endpoint.replace('{query}', encodeURIComponent(query));
    const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Search API returned HTTP ' + response.status);
    const data = await response.json();
    const users = extract(data).map(item => normalise(item, platform)).filter(u => accountIdentifier(u));
    const unique = [...new Map(users.map(u => [accountIdentifier(u), u])).values()];
    render(unique); setStatus(unique.length + ' result' + (unique.length === 1 ? '' : 's'));
  } catch (e) {
    if (e.name === 'AbortError') return;
    console.error('Search failed:', e);
    $('results').replaceChildren(); $('empty').hidden = false;
    $('empty').querySelector('h3').textContent = 'Search unavailable';
    $('empty').querySelector('p').textContent = e.message + ' — check the endpoint in js/search/config.js and its CORS settings.';
    setStatus('Search failed');
  } finally { if (!signal.aborted) $('search-button').disabled = false; }
}

function directUsernameLookup(platform, query) {
  const username = query.trim()
    .replace(/^@/, '')
    .replace(/^https?:\/\/(?:www\.)?kick\.com\//i, '')
    .replace(/\/.*$/, '');

  if (!username) return [];

  return [{
    id: username,
    username: username,
    name: username,
    handle: `@${username}`,
    avatar: '',
    count: null,
    platform
  }];
}

function updateURL(platform, q) { const url = new URL(location.href); url.searchParams.set('platform', platform); if (platform === 'youtube') url.searchParams.set('type', youtubeMode.value); else url.searchParams.delete('type'); if (q) url.searchParams.set('q', q); else url.searchParams.delete('q'); history.replaceState(null, '', url); }
$('platform').addEventListener('change', () => { controller?.abort(); $('search-button').disabled = false; const platform = $('platform').value; updateModeVisibility(); currentUsers = []; localStorage.setItem('sw:search:platform', platform); updateURL(platform, ''); $('query').value = ''; $('results').replaceChildren(); $('empty').hidden = false; $('empty').querySelector('h3').textContent = 'Find your next creator'; $('empty').querySelector('p').textContent = 'Search ' + platforms[platform].label + ' to see results.'; setStatus('Ready to search ' + platforms[platform].label); });
$('search-form').addEventListener('submit', event => { event.preventDefault(); const q = $('query').value.trim(), platform = $('platform').value; if (!q) return; localStorage.setItem('sw:search:platform', platform); updateURL(platform, q); search(q, platform); });
if ($('query').value.trim()) search($('query').value.trim(), initial);
