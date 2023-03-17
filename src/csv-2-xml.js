// https://www.hettwer-beratung.de/sepa-spezialwissen/sepa-technische-anforderungen/pain-format-sepa-pain-008-sdd/

const CSVToArray = require("./csv-2-array.js");

function Header (msgId, txs, sum_in_cents, name, isodt) {
  return `<GrpHdr>
    <MsgId>${msgId}</MsgId>
    <CreDtTm>${isodt}</CreDtTm>
    <NbOfTxs>${txs}</NbOfTxs>
    <CtrlSum>${sum_in_cents / 100}</CtrlSum>
    <InitgPty>
      <Nm>${name}</Nm>
    </InitgPty>
  </GrpHdr>`
}

function PmtInfArray(arr) {
  // that's a simple wrapper around PmtInf

  // let's create a fun and human-readable Id
  const PmtInfId = 
  ['amazing', 'blessed', 'durable', 'engaged', 'hellish'][Math.floor(Math.random()*5)] +
  ['manatee', 'octopus', 'penguin', 'buffalo', 'axolotl'][Math.floor(Math.random()*5)] +
  'from' +
  ['western', 'unfunny', 'tainted', 'riddled', 'likable'][Math.floor(Math.random()*5)] +
  ['albania', 'belgium', 'jamaica', 'denmark', 'namibia'][Math.floor(Math.random()*5)];
  console.log('Your payment info Id is', PmtInfId);

  var str = '';
  for (let i in arr) {
    str += PmtInf(arr[i], PmtInfId);
  }
  return str;
}

function PmtInf(data, PmtInfId) {
  // console.log(data);
  return `<PmtInf>
    <PmtInfId>${PmtInfId}</PmtInfId>
    <PmtMtd>DD</PmtMtd>
    <PmtTpInf>
      <SvcLvl>
        <Cd>SEPA</Cd>
      </SvcLvl>
      <LclInstrm>
        <Cd>B2B</Cd>
      </LclInstrm>
      <SeqTp>${data.SeqTp}</SeqTp>
    </PmtTpInf>
    <ReqdColltnDt>${data.ReqdColltnDt}</ReqdColltnDt>
    <Cdtr>
      <Nm>${data.Cdtr}</Nm>
    </Cdtr>
    <CdtrAcct>
      <Id>
        <IBAN>${data.CdtrAcct_IBAN}</IBAN>
      </Id>
      <Ccy>EUR</Ccy>
    </CdtrAcct>
    <CdtrAgt>
      <FinInstnId>
        <BIC>${data.CdtrAgt_BIC}</BIC>
      </FinInstnId>
    </CdtrAgt>
    <ChrgBr>SLEV</ChrgBr>
    <DrctDbtTxInf>
      <PmtId>
        <EndToEndId>NOTPROVIDED</EndToEndId>
      </PmtId>
      <InstdAmt Ccy="EUR">${data.InstdAmt}</InstdAmt>
      <DrctDbtTx>
        <MndtRltdInf>
          <MndtId>${data.MndtId}</MndtId>
          <DtOfSgntr>${data.DtOfSgntr}</DtOfSgntr>
        </MndtRltdInf>
        <CdtrSchmeId>
          <Id>
            <PrvtId>
              <Othr>
                <Id>${data.CdtrSchmeId}</Id>
                <SchmeNm>
                  <Prtry>SEPA</Prtry>
                </SchmeNm>
              </Othr>
            </PrvtId>
          </Id>
        </CdtrSchmeId>
      </DrctDbtTx>
      <DbtrAgt>
        <FinInstnId>
          <Othr>
            <Id>NOTPROVIDED</Id>
          </Othr>
        </FinInstnId>
      </DbtrAgt>
      <Dbtr>
        <Nm>${data.Nm}</Nm>
      </Dbtr>
      <DbtrAcct>
        <Id>
          <IBAN>${data.DbtrAcct_IBAN}</IBAN>
        </Id>
      </DbtrAcct>
      <RmtInf>
        <Ustrd>${data.Ustr}</Ustrd>
      </RmtInf>
    </DrctDbtTxInf>
  </PmtInf>`
}

function CSV2XML(input) {

    // variables that are populated by looping the csv data
    var txs = 0;
    var sum_in_cents = 0;

    var processedData = [];

    function processData(data) {
      function escapeXml(unsafe) {
        return unsafe.replace(/[<>&'"]/g, function (c) {
            switch (c) {
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '&': return '&amp;';
                case '\'': return '&apos;';
                case '"': return '&quot;';
                default: return '';
            }
        });
      }

      // turns "34,01" into 3401 to avoid floating point mayhem
      const _amount = parseFloat(data[10].replace(',','.')) * 100;

      processedData.push(
        {
          // creditor
          "Cdtr": data[0], 
          "CdtrSchmeId": data[1],
          "CdtrAcct_IBAN": data[2],
          "CdtrAgt_BIC": data[3],

          "MndtId": data[4],
          "DtOfSgntr": data[5],
          
          // debitor
          "Nm": escapeXml(data[6]),
          "ReqdColltnDt": data[7],
          "SeqTp": data[8],
          "DbtrAcct_IBAN": data[9],

          // actual DD data
          "InstdAmt": _amount / 100,
          "Ustr": escapeXml(data[11]),
        }
      );

      // running balance + trx count
      txs++;
      sum_in_cents = sum_in_cents + _amount;
    }


    // parse raw CSV data
    // console.log(input);
    const data = CSVToArray.CSVToArray(input,";");

    // identify all global fields regardless of transactions
    // generate a message id random w' length 14
    const _length = 14;
    const msgId = Math.floor(10**(_length-1) + Math.random() * 9*10**(_length-1));
    const name = data[1][5]; // must be the same for any row
    const isodt = new Date().toISOString();

    console.log('Generating message with ID', msgId, 'for company', name);

    // loop over transactions
    // console.log(data);
    data.slice(1).forEach(processData); // skip the first row

    console.log('Processed data:', processedData);

    return `<?xml version="1.0" encoding="UTF-8"?>
    <Document xmlns="ISO:pain.008.001.02:APC:STUZZA:payments:004" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="ISO:pain.008.001.02:APC:STUZZA:payments:004 ISO.pain.008.001.02.austrian.004.xsd">
    <CstmrDrctDbtInitn>
      ${Header(msgId, txs, sum_in_cents, name, isodt)}
      ${PmtInfArray(processedData)}
    </CstmrDrctDbtInitn>
  </Document>
  `;
}

module.exports = { CSV2XML: CSV2XML };
