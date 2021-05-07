let blogTitle= document.getElementsByTagName("h1")[0].innerText.trim();
const quotes =  document.getElementsByClassName("btn<%=i%>");


document.getElementById("comment_button").addEventListener('click', function(){
  console.log("comment_button is clicked");
  let xmlhttp = new XMLHttpRequest();

  // Specify details of the POST request
  xmlhttp.open("POST", "/blog/comment/"+blogTitle, true);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // Define the data you’d like to send to the server
  let d = new Date(); 
  let commentElement = document.createElement("div"); 
  let lineBreak= document.createElement("br"); 
  // let contentElement = document.createElement("div"); 
  // let dateElement = document.createElement("div"); 
  let month = d.getMonth() + 1; 
  if (month == 1) {month = "January"}; 
  if (month == 2) {month = "February"}; 
  if (month == 3) {month = "March"}; 
  if (month == 4) {month = "April"}; 
  if (month == 5) {month = "May"}; 
  if (month == 6) {month = "June"}; 
  if (month == 7) {month = "July"}; 
  if (month == 8) {month = "August"}; 
  if (month == 9) {month = "September"}; 
  if (month == 10) {month = "October"}; 
  if (month == 11) {month = "November"}; 
  if (month == 12) {month = "December"}; 
  let dateNum = d.getDate(); 
  let year = d.getFullYear(); 
  let date = month + " " + dateNum + ", " + year; 
  let author = document.getElementById('author').value; 
  let content = document.getElementById('content').value; 
  let para = document.createElement("p");
  let para1 = document.createElement("p1");
  let para2 = document.createElement("p2");
  let newAuthor = document.createTextNode(author);
  let newContent = document.createTextNode(content);
  let newDate = document.createTextNode(date);
  para2.appendChild(newAuthor);
  para1.appendChild(newDate);
  para.appendChild(newContent);
  commentElement.appendChild(para2);
  commentElement.appendChild(lineBreak);
  commentElement.appendChild(para1);
  commentElement.appendChild(para);
  document.getElementById("space").appendChild(commentElement);
  // document.getElementById("space").appendChild(dateElement);
  // document.getElementById("space").appendChild(contentElement);

  let postData = {
    "author": author,
    "date": date,
    "content": content,
    "likes": 0
  };
  console.log(postData);
  // Make a POST request with your data in the body of the request
  xmlhttp.send(JSON.stringify(postData));

  // Do something once the Response (Good or Bad) has been received
  xmlhttp.onreadystatechange = function(data) {
    for (let inQuote of quotes){
        inQuote.addEventListener('click', function(){

            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                let userObject=JSON.parse(xmlhttp.responseText);
                console.log(xmlhttp.responseText);

                document.getElementById("like_count_<%=i%>").innerText= userObject.likes;
            }

      });
    }



  }

});
