var loadTemplate = (page, product_Type, productId) => {
    debugger
    $(".nav-link").removeClass("active");
    var templateurl;
    switch (page) {
        case 'cart':
            templateurl = 'templates/cart.htm';
            break;
        case 'buyNow':
            templateurl = 'templates/buyNow.htm';
            break;
        case 'login' :
            templateurl =  'templates/login.htm';
            document.getElementById("myDiv").style.visibility = "hidden";
            // document.getElementById("myDiv1").style.visibility = "hidden";
            break;
        case 'forgotpwd' :
            templateurl =  'templates/forgotPwd.htm';
            document.getElementById("myDiv").style.visibility = "hidden";
            document.getElementById("myDiv1").style.visibility = "none";
            break;
        case 'signup' :
            templateurl =  'templates/signup.htm';
            document.getElementById("myDiv").style.visibility = "hidden";
            document.getElementById("myDiv1").style.display = "none";
            break;  
        case 'pdetails':
            templateurl = 'templates/productDetails.htm';
            document.getElementById("myDiv").style.visibility = "visible";
            // document.getElementById("myDiv1").style.visibility = "visible";
            break;
        case 'admin':
            templateurl = 'templates/AdminPortal.htm';
            document.getElementById("myDiv").style.visibility = "hidden";
            break;
        case 'descrption':
            templateurl = 'templates/new_SingleDetails.htm';
            document.getElementById("myDiv").style.visibility = "visible";
            // document.getElementById("myDiv1").style.visibility = "hidden";
            break;
        case 'multiple':
            templateurl = 'templates/multiples.htm';
            document.getElementById("myDiv").style.visibility = "visible";
            // document.getElementById("myDiv1").style.visibility = "hidden";
            break;
    } 
    $.ajax({
        url: templateurl,
        method: 'GET',
        data:{},
        success: (response) => {
            $("#templateContainer").html(response);
            if(page == 'pdetails') { // my product details page
                loadProductsToPage();
            }else if(page == 'multiple'){
                loadMultipleProducts(product_Type);
            }else if(page == 'descrption'){
                loadSingleProduct(productId);
            // }else if(page == 'buyNow'){
            //     loadTemplate('buyNow');
            }else if(page == 'admin'){
                loadSelectedTab('acct');
            // }else if(page == 'descrption'){
            //     loadTemplate('descrption');
            }
            // loadTemplate('buyNow');
        },
        error : () => {
            console.log("error")
        }
    });
}
$.ajax({
    url: 'http://localhost:8081/check/sessionStatus',
    method: 'POST',
    dataType: 'JSON',
    success: (response) => {
        if(response.status == true){
            if(response.isAdmin){
                loadTemplate('admin');
            }else if(response.status == true){
                loadTemplate('pdetails');
            }    
            }else if(loadTemplate('descrption')){
        }else{
            loadTemplate('login');   
        }
    }
})



var validateUserCredentials = () => {
    var userData = {
        userId : $("#userId").val(),
        actPwd : $("#actPwd").val()
    };
    $.ajax({
        url: '/validate/user/details',
        data: userData,
        dataType: 'JSON',
        method: 'POST',
        success: (response) => {
            if(response.msg != 'valid'){
                $(".errBlock").show();
            }else{
                if(response.isAdmin){
                    loadTemplate("admin");
                }else{ // normal user
                    loadTemplate('pdetails');
                }   
            }
        }
    })
    console.log(userData);
}

