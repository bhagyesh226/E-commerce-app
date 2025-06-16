

// const backenDomin = "http://localhost:8080" ;
const backenDomin =  import.meta.env.VITE_B_LIVE_URL ;

console.log("Backend URL:", import.meta.env.VITE_B_LIVE_URL);
const summaryApi = {
    signUp: {
        url: `${backenDomin}/api/signup`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }

    },
    signin: {
        url: `${backenDomin}/api/signin`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        }
    },
    current_user :{

        url: `${backenDomin}/api/user-data`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"

        }
    },
    user_Louout:{
        url: `${backenDomin}/api/userLogout`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"

        }
    },
    allUsers: {
        url: `${backenDomin}/api/all-user`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"

        }
    },
    updateUserRole: {
        url: `${backenDomin}/api//update-role/:id`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        }
    },
    uploadProduct: {
        url: `${backenDomin}/api/upload-product`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        }
    },
    getProduct: {
        url: `${backenDomin}/api/get-product`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    },
     UpdataProduct: {
        url: `${backenDomin}/api/update-product/:id`,
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    },
    categoryProduct: {
        url: `${backenDomin}/api/get-categoryProduct`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    },
    getProductDateils: {
        url: `${backenDomin}/api/get-ProductDateils`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    },
    getCategoryWiseProduct :{
        url: `${backenDomin}/api/get-CategoryWiseProduct`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        }
    },
    addToCartProduct :{
        url: `${backenDomin}/api/addToCartProduct`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        }

    },
    CountAddToCartProduct: {
        url: `${backenDomin}/api/CountAddToCartProduct`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"

        }

    },
    addToCartViewProduct: {
        url: `${backenDomin}/api/addToCartViewProduct`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"

        }

    },
    updataAddToCartProduct : {
        url: `${backenDomin}/api/updataAddToCartProduct`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        }

    },
     deleteAddToCartProduct : {
        url: `${backenDomin}/api/deleteAddToCartProduct`,
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        }

    },
    searchProductData : {
        url: `${backenDomin}/api/searchProductData`,
        method: "GET",
        headers: {
            "Content-Type": "application/json"

        }

    }
    
}


export default summaryApi;