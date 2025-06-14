import summaryApi from "../apiStore/api"

const fetchCategoryWiseProduct = async(category )=>{
    const response = await fetch(summaryApi.getCategoryWiseProduct.url,{
        method : summaryApi.getCategoryWiseProduct.method,
        headers : summaryApi.getCategoryWiseProduct.headers,
        // credentials: "include",
        body : JSON.stringify({
            category :category
        })
    })

    const dataResponse = await response.json()

    return dataResponse
}


export default fetchCategoryWiseProduct;