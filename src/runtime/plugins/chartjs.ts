import { defineNuxtPlugin } from '#app'
import { h } from '#imports'
import { createApp, type App } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  type Plugin
} from 'chart.js'
// @ts-ignore
import LegendChart from '../components/charts/LegendChart.vue'

interface VueElement extends HTMLElement {
  __vue_app__?: App<Element>
}

const HtmlLegend: Plugin = {
  id: 'htmlLegend',
  afterUpdate(chart, args, options) {
    const mountPoint = document.querySelector<VueElement>(
      `#dashui-legend-${options.containerId}`
    )
    const labels = chart.options.plugins?.legend?.labels

    if (!labels) return
    const items = labels.generateLabels!(chart).map((item) => ({
      text: item.text,
      color:
        item.strokeStyle === 'rgba(0,0,0,0.1)'
          ? item.fillStyle
          : item.strokeStyle
    }))

    let legendVNode = h(LegendChart, {
      chart,
      data: items
    })

    if (!mountPoint) return
    if (mountPoint.__vue_app__) {
      mountPoint.__vue_app__.unmount()
    }

    const app = createApp(legendVNode)
    app.mount(mountPoint)

    mountPoint.__vue_app__ = app
  }
}

export default defineNuxtPlugin(() => {
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    Filler,
    HtmlLegend,
    BarElement,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
  )
})
