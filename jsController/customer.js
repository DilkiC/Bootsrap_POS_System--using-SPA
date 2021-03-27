$('#saveBtn').click(function () {

    $('#tblCustomer>tr').off('click'); //avoid the binding event again to a row

    let cusId=$("#customerID").val();
    let cusName=$("#customerName").val();
    let cusAddress=$("#customerAddress").val();
    let cusSalary=$("#customerSalary").val();
    let cusContact=$("#customerContact").val();
    //can't placed variables globally.beacuse we put these elements runtime.if we put globally that time there are no elements in html code.because of this case input values don't add to table.so we should placed varibales in local scope

    //sending to database
    var custDetails=saveCustomer(cusId,cusName,cusAddress,cusSalary,cusContact);
    if(custDetails)clearInputFields();
    generateCId();
    $("#customerName").focus();

/*
    let row=`<tr><td>${cusId}</td><td>${cusName}</td><td>${cusAddress}</td><td>${cusSalary}</td><td>${cusContact}</td></tr>`; //using backtick
*/
    /*
let row = "<tr><td>" + cusID + "</td><td>" + cusName + "</td><td>" + cusAddress + "</td><td>" + cusSalary + "</td></tr>";
*/
    /*//keep html element as a string
    $("#tblCustomer").append(row);*/

    //getting selected row details to input fields
    $('#tblCustomer>tr').click(function () {

        let id = $(this).children('td:eq(0)').text(); //this mean table row(tr)
        //td:eq(0) mean first td
        let name = $(this).children('td:eq(1)').text();
        let address = $(this).children('td:eq(2)').text();
        let salary = $(this).children('td:eq(3)').text();
        let contact = $(this).children('td:eq(4)').text();

        $("#customerID").val(id);
        $("#customerName").val(name);
        $("#customerAddress").val(address);
        $("#customerSalary").val(salary);
        $("#customerContact").val(contact);

        //though we placed this event here there is a side effect.effect is the event add to preious rows(the rows which added event once) again and again.(event binds recurservely.)
        //solution is we should learn about events...
        //we should unbind the click events at the very first of the function($('#tblCustomer>tr').off('click');)

        });
});

//getting selected row details to input fields
/*$('#tblCustomer>tr').click(function () {
    let id=$(this).children('td:eq(0)').text(); //this mean table row(tr)
    //td:eq(0) mean first td
    let name=$(this).children('td:eq(1)').text();
    let address=$(this).children('td:eq(2)').text();
    let salary=$(this).children('td:eq(3)').text();
    let contact=$(this).children('td:eq(4)').text();

    $("#customerID").val(id);
    $("#customerName").val(name);
    $("#customerAddress").val(address);
    $("#customerSalary").val(salary);
    $("#customerContact").val(contact);

    //event click given to table body rows.but in this time there are no tr html codes.so nothing add to the input fields.beacuse tr added runtime.
    //so we should placed this event after the row added...

});*/

//clear input fields
function clearInputFields() {
    $("#customerID").val("");
    $("#customerName").val("");
    $("#customerAddress").val("");
    $("#customerSalary").val("");
    $("#customerContact").val("");
   /* $("#lblCustId").text().css('display','block');*/

}
$('#clearBtn').click(function () {
clearInputFields();
});

//focus input fields with validation
let cusIdReg= /^(C00)[0-9]{1,3}$/;
let cusNameReg= /^[a-zA-Z\s]{1,}$/;
let cusAddressReg= /^[A-Za-z0-9'\.\-\s\,]{1,}$/;
let cusSalaryReg= /^[0-9\.]{1,}$/;
let cusContactReg= /^[0-9\-]{1,11}$/;

$('#customerID').on('keyup',function (event) {
if(event.key=="Enter"){
    $('#customerName').focus();
}

let custId=$('#customerID').val();
if(cusIdReg.test(custId)){
    $("#customerID").css('border','2px solid green');
    $('#lblCustId').text("");
}else{
    $("#customerID").css('border','2px solid red');
    $('#lblCustId').text("Data Format is Wrong (C00-001)");
}
});

$('#customerName').on('keyup',function (event) {
    if(event.key=="Enter"){
        $('#customerAddress').focus();
    }

    let custName=$('#customerName').val();
    if(cusNameReg.test(custName)){
        $('#customerName').css('border','2px solid green');
        $('#lblCustName').text("");
    }else{
        $('#customerName').css('border','2px solid red');
        $('#lblCustName').text("You can't input Numbers or Symbols");
    }
});

$('#customerAddress').on('keyup',function (event) {
    if(event.key=="Enter"){
        $('#customerSalary').focus();
    }
    let custAddress=$('#customerAddress').val();
    if(cusAddressReg.test(custAddress)){
        $('#customerAddress').css('border','2px solid green');
        $('#lblCustAddress').text("");
    }else{
        $('#customerAddress').css('border','2px solid red');
        $('#lblCustAddress').text("Invalid Data format(Aa5.- , ");
    }
});

$('#customerSalary').on('keyup',function (event) {
    if(event.key=="Enter"){
        $('#customerContact').focus();
    }

    let custSalary=$('#customerSalary').val();
    if(cusSalaryReg.test(custSalary)){
        $('#customerSalary').css('border','2px solid green');
        $('#lblCustSalary').text("");
    }else{
        $('#customerSalary').css('border','2px solid red');
        $('#lblCustSalary').text("Data Format is wrong(100000)");
    }
});
$('#customerContact').on('keyup',function (event) {
    if(event.key=="Enter"){
        $('#customerID').focus();
    }
    let custContact=$('#customerContact').val();
    if(cusContactReg.test(custContact)){
        $('#customerContact').css('border','2px solid green');
        $('#lblCustContact').text("");
    }else{
        $('#customerContact').css('border','2px solid red');
        $('#lblCustContact').text("Data Format is wrong(000-0000000)");
    }
});

//stop the tab key focus
$('#customerID,#customerName,#customerAddress,#customerSalary,#customerContact').on('keyup',function (event) {
if(event.key=="Tab"){
    event.preventDefault();
}
});


//cust dto
function saveCustomer(id,name,address,salary,contact) {
 var customer=new CustomerDTO(id,name,address,salary,contact);
 CustomerDB.push(customer);

 loadAllCustomers();
 return true;

}

//load all customers to the table
function loadAllCustomers() {
    let allCustomers = getAllCustomers();
    $('#tblCustomer').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allCustomers) {
        let id = allCustomers[i].getCustomerID();
        let name = allCustomers[i].getCustomerName();
        let address = allCustomers[i].getCustomerAddress();
        let salary = allCustomers[i].getCustomerSalary();
        let contact = allCustomers[i].getCustomerContact();

        var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${salary}</td><td>${contact}</td></tr>`;
        $('#tblCustomer').append(row);
    }
}
function getAllCustomers() {
    return CustomerDB;
}

//delete btn..........
$('#deleteBtn').click(function () {
let cusId=$('#customerID').val();
    let option=confirm(`Do you want to delete ID:${cusId}`);

    if (option){
        let res=deleteCustomer(cusId);
        if (res){
            alert("Customer Deleted");
        } else{
            alert("Delete Failed")
        }

    }
    loadAllCustomers();
    clearInputFields();
});
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = CustomerDB.indexOf(customer);
        CustomerDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
//serach ..............
function searchCustomer(id) {
    for (var i in CustomerDB) {
        if (CustomerDB[i].getCustomerID() == id) return CustomerDB[i];
    }
    return null;
}

$("#customerID").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let customer = searchCustomer($(this).val());
        if (customer != null) {
            $("#customerID").val(customer.getCustomerID());
            $("#customerName").val(customer.getCustomerName());
            $("#customerAddress").val(customer.getCustomerAddress());
            $("#customerSalary").val(customer.getCustomerSalary());
            $("#customerContact").val(customer.getCustomerContact());
        } else {
            clearInputFields();
        }
    }
});

//update btn
$('#updateBtn').click(function () {
    let cusID = $("#customerID").val();
    let cusName = $("#customerName").val();
    let cusAddress = $("#customerAddress").val();
    let cusSalary = $("#customerSalary").val();
    let cusContact = $("#customerContact").val();

    let option=confirm(`Do you want to Update Customer ID:${cusID}`);
    if (option){
        let res= updateCustomer(cusID, cusName, cusAddress, cusSalary,cusContact);
        if (res){
            alert("Customer Updated");
        }else{
            alert("Update Faild");
        }
    }
    loadAllCustomers();
    clearInputFields();
});

function updateCustomer(id, name, address, salary,contact) {
    let customer = searchCustomer(id);
    if (customer != null) {
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerSalary(salary);
        customer.setCustomerContact(contact);
        return true;
    } else {
        return false;
    }
}

function generateCId() {
    try {
        let lastCID = CustomerDB[CustomerDB.length-1].getCustomerID();
        let newCID = parseInt(lastCID.substring(1,4))+1;
        if (newCID < 10){
            $('#customerID').val("C00"+newCID);
        }else if(newCID < 100){
            $('#customerID').val("C0"+newCID);
        }else {
            $('#customerID').val("C"+newCID);
        }
    }catch (e) {
        $('#customerID').val("C001");
    }
}



