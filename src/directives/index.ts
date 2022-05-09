import { DirectiveBinding } from 'vue'

export const vClickOutside = {
  mounted(el: ClickableEl, binding: DirectiveBinding)
  {
    el.clickEvent = function (e: Event)
    {
      if (!(el == e.target || el.contains(e.target as Node)))
      {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickEvent)
  },
  unmounted(el: ClickableEl)
  {
    document.removeEventListener('click', el.clickEvent)
  }
}

export interface ClickableEl extends Element {
  clickEvent: (e: Event) => void;
}