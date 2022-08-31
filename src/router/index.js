import Vue from 'vue'
import Router from 'vue-router'
import Signin from '../components/Signin'
import Signup from '../components/Signup'
import Contracts from '../components/TurnData/Contracts'
import Turns from '../components/TurnData/Turns'
import EditTurns from '../components/TurnData/EditTurns'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/contracts',
      name: 'Contracts',
      component: Contracts
    },
    {
      path: '/turns',
      name: 'Turns',
      component: Turns
    },
    {
      path: '/edit_turns',
      name: 'EditTurns',
      component: EditTurns
    }
  ]
})
