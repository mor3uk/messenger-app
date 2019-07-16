const getFieldInUse = (email, login, errmsg) => {
    if (errmsg.indexOf(email) != -1) {
        return 'email';
    }

    if (errmsg.indexOf(login) != -1) {
        return 'login';
    }
};

