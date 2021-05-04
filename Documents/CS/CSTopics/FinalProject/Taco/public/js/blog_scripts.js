let blog = document.getElementsByTagName("h1")[0].innerText.trim().replace(" ","_");

for(let val=4; val < document.getElementsByTagName("button").length; val++){
  document.getElementsByTagName("button")[val].addEventListener('click', function(){
      let xmlhttp = new XMLHttpRequest();
      let commentNum = document.getElementsByTagName("button")[val].id.split("like_button")[1];
      // Specify details of the POST request
      xmlhttp.open("POST", "/blog/like/"+blog+"/"+commentNum, true);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Define the data you’d like to send to the server
      let postData = {
       "like": 1
      };
      // Make a POST request with your data in the body of the request
      xmlhttp.send(JSON.stringify(postData));
      // Do something once the Response (Good or Bad) has been received
      xmlhttp.onreadystatechange = function(data) {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
              let blogObject=JSON.parse(xmlhttp.responseText);
              document.getElementsByTagName("span")[val-1].innerText=blogObject.comments[commentNum].likes;
          }else{
            response.status(404);
            response.setHeader('Content-Type', 'text/json');
            response.send('{results: "no like"}');
      	  }
      }
  });
}

document.getElementById("commentSubmit").addEventListener('click', function(){
      let xmlhttp = new XMLHttpRequest();
      // Specify details of the POST request
      xmlhttp.open("POST", "/blog/comment/"+blog, true);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Define the data you’d like to send to the server
      let postData = {
        "content": document.getElementById("newContent").value,
        "author": document.getElementById("newName").value,
        "date": document.getElementById("newDate").value
      };
      // Make a POST request with your data in the body of the request
      xmlhttp.send(JSON.stringify(postData));
      // Do something once the Response (Good or Bad) has been received
      xmlhttp.onreadystatechange = function(data) {
          if(this.readyState === XMLHttpRequest.DONE && this.status === 200) {
              let blogObject=JSON.parse(xmlhttp.responseText);
              let position = Object.keys(blogObject).length-1;

            //document.getElementById("commentTag")=blogObject.comments[position]

          }else{
            response.status(404);
            response.setHeader('Content-Type', 'text/json');
            response.send('{results: "no comment"}');
      	  }
      }
});
