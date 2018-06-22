import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Icon from './Icon'
import { ICONS } from './Icon-assets'

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

const icons_story = storiesOf('Components/Icons', module)

icons_story
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

const props = {
  style: {
    margin: '12px',
    width: '3rem',
    height: '3rem',
  },
}

const iconContainerStyle = {
  position: 'relative',
  width: '9rem',
  height: '9rem',
  display: 'flex',
  display: '-ms-flexbox',
  justifyContent: 'center',
  WebkitBoxAlign: 'center',
  MsFlexAlign: 'center',
  alignItems: 'center',
  WebkitBoxPack: 'center',
  MsFlexPack: 'center',
  margin: '.725rem',
  padding: '1.5rem',
  border: '1px solid #eeeeee',
  borderRadius: '50%',
  textAlign: 'center',
  fontSize: '.8rem',
  color: '#666666',
}

const getIconKeys = () =>
  Object.keys(ICONS).map(function(key, i) {
    /* console.log('icon key = ' + key.toString()); */
    return key.toString()
  })

const iconLabel = 'Icon'
const iconoOptions = getIconKeys()
const iconDefault = 'MAGNIFIER'

const getIconElm = () => {
  return ICONS[select(iconLabel, iconoOptions, iconDefault)]
}

const labelStyle = {
  fontFamily: "'NeueHaasGroteskText', Arial, Helvetica, sans-serif",
  color: '#666666',
  fontSize: '.725rem',
}

const icons = Object.keys(ICONS).map(function(key, i) {
  let iconObj = ICONS[key]
  return (
    <div key={i} style={iconContainerStyle}>
      <Icon icon={iconObj} {...props} />
      <div style={labelStyle}>{iconObj.title}</div>
    </div>
  )
})

icons_story
  .add(
    'Icons',

    () => {
      return (
        <div style={{ display: 'inline-flex', flexWrap: 'wrap' }}>{icons}</div>
      )
    }
  )
  .add(
    'Icon',
    withInfo(
      `Icon

      Icon Descption goes here
    `
    )(() => {
      return (
        <div style={{ textAlign: 'center' }}>
          <Icon
            icon={getIconElm()}
            fill={color('Fill', '#333333')}
            {...props}
          />
          <div style={labelStyle}>{getIconElm().title}</div>
        </div>
      )
    })
  )
