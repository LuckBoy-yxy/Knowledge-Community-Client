import { escapeHtml } from '@/utils/escapeHtml'

export default {
  richText: {
    bind (el, binding, vnode) {
      el.innerHTML = escapeHtml(binding.value)
    }
  }
}
