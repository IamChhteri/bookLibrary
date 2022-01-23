console.log("You are Connected to LoginScript")
function login(){

    username = document.getElementById('userName').value
    password = document.getElementById('password').value


    console.log(username+ "\n"+password)

    xhr = new XMLHttpRequest();
    tokenSend = null
    xhr.open('POST','http://127.0.0.1:8000/api-token-auth',true)

    
    loginID = {
        "username":username,
        "password":password
    }

    xhr.onload =function(){

        ResponseData = JSON.parse(this.responseText)

        if (ResponseData['token']){
            sessionStorage.setItem("Token",JSON.stringify(this.responseText))
            alert("Login Sucessfull")
            location.href = "admin.html"

        }   else{
            alert("UserName / Password incorrect")
        }

    }

    xhr.setRequestHeader('Content-type', 'application/JSON');
    xhr.send(JSON.stringify(loginID))

}

