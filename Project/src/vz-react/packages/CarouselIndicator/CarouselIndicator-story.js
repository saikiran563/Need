import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import {
  withKnobs,
  select,
  text,
  boolean,
  number,
  object,
  color,
} from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import { withReadme } from 'storybook-readme'
import ReadMe from './README.md'

import CarouselIndicator from '../CarouselIndicator/CarouselIndicator'

const indicator_story = storiesOf('Components/Carousel Indicator', module)

indicator_story
  .addDecorator(withKnobs)
  .addDecorator(withReadme(ReadMe))
  .addDecorator(story => (
    <div
      style={{
        padding: '3rem 2rem',
      }}
    >
      {story()}
    </div>
  ))

indicator_story.add(
  'Carousel Indicator',

  () => {
    return (
      <CarouselIndicator
        numSlides={number('Slides', 4, {
          range: true,
          min: 2,
          max: 10,
          step: 1,
        })}
      />
    )
  }
)
