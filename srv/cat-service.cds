// ACTION in tbis file


using { ponew.db as database } from '../db/ponewdata';

using { ponew.common as common } from '../db/ponew';

service CatalogService {

    // Master data which is in Master Context //services
    entity EmployeeSrv as projection on database.master.Employees {
        *
    } actions {

        // Instance Bounded Action : Increase employee salary by 15%
        action increaseEmployeeSalary() returns array of EmployeeSrv;

        // Instance Bounded Function : Top 20 highest paid employees
        function highestPaidEmployees() returns array of EmployeeSrv;
    };
    

    entity ProductSrv as projection on database.master.Products {
    *
} actions {

    // Instance Bounded Action : Increase the product price by 10%
    action increaseProductPrice() returns array of ProductSrv;

    // Instance Bounded Function : Show top 20 products where price is high to low
    function highestPriceProducts() returns array of ProductSrv;
};


    entity BusinessPartnerSrv as projection on database.master.BusinessPartners;

    entity AddressSrv as projection on database.master.Addresses;


    // Transactional data which is in Transaction context
    entity PurchaseOrderSrv as projection on database.transaction.PurchaseOrders {
    *
} actions {

    // Declare instance bounded action
    action discountPrice() returns array of PurchaseOrderSrv;

    // Declare instance bounded function
    function largestOrder() returns array of PurchaseOrderSrv;
};

    entity PurchaseItemSrv as projection on database.transaction.PurchaseItems;


    // for inserting any record, we need use create action 
    action createEmployee(
    Currency_code: String(3),
    ID: UUID,
    accountNumber: common.String32,
    bankId: String(16),
    bankName: common.String64,
    email: common.Email,
    gender: common.Gender,
    language: String(2),
    loginName: String(16),
    nameFirst: common.String64,
    nameInitials: common.String64,
    nameLast: common.String64,
    nameMiddle: common.String64,
    phoneNumber: common.PhoneNumber,
    salaryAmount: common.AmountT
) returns array of EmployeeSrv;


action createAddress(         // insert
    NODE_KEY: common.Guid,
    ADDRESS_TYPE: common.String32,
    VAL_START: Date,
    VAL_END: Date,
    LATITUDE: Decimal(9,6),
    LONGITUDE: Decimal(9,6)
) returns array of AddressSrv;

action updateEmployee(     
    ID : UUID,
    salaryAmount: common.AmountT,
    Currency_code: String(3)
) returns String;

action updateProduct(
    NODE_KEY : common.Guid,
    PRICE : Decimal(15,2)
) returns String;

action deleteEmployee(
    ID : UUID
) returns String;

// Custom Function Declaration
function getHighestSalariedEmployees() returns array of EmployeeSrv;

// Utility Functions

function getUtilities() returns String;
}




