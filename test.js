import test from 'ava'
import moment from 'moment'
import m from './index' // import not built code can help when getting errors on tests

const basicTest = async (t, country, team) => {
  const matches = await m(country, team)
  t.true(Array.isArray(matches))
  t.true(matches.length > 0)

  return matches
}

test('Test Real Madrid', async t => {
  await basicTest(t, 'spain', 'real-madrid')
})

test('Test Barcelona', async t => {
  await basicTest(t, 'spain', 'barcelona')
})

test('Test timezones', async t => {
  const inEngland = await m('england', 'arsenal', { timezone: 'Europe/Madrid' })
  const inSpain = await m('england', 'arsenal', { timezone: 'Europe/Moscow' })
  const timeInSpain = moment(inSpain[0].time, 'LT')
  const timeInEnglad = moment(inEngland[0].time, 'LT')
  const diff = timeInSpain.diff(timeInEnglad, 'hours')
  t.is(diff, 1)
})
