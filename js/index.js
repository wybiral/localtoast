const ports = [
    [80,    'HTTP'],
    [631,   'Printing'],
    [3306,  'MySQL'],
    [3690,  'SVN'],
    [6006,  'TensorBoard'],
    [6379,  'Redis'],
    [8000,  'HTTP'],
    [8080,  'HTTP'],
    [8888,  'HTTP'],
    [9050,  'Tor Controller'],
    [9051,  'Tor SOCKS Proxy'],
    [9150,  'Tor Browser Controller'],
    [9151,  'Tor Browser SOCKS Proxy'],
    [9200,  'ElasticSearch'],
    [16423, 'Keybase'],
    [27017, 'MongoDB'],
    [32400, 'Plex'],
];

// Array of [address, description] pairs to be scanned
const scanlist = [];

window.onload = () => {
    // Create scanlist
    addHost('127.0.0.1');
    // Shake it up
    shuffle(scanlist);
    // Start workers
    for (let i = 0; i < 10; i++) {
        setTimeout(worker, 0);
    }
};

function worker() {
    if (scanlist.length == 0) {
        return;
    }
    const x = scanlist.pop();
    const addr = x[0];
    fetch(addr, {mode: 'no-cors'}).then(resp => {
        const el = document.createElement('div');
        el.innerText = 'Found: ' + x[0] + ' (' + x[1] + ')';
        document.body.appendChild(el);
        setTimeout(worker, 0);
    }).catch(err => {
        // ¯\_(ツ)_/¯
        setTimeout(worker, 0);
    });
}

// Add all known ports to scanlist for host
function addHost(host) {
    ports.forEach(x => {
        scanlist.push(['http://' + host + ':' + x[0], x[1]]);
    });
}

// Shuffle array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = 0 | Math.random() * (i + 1);
        const x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
