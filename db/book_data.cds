namespace bookapp.db;

entity Authors {
    key Name    : String(255);
    key Address : String(255);
    URL         : String(255);

    Books       : Association to many Books
                    on Books.AuthorName = $self;
}


entity Publishers {
    key Name    : String(255);
    Address     : String(255);
    Phone       : String(255);
    URL         : Integer;

    Books       : Association to many Books
                    on Books.PublisherName = $self;
}


entity Books {
    key ISBN        : String(255);

    PublisherName   : Association to Publishers;
    AuthorName      : Association to Authors;

    Year            : Integer;
    Title           : String(255);
    Price           : Decimal(19,0);

    ShoppingBasketBooks : Association to many ShoppingBasketBooks
                            on ShoppingBasketBooks.BookISBN = $self;

    WarehouseBooks : Association to many WarehouseBooks
                        on WarehouseBooks.BookISBN = $self;
}


entity Customers {
    key Email   : String(255);
    Name        : String(255);
    Phone       : String(255);
    Address     : String(255);

    ShoppingBaskets : Association to many ShoppingBaskets
                        on ShoppingBaskets.CustomerEmail = $self;
}


entity ShoppingBaskets {
    key ID          : Integer;

    CustomerEmail   : Association to Customers;

    ShoppingBasketBooks : Association to many ShoppingBasketBooks
                            on ShoppingBasketBooks.ShoppingBasketID = $self;
}


entity ShoppingBasketBooks {
    key ShoppingBasketID : Association to ShoppingBaskets;
    key BookISBN         : Association to Books;

    Count                : Integer;
}


entity Warehouses {
    key Code       : Integer;
    Phone          : String(255);
    Address        : String(255);

    WarehouseBooks : Association to many WarehouseBooks
                        on WarehouseBooks.WarehouseCode = $self;
}


entity WarehouseBooks {
    key WarehouseCode : Association to Warehouses;
    key BookISBN      : Association to Books;

    Count             : Integer;
}