// sign in work start

function Nsignup(){window.open('./signup.html', '_self');}
function Nlogin(){window.open('./login.html', '_self');}
let allUser = [] 
function signup() {
    let Dname = document.getElementById('name');
    let Demail = document.getElementById('email');
    let Dpassword = document.getElementById('password');

    if (Dname.value === '' || Demail.value === '' || Dpassword.value === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter given requirements",
            footer: '<a href="./signup.html">Go to signup page</a>'
        });
    } else {
        let allUser = JSON.parse(localStorage.getItem('AllUserData')) || [];
        let user = {
            UserName: Dname.value,
            UserEmail: Demail.value,
            UserPassword: Dpassword.value
        };

        allUser.push(user);       
        localStorage.setItem('AllUserData', JSON.stringify(allUser));
        window.open('./login.html', '_self');
    }
}

// login work start
function login() {
    let inputEmail = document.getElementById('email').value.trim();
    let inputPassword = document.getElementById('password').value.trim();
    let roleRadio = document.querySelector('input[name="role"]:checked');

    // ✅ Check for empty fields or no role selected
    if (inputEmail === '' || inputPassword === '' || !roleRadio) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter all required fields and select a role.",
            footer: '<a href="./signup.html">Go to signup page</a>'
        });
        return; // stop function here
    }

    let roleOfUser = roleRadio.value;
    let allUser = JSON.parse(localStorage.getItem('AllUserData')) || [];

    let matched = allUser.find(UD => 
        UD.UserEmail === inputEmail && UD.UserPassword === inputPassword
    );

  if (matched && roleOfUser === 'admin') {
    Swal.fire({
        title: "Welcome Administrator",
        icon: "success",
        draggable: true,
        timer: 1500, // Show alert for 2 seconds
        showConfirmButton: false
    });

    setTimeout(() => {
        window.open('./admin-page.html', '_self');
    }, 1500); // Delay redirect to allow alert display

} else if (matched && roleOfUser === 'user') {
    Swal.fire({
        title: "Welcome User",
        icon: "success",
        draggable: true,
        timer: 1500,
        showConfirmButton: false
    });

    setTimeout(() => {
        window.open('./user-page.html', '_self');
    }, 1500);

} else {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect login details",
        footer: '<a href="./login.html">Try again</a>'
    });
}
}

// option selected function

function selectItem(element) {
    document.getElementById('dropdownButton').textContent = element.textContent;
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
            <img src="${obj.ItemsImage}" class="card-img-top" alt="Post Image" style="height: 300px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${obj.ItemsName}</h5>
              <div class="d-flex justify-content-between align-items-center mt-auto">
                <span class="fw-bold text-success">Rs. ${obj.ItemsPrice}</span>
                <div>
                  <button class="btn btn-sm btn-outline-danger me-1" title="Delete" onclick="deleteOrderItems (this)"><i class="fa-solid fa-trash"></i></button>
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

let allprice = [];

function addToList(itemName, itemPrice) {
  let addAllCard = document.getElementById('addToCard');

  allprice.push(itemPrice);

  addAllCard.innerHTML += `
    <div class="card text-center" data-price="${itemPrice}">
      <div class="card-body">
        <h5 class="card-title">${itemName}</h5>
        <p class="card-text">Rs: ${itemPrice}</p>
        <button onclick="deleteOrderItems(this)" class="btn btn-outline-danger">Delete</button>
      </div>
    </div>
  `;

  Swal.fire({
    title: "Item Added",
    icon: "success",
    html: `${itemName} <br> Rs: ${itemPrice}`,
    timer: 1000,
    showConfirmButton: false
  });

  updateTotal();
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

 function deleteOrderItems(button) {
  // 1. Get the nearest card element
  let card = button.closest('.card');

  // 2. Remove price from array
  let price = parseFloat(card.getAttribute('data-price'));
  let index = allprice.indexOf(price);
  if (index !== -1) {
    allprice.splice(index, 1);
  }

  // 3. Remove card from DOM
  card.remove();

  // 4. Update total
  updateTotal();
}



// place order button function 

function placeOrder() {
  let total = allprice.reduce((sum, price) => sum + price, 0);
  Swal.fire({
    title: "Order Done Successfully",
    html: `Your total Bill is Rs: ${total}`,
    icon: "success"
  });

  allprice = [];
  document.getElementById('addToCard').innerHTML = '';
  document.getElementById('totalAmount').innerText = "Total: Rs 0";
  localStorage.removeItem('addItemsName');
}

function updateTotal() {
  let total = allprice.reduce((sum, p) => sum + p, 0);
  document.getElementById('totalAmount').innerText = `Total: Rs ${total}`;
}

// responce item like 

function responce(){
  const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger"
  },
  buttonsStyling: false
});
swalWithBootstrapButtons.fire({
  title: "Your openion?",
  text: "Give me your openion to this item!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Good ",
  cancelButtonText: "Bad ",
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed) {
    swalWithBootstrapButtons.fire({
      title: "Thanks",
      text: "Your response is submitted.",
      icon: "success"
    });
  } else if (
    result.dismiss === Swal.DismissReason.cancel
  ) {
    swalWithBootstrapButtons.fire({
      title: "I'll try the best",
      text: "Your response is submitted.",
      icon: "error"
    });
  }
});
}

