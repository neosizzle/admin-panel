//fetches the post object from db using id 


//function to convert array buffer received from server to base64 string to be displayed as image 
//https://stackoverflow.com/questions/53723962/arraybuffer-as-source-image-tag-display-image-from-blob
const  _arrayBufferToBase64 = ( buffer ) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
       binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }




//gets query string from url 
//https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('_id');

//declare request options
const postUrl = `http://localhost:3000/posts/${id}`
const postParams = {
    headers : {
        "Content-Type" : "application/json"
    },
    method : "GET"
}

//send get request to server to populate form inputs
fetch(postUrl , postParams)
.then(response => response.json())//parse response into readable json
.then((data)=>{

    if(data.error){
       //error from fetch
       alert("ERROR in fetch")
       console.log(data.error)
    }else{
        //no error
        postTitleInput = document.getElementById('postTitleInput')
        postTitleInput.value = data.title

        postDescInput = document.getElementById('postDescInput')
        postDescInput.value = data.description

        
       
    
    }
})
.catch(
    (error)=>{
        console.log(error)
    }
)


//handle form onsubbit
form = document.getElementById('form')
form.onsubmit = (event)=>{
    event.preventDefault()

    //create form data for object (this endpoint only reads form data)
    //https://stackoverflow.com/questions/35192841/how-do-i-post-with-multipart-form-data-using-fetch
    const data = {
        title : postTitleInput.value,
        description : postDescInput.value,
        postImage : postPicInput.files[0],//refactoring needed here if want to work with multiple files
        _id : id
    }
    //creats form data obj and appennds data to from data
    const formData  = new FormData();
    for(const name in data) {
        formData.append(name, data[name]);
      }


      //declaring request options
    const updatePostUrl = `http://localhost:3000/posts/${id}`
    const updatePostParams = {
        headers : {
            
        },
        body: formData,
        method : "POST"
        }

    //send post request to server to update post
    fetch(updatePostUrl , updatePostParams)
    .then(response => response.json())//parse response into readable json
    .then((data)=>{

        if(data.error){
        //error from fetch
        alert("ERROR in fetch")
        console.log(data.error)
        }else{
        window.location.href = "/admin/dashboard/posts"
        
        }
    })
    .catch(
        (error)=>{
            console.log(error)
        }
    )

}
