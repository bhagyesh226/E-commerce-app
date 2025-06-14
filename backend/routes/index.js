const express = require('express');
const router = express.Router();
const userSignup = require('../controller/usersignup');
const userSignin = require('../controller/usersignin.js');
const userDatalis = require('../controller/userDatelis');
const authtoken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const allUsers = require('../controller/allusers');
const updateUserRole = require('../controller/updateUserRole');
const uplodeProduct = require('../controller/uplodeProduct');
const getProduct = require('../controller/getProduct');
const UpdataProduct = require('../controller/UpdataProduct');
const getcategoryProduct = require('../controller/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/getCategoryWiseProduct.js');
const getProductDateils = require('../controller/getProductDateils.js');
const addToCartProduct = require('../controller/addToCartProsuct.js');
const CountAddToCartProduct = require('../controller/countAddToCartProduct.js');
const addToCartViewProduct = require('../controller/addToCartViewPriduct.js');
const updataAddToCartProduct = require('../controller/updataAddToCartPeoduct.js');
const deleteAddToCartProduct = require('../controller/deleteAddToCartProduct.js');
const searchProductData = require('../controller/searchProductData.js');


router.post('/signup', userSignup);
router.post('/signin',userSignin);
router.get('/user-data',authtoken,userDatalis);
router.get('/userLogout',userLogout)
router.get('/all-user',authtoken,allUsers);
router.put('/update-role/:id', authtoken, updateUserRole);
router.post('/upload-product', authtoken,uplodeProduct);
router.get('/get-product',authtoken,getProduct);
router.put('/update-product/:id', authtoken,UpdataProduct);
router.get('/get-categoryProduct',  getcategoryProduct);
router.post('/get-CategoryWiseProduct',getCategoryWiseProduct)
router.post('/get-ProductDateils',getProductDateils)
router.post('/addToCartProduct',authtoken,addToCartProduct)
router.get('/CountAddToCartProduct',authtoken,CountAddToCartProduct )
router.get('/addToCartViewProduct',authtoken,addToCartViewProduct)
router.post('/updataAddToCartProduct',authtoken,updataAddToCartProduct)
router.post('/deleteAddToCartProduct',authtoken,deleteAddToCartProduct)
router.get('/searchProductData',searchProductData)






module.exports = router;
