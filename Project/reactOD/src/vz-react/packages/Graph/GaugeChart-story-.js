import React from 'react'
import { storiesOf } from '@storybook/react'

import {
  withKnobs,
  text,
  boolean,
  number,
  object,
} from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import GaugeChart from './GaugeChart'

const gaugechart_story = storiesOf('Components/Graph', module)

gaugechart_story.addDecorator(withKnobs)

gaugechart_story.add(
  'Gauge Chart',
  withInfo(
    `Gauge Chart

        Gauge Chart Descption goes here
    `
  )(() => {
    return (
      <GaugeChart
        radius={number('Radius', 200, {
          range: true,
          min: 50,
          max: 300,
          step: 1,
        })}
        angleRange={number('Angle Range', 275, {
          range: true,
          min: 200,
          max: 280,
          step: 1,
        })}
        meterValue={number('Value', 70, {
          range: true,
          min: 1,
          max: 100,
          step: 1,
        })}
      />
    )
  })
)
