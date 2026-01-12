'use strict';

const fs = require('fs');

const data = fs.readFileSync(0, 'utf8').split(/\s+/);
let idx = 0;

const T = Number(data[idx++]);
let ans = [];

for (let _ = 0; _ < T; _++) {
    const s = data[idx++];
    const t = data[idx++];

    let freq = Array(26).fill(0);
    for (let ch of t) freq[ch.charCodeAt(0) - 97]++;

    let possible = true;
    for (let ch of s) {
        let id = ch.charCodeAt(0) - 97;
        if (freq[id] === 0) {
            possible = false;
            break;
        }
        freq[id]--;
    }

    if (!possible) {
        ans.push("Impossible");
        continue;
    }

    let res = [];
    let first = s.charCodeAt(0) - 97;

    // chars smaller than s[0]
    for (let i = 0; i < first; i++) {
        if (freq[i] > 0) {
            res.push(String.fromCharCode(97 + i).repeat(freq[i]));
            freq[i] = 0;
        }
    }

    // add s
    res.push(s);

    // remaining chars
    for (let i = 0; i < 26; i++) {
        if (freq[i] > 0) {
            res.push(String.fromCharCode(97 + i).repeat(freq[i]));
        }
    }

    ans.push(res.join(''));
}

console.log(ans.join('\n'));

