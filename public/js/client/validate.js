const validateEmail = (email) => {
    email = email.trim();

    if (!email) {
        return {
            error: 'Empty email'
        };
    }

    let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email.match(regExp)) {
        return {
            error: 'Invalid email'
        };
    }
};

const validateLogin = (login) => {
    login = login.trim();

    if (!login) {
        return {
            error: 'Empty login'
        };
    }

    if (login.length < 4) {
        return {
            error: 'Login length shorter than 4'
        };
    }

    if (login.length > 20) {
        return {
            error: 'Login length longer than 20'
        };
    }
};

const validateName = (name) => {
    name = name.trim();

    if (!name) {
        return {
            error: 'Empty name'
        };
    }

    if (name.length < 2) {
        return {
            error: 'Name length shorter than 2'
        };
    }

    if (name.length > 20) {
        return {
            error: 'Name length longer than 20'
        };
    }
};

const validatePasswords = (password1, password2) => {
    if (!password1) {
        return {
            error: 'Empty password'
        };
    }

    if (password1.length < 9) {
        return {
            error: 'Password length shorter than 9'
        };
    }

    if (password1.length > 25) {
        return {
            error: 'Password length longer than 25'
        };
    }

    if (password2 !== undefined && password1 !== password2) {
        return {
            error: 'Passwords don\'t match'
        };
    }
};