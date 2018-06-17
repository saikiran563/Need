import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Search from './Search'
import Smartsearch from './Smartsearch'
import HeroSearch from './HeroSearch'
import SearchModal from './SearchModal'

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

const search_story = storiesOf('Modules/Search', module)

const suggestions = [
  'how much was my bill',
  'how much data do I have left',
  'how much does an international plan cost',
  'how much is family plan',
  'how to add another line',
  'when is my bill due',
]

const trendingTiles = {
  t8_overline: text('trending-1 Overline', 'Device'),
  t8_headline: text(
    'trending-1 Headline',
    'Yes, just \n add an international plan first.'
  ),
  t8_subheader: text('trending-1 Subheader', ''),
  t8_ctaBtnText: text('trending-1 CTA', ''),
  t8_ctaClick: action('onClick'),
  t8_trendingMode: true,

  t9_overline: text('trending-2 Overline', 'International services'),
  t9_headline: text(
    'trending-2 Headline',
    'See which \n countries are covered.'
  ),
  t9_subheader: text('trending-2 Subheader', ''),
  t9_ctaBtnText: text('trending-2 CTA', ''),
  t9_ctaClick: action('onClick'),
  t9_trendingMode: true,

  t10_overline: text('trending-3 Overline', 'International services'),
  t10_headline: text('trending-3 Headline', 'Get help \n picking a plan.'),
  t10_subheader: text('trending-3 Subheader', ''),
  t10_ctaBtnText: text('trending-3 CTA', ''),
  t10_ctaClick: action('onClick'),
  t10_trendingMode: true,

  t11_overline: text('trending-4 Overline', 'Chat'),
  t11_headline: text('trending-4 Headline', 'Need help? \n Let’s chat.'),
  t11_subheader: text('trending-4 Subheader', ''),
  t11_ctaBtnText: text('trending-4 CTA', ''),
  t11_ctaClick: action('onClick'),
  t11_trendingMode: true,
}

const handleSubmit = () => {
  //console.log('handleSubmit');
}

search_story
  .addDecorator(withKnobs)
  .addDecorator(withReadme(ReadMe))
  .add(
    'Smart Search',
    withInfo(
      `Smart Search

        Smart Search Descption goes here
    `
    )(() => {
      return (
        <Smartsearch
          placeHolderText={text('Placeholder Text', 'How can we help you?')}
          suggestionsList={array('Suggests', suggestions)}
          id="smart-search-1"
          onSubmit={action('on-submit')}
        />
      )
    })
  )
  .add(
    'Hero earch',
    withInfo(
      `Hero Search

      Hero Search Descption goes here
    `
    )(() => {
      return (
        <HeroSearch
          username={text('User', 'Nicole')}
          chatNowCTAtext={text('Chat CTA', 'Chat Now')}
          placeHolderText={text('Placeholder Text', 'How can we help you?')}
          suggestionsList={array('Suggests', suggestions)}
          id="hero-search-1"
          onSubmit={action('on-submit')}
        />
      )
    })
  )

  .add('Search Modal', () => {
    return (
      <SearchModal
        style={{ marginTop: '6rem' }}
        username={text('User Name', 'Nicole')}
        chatNowCTAtext={text('Chat CTA', 'Chat now')}
        placeHolderText={text('Placeholder Text', 'How can we help you?')}
        suggestionsList={array('Suggests', suggestions)}
        id="hero-search-1"
        tilesList={trendingTiles}
      />
    )
  })
