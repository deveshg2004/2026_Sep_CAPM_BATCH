// original code:

// namespace poapplication.common;

// type nameStr : String(50);

// aspect address {
//     drno     : String(20);
//     street   : nameStr;
//     landmark : nameStr;
//     city     : String(100);
//     postal   : Integer;
//     state    : String(100);
//     country  : String(100);
//     region   : String(20);
// }


// aspect feeasp {
//     gross_fee : Decimal(10,2);
//     tax : Decimal(10,2);
//     total_fee : Decimal(10,2);
//     currency : String(10);
// }


// modified code:
namespace poapplication.common;

using { Country, Currency } from '@sap/cds/common';

type nameStr : String(50);

aspect address {
    drno : String(20);
    street : nameStr;
    landmark : nameStr;
    city : String(100);
    postal : Integer;
    state : String(100);
    country : Country;
    region : String(20);
}

type AmountT : Decimal(10,2) @(
Semantics.amount.currencyCode : 'CURRENCY_CODE',
sap.unit : 'CURRENCY_CODE'
);

type PhoneNumber : String(20) @assert.format : '^(?:(?:\+|00)?91[\-\s]?)?[6-9]\d{9}$';

aspect feeasp {
    fee: AmountT;
    gross_fee : AmountT;
    tax : AmountT;
    total_fee : AmountT;
    currency : Currency;
}


type status : String enum {
    SUBMITTED;
    APPROVED;
    ISSUED;
    REJECTED;
    } default 'SUBMITTED';

type gender: String enum {
    Male;
    Female;
}

