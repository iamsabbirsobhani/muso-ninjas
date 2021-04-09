import {
  createRouter,
  createWebHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlaylist from '../views/playlist/CreatePlaylist.vue'
import {
  projectAuth
} from '../firebase/config'

  // to = 'to' refers, the route we are goint to...
  // from = 'from' refers, the route we have just come from...
  // next = 'next()' is a function, And we can fire it to 'carry on' or 'redirect' to a certain route if the given condition did not full-fill.

const requireAuth = (to, from, next) => {
  // from 'firebase authentication service', this property '(currentUser) alias now (user)' gets us the current user, if there any.
  // if user logged in, then it's going to be that 'user object'
  // if user not logged in, then it's going to be 'null'
  let user = projectAuth.currentUser

  // -------

  // we want to check, do we have a user? or doest that user exist?
  // if we have no user, we want to redirect them to 'login' route.
  // if we have user logged in,  then we will just call next() as normal and let 'user' carry on to the page, where we want them to go.

  if (!user) { // if dont have a user
    next({ name: 'Login' }) // we want to redirect them to 'Login'
  } else {
    next() // if we do have a valid or logged user we want to permit user to go a certain route, for this case it's 'createPlaylist'
  }
}

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlist/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router