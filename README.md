# Usage

1. Download the sample CSV and put in your data: [Sample CSV](./data/direct-debit-example.csv)
2. Use the [simple-sepa application](https://simple-sepa.c99.at) to convert
your csv into an XML file
3. Upload the XML file to your prefered online banking application

## Current limitations

The tool only works for direct debits. There's little to no safety net: Always
check your direct debit instructions before signing them!

## License

The tool is free - with "free" as in free speech. It comes with 
absolutely no warranty.

In case you have any questions or feature requests feel free to 
[contact me](https://c99.at).

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