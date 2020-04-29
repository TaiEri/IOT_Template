import Asider from './Asider/Asider.vue'
import Button from './Button'
import ButtonBack from './ButtonBack'

export default {
  install: (Vue) => {
    Vue.component(Asider.name, Asider)
    Vue.component(Button.name, Button)
    Vue.component(ButtonBack.name, ButtonBack)
  }
}
