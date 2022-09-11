import * as alt from "alt-server";
import * as chat from "chat";
import * as mysql from "mysql";
import * as crypto from 'crypto';

// =============================== Database ==================================================

const db = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "",
  database : "userdata"
});

db.connect((err) => {
  if(err) {
      console.log("Database Connection Failed")
      throw err;
  } else {
      console.log("Database connected!")
  }
});

// =============================== Ende Database ==================================================

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomListEntry(list) {
  return randomNumber(0, list.length - 1);
}

function hash (unhashed){
  return crypto.createHash('md5').update(unhashed).digest('hex');
}

alt.on('playerConnect', handleConnect);

/**
 * @param {alt.Player} player
 */
function handleConnect(player) {
  alt.emitClient(null, 'login:Load');
}

function spawnplayer(player) {
  player.spawn(-1291.71, 83.43, 54.89, 1000); // Spawns after 1 second.
  player.model = `mp_m_freemode_01`;
}
// =============================== Login ==================================================
alt.onClient('login:sendinfo', (player, uname, pword) => {

  db.query('SELECT * from userdata WHERE username="' + uname + '"', function (error, results, fields) {
    
    if (error) throw error;

    if (results[0]) { // User do exist
      if (!results[1]) { // only one user with this username
        if (hash(pword) == results[0]['password']){
          chat.send(player, "{00ff00}Eingeloggt als: " + uname);
          alt.emitClient(null, 'login:close');
        } else {
          alt.emitClient(null, 'alert104');
        }
      } else if (results[1]) { // Error more than one User
        alt.emitClient(null, 'alert103');
        alt.log(`Error more than one User by Username: ${uname}`);
      } else { // Unknown other Error
        alt.emitClient(null, 'alert101');
      }
    } else if (!results[0]) { // User do not exist
      alt.emitClient(null, 'alert102');
    } else { // Unknown other Error
      alt.emitClient(null, 'alert101');
    }
  });
});

// =============================== Register ==================================================
alt.onClient('register:sendinfo', (player, uname, pword) => {

  if (uname.length >= 4) {
    if (pword.length >= 6) {

      var eintrag = `INSERT INTO userdata (username, password) VALUES ('${uname}', '${hash(pword)}')`;
      
      db.query(eintrag, function (err, result) {
      
        if (err) throw err;
      
        console.log(`${player.name} registered as: ${uname}`);
        alt.emitClient(null, 'register:complete');
      });
    } else if (uname.length <= 5) { // Password to short
      alt.emitClient(null, 'alert203');
    } else { // Unknown other Error
      alt.emitClient(null, 'alert202');
    }
  } else if (uname.length <= 3) { // Username to short
    alt.emitClient(null, 'alert201');
    console.log("Error 201");
  } else { // Unknown other Error
    alt.emitClient(null, 'alert202');
  }
});

//Kick
alt.onClient('kick', (player, reason) => {
  player.kick(`Grund: ${reason}`);
});

alt.onClient('SpawnPlayer', (player) => {
  spawnplayer(player);
});

alt.onClient('login:Load', () => {
  alt.emitClient(null, 'login:Load');
});