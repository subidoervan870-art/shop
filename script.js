
let users = JSON.parse(localStorage.getItem("users")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentUser = localStorage.getItem("currentUser") || null;

let products = [

{name:"Headphones",price:20,img:"https://via.placeholder.com/150"},
{name:"Phone Case",price:8,img:"https://via.placeholder.com/150"},
{name:"Keyboard",price:30,img:"https://via.placeholder.com/150"},
{name:"Mouse",price:15,img:"https://via.placeholder.com/150"},
{name:"Charger",price:12,img:"https://via.placeholder.com/150"},
{name:"Powerbank",price:25,img:"https://via.placeholder.com/150"},
{name:"USB Cable",price:5,img:"https://via.placeholder.com/150"},
{name:"Tablet",price:150,img:"https://via.placeholder.com/150"},
{name:"Laptop",price:600,img:"https://via.placeholder.com/150"},
{name:"Smart Watch",price:90,img:"https://via.placeholder.com/150"}

];

updateCart();
displayProducts();

function togglePassword(){
  let pass = document.getElementById("regPass");
  let btn = document.querySelector(".toggleBtn");

  if(pass.type === "password"){
    pass.type = "text";
    btn.innerText = "Hide";
  } else {
    pass.type = "password";
    btn.innerText = "Show";
  }
}

function checkPassword(){

let pass = document.getElementById("regPass").value;
let strength = document.getElementById("strength");

let strong = /(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}/;
let medium = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;

if(pass.match(strong)){
strength.innerText = "Strong Password";
strength.style.color = "green";
}
else if(pass.match(medium)){
strength.innerText = "Medium Password";
strength.style.color = "orange";
}
else{
strength.innerText = "Weak Password";
strength.style.color = "red";
}

}

function register(){

let username = document.getElementById("regUser").value;
let email = document.getElementById("regEmail").value;
let number = document.getElementById("regNumber").value;
let age = document.getElementById("regAge").value;
let address = document.getElementById("regAddress").value;
let password = document.getElementById("regPass").value;

let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;

if(!passwordPattern.test(password)){
alert("Password must contain:\n- 1 Capital letter\n- 1 Small letter\n- 1 Special character");
return;
}

let user = {
username,
email,
number,
age,
address,
password
};

users.push(user);
localStorage.setItem("users", JSON.stringify(users));

alert("Account Created!");

showLogin();

}




function login(){

let username=document.getElementById("loginUser").value;
let password=document.getElementById("loginPass").value;

let found=users.find(u=>u.username===username && u.password===password);

if(found){

currentUser = username;

localStorage.setItem("currentUser",username);

cart = JSON.parse(localStorage.getItem("cart_"+username)) || [];

cart.forEach(item=>{
if(!item.qty){
item.qty = 1;
}
});

if(currentUser){
cart = JSON.parse(localStorage.getItem("cart_"+currentUser)) || [];

document.getElementById("loginBox").style.display="none";
document.getElementById("shop").style.display="block";

updateCart();
}

updateCart();

document.getElementById("loginBox").style.display="none";
document.getElementById("registerBox").style.display="none";
document.getElementById("shop").style.display="block";

}else{

alert("Wrong Username or Password");

}

}


function logout(){
localStorage.removeItem("currentUser");
location.reload();

}





function showLogin(){

document.getElementById("registerBox").style.display="none";
document.getElementById("loginBox").style.display="block";

}

function showRegister(){

document.getElementById("loginBox").style.display="none";
document.getElementById("registerBox").style.display="block";

}



function displayProducts(){

let container = document.getElementById("productList");

container.innerHTML = "";

products.forEach((p,i)=>{

container.innerHTML += `

<div class="product">

<img src="${p.img}" alt="${p.name}">

<h3>${p.name}</h3>

<p>$${p.price}</p>

<button onclick="addToCart(${i})">Add To Cart</button>

</div>

`;

});

}



function addToCart(index){

if(!currentUser){
alert("Please login first");
return;
}

let product = products[index];

let found = cart.find(item => item.name === product.name);

if(found){
found.qty += 1;
}else{
cart.push({...product, qty:1});
}

localStorage.setItem("cart_"+currentUser,JSON.stringify(cart));

updateCart();

alert("Added to cart");

}


function updateCart(){

let count = document.getElementById("cartCount");

if(count){

let totalQty = 0;

cart.forEach(item=>{
totalQty += item.qty || 1;
});

count.innerText = totalQty;

}

}

function showCart(){

document.getElementById("shop").style.display="none";
document.getElementById("cartPage").style.display="block";

let list=document.getElementById("cartItems");

list.innerHTML="";

let total=0;

cart.forEach((item,i)=>{

let qty = item.qty || 1;

total += item.price * qty;

list.innerHTML += `

<tr>

<td class="cartProduct">
<img src="${item.img}" width="50">
${item.name}
</td>

<td>$${item.price}</td>

<td>
<button class="qtyBtn" onclick="decreaseQty(${i})">-</button>
${qty}
<button class="qtyBtn" onclick="increaseQty(${i})">+</button>
</td>

<td>$${item.price * qty}</td>

<td>
<button class="removeBtn" onclick="removeCart(${i})">Delete</button>
</td>

</tr>

`;

});

}

function removeCart(index){

cart.splice(index,1);

localStorage.setItem("cart_"+currentUser,JSON.stringify(cart));

showCart();
updateCart();

}

function removeCart(index){

cart.splice(index,1);

localStorage.setItem("cart_"+currentUser,JSON.stringify(cart));

showCart();
updateCart();

}



function backToShop(){

document.getElementById("cartPage").style.display="none";
document.getElementById("shop").style.display="block";

}



function searchProduct(){

let input=document.getElementById("search").value.toLowerCase();

let productDivs=document.querySelectorAll(".product");

productDivs.forEach(div=>{

let text=div.innerText.toLowerCase();

if(text.includes(input)){
div.style.display="block";
}else{
div.style.display="none";
}

});

}

function increaseQty(index){

cart[index].qty = (cart[index].qty || 1) + 1;

localStorage.setItem("cart_"+currentUser,JSON.stringify(cart));

showCart();
updateCart();

}


function decreaseQty(index){

if((cart[index].qty || 1) > 1){
cart[index].qty--;
}else{
cart.splice(index,1);
}

localStorage.setItem("cart_"+currentUser,JSON.stringify(cart));

showCart();
updateCart();

}