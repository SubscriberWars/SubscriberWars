import { json, stat, cleanStats, enc, num } from '../utils.js';
const url = id => `https://api.subscriberwars.space/vidstur/channel/${enc(id)}`;
function adapt(d) {
    return {
        name: d.channel.name || d.channel.handle,
        handle: d.channel.handle ? '@' + d.channel.handle : '',
        avatar: d.channel.avatarUrl,
        count: num(d.channel.subscribers),
        stats: cleanStats([
            stat('Views', d.channel.stats.totalViews),
            stat('Videos', d.channel.stats.videoCount)
        ]),
        links: d.channel.handle ? [
            {
                label: 'View on Vidstur',
                url: `https://vidstur.com/channel/${enc(d.channel.handle)}`
            }
        ] : []
    }
}
export async function load(id) { return adapt(await json(url(id))) }
export async function refresh(id) { return adapt(await json(url(id))) }