import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { withKnobs, text, number } from '@storybook/addon-knobs/react'

import Typist from './Typist'

const typist_story = storiesOf('Components/Type', module)

typist_story.addDecorator(withKnobs)

typist_story.add('Typist', () => {
  return (
    <Typist
      className="vz-odt--smartsearch__input__typist"
      typingSpeed={number('Speed', 250)}
      onTypingDone={action('Typing done')}
    >
      {text('Content', 'How can we help you?')}
    </Typist>
  )
})
