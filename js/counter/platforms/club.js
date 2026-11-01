import { json, stat, cleanStats, enc, num } from '../utils.js';
const url = id => `https://api.subscriberwars.space/club/user/${enc(id)}`;
function adapt(d) {
    return {
        name: d.title,
        handle: d.slug ? '@' + d.slug : '',
        avatar: d.pfp,
        banner: d.banner,
        count: num(d.followers),
        stats: cleanStats([
            stat('Following', d.following),
            stat('Next milestone', nextMilestone(d.followers))
        ]),
        links: d.slug ? [
            {
                label: 'View on Club',
                url: `https://club.com/${enc(d.slug)}`
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