import React from 'react'
import { storiesOf } from '@storybook/react'

import { withKnobs, text } from '@storybook/addon-knobs/react'
import { withInfo } from '@storybook/addon-info'
import { withReadme } from 'storybook-readme'

import ReadMe from './README.md'

import SectionHeader from './SectionHeader'

const header_story = storiesOf('Components/Header', module)

header_story.addDecorator(withKnobs).addDecorator(withReadme(ReadMe))

header_story.add(
  'Section Header',
  withInfo(
    `Section Header

      Section Header Descption goes here
    `
  )(() => {
    return <SectionHeader>{text('Header', 'Section Header')}</SectionHeader>
  })
)
