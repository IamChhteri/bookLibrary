console.log("You are connected with MyScript")

getData()


function getData(){

    xhr = new XMLHttpRequest();
    xhr.open('GET','http://127.0.0.1:8000/api',true)

    xhr.onload =function(){

        bookList = JSON.parse(this.responseText)
        tableBody = document.getElementById('tableBody')
        HtmlStr = ""
        i = 0
        bookList.forEach(element => {
            HtmlStr += '<tr class="border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">'+
            
            '<td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">'+ ++i 
            +'</td>'+

            '<td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">'+ element['name']+

            '</td><td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">'+ element['author']+

            '</td> <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">'+ element['price']+

            '</tr>' 
        });

        tableBody.innerHTML = HtmlStr

    }

    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send()
}