import { config } from './config.js'; import { num } from './utils.js';
const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search);
const platform = (params.get('platform') || 'youtube').toLowerCase();
const id = params.get('channel') || params.get('id');
const mode = params.get('type') || 'api';
const cfg = config[platform];
let chart, adapter, profile, lastCount = null, busy = false;
function error(message) { $('error').textContent = message; $('error').hidden = !message }
function setImage(el, url) { if (url) { el.src = url; el.hidden = false } else { el.hidden = true } }
function renderStats(items) {
    if (!items) return;

    const container = $('stats');

    const validItems = items.filter(item =>
        item?.value !== null &&
        item?.value !== undefined &&
        Number.isFinite(Number(item.value))
    );

    // Keep track of existing statistic cards
    const existingCards = new Map();

    container.querySelectorAll('.stat').forEach(card => {
        existingCards.set(card.dataset.label, card);
    });

    const activeLabels = new Set();

    for (const item of validItems) {
        const label = String(item.label);
        const count = Number(item.value);

        activeLabels.add(label);

        let card = existingCards.get(label);
        let value;

        // Create the card if it doesn't already exist
        if (!card) {
            card = document.createElement('div');
            card.className = 'stat';
            card.dataset.label = label;

            value = document.createElement('div');
            value.className = 'stat-value odometer';
            value.textContent = '0';

            const labelElement = document.createElement('div');
            labelElement.className = 'stat-label';
            labelElement.textContent = label;

            card.append(value, labelElement);
            container.append(card);

            // Initialise Odometer
            const odometer = new Odometer({
                el: value,
                value: 0,
                format: '(,ddd)',
                duration: 1000
            });

            card.odometer = odometer;
        }

        // Update the existing Odometer
        card.odometer?.update(count);
    }

    // Remove statistics that are no longer available
    container.querySelectorAll('.stat').forEach(card => {
        if (!activeLabels.has(card.dataset.label)) {
            card.remove();
        }
    });
}
function renderLinks(items) {
    $('links').replaceChildren(); for (const item of items || []) {
        if (!item.url) continue;
        const a = document.createElement('a'); a.textContent = item.label; a.href = item.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; $('links').append(a)
    }
}
function updateCount(value) {
    const n = num(value);
    if (n === null) return;

    // Only update the counter when the value changes
    if (n !== lastCount) {
        $('count').textContent = String(n);
        lastCount = n;
    }

    // Always add a point to Highcharts
    if (chart) {
        const s = chart.series[0];
        s.addPoint([Date.now(), n], true, s.data.length >= 900);
    }

    // Always save history, even if the count hasn't changed
    saveHistory(n);
}
const key = `sw:counter:${platform}:${id}:${mode}`;

function history() {
    try {
        return (JSON.parse(localStorage.getItem(key)) || []).filter(p => Array.isArray(p) && p[0] > Date.now() - 3600000 && Number.isFinite(p[1])).slice(-900)
    } catch { return [] }
}
function saveHistory(n) {
    try {
        const arr = history();
        arr.push([Date.now(), n]);
        localStorage.setItem(key, JSON.stringify(arr.slice(-900)))
    } catch { }
}
function initChart() {
    if (!window.Highcharts) { $('graph').hidden = true; return } chart = Highcharts.chart('graph', { chart: { type: 'spline', backgroundColor: 'transparent', animation: false }, title: { text: null }, credits: { enabled: false }, legend: { enabled: false }, time: { useUTC: true }, xAxis: { type: 'datetime', labels: { style: { color: '#aaa' } } }, yAxis: { title: { text: null }, labels: { style: { color: '#aaa' } } }, tooltip: { valueDecimals: 0 }, plotOptions: { series: { animation: false, marker: { enabled: false } } }, series: [{ name: cfg.unit, data: history(), color: cfg.accent }] })
} 
function renderProfile(p) { $('title').textContent = p.name || id; $('handle').textContent = p.handle || ''; document.title = `${p.name || id} — Live ${cfg.unit} | Subscriber Wars`; setImage($('avatar'), p.avatar); if (p.banner) setImage($('banner'), p.banner); else $('banner').hidden = true; renderStats(p.stats); renderLinks(p.links); updateCount(p.count) } function renderVideos(rows) { if (!rows?.length) return; const hasLikes = rows.some(r => r.likes !== undefined); const hasComments = rows.some(r => r.comments !== undefined); const cols = [['date', 'Published'], ['thumbnail', 'Thumbnail'], ['title', 'Title'], ['views', 'Views'], ...(hasLikes ? [['likes', 'Likes']] : []), ...(hasComments ? [['comments', 'Comments']] : [])]; const head = document.createElement('tr'); for (const [, label] of cols) { const th = document.createElement('th'); th.textContent = label; head.append(th) } $('videos-head').replaceChildren(head); $('videos-body').replaceChildren(); for (const row of rows) { const tr = document.createElement('tr'); for (const [key] of cols) { const td = document.createElement('td'); if (key === 'thumbnail' && row.thumbnail) { const img = document.createElement('img'); img.src = row.thumbnail; img.alt = 'Video thumbnail'; img.loading = 'lazy'; td.append(img) } else if (key === 'title' && row.url) { const a = document.createElement('a'); a.href = row.url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = row.title || 'Watch video'; td.append(a) } else td.textContent = typeof row[key] === 'number' ? row[key].toLocaleString('en-GB') : (row[key] ?? '—'); tr.append(td) } $('videos-body').append(tr) } $('videos-section').hidden = false } async function tick() { if (busy) return; busy = true; try { const d = await adapter.refresh(id, mode, profile); updateCount(d.count); if (d.stats) renderStats(d.stats); error('') } catch (e) { console.error(e); error(`Latest update failed: ${e.message}. Retrying automatically.`) } finally { busy = false } } async function start() {
    if (!cfg) { error('Unsupported platform. Use youtube, tiktok, instagram, twitch, kick or x.'); return }
    if (!id) { error('Missing channel parameter. Example: ?platform=youtube&channel=UC...'); return }
    document.documentElement.style.setProperty('--accent', cfg.accent);
    $('page-heading').textContent = `${cfg.label} Live ${cfg.unit} Count`; $('count-label').textContent = cfg.unit; try {
        adapter = await import(`./platforms/${platform}.js`); profile = await adapter.load(id, mode); initChart(); renderProfile(profile); error(''); if (adapter.videos) adapter.videos(profile).then(renderVideos).catch(e => console.warn('Videos unavailable:', e));
        setInterval(tick, cfg.interval)
    } catch (e) { console.error(e); error(`Unable to load ${cfg.label} channel: ${e.message}`) }
} start();