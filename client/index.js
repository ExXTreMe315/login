"use strict";
/// <reference path="typings/altv-client.d.ts"/>
/// <reference path="typings/natives.d.ts"/>
import * as alt from "alt-client";
import * as game from "natives";

//////////////////////////////////////---------------------Login---------------------//////////////////////////////////////

alt.onServer('login:Load', () => {
  const login = new alt.WebView('http://resource/client/html/login.html');
  login.focus();

  alt.showCursor(true);
  alt.toggleGameControls(false);
  
  // handle Submit
  login.on('login:Submit', infos => {

    var uname = infos[0];
    var pword = infos[1];

    alt.emitServer('login:sendinfo', uname, pword);

    // Webview ausschalten
    alt.onServer('login:close', () => {
      alt.showCursor(false);
      alt.toggleGameControls(true);
      game.doScreenFadeIn(1000);
      login.destroy();
      alt.emitServer('SpawnPlayer');
    });
  });
  // Login => Register
  login.on('login:register', () => {
    if (login) {
      login.destroy();
      alt.showCursor(false);
      alt.emit('register:Load')
    } else if (err) throw err;
  });

  // handle quit
  login.on('login:quit', () => {
    let reason = "Quit Login"
    alt.emitServer('kick', reason);
  });

  // Errors
  alt.onServer('alert101', () => {
    let msg = "Internal Error 101";
    login.emit('alert', msg);
  });

  alt.onServer('alert102', () => {
    let msg = "Username not found";
    login.emit('alert', msg);
  });

  alt.onServer('alert103', () => {
    let msg = "Internal Error 103";
    login.emit('alert', msg);
  });

  alt.onServer('alert104', () => {
    let msg = "Password incorrect!";
    login.emit('alert', msg);
  });
});

//////////////////////////////////////---------------------Register---------------------//////////////////////////////////////
alt.on('register:Load', () => {
  const register = new alt.WebView('http://resource/client/html/register.html');
  register.focus();

  alt.showCursor(true);
  alt.toggleGameControls(false);
  // handle Submit
  register.on('register:Submit', infos => {

    var uname = infos[0];
    var pword = infos[1];

    alt.emitServer('register:sendinfo', uname, pword);

    // Webview ausschalten
    alt.onServer('register:complete', () => {
      alt.log("Client Register Complete > Login Load");
      register.destroy();
      alt.showCursor(false);
      alt.emitServer('login:Load');
    });
  });

  // Register => Login
  register.on('register:login', () => {
    if (register) {
      register.destroy();
      alt.showCursor(false);
      alt.emitServer('login:Load');
    } else if (err) throw err;
  });

  // handle quit
  register.on('register:quit', () => {
    let reason = "Quit Register"
    alt.emitServer('kick', reason);
  });

  // Errors
  alt.onServer('alert201', () => {
    alt.log("Error 201");
    let msg = "Username to short (min length: 4)";
    register.emit('alert', msg);
  });
  
  alt.onServer('alert202', () => {
    let msg = "Internal Error 202";
    register.emit('alert', msg);
  });
  
  alt.onServer('alert203', () => {
    let msg = "Password to short (min length: 6)";
    register.emit('alert', msg);
  });
});
