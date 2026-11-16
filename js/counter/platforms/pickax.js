import { json, stat, cleanStats, enc, num } from '../utils.js';
const url = id => `https://api.subscriberwars.space/pickax/user/${enc(id)}`;
function adapt(d) {
    return {
        name: d.title,
        handle: d.slug ? '@' + d.slug : '',
        avatar: d.icon,
        banner: d.banner,
        count: num(d.counts.followers),
        stats: cleanStats([
            stat('Picks', d.counts.picks),
            stat('posts', d.counts.posts)
        ]),
        links: d.slug ? [
            {
                label: 'View on Pickax',
                url: `https://pickax.com/${enc(d.slug)}`
            }
        ] : []
    }
}
export async function load(id) { return adapt(await json(url(id))) }
export async function refresh(id) { return adapt(await json(url(id))) }