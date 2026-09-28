module.exports = cds.service.impl(async function() {

    const {
        AuthorSrv,
        PublisherSrv,
        BookSrv,
        CustomerSrv,
        ShoppingBasketSrv,
        ShoppingBasketBookSrv,
        WarehouseSrv,
        WarehouseBookSrv
    } = this.entities;


    // CREATE AUTHOR
    this.on('createAuthor', async (request, response) => {

        const data = request.data;

        try {

            const objTransaction = cds.tx(request);

            await objTransaction.run([
                INSERT.into(AuthorSrv).entries(data)
            ]);

            return "Author successfully created.";

        } catch (error) {

            request.error(500, error.message);

        }

    });


    // CREATE PUBLISHER
    this.on('createPublisher', async (request, response) => {

        const data = request.data;

        try {

            const objTransaction = cds.tx(request);

            await objTransaction.run([
                INSERT.into(PublisherSrv).entries(data)
            ]);

            return "Publisher successfully created.";

        } catch (error) {

            request.error(500, error.message);

        }

    });


    // CREATE CUSTOMER
    this.on('createCustomer', async (request, response) => {

        const data = request.data;

        try {

            const objTransaction = cds.tx(request);

            await objTransaction.run([
                INSERT.into(CustomerSrv).entries(data)
            ]);

            return "Customer successfully created.";

        } catch (error) {

            request.error(500, error.message);

        }

    });


    // CREATE WAREHOUSE
    this.on('createWarehouse', async (request, response) => {

        const data = request.data;

        try {

            const objTransaction = cds.tx(request);

            await objTransaction.run([
                INSERT.into(WarehouseSrv).entries(data)
            ]);

            return "Warehouse successfully created.";

        } catch (error) {

            request.error(500, error.message);

        }

    });


    // CREATE BOOK
    this.on('createBook', async (request, response) => {

        const data = request.data;

        try {

            const objTransaction = cds.tx(request);

            await objTransaction.run([
                INSERT.into(BookSrv).entries(data)
            ]);

            return "Book successfully created.";

        } catch (error) {

            request.error(500, error.message);

        }

    });


    // CREATE SHOPPING BASKET
    this.on('createShoppingBasket', async (request, response) => {

        const data = request.data;

        try {

            const objTransaction = cds.tx(request);

            await objTransaction.run([
                INSERT.into(ShoppingBasketSrv).entries(data)
            ]);

            return "Shopping Basket successfully created.";

        } catch (error) {

            request.error(500, error.message);

        }

    });


    // CREATE SHOPPING BASKET BOOK
    this.on('createShoppingBasketBook', async (request, response) => {

        const data = request.data;

        try {

            const objTransaction = cds.tx(request);

            await objTransaction.run([
                INSERT.into(ShoppingBasketBookSrv).entries(data)
            ]);

            return "Shopping Basket Book successfully created.";

        } catch (error) {

            request.error(500, error.message);

        }

    });


    // CREATE WAREHOUSE BOOK
    this.on('createWarehouseBook', async (request, response) => {

        const data = request.data;

        try {

            const objTransaction = cds.tx(request);

            await objTransaction.run([
                INSERT.into(WarehouseBookSrv).entries(data)
            ]);

            return "Warehouse Book successfully created.";

        } catch (error) {

            request.error(500, error.message);

        }

    });


    // UPDATE BOOK PRICE
    this.on('updateBook', async (request, response) => {

        const {
            ISBN,
            Price
        } = request.data;

        try {

            const objTransaction = cds.tx(request);

            await objTransaction.update(BookSrv).with({
                Price: Price
            }).where({
                ISBN: ISBN
            });

            return "Book price successfully updated.";

        } catch (error) {

            request.error(500, error.message);

        }

    });


    // DELETE BOOK
    this.on('deleteBook', async (request, response) => {

        const {
            ISBN
        } = request.data;

        try {

            const objTransaction = cds.tx(request);

            await objTransaction.delete(BookSrv).where({
                ISBN: ISBN
            });

            return "Book successfully deleted.";

        } catch (error) {

            request.error(500, error.message);

        }

    });

});