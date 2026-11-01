import { json, stat, cleanStats, enc, num } from '../utils.js';
const base = 'https://api.subscriberwars.space';
export async function load(id) {
    const d = await json(`${base}/twitch/channel/${enc(id)}`); const uid = d.iD || d.id;
    const f = uid ? await json(`${base}/twitch/followers/${enc(uid)}`).catch(() => ({})) : {};
    return {
        name: d.name,
        handle: d.name ? '@' + d.name : '',
        avatar: d.logo, banner: d.offlineImage,
        count: num(f.total), stats: cleanStats([
            stat('Next milestone',
                nextMilestone(f.total)),
            stat('Account age (years)', null)
        ]),
        links: d.name ? [{
            label: 'View Twitch',
            url: `https://www.twitch.tv/${enc(d.name)}`
        },
        {
            label: 'Social Blade',
            url: `https://socialblade.com/twitch/user/${enc(d.name)}`
        }] : [], uid
    }
} 
export async function refresh(id, mode, profile) {
    const d = await json(`${base}/twitch/followers/${enc(profile.uid)}`);
    return {
        count: num(d.total),
        stats: cleanStats([
            stat('Next milestone', nextMilestone(d.total))
        ])
    }
}
function nextMilestone(n) {
    n = num(n); if (n === null) return null;
    if (n < 10) return 10;
    const size = 10 ** Math.floor(Math.log10(Math.max(n, 1)));
    return (Math.floor(n / size) + 1) * size
}

export async function videos(profile) {
    if (!profile.uid) return [];
    const d = await json(`${base}/twitch/videos/first=10&user_id=${enc(profile.uid)}`); return (Array.isArray(d) ? d : []).map(v => ({
        date: v.published_at?.slice(0, 10),
        title: v.title,
        thumbnail: v.thumbnail_url?.replace('%{width}', '320').replace('%{height}', '180'),
        views: v.view_count, url: v.url
    }))
}