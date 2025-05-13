let alluser = [];

// sign up function
function signUp() {
    let getname = document.getElementById('name');
    let getemail = document.getElementById('email');
    let getpass = document.getElementById('pass');

    if (getname.value.trim() === "" || getemail.value.trim() === "" || getpass.value.trim() === "") {
        alert('Enter Given Requirements');
    } else {
        localStorage.setItem('Full Name', getname.value);
        localStorage.setItem('Email', getemail.value);
        localStorage.setItem('Password', getpass.value);

        getname.value = '';
        getemail.value = '';
        getpass.value = '';
        window.open('./login-page.html', '_self');
    }
}

// login button functionality

