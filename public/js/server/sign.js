let $signUpForm = document.querySelector('#sign-up_form');
let $signInForm = document.querySelector('#sign-in_form');

// Sign up
$signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let name      = e.target.name.value;
    let login     = e.target.login.value;
    let email     = e.target.email.value;
    let password1 = e.target.password1.value;
    let password2 = e.target.password2.value;

    if (validateName(name)) {
        return console.log(validateName(name).error);
    }
    if (validateLogin(login)) {
        return console.log(validateLogin(login).error);
    }
    if (validateEmail(email)) {
        return console.log(validateEmail(email).error);
    }
    if (validatePasswords(password1, password2)) {
        return console.log(validatePasswords(password1, password2).error);
    }

    sendToServer('/users', {
        name,
        login,
        email,
        password: password1
    });
});

// Sign up
$signInForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let login_email = e.target.login_email.value;
    let password    = e.target.password.value;

    if (validateLogin(login_email)) {
        return console.log(validateLogin(login_email).error);
    }
    if (validatePasswords(password)) {
        return console.log(validatePasswords(password).error);
    }

    sendToServer('/users/login', {
        login_email,
        password
    });
});

/**
 * Sends data to the specified url by post, format JSON, get user token back
 * @param {String} url - url to send
 * @param {Object} data - data to send
 */
const sendToServer = (url, data) => {
    let http = new XMLHttpRequest();
    http.open('post', url);
    http.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    let body = JSON.stringify(data);
    http.send(body);

    http.onloadend = () => {
        if (!(http.status == 200 || http.status == 201)) {
            switch (http.status) {
                case 404:
                    console.log('Incorrect input');
                    break;
                case 400:
                    if (JSON.parse(http.response).errmsg) {
                        let field = getFieldInUse(data.email, data.login, JSON.parse(http.response).errmsg);
                        console.log(`Such ${field} is already in use`);
                    }
            }

            return;
        }

        document.cookie = `token=${JSON.parse(http.response).token}`;
        location.href=`/chat.html`;
    };
};