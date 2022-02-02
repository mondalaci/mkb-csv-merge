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
        .replace(/CRV\*/g, '')
        .replace(/ Vilnius LTL/g, '')
        .replace(/ Vilnius LTU/g, '')
        .replace(/&#34;/g, '"')
        .replace(/&#34;/g, '"')
        .replace(/&#38;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/A'/g, "Á")
        .replace(/E'/g, "É")
        .replace(/I'/g, "Í")
        .replace(/O'/g, "Ó")
        .replace(/O:/g, "Ö")
        .replace(/O"/g, "Ő")
        .replace(/U'/g, "Ú")
        .replace(/U:/g, "Ü")
        .replace(/U"/g, "Ű")
        .replace(/"/g, "")
        .split('\n');
    const csvLines = lines.slice(4);
    for (const line of csvLines) {
        const matches = line.match(/^\d+;(.*)/);
        if (matches) {
            const match = matches[1].replace(/;[^;]*\*\*\*\*\*\*[^;]*;/, ';;'); // Clean redundant transaction comments
            let [date, type, account, merchant, merchantAccount, bic, country, transactionId, amount, currency, note] = match.split(';');
            if (merchant === 'N/A' && !note) {
                note = type;
            }
            const record = `${date};${merchant};${amount};${currency};${note}`;
            if (!allRecords.includes(record)) {
                allRecords.push(record);
            }
        }
    }
}

for (const record of allRecords) {
    console.log(record);
}
