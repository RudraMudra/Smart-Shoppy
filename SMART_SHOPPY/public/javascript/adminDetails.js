var rowTemplate = "<tr><td>{{accountId}}</td><td>{{mailId}}</td><td>{{isAdmin}}</td><td><input type='button' value='Edit' class='btn btn-primary'><input class='btn btn-primary' type='button' value='Delete'></td></tr>"

rowTemplate = Handlebars.compile(rowTemplate);

loadSelectedTab = (tabname) =>{
    $(".nav-link").removeClass("active");
    $(".tabContent").hide();
    var container = '.' + tabname + '_Block';
    var aTag = "#link_"  + tabname;
    $(aTag).addClass("active");
    $(container).show();
    switch(tabname){
        case 'acct':
            loadAccountDetails();          
            break;
        case 'productList':
            break;
        case 'addProduct':
            break;
    }
}

var loadAccountDetails = () => {
    $.ajax({
        type: "GET",
        url: "/get/userAccountDetails",
        data: "{}",
        dataType: "JSON",
        success: function (response) {
            $("#detailsBody").html("");
            response.userAccountDetails.forEach(detail => {
                $("#detailsBody").append(rowTemplate(detail));
            });
        }
    });
}


var addNewProductDetails = () =>{
    var pData = {
        name: $("#productName").val(),
        price: $("#price").val(),
        discountPercent: $("#discount").val(),
        manufacturer: $("#manufacturer").val(),
        desc: $("#desc").val(),
        rating: $("#rating").val(),
        image: imageUrl

    };
    $.ajax({
        type: "POST",
        url: '/add/newProduct',
        data: pData,
        dataType: "JSON",
        success: function (response) {
            $("rmsg").html(response.msg);
        }
    });
}

var imageUrl = '';
var uploadProductImage = () =>{
    var uploadingFile = $('input[name=productImage]')[0].files[0];
    var formData = new FormData();
    formData.append("productImage", uploadingFile);

    $.ajax({
        method: "POST",
        url: "/upload/productImage",
        encytype1: 'multipart/form-data',
        processData: false,
        contentType: false,
        data: formData,
        dataType: "JSON",
        success: function (response) {
            console.log("image got uploaded successfully");
            console.log(response);
            imageUrl = response.filepath;
        }
    });
}