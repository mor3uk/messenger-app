authenticateUser((socket, loginFrom) => {
    let $messageForm = document.querySelector('#chat-form');
    
    $messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let message = e.target.querySelector('textarea').value;
        let loginTo = e.target.querySelector('input').value;

        socket.emit('message', {
            from: loginFrom,
            to: loginTo,
            message,
        });
    });

    socket.on('message', ({ from, message } = {}) => {
        console.log(from);
        console.log(message);
    });
});