// sign in work start

function Nsignin(){
       window.open('./signin.html', '_self');
}
function Nlogin(){
       window.open('./login.html', '_self');
}

function signin(){
    let Jname = document.getElementById('name')
    let Jemail = document.getElementById('email')
    let Jpassword = document.getElementById('password')
    if(Jname.value == '' || Jemail.value == '' || Jpassword.value == ''){
      alert("Please Enter given requirements")
    }
    else{
    localStorage.setItem("Full Name", Jname.value)
    localStorage.setItem("Email", Jemail.value)
    localStorage.setItem("Password", Jpassword.value)
    localStorage.setItem("Confirm Password", Jpassword.value)    
    window.open('./login.html', '_self');
    }  }

// login work start
function login(){
   let person = document.getElementById('user').value
    let firstWord = person.slice(0,1).toUpperCase()
    let remainWord = person.slice(1).toLowerCase()
    let people = firstWord + remainWord
    let logE = document.getElementById('email').value
    let logP = document.getElementById('password').value
    let lsE = localStorage.getItem('Email')
    let lsP = localStorage.getItem('Password')
    let lsCP = localStorage.getItem('Confirm Password')

if(logE === lsE && logP === lsP && logP === lsCP && people === 'Admin'){window.open('./admin-page.html', '_self');}
else if(logE === lsE && logP === lsP && people === 'User'){window.open('./user-page.html', '_self');}
else{alert("Login Failed")}
}

// location search button

function search(){
       window.open("https://www.google.com/maps", "_blank");
}

// cards works 

let allitem = [];

function addBtn() {
  let nameM = document.getElementById('name');
  let priceM = document.getElementById('price');
  let imgInput = document.getElementById('imageUrl');
  let allPostAdd = document.getElementById('allpost');
  let file = imgInput.files[0];

  if (!file) {
    alert("Please select an image.");
    return;
  }

  let reader = new FileReader();

  reader.onload = function (e) {
    let obj = {
      ItemsName: nameM.value,
      ItemsPrice: priceM.value,
      ItemsImage: e.target.result ,
    };

    allitem.push(obj);
    localStorage.setItem('AllItems', JSON.stringify(allitem));

    nameM.value = "";
    priceM.value = "";
    imgInput.value = "";
    allPostAdd.innerHTML = "";
    let allPosts = JSON.parse(localStorage.getItem("AllItems") || "[]");

    if (allPosts.length === 0) {
      allPostAdd.innerHTML = `<div class="text-center text-muted">No posts available. Click 'Create New' to add one.</div>`;
    return;
}

    allPosts.forEach((obj) => {
      allPostAdd.innerHTML += `
        <div class="col-md-4" id="postD">
          <div class="card h-100 shadow-sm border-1 card-hover">
            <img src="${obj.ItemsImage}" class="card-img-top" alt="Post Image" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${obj.ItemsName}</h5>
              <div class="d-flex justify-content-between align-items-center mt-auto">
                <span class="fw-bold text-success">Rs. ${obj.ItemsPrice}</span>
                <div>
                  <button class="btn btn-sm btn-outline-danger me-1" title="Delete" onclick="deleteA"><i class="fa-solid fa-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  };

  reader.readAsDataURL(file);
}

// shopping add items user

function addToList(itemName, itemPrice) {
  let ulItems = document.getElementById('addItemsList');
  ulItems.innerHTML += `<li><a class="dropdown-item">${itemName} - Rs.${itemPrice}</a></li>`;
let addItemsName = localStorage.setItem('addItemsName',itemName)
}

// shopping add items admin
let ulItems = document.getElementById('addItemsList2');
let PickNameItems = []
function ViewOrder() {
  let object = {
    OrderItems : pickName.value,
  }
 PickNameItems.push(object);
    localStorage.setItem('AllItemsOrder', JSON.stringify(PickNameItems));
    let allitemsOrder = JSON.parse(localStorage.getItem("AllItemsOrder") || "[]");

  ulItems.innerHTML = ''; 
  if (pickName) {
    ulItems.innerHTML = `<li><a class="dropdown-item">${allitemsOrder}</a></li>`;
  }
}

// delete button function
 function deleteA() {
    const postDiv = document.getElementById("postD");
    if (postDiv) {
      postDiv.remove();
    }
  }