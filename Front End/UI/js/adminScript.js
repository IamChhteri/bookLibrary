console.log("You are connected with AdminScript")

if (sessionStorage.getItem('Token')){
    getData()

}   else{
    //Login Code
    window.location.href = "login.html";

}


function getData(){

    xhr = new XMLHttpRequest();
    xhr.open('GET','http://127.0.0.1:8000/api',true)

    xhr.onload =function(){

        bookList = JSON.parse(this.responseText)
    
        tableBody = document.getElementById('tableBody')
        HtmlStr = ""
        i = 0
        bookList.forEach(element => {
            id = element['id']
            HtmlStr += '<tr class="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">'+
            
            '<td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">'+ ++i 
            +'</td>'+

            '<td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">'+ element['name']+

            '</td><td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">'+ element['author']+

            '</td> <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">'+ element['price']+
            '</td> <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap"><button type="button" onclick="updateData('+id+')"' 
            +'" class="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</button></td>'+
            '</td> <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap"><button type="button" onclick="deleteData('+id+')"' 
            +'" class="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Delete</button></td>'+
            '</tr>' 
        });

        tableBody.innerHTML = HtmlStr

    }

    data = JSON.parse(sessionStorage.getItem('Token'))
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'token '+JSON.parse(data)['token']);

    xhr.send()
}


function setData(){

    idNo = document.getElementById('idNo')
    BookName = document.getElementById('BookName')
    authorName = document.getElementById('authorName')
    pricetag = document.getElementById('pricetag')
    
    BookDataDetails = new Object()

    BookDataDetails.name = BookName.value
    BookDataDetails.author = authorName.value
    BookDataDetails.price = pricetag.value
    xhr = new XMLHttpRequest();

    if (idNo.value != ""){
        xhr.open('PUT','http://127.0.0.1:8000/api/admin',true)
        BookDataDetails.id = idNo.value

    }   else{
        xhr.open('POST','http://127.0.0.1:8000/api/admin',true)
        
    }

    
    xhr.onload = function(){
        alert(JSON.parse(this.responseText)['reason'])
        location.reload()
    }


    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'token '+JSON.parse(data)['token']);

        
    xhr.send(JSON.stringify(BookDataDetails))

}

function logout(){
    sessionStorage.clear()
    alert("Session out")
    location.reload()
}

function updateData(val){
    // sessionStorage.setItem("UpdateNo",val)
    // window.href.location = ""
    
    idNo = document.getElementById('idNo')

    BookName = document.getElementById('BookName')

    authorName = document.getElementById('authorName')
    pricetag = document.getElementById('pricetag')

        xhr = new XMLHttpRequest();
        xhr.open('GET','http://127.0.0.1:8000/api/admin?id='+val,true)
    
        xhr.onload =function(){
            
            BookData = JSON.parse(this.responseText)

            idNo.value = BookData['id']
            BookName.value = BookData['name']
            authorName.value = BookData['author']
            pricetag.value = BookData['price']


        }
        
    data = JSON.parse(sessionStorage.getItem('Token'))
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'token '+JSON.parse(data)['token']);

        
        xhr.send()

}


function deleteData(val){
    // sessionStorage.setItem("UpdateNo",val)
    // window.href.location = ""
    
// console.log(val)

        xhr = new XMLHttpRequest();
        xhr.open('delete','http://127.0.0.1:8000/api/admin?id='+val,true)
    
        xhr.onload =function(){

            ResponseData = JSON.parse(this.responseText)
            alert(ResponseData['reason'])
            location.reload()
        }
        
        // console
        data = JSON.parse(sessionStorage.getItem('Token'))
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'token '+JSON.parse(data)['token']);

        
    xhr.send()

}