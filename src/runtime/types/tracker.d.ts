import config from '../ui.config/tracker'

export interface TrackerData {
  color?: keyof typeof config
  tooltip?: string
}
