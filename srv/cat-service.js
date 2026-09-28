//  LOGIC in this file

module.exports = cds.service.impl(async function() {
    const { uuid, exists, isdir, decodeURI, mkdir, read } = cds.utils;

    const { EmployeeSrv, AddressSrv, ProductSrv, PurchaseItemSrv, PurchaseOrderSrv, BusinessPartnersSrv, PoItemsSrv } = this.entities;

    // Implementation of an action
    // There are 3 generic handlers
    // .before() : Pre-check and validation
    // .on() : Performing DB operations
    // .after() : To save / close connections
    this.before('UPDATE', EmployeeSrv, async (request, response) => {

    const salaryAmt = request.data.salaryAmount;

    if (salaryAmt > 100000) {
        request.error(500, 'Please get the approval from your line manager.');
    }
});

    // Validation 1 : Check Purchase Item Gross Amount
    // If USD amount is greater than 15000, contact line manager
    // If EUR amount is greater than 10000, contact regional head


    this.before('UPDATE', PurchaseItemSrv, async (request, response) => {

        const grossAmount = request.data.GROSS_AMOUNT;
        const currency = request.data.CURRENCY_code;

        if (currency === 'USD' && grossAmount > 15000) {
            return request.reject(500, 'Please get in touch with your line manager');
        }

        if (currency === 'EUR' && grossAmount > 10000) {
            return request.reject(500, 'Please check with your regional head');
        }

    });


    // Validation 2 : Check Country in Address
    // Only US and GB are allowed
    // For any other country, display an error message

    this.before('UPDATE', AddressSrv, async (request, response) => {

        const country = request.data.COUNTRY;

        if (country && country !== 'US' && country !== 'GB') {
            request.error(500, 'Please contact your administrator');
        }

    });


    // Validation 3 : Check Employee Phone Number
    // Only US (+1) and GB (+44) country codes are allowed
    // If any other country code is given, do not allow the update

    this.before('UPDATE', EmployeeSrv, async (request, response) => {

        const phoneNumber = request.data.phoneNumber;

        if (phoneNumber) {

            if (!phoneNumber.startsWith('+1') && !phoneNumber.startsWith('+44')) {
                request.error(500, 'Unable to update the mobile number');
            }

        }

    });


    // Validation 4 : Check Business Partner Company Name
    // Company name should not contain comma, dot or hyphen
    // If special characters are present, display an error message

    this.before('UPDATE', BusinessPartnersSrv, async (request, response) => {

        const companyName = request.data.COMPANY_NAME;

        if (companyName && /[,.\-]/.test(companyName)) {
            request.error(500, 'Invalid company name');
        }

    });



    // Validation 5 : Check Purchase Item Position
    // Position should be a multiple of 10
    // Valid positions are 10, 20, 30, 40, 50, etc.

    this.before('UPDATE', PurchaseItemSrv, async (request, response) => {

        const position = request.data.PO_ITEM_POS;

        if (position !== undefined && position % 10 !== 0) {
            request.error(500, 'Position should be a multiple of 10');
        }

    });







    this.before('UPDATE', PurchaseItemSrv, async (request, response) => {

        const grossAmount = request.data.GROSS_AMOUNT;
        const currency = request.data.CURRENCY_code;

        if (currency === 'USD' && grossAmount > 15000) {
            request.error(500, 'Please get in touch with your line manager');
        }

        if (currency === 'EUR' && grossAmount > 10000) {
            request.error(500, 'Please check with your regional head');
        }

    });


    this.on('createEmployee', async(request, response) => {

        // Step-2 : Get the data which is coming form the API
        const empData = request.data;

        // Step - 3 : Instanteiate the transaction object
        const objTransaction = cds.tx(request);
    

        // Step - 4 : Insert the record into database
        let returnData = await objTransaction.run([
            INSERT.into(EmployeeSrv).entries(empData)
        ]).then((resolve, reject) => {
            if(typeof(resolve) !== undefined){
                return request.data
            } else {
                request.error(500, "Error in inserting data into the database")
            }
        }).catch(err => {
            request.error("There is an error : ", err.toString())
        })

        // Step - 5 : Return the data
        return returnData;
    })
    this.on('updateEmployee', async (request, response) => {

    const {
        ID,    // whatever fields we are giving in cat-service.cds, that only we need to enter here 
        salaryAmount,
        Currency_code
    } = request.data;

    try {
        const objTransaction = cds.tx(request);

        await objTransaction.update(EmployeeSrv).with({
            salaryAmount: salaryAmount,
            Currency_code: Currency_code
        }).where({
            ID: ID
        });

        return "Successfully updated.";

    } catch (error) {
        request.error("Error : ", error);
    }

});
    this.on('updateProduct', async (request, response) => {

    const {
        NODE_KEY,
        PRICE
    } = request.data;

    try {
        const objTransaction = cds.tx(request);

        await objTransaction.update(ProductSrv).with({
            PRICE: PRICE
        }).where({
            NODE_KEY: NODE_KEY
        });

        return "Product price successfully updated.";

    } catch (error) {
        request.error("Error : ", error);
    }

});
    this.on('deleteEmployee', async (request, response) => {
    const {
        ID
    } = request.data;

    try {
        const objTransaction = cds.tx(request);

        await objTransaction.delete(EmployeeSrv).where({
            ID: ID
        })

        return "Successfully deleted.";

    } catch (error) {
        request.error("Error : ", error)
    }
    });

    // Implementation of custom function
    this.on('getHighestSalariedEmployees', async (request, response) => {
        try {

            // Step - 1 : Create an object for the transaction
            const transaction = cds.tx(request);

            // Step - 2 : Get salaries of an employee using Transaction object
            const response = await transaction.read(EmployeeSrv).orderBy({
                salaryAmount : 'desc'
            }).limit(10);

            // Step - 3 : Display the employee salaries
            return response;

        } catch (error) {
            request.error("Error : ", error)
        }
    })
        this.on('discountPrice', async(request, response) => {
        try {
            // Step-1 : Get the parameter form the entity
            const ID = request.params[0];

            // Step-2 : Creating object for transaction service using request
            const transaction = cds.tx(request);

            // Step-3 : Update the purchase order service
            await transaction.update(PurchaseOrderSrv).with({
                GROSS_AMOUNT : {
                    '-=' : 1000
                },
                NET_AMOUNT : {
                    '-=' : 800
                },
                TAX_AMOUNT : {
                    '-=' : 200
                }
            }).where(ID)

            const updatePOInfo = await transaction.read(PurchaseOrderSrv);

            return updatePOInfo;

        } catch (error) {
            return "Error : " + error.toString();
        }
    })
    this.on('largestOrder', async(request, response) => {
            try {

                // Step-2 : Creating object for transaction service using request
                const transaction = cds.tx(request);

                const reply = await transaction.read(PurchaseOrderSrv).orderBy({
                    GROSS_AMOUNT : 'desc'
                }).limit(5);

                return reply;

            } catch (error) {
                return "Error : " + error.toString();
            }
        })


        
    // Instance Bounded Action : Increase the product price by 10%
    this.on('increaseProductPrice', async (request, response) => {
            try {

                // Step-1 : Get the parameter from the entity
                const ID = request.params[0];

                // Step-2 : Create transaction object
                const transaction = cds.tx(request);

                // Step-3 : Read the selected product
                const product = await transaction.read(ProductSrv)
                    .where(ID);

                // Step-4 : Calculate 10% increased price
                const newPrice = Number(product[0].PRICE) * 1.10;

                // Step-5 : Update product price
                await transaction.update(ProductSrv).with({
                    PRICE: newPrice
                }).where(ID);

                // Step-6 : Display updated product
                const updatedProduct = await transaction.read(ProductSrv)
                    .where(ID);

                return updatedProduct;

            } catch (error) {
                return "Error : " + error.toString();
            }
        })
    // Instance Bounded Function : Show top 20 products where price is high to low
    this.on('highestPriceProducts', async (request, response) => {
            try {

                // Step-1 : Create transaction object
                const transaction = cds.tx(request);

                // Step-2 : Get top 20 products from highest price to lowest price
                const reply = await transaction.read(ProductSrv).orderBy({
                    PRICE : 'desc'
                }).limit(20);

                // Step-3 : Display the products
                return reply;

            } catch (error) {
                return "Error : " + error.toString();
            }
        })

        // Instance Bounded Action : Increase employee salary by 15%
        
    this.on('increaseEmployeeSalary', async (request, response) => {
    try {

        const ID = request.params[0];

        const transaction = cds.tx(request);

        const employee = await transaction.read(EmployeeSrv).where(ID);

        const newSalary = Number(employee[0].salaryAmount) * 1.15;

        await transaction.update(EmployeeSrv).with({
            salaryAmount: newSalary
        }).where(ID);

        const updatedEmployee = await transaction.read(EmployeeSrv).where(ID);

        return updatedEmployee;

    } catch (error) {
        return "Error : " + error.toString();
    }
})



// Instance Bounded Function : Top 20 highest paid employees
    this.on('highestPaidEmployees', async (request, response) => {
            try {

                const transaction = cds.tx(request);

                const reply = await transaction.read(EmployeeSrv).orderBy({
                    salaryAmount : 'desc'
                }).limit(20);

                return reply;

            } catch (error) {
                return "Error : " + error.toString();
            }
        })
    // Utility Variables
    this.on('getUtilities', async (request, response) => {

        let vUUID = uuid(),
            vPackageContent = null,
            vInput = "%E0%A4%A",
            uri,
            dirExists = false,
            isFileExists = false;

        // Exists
        if (exists('srv/request.http')) {
            isFileExists = true;
        }

        // Is directory exists or not
        if (isdir('app')) {
            dirExists = true;
        }

        // Decode URI
        try {
            uri = decodeURI(vInput);

            // Make Directory
            await mkdir('srv/lib');

        } catch {
            uri = vInput;
        }

        vPackageContent = await read('package.json');

        // Final Value
        var finalValue = {
            uuid: vUUID,
            uri: uri,
            isFileExists: isFileExists,
            dirExists: dirExists,
            packageInfo: vPackageContent
        }

        return finalValue;
    })



        
});


