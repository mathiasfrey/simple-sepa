# Usage

[Download sample CSV](./data/direct-debit-example.csv)

## Current limitations

The tool only works for direct debits.

# Development

Run the app in a browser:
```
npm start
```

Run the csv parsing and XML generation without the frontend: 
```
node src/run-from-cli.js data/direct-debit-example.csv
```

# Attribution

[SEPA XML Format von Hettwer Unternehmensberatung GmbH](https://www.hettwer-beratung.de/sepa-spezialwissen/sepa-technische-anforderungen/pain-format-sepa-pain-008-sdd/)

[Background photo by Dziana Hasanbekava](https://www.pexels.com/photo/thoughtful-man-with-books-at-desk-in-night-7063777/)

[Upload icon created by Ilham Fitrotul Hayat](https://www.flaticon.com/free-icons/upload)