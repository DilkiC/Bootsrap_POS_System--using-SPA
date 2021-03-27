$('#saveItemBtn').click(function () {

    $('#itemTbl>tr').off('click'); //avoid the binding event again to a row

    let code=$("#itemCodeInput").val();
    let iname=$("#itemNameInput").val();
    let qty=$("#itemQtyInput").val();
    let price=$("#itemPriceInput").val();

    var res=saveItem(code,iname,qty,price);
    if(res)clearInputFields();
    generateIId();
    $("#itemNameInput").focus();


    //getting selected row details to input fields
    $('#itemTbl>tr').click(function () {

        let code = $(this).children('td:eq(0)').text(); //this mean table row(tr)
        //td:eq(0) mean first td
        let iname = $(this).children('td:eq(1)').text();
        let qty = $(this).children('td:eq(2)').text();
        let price = $(this).children('td:eq(3)').text();

        $("#itemCodeInput").val(code);
        $("#itemNameInput").val(iname);
        $("#itemQtyInput").val(qty);
        $("#itemPriceInput").val(price);

    });
});

//clear input fields
function clearInputFields() {
    $("#itemCodeInput").val("");
    $("#itemNameInput").val("");
    $("#itemQtyInput").val("");
    $("#itemPriceInput").val("");
}
$('#clearItemBtn').click(function () {
    clearInputFields();
});

//focus input fields with validation
let codeReg= /^(I00)[0-9]{1,3}$/;
let nameReg= /^[a-zA-Z\s]{1,}$/;
let qtyReg= /^[0-9]{1,}$/;
let priceReg= /^[0-9\.]{1,}$/;


$('#itemCodeInput').on('keyup',function (event) {
    if(event.key=="Enter"){
        $('#itemNameInput').focus();
    }

    let code=$('#itemCodeInput').val();
    if(codeReg.test(code)){
        $("#itemCodeInput").css('border','2px solid green');
        $('#lblItemCode').text("");
    }else{
        $("#itemCodeInput").css('border','2px solid red');
        $('#lblItemCode').text("Data Format is Wrong (I001)");
    }
});

$('#itemNameInput').on('keyup',function (event) {
    if(event.key=="Enter"){
        $('#itemQtyInput').focus();
    }

    let iname=$('#customerName').val();
    if(nameReg.test(iname)){
        $('#itemNameInput').css('border','2px solid green');
        $('#lblItemName').text("");
    }else{
        $('#itemNameInput').css('border','2px solid red');
        $('#lblItemName').text("You can't input Numbers or Symbols");
    }
});

$('#itemQtyInput').on('keyup',function (event) {
    if(event.key=="Enter"){
        $('#itemPriceInput').focus();
    }
    let qty=$('#itemQtyInput').val();
    if(qtyReg.test(qty)){
        $('#itemPriceInput').css('border','2px solid green');
        $('#lblItemQty').text("");
    }else{
        $('#itemPriceInput').css('border','2px solid red');
        $('#lblItemQty').text("Invalid Data format(only numbers)");
    }
});

$('#itemPriceInput').on('keyup',function (event) {
    if(event.key=="Enter"){
        $('#itemCodeInput').focus();
    }

    let price=$('#itemPriceInput').val();
    if(priceReg.test(price)){
        $('#itemPriceInput').css('border','2px solid green');
        $('#lblItemPrice').text("");
    }else{
        $('#itemPriceInput').css('border','2px solid red');
        $('#lblItemPrice').text("Data Format is wrong(100000)");
    }
});


//stop the tab key focus
$('#itemCodeInput,#itemNameInput,#itemQtyInput,#itemPriceInput').on('keyup',function (event) {
    if(event.key=="Tab"){
        event.preventDefault();
    }
});


//item dto
function saveItem(code,iname,qty,price) {
    var item=new ItemDTO(code,iname,qty,price);
    ItemDB.push(item);

    loadAllItems();
    return true;

}

//load all customers to the table
function loadAllItems() {
    let allItems = getAllItems();
    $('#itemTbl').empty(); // clear all the table before adding for avoid duplicate
    for (var i in allItems) {
        let code = allItems[i].getItemCode();
        let iname = allItems[i].getIName();
        let qty = allItems[i].getQTY();
        let price = allItems[i].getPrice();


        var row = `<tr><td>${code}</td><td>${iname}</td><td>${qty}</td><td>${price}</td></tr>`;
        $('#itemTbl').append(row);
    }
}
function getAllItems() {
    return ItemDB;
}

//delete btn..........
$('#deleteItemBtn').click(function () {
    let code=$('#itemCodeInput').val();
    let option=confirm(`Do you want to delete Code:${code}`);

    if (option){
        let res=deleteCustomer(code);
        if (res){
            alert("Item Deleted");
        } else{
            alert("Delete Failed")
        }

    }
    loadAllItems();
    clearInputFields();
});
function deleteCustomer(code) {
    let item = searchItem(code);
    if (item != null) {
        let indexNumber = ItemDB.indexOf(item);
        ItemDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}
//serach ..............
function searchItem(id) {
    for (var i in ItemDB) {
        if (ItemDB[i].getItemCode() == id) return ItemDB[i];
    }
    return null;
}

$("#itemCodeInput").on('keyup', function (eObj) {
    if (eObj.key == "Enter") {
        let item = searchItem($(this).val());
        if (item != null) {
            $("#itemCodeInput").val(item.getItemCode());
            $("#itemNameInput").val(item.getIName());
            $("#itemQtyInput").val(item.getQTY());
            $("#itemPriceInput").val(item.getPrice());

        } else {
            clearInputFields();
        }
    }
});

//update btn
$('#updateItemBtn').click(function () {
    let code = $("#itemCodeInput").val();
    let iname = $("#itemNameInput").val();
    let qty = $("#itemQtyInput").val();
    let price = $("#itemPriceInput").val();


    let option=confirm(`Do you want to Update Item ID:${code}`);
    if (option){
        let res= updateItem(code, iname, qty, price);
        if (res){
            alert("Item Updated");
        }else{
            alert("Update Faild");
        }
    }
    loadAllItems();
    clearInputFields();
});

function updateItem(code, iname, qty, price) {
    let item = searchItem(code);
    if (item != null) {
        item.setIName(iname)
        item.setQTY(qty)
        item.setPrice(price);

        return true;
    } else {
        return false;
    }
}

function generateIId() {
    try {
        let lastCID = ItemDB[ItemDB.length-1].getItemCode();
        let newCID = parseInt(lastCID.substring(1,4))+1;
        if (newCID < 10){
            $('#itemCodeInput').val("I00"+newCID);
        }else if(newCID < 100){
            $('#itemCodeInput').val("I0"+newCID);
        }else {
            $('#itemCodeInput').val("I"+newCID);
        }
    }catch (e) {
        $('#itemCodeInput').val("I001");
    }
}
