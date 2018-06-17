import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Modal from './Modal'
import ModalLauncher from './ModalLauncher'

import { withReadme } from 'storybook-readme'
import ReadMe from './README.md'

import {
  withKnobs,
  text,
  boolean,
  number,
  object,
  select,
} from '@storybook/addon-knobs/react'

import { withInfo } from '@storybook/addon-info'

const modal_story = storiesOf('Components/Modals', module)

modal_story
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

const modalProps = {
  onBlur: action('onBlur'),
  onClick: action('onClick'),
  onFocus: action('onFocus'),
  className: 'extra-class',
}

modal_story
  .add(
    'Passive',
    withInfo(
      `Passive Modal

        Passive Modal Descption goes here
        
    `
    )(() => {
      return (
        <Modal
          {...modalProps}
          passiveModal
          open
          modalHeading={text('Header', 'Modal Header')}
        >
          {text(
            'Content',
            'Modal content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          )}
        </Modal>
      )
    })
  )

  .add(
    'Transactional',
    withInfo(
      `Transactional Modal

      Transactional Modal Descption goes here
    `
    )(() => {
      return (
        <Modal
          {...modalProps}
          open
          modalHeading={text('Header', 'Modal Header')}
          primaryButtonText="Confirm"
          secondaryButtonText="Cancel"
        >
          {text(
            'Content',
            'Modal content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          )}
        </Modal>
      )
    })
  )

  .add(
    'Modal Launcher',
    withInfo(
      `Modal Launcher

      Modal Launcher Descption goes here
    `
    )(() => {
      return (
        <ModalLauncher
          {...modalProps}
          launchButtonText={text('Launch Button', 'Open Modal')}
          launchButtonKind={select(
            'Button Type',
            ['primary', 'secondary'],
            'primary'
          )}
          primaryButtonText={text('Confirm Button', 'Confirm')}
          secondaryButtonText={text('Cancel Button', 'Cancel')}
          modalHeading={text('Header', 'Modal Header')}
          handleSubmit={() => {
            action('onSubmit')()
            return true
          }}
        >
          {text(
            'Content',
            'Modal content goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          )}
        </ModalLauncher>
      )
    })
  )
