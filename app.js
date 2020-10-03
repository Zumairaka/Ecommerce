var express = require('express');
var path = require('path');
const cors = require('cors');
const bodyparser = require('body-parser');
var mongoose = require('mongoose');

require('dotenv').config();

// routers
var registerRouter = require('./routes/register');
var addProductDetailsRouter = require('./routes/addProductDetails');
var searchByTypeRouter = require('./routes/searchByType');
var searchByCategoryRouter = require('./routes/searchByCategory');
var searchByBrandRouter = require('./routes/searchByBrand');
var searchByIdRouter = require('./routes/searchById');
var searchByNameRouter = require('./routes/searchByName');
var loginRouter = require('./routes/login');
var verifySponsorIdRouter = require('./routes/verifySponsorId');
var deleteProductRouter = require('./routes/deleteProduct');
var editProductRouter = require('./routes/editProduct');
var forgotPasswordRouter = require('./routes/forgotPassword');
var adminLoginRouter = require('./routes/adminLogin');
var addCategoryRouter = require('./routes/addCategory');
var addBrandRouter = require('./routes/addBrand');
var deleteBrandRouter = require('./routes/deleteBrand');
var deleteCategoryRouter = require('./routes/deleteCategory');
var getCategoriesRouter = require('./routes/getCategories');
var getBrandsRouter = require('./routes/getBrands');

var app = express();

//set up mongo connection
//mongoose.connect('mongodb://localhost:27017/RenzGlobal');
//console.log(process.env.DB_CONNECTION);
mongoose.connect(process.env.DB_CONNECTION);

mongoose.set('useFindAndModify', false);
var db=mongoose.connection;
db.on('error',(error)=>{
    console.log(error);
});
db.once('open',()=>{
    console.log("Success");
});

app.use(express.static(path.join(__dirname,"/public")));
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
    extended: true
  }));

// routers
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/addProductDetails', addProductDetailsRouter);
app.use('/searchByType', searchByTypeRouter);
app.use('/searchByCategory', searchByCategoryRouter);
app.use('/searchByBrand', searchByBrandRouter);
app.use('/searchById', searchByIdRouter);
app.use('/searchByName', searchByNameRouter);
app.use('/verifySponsorId', verifySponsorIdRouter);
app.use('/deleteProduct', deleteProductRouter);
app.use('/editProduct', editProductRouter);
app.use('/forgotPassword', forgotPasswordRouter);
app.use('/adminLogin', adminLoginRouter);
app.use('/addCategory', addCategoryRouter);
app.use('/addBrand', addBrandRouter);
app.use('/deleteBrand', deleteBrandRouter);
app.use('/deleteCategory', deleteCategoryRouter);
app.use('/getCategories', getCategoriesRouter);
app.use('/getBrands', getBrandsRouter);


app.listen(process.env.PORT || 3000,function(){
    console.log("Listeing to Port: 3000");
});
