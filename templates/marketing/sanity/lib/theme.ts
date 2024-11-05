import { buildLegacyTheme } from 'sanity'

const props = {
  '--my-white': '#F3F5F6',
  '--my-black': '#313E4ECC',
  '--my-blue': '#368DB1',
  '--my-yellow': '#FFE48C',
  '--my-green': '#0f9d58',
  '--my-gray': '#C5C7C9',
}

export const theme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--my-black'],
  '--white': props['--my-white'],

  '--gray': props['--my-gray'],
  '--gray-base': props['--my-black'],

  '--component-bg': props['--my-white'],
  '--component-text-color': '#313E4E',

  /* Brand */
  '--brand-primary': props['--my-blue'],

  // Default button
  '--default-button-color': '#666',
  '--default-button-primary-color': props['--my-blue'],
  '--default-button-success-color': props['--my-green'],
  '--default-button-warning-color': props['--my-yellow'],

  /* State */
  '--state-info-color': props['--my-blue'],
  '--state-success-color': props['--my-green'],
  '--state-warning-color': props['--my-yellow'],

  /* Navbar */
  '--main-navigation-color': props['--my-black'],
  '--main-navigation-color--inverted': props['--my-white'],

  '--focus-color': props['--my-blue'],
})
