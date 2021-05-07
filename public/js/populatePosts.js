mainContainer = document.getElementById('mainContainer')

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


//specify get request options'
url = `/posts/`
params = postsParams = {
    headers : {
        "Content-Type" : "application/json"
    },
    method : "GET"
}


 //send get request to server 
 fetch(url , params)
 .then(response => response.json())//parse response into readable json
 .then((data)=>{

     if(data.error){
        //error from fetch
        alert("ERROR in fetch")
        console.log(data.error)
     }else{
        
        //no posts conditional rendering
        if(data.length == 0){
            postRow = document.createElement("div")
            postRow.className = `row`

            postRow.innerHTML = `
                <h1> No posts </h1>

            `

            //append new post row to table body
            mainContainer.appendChild(postRow)
            return 
        }

        //traverses the array and appends new row to table
        data.forEach(post => {
            //create new post row
            postRow = document.createElement("div")
            postRow.className = `row`
            newPost = `
                <div class="col">
                <div class="row p-3 post-container">

                    <div class="col image-container">
                        <img class = "post-image" src="data:image/jpg;base64,${_arrayBufferToBase64(post.picture.data)}"  alt="pic" srcset="">
                    </div>

                    <div class="col content-container">
                        <h3>${post.title}</h3>
                        <p>
                            ${post.description}
                        </p>
                    </div>

                </div>
            </div>
        
            `
            postRow.innerHTML = newPost


            //append new post row to table body
            mainContainer.appendChild(postRow)

        });
     }
 })
 .catch(
     (error)=>{
         console.log(error)
     }
 )