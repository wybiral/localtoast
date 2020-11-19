// List of services to scan for.
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
        type: 'img',
    },
    {
        url: 'http://127.0.0.1:3306',
        name: 'MySQL (3306)',
    },
    {
        url: 'http://127.0.0.1:3689',
        name: 'Media Player DAAP (3689)',
    },
    {
        url: 'http://127.0.0.1:3690',
        name: 'SVN (3690)',
    },
    {
        url: 'http://127.0.0.1:5357',
        name: 'Microsoft Network Discovery (5357)',
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
        url: 'http://127.0.0.1:8080/assets/img/logo-horizontal.svg',
        name: 'Syncthing (8080)',
        type: 'img',
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
        name: 'Tor SOCKS Proxy (9050)',
    },
    {
        url: 'http://127.0.0.1:9051',
        name: 'Tor Controller (9051)',
    },
    {
        url: 'http://127.0.0.1:9091',
        name: 'Transmission BitTorrent Web Client (9091)',
    },
    {
        url: 'http://127.0.0.1:9150',
        name: 'Tor Browser SOCKS Proxy (9150)',
    },
    {
        url: 'http://127.0.0.1:9151',
        name: 'Tor Browser Controller (9151)',
    },
    {
        url: 'http://127.0.0.1:9200/_cat',
        name: 'ElasticSearch (9200)',
    },
    {
        url: 'http://127.0.0.1:9350',
        name: 'Brave Browser Tor Proxy (9350)',
    },
    {
        url: 'http://127.0.0.1:16423',
        name: 'Keybase (16423)',
    },
    {
        url: 'http://127.0.0.1:17600',
        name: 'Dropbox (17600)',
    },
    {
        url: 'http://127.0.0.1:19421/app_check?action=checkVersion',
        name: 'Zoom Video Conferencing (CVE-2019–13450, 19421)',
        type: 'img',
    },
    {
        url: 'http://127.0.0.1:19424/app_check?action=checkVersion',
        name: 'RingCentral Video Conferencing (CVE-2019–13450, 19424)',
        type: 'img',
    },
    {
        url: 'http://127.0.0.1:19999',
        name: 'Netdata (19999)',
    },
    {
        url: 'http://127.0.0.1:27017',
        name: 'MongoDB (27017)',
    },
    {
        url: 'http://127.0.0.1:27060',
        name: 'Steam (27060)',
    },
    {
        url: 'http://127.0.0.1:32400',
        name: 'Plex (32400)',
    },
    {
        url: 'http://192.168.1.254/images/att_globe_logo.png',
        name: 'AT&T U-verse Modem (192.168.1.254)',
        type: 'img',
    },    
    {
        url: 'http://192.168.2.1/layout/images/bell/bell_logo.png',
        name: 'Bell Home Hub 3000 (192.168.2.1)',
        type: 'img',
    },
    {
        // The router redirects 'home' to its local ip address if the user is 
        // using it for dns.
        url: 'http://home/layout/images/bell/bell_logo.png',
        name: 'Bell Home Hub 3000 (http://home)',
        type: 'img',
    },
    {
        url: 'http://fritz.box/css/rd/images/fritzLogo.svg',
        name: 'AVM FRITZ!Box (http://fritz.box)',
        type: 'img',
    },
    {
        url: 'http://fritz.box/css/rd/logos/logo_fritzDiamond.svg',
        name: 'AVM FRITZ!Box (http://fritz.box)',
        type: 'img',
    },
    {
        url: 'https://freedombox/plinth/static/theme/img/freedombox-logo-32px.png',
        name: 'FreedomBox',
        type: 'img',
    },
];

// Start scan of all services.
async function scan() {
    await Promise.all(
        services.map(x => {
            let handler;
            if (x.type === 'img') {
                handler = handleImg;
            } else {
                handler = handleFetch;
            }
            return handler(x.url).then(res => {
                const el = document.createElement('div');
                el.innerText = 'Found: ' + x.name;
                document.body.appendChild(el);
            }).catch(e => e);
        })
    );
    document.querySelector('h1').innerText = 'Results:';
}

// Handle fetch scans.
// These are limited to localhost and can only determine if the connection
// succeeded or not.
function handleFetch(url) {
    return fetch(url, {mode: 'no-cors', cache: 'no-cache'});
}

// Handle img scans.
// These allow non-localhost connections with mixed-content and are able to
// verify the presence of specific assets.
function handleImg(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = url;
    });
}

window.onload = scan;
