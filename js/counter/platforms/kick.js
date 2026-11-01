import { json, stat, cleanStats, enc, num } from '../utils.js';
const url = id => `https://kick.com/api/v1/channels/${enc(id)}`;
function adapt(d) {
    return {
        name: d.user?.username || d.slug,
        handle: d.slug ? '@' + d.slug : '',
        avatar: d.user?.profile_pic, banner: d.banner_image?.url,
        count: num(d.followersCount),
        stats: cleanStats([
            stat('Live viewers', d.livestream?.viewers),
            stat('Next milestone', nextMilestone(d.followersCount))
        ]),
        links: d.slug ? [
            {
                label: 'View Kick',
                url: `https://kick.com/${enc(d.slug)}`
            },
            {
                label: 'KickStats',
                url: `https://www.kickstats.com/channels/${enc(d.slug)}`
            }
        ] : []
    }
}
function nextMilestone(n) {
    n = num(n); if (n === null) return null;
    if (n < 10) return 10;
    const size = 10 ** Math.floor(Math.log10(Math.max(n, 1)));
    return (Math.floor(n / size) + 1) * size
}
export async function load(id) {
    return adapt(await json(url(id)))
}
export async function refresh(id) {
    return adapt(await json(url(id)))
}