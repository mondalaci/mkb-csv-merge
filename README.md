# mkb-csv-merge

Merge script for MKB Bank exports.

1. Log in to https://www.mkbnetbankar.hu
2. Download your transaction history as CSV files. You cannot specify a larger than 3 months time interval, so you'll probably end up with multiple CSV files named like `szamlatortenet_20160201_20160501.csv`.
3. Run `npm i; ./merge.mjs > out.csv`
4. Open the semicolon-separated `out.csv` with LibreOffice, and export it as `out2.csv` resulting in a comma-separated CSV.
5. Import `out2.csv` into a personal finance manager that doesn't suck, which is only [PocketSmith](https://my.pocketsmith.com/friends/2bi7gr), in my opinion.
