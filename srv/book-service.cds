using { bookapp.db as database } from '../db/book_data';

service BookService {

    entity AuthorSrv as projection on database.Authors;

    entity PublisherSrv as projection on database.Publishers;

    entity BookSrv as projection on database.Books;

    entity CustomerSrv as projection on database.Customers;

    entity ShoppingBasketSrv as projection on database.ShoppingBaskets;

    entity ShoppingBasketBookSrv as projection on database.ShoppingBasketBooks;

    entity WarehouseSrv as projection on database.Warehouses;

    entity WarehouseBookSrv as projection on database.WarehouseBooks;


    action createAuthor(
        Name : String(255),
        Address : String(255),
        URL : String(255)
    ) returns String;


    action createPublisher(
        Name : String(255),
        Address : String(255),
        Phone : String(255),
        URL : Integer
    ) returns String;


    action createCustomer(
        Email : String(255),
        Name : String(255),
        Phone : String(255),
        Address : String(255)
    ) returns String;


    action createWarehouse(
        Code : Integer,
        Phone : String(255),
        Address : String(255)
    ) returns String;


    action createBook(
        ISBN : String(255),
        PublisherName_Name : String(255),
        AuthorName_Name : String(255),
        AuthorName_Address : String(255),
        Year : Integer,
        Title : String(255),
        Price : Decimal(19,0)
    ) returns String;


    action createShoppingBasket(
        ID : Integer,
        CustomerEmail_Email : String(255)
    ) returns String;


    action createShoppingBasketBook(
        ShoppingBasketID_ID : Integer,
        BookISBN_ISBN : String(255),
        Count : Integer
    ) returns String;


    action createWarehouseBook(
        WarehouseCode_Code : Integer,
        BookISBN_ISBN : String(255),
        Count : Integer
    ) returns String;


    action updateBook(
        ISBN : String(255),
        Price : Decimal(19,0)
    ) returns String;


    action deleteBook(
        ISBN : String(255)
    ) returns String;

}