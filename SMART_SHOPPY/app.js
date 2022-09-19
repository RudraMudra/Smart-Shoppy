var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var validateRouter = require('./routes/validateUserCredentials');

var productRouter = require("./routes/getProductDetails");
var checkUserValidation = require("./routes/checkIsUserLoggedin");
var logoutUser = require("./routes/logoutUser");
var newSignupRouter = require("./routes/newSignup");

var CheckAvailability = require("./routes/checkPincode")

var UserAccountDetails = require("./routes/getUserAccountDetails");
var addNewProductRouter = require("./routes/addNewProduct");
var uploadProduct = require("./routes/uploadProductImage");

var singleProductDetailsRouter = require("./routes/SingleProduct_Page");
var multipleProductsRouter = require("./routes/getMultipleProducts");
var searchProductRouter = require("./routes/searchProducts");
var checkedProductsRouter = require("./routes/getCheckedProducts");
var checkedProduct_1 = require("./routes/getCheckedProducts_1");

var app = express();

var session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/validate/user/details',validateRouter);
app.use('/get/details/product', productRouter);
app.use("/check/sessionStatus", checkUserValidation);
app.use("/logout/Session", logoutUser);
app.use("/newuser/signup", newSignupRouter);

app.use("/check/Availability", CheckAvailability);

app.use("/get/userAccountDetails", UserAccountDetails);
app.use("/add/newProduct", addNewProductRouter);   // web services(end Points) --  all app.use 
app.use("/upload/productImage", uploadProduct);
app.use("/get/SingleProductDescrption", singleProductDetailsRouter);
app.use("/get/multiple/Products", multipleProductsRouter);
app.use("/search/productType", searchProductRouter);
app.use("/check/selected/Products", checkedProductsRouter);
app.use("/get/checked/companyDetails", checkedProduct_1);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
