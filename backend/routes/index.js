const express = require('express');
const router = express.Router();
const userSignup = require('../controller/usersignup');
const userSignin = require('../controller/usersignin.js');
const userDatelis = require('../controller/userDatelis');
const authtoken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const allUsers = require('../controller/allUsers');
const updateUserRole = require('../controller/updateUserRole');
const uplodeProduct = require('../controller/uplodeProduct');
const getProduct = require('../controller/getProduct');
const getcategoryProduct = require('../controller/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/getCategoryWiseProduct.js');
const getProductDateils = require('../controller/getProductDateils.js');
const addToCartProsuct = require('../controller/addToCartProsuct.js');
const addToCartViewPriduct = require('../controller/addToCartViewPriduct.js');
const updataAddToCartPeoduct = require('../controller/updataAddToCartPeoduct.js');
const deleteAddToCartProduct = require('../controller/deleteAddToCartProduct.js');
const searchProductData = require('../controller/searchProductData.js');
const countAddToCartProduct = require('../controller/countAddToCartProduct.js');
const updataProduct = require('../controller/UpdataProduct.js');


router.post('/signup', userSignup);
router.post('/signin',userSignin);
router.get('/user-data',authtoken,userDatelis);
router.get('/userLogout',userLogout)
router.get('/all-user',authtoken,allUsers);
router.put('/update-role/:id', authtoken, updateUserRole);
router.post('/upload-product', authtoken,uplodeProduct);
router.get('/get-product',authtoken,getProduct);
router.put('/update-product/:id', authtoken,updataProduct);
router.get('/get-categoryProduct',  getcategoryProduct);
router.post('/get-CategoryWiseProduct',getCategoryWiseProduct);
router.post('/get-ProductDateils',getProductDateils);
router.post('/addToCartProduct',authtoken,addToCartProsuct);
router.get('/CountAddToCartProduct',authtoken,countAddToCartProduct ); 
router.get('/addToCartViewProduct',authtoken,addToCartViewPriduct);
router.post('/updataAddToCartProduct',authtoken,updataAddToCartPeoduct);
router.post('/deleteAddToCartProduct',authtoken,deleteAddToCartProduct)
router.get('/searchProductData',searchProductData);






module.exports = router;
