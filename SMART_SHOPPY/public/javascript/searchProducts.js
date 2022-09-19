
var SearchProducts = () =>{
    var company = {
        searchText : $("#searchText").val()  
    }
    console.log(company);
    getProductData(company);
}

var getProductData = (company) =>{
    var url = '/search/productType';
    $.ajax({
        method: "POST",
        url: url,
        data: company,
        dataType: "JSON",
        success : function(response){
            $("#multiples").html("");
            var Products = response.details;
            for(var i=0; i<Products.length; i++){
                $("#multiples").append(mulipleProduct_Template(Products[i]));
                // getMultipleProduct();
            }
        }
    })
}




// var getMultipleProduct = () =>{
//     $.ajax({
//         url: 'templates/multiplesPage_product.htm',
//         method: 'GET',
//         success: (template) =>{
//             search_Template = Handlebars.compile(template);
//         }
//     })
// }