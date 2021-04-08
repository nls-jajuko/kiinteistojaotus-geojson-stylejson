export async function features(func, endpoint, feat, params) {
    const url = new URL(`${endpoint}/collections/${feat}/items`);
    url.searchParams.set('limit', 10);
    Object.entries(params).forEach((item) => {
        url.searchParams.set(...item)
    });

    const next = [url.toString()];
    while (next.length && next[0]) {
        await fetch(next.pop()).then(r => r.json()).then(json => {
            if (!func(json) || !json.links) {
                return;
            }
            next.push(json.links.filter(l => l.rel === 'next').map(l => l.href).pop());
        });
    }
}