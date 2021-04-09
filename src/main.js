import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'

// global styles
import './assets/main.css'


// after login, if we try to refresh pages, then we get redirected to 'log in' route or page.
// that's because it takes Firebase a fraction of time to initialize to figure out that user is logged in.
// and, by the time, 'requireAuth()' function runs from 'route index',  'projectAuth.currentUser' can not
// figured out whether user logged in or not yet.
// 'projectAuth.currentUser' is just 'null' to begin with.
// so we need to wait for that small fraction of time fro Firebase to establish the connection with the back-end and figure out whether user is logged in or not.
// we need to give Firebase a small fraction of time in order to understand users current status(logged in or not).

// ----

// So, we have to mount(#app) our application to the DOM, after Firebase have already established its connection.
// we only want to mount after Firebase had established its connection and detected some kind of authentication, state change to determine whether user logged in or not.

// in a word, we have to delay "mount('#app')" this function in order to get Firebase's established connection.

// ----
import {
    projectAuth
} from './firebase/config' // to check users current status

let app

// this triggered the observer when users were signed in, signed out, or when the user's ID token changed in situations such as token expiry or password change.
// 'onAuthStateChanged' fires a function everytime when the Firebase detects a change in authentication
// it fires initially when it first detects whether a user is logged in or logged out.
// so at this point we want to mount our application. So, in this interim Firebase will be able to established its connection fully, also we will be able solve the isse we have been facing.
projectAuth.onAuthStateChanged(() => {
    // "createApp(App).use(router).mount('#app')" this will be mounted every time we refresh or go to another route or if there is a change in authentication.
    // we only want to "mount" for the first time if there is a change when "onAuthStateChanged" it first detects that change.
    // so, what we do is, we create a local varibale 'let app'  app and then down here we set that equal to this "createApp(App).use(router).mount('#app')"

    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }

    // why we used "if" condition here?
    // for mount for the first time or to avoid mount the app every time if there is an authentication change.
    // so if "app" doesn't currently have a value, then we create the app "app = createApp(App).use(router).mount('#app')" and we mount it.
    // so the first time "if (!app) { app = createApp(App).use(router).mount('#app')}" these fires, "app" doesn't have a value, so "app = createApp(App).use(router).mount('#app')" this fires inside "onAuthStateChanged()" and it "mount" the application to the DOM and thereafter
    // if there's another auth state change, if user logged in or logged out the function "onAuthStateChanged" fires again, but this time we do have a value for "app" so therefore this codeblock "if (!app) { app = createApp(App).use(router).mount('#app')}"  does not fire
    // so it does not "remounted" or anything like that. it just fire for the first time.

    // ----

    // Now we have solved the problem of waiting for the app to initially mount until Firebase determine whether user "logged in" initially or not.
})