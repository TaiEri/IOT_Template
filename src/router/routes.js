const Main = () => import('../views/main')
const Login = () => import('../views/user/login.vue')
const Home = () => import('../views/home')
const Bulb = () => import('../views/bulb')
const VideoSwitch = () => import('../views/video-switch')
const ConfScreen = () => import('../views/conf-screen')
const Aircondition = () => import('../views/aircondition')
const VideoConference = () => import('../views/video-conference')
const Voice = () => import('../views/voice')
const Curtain = () => import('../views/curtain')
const ScreenProtector = () => import('../views/screen-protector')
const RoomSelect = () => import('../views/room-select')
const RoomModeSelect = () => import('../views/room-mode-select')
const Door = () => import('../views/door')

export default [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: '/',
        redirect: '/home'
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/videoconference',
        component: VideoConference
      },
      {
        path: '/aircondition',
        component: Aircondition
      },
      {
        path: '/voice',
        component: Voice
      },
      {
        path: '/confscreen',
        component: ConfScreen
      },
      {
        path: '/bulb',
        component: Bulb
      },
      {
        path: '/videoswitch',
        component: VideoSwitch
      },
      {
        path: '/curtain',
        component: Curtain
      },
      {
        path: '/door',
        component: Door
      }
    ]
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/screen_protector',
    component: ScreenProtector
  },
  {
    path: '/rooms',
    component: RoomSelect
  },
  {
    path: '/room_mode',
    component: RoomModeSelect
  }
]
