#!/usr/bin/env node
import fs from 'node:fs';
import iconv from 'iconv-lite';
import shelljs from 'shelljs';
const {ls} = shelljs;

const files = ls('szamlatortenet_*.csv');
const allRecords = [];
for (const file of files) {
    const outBuffer = fs.readFileSync(file);
    const lines = iconv.decode(outBuffer, 'iso-8859-2')
        .replace(/&#34;/g, '"')
        .replace(/&#38;/g, "&")
        .replace(/&#39;/g, "'")
        .split('\n');
    const csvLines = lines.slice(4);
    for (const line of csvLines) {
        const matches = line.match(/^\d+;(.*)/);
        if (line) {
            const match = matches[1].replace(/;[^;]*\*\*\*\*\*\*[^;]*;/, ';;'); // Clean redundant transaction comments
            if (!allRecords.includes(match)) {
                allRecords.push(match);
            }
        }
    }
}

for (const record of allRecords) {
    console.log(record);
}
