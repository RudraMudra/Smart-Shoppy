

var checked_product = [];
// var checkedProduct_Template;

// var showCheckedProducts = () =>{
//     var Core = {
//         searchText : $("._30VH1S").val()
//     }
//     console.log(Core);
//     getCheckedData(Core);
// }

var showCheckedProducts = (value) =>{
    var url = '/check/selected/Products?Core=' + value;
    debugger;
    $.ajax({
        method: "GET",
        url: url,
        // contentType: "application/json",
        data: value,
        dataType: "JSON",
        success : function(response){
            console.log(response);
            $("#multiples").html("");
            checked_product = response.checkedProducts;
            for(var i=0; i<checked_product.length; i++){
                // $("#multiples").append(search_Template(Products[i]));
                $("#multiples").append(mulipleProduct_Template(checked_product[i]));
                // getMultipleProduct();
                console.log(checked_product);
            }
        }
    })
}