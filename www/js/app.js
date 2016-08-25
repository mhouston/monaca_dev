angular.module('myApp', [ 'ngTouch', 'onsen.directives']);

document.addEventListener("deviceready", onDeviceReady, false);

var db;
var symbols;

function onDeviceReady() {
    
    console.log("ENTER : onDeviceReady");    
    
    document.addEventListener("offline", onOffline, false);

    document.addEventListener("resume", onResume, false);

    //check for network
    checkConnection();
    
    //check/setup db
    db = window.openDatabase("N6SSQ", "1.0", "N6S_SQ_DB", 1000000);
    db.transaction(populateDB, errorCB, successCB);  
    db.transaction(queryDB, errorCB);  
    

    var symbolKeyValue = window.localStorage.getItem("symbols");
    if(symbols == null)
    {
        console.log("symbols from local storage is null");
        window.localStorage.setItem("symbols","MO,GE,MSFT,PMI,T");
        symbolKeyValue = window.localStorage.getItem("symbols");
    }
    symbols = symbolKeyValue.split(",");
    
    
    
    console.log("EXIT : onDeviceReady");    
}



function onOffline() {
    console.log("ENTER : onOffline");        
    console.log("EXIT : onOffline");     
}

function onResume() {
    console.log("ENTER : onResume");        
    console.log("EXIT : onResume");    
}


function checkConnection() {
    console.log("ENTER : checkConnection");        
    if((navigator.connection.type == Connection.NONE)|| (navigator.connection.type == Connection.UNKNOWN)) 
    {
        console.log("STATUS : No Connection");        
    }
    else
    {
        console.log("STATUS : Connection available");        
    }
    console.log("EXIT : checkConnection");    
}



function populateDB(tx) {
    //tx.executeSql('DROP TABLE IF EXISTS SYMS');
    tx.executeSql('CREATE TABLE IF NOT EXISTS SYMS (id unique, symbol)');
    tx.executeSql('INSERT INTO SYMS (id, data) VALUES (1, "MO")');
    tx.executeSql('INSERT INTO SYMS (id, data) VALUES (2, "GE")');
}

function errorCB(err) {
        
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success!");
}

//var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
//db.transaction(populateDB, errorCB, successCB);

function queryDB(tx) {
    tx.executeSql('SELECT * FROM SYMS', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    console.log("Returned rows = " + results.rows.length);
    // this will be true since it was a select statement and so rowsAffected was 0
    if (!results.rowsAffected) {
        console.log('No rows affected!');
        return false;
    }
    // for an insert statement, this property will return the ID of the last inserted row
    console.log("Last inserted row ID = " + results.insertId);
}

//var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
//db.transaction(queryDB, errorCB);