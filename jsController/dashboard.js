function hideAll() {
    $("#contentHome,#contentCustomer,#contentItem,#contentOrder,#contentItemManage").css('display', 'none');
}
hideAll();

$("#contentHome").css('display','block');
$("#input").val("H O M E");

$('#homeLink').click(function () {
    hideAll();
    $("#contentHome").css('display','block');
    $("#input").val("H O M E");
});

$('#customerLink').click(function () {
    hideAll();
    $("#contentCustomer").css('display','block');
    $("#input").val("C U S T O M E R");
});

$('#itemLink').click(function () {
    hideAll();
    $("#contentItem").css('display','block');
    $("#input").val("I T E M");
});

$('#orderLink').click(function () {
    hideAll();
    $("#contentOrder").css('display','block');
    $("#input").val("O R D E R");
});

$('#itemManageLink').click(function () {
    hideAll();
    $("#contentItemManage").css('display','block');
    $("#input").val("ITEM MANAGE");
});