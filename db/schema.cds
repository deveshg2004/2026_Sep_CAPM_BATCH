// // namespace <Company Name>.< Finanace>.< Application Name>
// // namespace samsung.fin.poapp;

// namespace pmyapp;

// // entity students {
// //     key studentId : Integer;
// //     studnetName : String(50);
// //     fatherName : String(50);
// //     motherName : String(50);
// //     contactNo : String(20);
// //     abc : Association to one classes;
// // }

// // entity classes {
// // key classId : Integer;
// // className : String(50);
// // teacherName : String(20); }





// entity employees {
//     key empID: Integer;
//     empName: String(50);
//     empDept: String(50);
//     currenyCode: String(20);
//     city: String(20);
//     country: String(20);
//     division: Association to one divisions;
// }

// entity divisions{
//     key divID: String(20);
//     divCity: String(20);
//     divName: String(10);
//     divCountry: String(10);
// }



// cautionL if u want to reduce the length, u need to check the dependencies.

// This is syntax for the identifier
// type ![EmployeeName] : String(50);



// sir's new way for integer or string naming:


// namespace poapplication;
// using { poapplication.common as common } from './common';
// using { managed, temporal } from '@sap/cds/common';
// entity Students : common.address, common.feeasp, managed {
//     key StudentId: Integer;
//     studentName: common.nameStr;
//     fatherName: common.nameStr;
//     motherName: common.nameStr;
//     contactNo: String(20);
//     // Managed Association
//     abc: Association to Classes;
//     // Unmanaged Association
//     book : Association to many Books on book.parent = $self;
//     gender: common.gender;
// }

// entity Classes{
//     key classId : Integer;
//     className : common.nameStr;
//     teacherName : common.nameStr;
// }

// entity Books{
//     key bookId: Integer;
//     parent: Association to Students;
//     stuName: common.nameStr;
//     bName: common.nameStr;
//     authName: common.nameStr;
//     bPrice: Decimal(10, 2);
//     doi: Date;
//     dor: Date;
//     def: Association to one Students;    // status issued, rejected 
//     status: common.status;
// }


