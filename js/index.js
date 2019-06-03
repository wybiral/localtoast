const services = [
    {
        url: 'http://127.0.0.1:80',
        name: 'HTTP (80)',
    },
    {
        url: 'http://127.0.0.1:631',
        name: 'Printing (631)',
    },
    {
        url: 'http://127.0.0.1:3000/img/gitea-lg.png',
        name: 'Gitea (3000)',
    },
    {
        url: 'http://127.0.0.1:3306',
        name: 'MySQL (3306)',
    },
    {
        url: 'http://127.0.0.1:3690',
        name: 'SVN (3690)',
    },
    {
        url: 'http://127.0.0.1:6006/data/environment',
        name: 'TensorBoard (6006)',
    },
    {
        url: 'http://127.0.0.1:6379',
        name: 'Redis (6379)',
    },
    {
        url: 'http://127.0.0.1:8000',
        name: 'HTTP (8000)',
    },
    {
        url: 'http://127.0.0.1:8080',
        name: 'HTTP (8080)',
    },
    {
        url: 'http://127.0.0.1:8112',
        name: 'Deluge BitTorrent Web UI (8112)',
    },
    {
        url: 'http://127.0.0.1:8888',
        name: 'HTTP (8888)',
    },
    {
        url: 'http://127.0.0.1:9050',
        name: 'Tor Controller (9050)',
    },
    {
        url: 'http://127.0.0.1:9051',
        name: 'Tor SOCKS Proxy (9051)',
    },
    {
        url: 'http://127.0.0.1:9091',
        name: 'Transmission BitTorrent Web Client (9091)',
    },
    {
        url: 'http://127.0.0.1:9150',
        name: 'Tor Browser Controller (9150)',
    },
    {
        url: 'http://127.0.0.1:9151',
        name: 'Tor Browser SOCKS Proxy (9151)',
    },
    {
        url: 'http://127.0.0.1:9200/_cat',
        name: 'ElasticSearch (9200)',
    },
    {
        url: 'http://127.0.0.1:16423',
        name: 'Keybase (16423)',
    },
    {
        url: 'http://127.0.0.1:27017',
        name: 'MongoDB (27017)',
    },
    {
        url: 'http://127.0.0.1:32400',
        name: 'Plex (32400)',
    },
];

async function worker() {
    await Promise.all(
        services.map(({ url, name }) =>
            fetch(url, { mode: 'no-cors', cache: 'no-cache' }).then(resp => {
                const el = document.createElement('div');
                el.innerText = 'Found: ' + name;
                document.body.appendChild(el);
            }).catch(e => e)
        )
    );
    document.querySelector('h1').innerText = 'Results:';
}

window.onload = () => {
    // Start workers
    setTimeout(worker, 0);
};
