/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var HOSTNAME='http://alturkigroup-apps.com/apps/';
 var APPNAME='Alturki Apps';
var app = {
    // Application Constructor
    initialize: function() {
        app.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
        
        var pushNotification = window.plugins.pushNotification;
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(this.successHandler, this.errorHandler,{
                "senderID":"502408317490",//"20308353872",
                "ecb":"app.onNotificationGCM"
            });
        }
        else {
            pushNotification.register(this.successHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        app.registerToServer(result);
    },

    registerToServer: function(regid) {
        $.getJSON(HOSTNAME+"push-notification.php?jsoncallback=?",
        {
            regId: regid,
            platform: device.platform.toLowerCase()
        },
        function(data) {
            if(data.results.msg){
                var output=data.results.msg;
                if(output){
                    localStorage.setItem("pushnotificationid", output);
                }else{
                   localStorage.setItem("pushnotificationid", null);
                }
            }
        },
        function(error) {
        });
    },
    
    errorHandler:function(error) {
        navigator.notification.alert(error, null, APPNAME, "OK");
    },
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    var regId=e.regid;
                    app.registerToServer(regId);                 
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
            break;
 
            case 'error':
              console.log('GCM error = '+e.msg);
            break;
 
            default:
              console.log('An unknown GCM event has occurred');
              break;
        }
    },
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        
        if (event.alert) {
            navigator.notification.alert(event.alert, null, APPNAME, "OK");
        }
        if (event.badge) {
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, this.errorHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    }
};
