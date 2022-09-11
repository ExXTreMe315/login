function register () {
    let uname = document.getElementById('username').value;
    let pword = document.getElementById('password').value;
    var infos = [uname, pword]
    alt.emit('register:Submit', infos);
}

function login () {
    alt.emit('register:login');
}

function quit () {
    alt.emit('register:quit');
}

alt.on('alert', msg => {
    document.getElementById('alert').innerHTML = msg;
    document.getElementById('alert').style.visibility= "visible";
});