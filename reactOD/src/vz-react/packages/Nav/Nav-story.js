import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  withKnobs,
  text,
  boolean,
  number,
  object,
  array,
  select,
} from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'

import { withReadme } from 'storybook-readme'
import ReadMe from './README.md'

import Nav from './Nav'

const nav_story = storiesOf('Modules/Nav', module)

nav_story
  .addDecorator(withKnobs)
  .addDecorator(withReadme(ReadMe))
  .addDecorator(story => (
    <div style={{ padding: '0', margin: '0' }}>{story()}</div>
  ))

nav_story.add('Header', () => {
  return <Nav username={text('User Name', 'Michelle')} />
})
