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

import { withReadme } from 'storybook-readme'
import ReadMe from './README.md'

import BarGraph from './BarGraph'

const graph_story = storiesOf('Components/Graph', module)

graph_story
  .addDecorator(withKnobs)
  .addDecorator(withReadme(ReadMe))
  .addDecorator(story => (
    <div
      style={{
        maxWidht: '60rem',
        padding: '3rem 2rem',
      }}
    >
      {story()}
    </div>
  ))

graph_story.add(
  'Bar Graph',
  withInfo(
    `Bar Graph

        Bar Graph Descption goes here
    `
  )(() => {
    return (
      <div style={{ width: '35%' }}>
        <BarGraph
          barValue={number('Value', 60, {
            range: true,
            min: 1,
            max: 100,
            step: 1,
          })}
          barBaseValue={100}
          barLabelText="Almost ready for an upgrade"
          barValueExplain="Pay off and update"
        />
      </div>
    )
  })
)
