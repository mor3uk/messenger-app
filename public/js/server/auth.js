const authenticateUser = (callback) => {
    let socket = io.connect();

    let token = getCookie('token');
    let url   = '/users/auth';

    let http = new XMLHttpRequest();
    http.open('get', url, true);

    http.setRequestHeader('Authorization', 'Bearer ' + token);
    http.setRequestHeader('Content-Type', 'application/json');

    http.send();

    http.onloadend = () => {
        if (JSON.parse(http.response).errors) {
            console.log(JSON.parse(http.response).errors);
            return alert('error');
        }

        let user = JSON.parse(http.response).user;
        socket.emit('userConnected', user.login);

        callback(socket, user.login);
    };
};