import { h } from '#imports'
import { createApp, type App } from 'vue'
import type { Chart, TooltipModel } from 'chart.js'
// @ts-ignore
import TooltipChart from '../components/charts/TooltipChart.vue'

interface VueElement extends HTMLElement {
  __vue_app__?: App<Element>
}

export const chartTooltip = (context: {
  chart: Chart<any>
  tooltip: TooltipModel<any>
}) => {
  const { chart, tooltip } = context
  let mountPoint = chart.canvas.parentNode?.querySelector<VueElement>('div')

  if (!mountPoint) {
    mountPoint = document.createElement('div')
    chart.canvas.parentNode?.appendChild(mountPoint)
  } else {
    if (mountPoint.__vue_app__) {
      mountPoint.__vue_app__.unmount()
    }
  }

  if (tooltip.opacity === 0) {
    mountPoint.style.opacity = '0'
    return
  } else {
    mountPoint.style.opacity = '1'
  }

  const { offsetLeft, offsetTop } = chart.canvas

  mountPoint.style.position = 'absolute'
  mountPoint.style.left = `${tooltip.caretX + offsetLeft}px`
  mountPoint.style.top = `${tooltip.caretY + offsetTop}px`
  mountPoint.style.transform = 'translateX(-50%)'
  mountPoint.style.pointerEvents = 'none'
  mountPoint.style.zIndex = '9999'
  mountPoint.style.transition = 'all .1s ease'

  const body = tooltip.body.map((b, i) => ({
    labels: b.lines.map((l) => l.split(': ')[0]),
    values: b.lines.map((l) => l.split(': ')[1]),
    colors:
      tooltip.labelColors[i].borderColor === 'rgba(0,0,0,0.1)'
        ? tooltip.labelColors[i].backgroundColor
        : tooltip.labelColors[i].borderColor
  }))

  let tooltipVNode = h(TooltipChart, {
    title: tooltip.title.join(', ') || '',
    data: body
  })

  const app = createApp(tooltipVNode)
  app.mount(mountPoint)

  mountPoint.__vue_app__ = app
}
