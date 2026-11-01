import { json, stat, cleanStats, enc, num } from '../utils.js';
const base = 'https://api.subscriberwars.space';

export async function load(id, type) {
    const d = await json(`${base}/youtube/channel/${enc(id)}`);
    return {
        name: d.title,
        handle: d.slug ? '@' + d.slug : '',
        avatar: d.icon?.replace('s88', 's200'),
        banner: d.banner ? d.banner + '=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj' : null,
        count: type === "estimate" ? null : num(d.subscriberCount),
        stats: cleanStats([
            stat('Views', d.viewCount),
            stat('Videos', d.videoCount),
            stat('YouTube displays', d.subscriberCount)
        ]),
        links: [{
            label: 'View channel',
            url: `https://www.youtube.com/channel/${enc(d.id || id)}`
        },
        ...(d.slug ? [{
            label: 'Social Blade',
            url: `https://socialblade.com/youtube/handle/${enc(d.slug)}`
        },
        {
            label: 'Analytics',
            url: `/analytics/youtube?q=${enc(d.slug)}`
        }] : [])], uploads: d.uploads, verified: false
    }
}

export async function refresh(id, type) {
    if (type === 'estimate') {
        const d = await json(`${base}/youtube/estimate/${enc(id)}`);
        return {
            count: num(d.estSubCount),
            stats: cleanStats([
                stat('Views', d.estViewCount), stat('YouTube displays', d.apiSubCount)])
        }
    } if (type === 'next') { const d = await json(`${base}/next/youtube/channel/${enc(id)}`); return { count: num(d.subscribersCount), stats: cleanStats([stat('Views', d.totalViews), stat('Videos', d.videosCount)]) } } const d = await json(`${base}/youtube/channel/${enc(id)}`); return { count: num(d.subscriberCount), stats: cleanStats([stat('Views', d.viewCount), stat('Videos', d.videoCount), stat('YouTube displays', d.subscriberCount)]) }
}

export async function videos(profile) {
    if (!profile.uploads) return [];
    const playlist = await json(`${base}/youtube/playlist/${enc(profile.uploads)}`);
    const ids = (playlist.items || []).map(x => x.contentDetails?.videoId).filter(Boolean).slice(0, 10);
    if (!ids.length) return [];
    const d = await json(`${base}/youtube/video/${ids.join(',')},`);
    return (d.items || []).map(v => ({
        date: v.snippet?.publishedAt?.slice(0, 10),
        title: v.snippet?.title,
        thumbnail: v.snippet?.thumbnails?.medium?.url,
        views: v.statistics?.viewCount,
        likes: v.statistics?.likeCount,
        comments: v.statistics?.commentCount,
        url: `https://www.youtube.com/watch?v=${enc(v.id)}`
    }))
}