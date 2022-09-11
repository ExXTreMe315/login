function login () {
  let uname = document.getElementById('username').value;
  let pword = document.getElementById('password').value;
  var infos = [uname, pword]
  alt.emit('login:Submit', infos);
}

function register () {
  alt.emit('login:register');
}

function quit () {
  alt.emit('login:quit');
}

alt.on('alert', msg => {
  document.getElementById('alert').innerHTML = msg;
  document.getElementById('alert').style.visibility= "visible";
});