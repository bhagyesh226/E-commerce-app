const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`;

const UplodeImage = async (image) =>{
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset','MERN-APP');


    const dataresponse = await fetch(url,{
    method: 'POST',
     body: formData, 
    })
    return dataresponse.json()
}

export default UplodeImage;