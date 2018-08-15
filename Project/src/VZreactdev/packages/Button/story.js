import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './Button'

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

const button_story = storiesOf('Buttons', module)

button_story.addDecorator(withKnobs).addDecorator(withReadme(ReadMe))

const buttonEvents = {
  onClick: action('onClick'),
  onFocus: action('onFocus'),
  classname: 'extra-class',
}

button_story
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
  .add(
    'Primary',
    withInfo(
      `Primary Button

      Primary Button Descption goes here
    `
    )(() => {
      return (
        <Button
          {...buttonEvents}
          disabled={boolean('Disabled', false)}
          kind={Button.BUTTON_TYPE.PRIMARY}
        >
          {text('Label', 'Primary Button')}
        </Button>
      )
    })
  )
  .add(
    'Primary Inverted',
    withInfo(
      `Primary Button

      Primary Button Descption goes here
    `
    )(() => {
      return (
        <Button
          {...buttonEvents}
          disabled={boolean('Disabled', false)}
          inverted="true"
          kind={Button.BUTTON_TYPE.PRIMARY}
        >
          {text('Label', 'Primary Button Inverted')}
        </Button>
      )
    })
  )
  .add(
    'Secondary',
    withInfo(
      `Secondary Button

      Secondary Button Descption goes here
    `
    )(() => {
      return (
        <Button
          {...buttonEvents}
          disabled={boolean('Disabled', false)}
          kind={Button.BUTTON_TYPE.SECONDARY}
        >
          {text('Label', 'Secondary Button')}
        </Button>
      )
    })
  )

  .add(
    'Secondary Inverted',
    withInfo(
      `Secondary Button

      Secondary Button Descption goes here
    `
    )(() => {
      return (
        <Button
          {...buttonEvents}
          disabled={boolean('Disabled', false)}
          inverted={true}
          kind={Button.BUTTON_TYPE.SECONDARY}
        >
          {text('Label', 'Secondary Button Inverted')}
        </Button>
      )
    })
  )

  .add(
    'Chevron CTA no Label',
    withInfo(
      `Chevron CTA w/o Label

      Chevron CTA without Label Descption goes here
    `
    )(() => {
      return (
        <Button
          {...buttonEvents}
          disabled={boolean('Disabled', false)}
          kind={Button.BUTTON_TYPE.CHEVRON_CTA}
        />
      )
    })
  )

  .add(
    'Chevron CTA with Label',
    withInfo(
      `Chevron CTA with Label

      Chevron CTA with Label Descption goes here
    `
    )(() => {
      return (
        <Button
          {...buttonEvents}
          disabled={boolean('Disabled', false)}
          kind={Button.BUTTON_TYPE.TEXT_CHEVRON_CTA}
        >
          {text('Label', 'Chevron CTA')}
        </Button>
      )
    })
  )

  .add(
    'Main Nav Button',
    withInfo(
      `Main Nav Button

      Main Nav Button Descption goes here
    `
    )(() => {
      return (
        <Button
          {...buttonEvents}
          disabled={boolean('Disabled', false)}
          kind={Button.BUTTON_TYPE.NAV_MAIN}
        >
          {text('Label', 'My Home')}
        </Button>
      )
    })
  )
