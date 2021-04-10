import Enzyme, { shallow } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'
import App from './App'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`)

describe('counter testing', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('renders without errors', () => {
    const appComponent = findByTestAttr(wrapper, 'app-component')
    expect(appComponent.length).toBe(1)
  })

  it('renders increment button', () => {
    const incrementButton = findByTestAttr(wrapper, 'increment-button')
    expect(incrementButton.length).toBe(1)
  })

  it('renders derement button', () => {
    const decrementButton = findByTestAttr(wrapper, 'decrement-button')
    expect(decrementButton.length).toBe(1)
  })

  it('renders counter display', () => {
    const counterDisplay = findByTestAttr(wrapper, 'counter-display')
    expect(counterDisplay.length).toBe(1)
  })

  it('counter display starts at 0', () => {
    const count = findByTestAttr(wrapper, 'counter-display').text()
    expect(count).toBe('0')
  })

  it('clicking increment button increments counter display', () => {
    const button = findByTestAttr(wrapper, 'increment-button')
    button.simulate('click')
    const count = findByTestAttr(wrapper, 'counter-display').text()
    expect(count).toBe('1')
  })

  it('clicking increment then decrement button keeps initial state 0', () => {
    const count = findByTestAttr(wrapper, 'counter-display')
    const incrementButton = findByTestAttr(wrapper, 'increment-button')
    const decrementButton = findByTestAttr(wrapper, 'decrement-button')

    incrementButton.simulate('click')
    decrementButton.simulate('click')
    expect(count.text()).toBe('0')
  })

  it('shouldnt decrement counter below zero', () => {
    const count = findByTestAttr(wrapper, 'counter-display')
    const decrementButton = findByTestAttr(wrapper, 'decrement-button')
    decrementButton.simulate('click')

    expect(count.text()).toBe('0')
  })

  it('should show error if trying to decrement below zero', () => {
    const decrementButton = findByTestAttr(wrapper, 'decrement-button')
    decrementButton.simulate('click')

    const errorMessage = findByTestAttr(wrapper, 'error-message')
    expect(errorMessage.length).toBe(1)
    expect(errorMessage.text()).toBe('Impossible to decrement below zero!')
  })
})
