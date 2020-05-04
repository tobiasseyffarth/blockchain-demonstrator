import { Neutrino } from 'neutrino';

export default Neutrino({ root: __dirname })
  .use('@neutrinojs/airbnb', {
    eslint: {
      rules: { semi: 'off' }
    }
  })
  .use('.neutrinorc.js')
  .call('eslintrc');
