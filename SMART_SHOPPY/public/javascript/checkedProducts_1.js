var checked_product = [];

var showCheckedcompanyDetails = (value) =>{
    var url = '/get/checked/companyDetails?Company=' + value;
    $.ajax({
        method: 'GET',
        url: url,
        data: value,
        dataType: "JSON",
        success : function(response){
            console.log(response);
            $("#multiples").html("");
            checked_product = response.checkedProducts_1;
            for(var i=0; i<checked_product.length; i++){
                $("#multiples").append(mulipleProduct_Template(checked_product[i]));
                console.log(checked_product);
            }
        }
    })
}