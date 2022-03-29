import React, { useRef, useState } from 'react'

import { state } from '@bit-about/state'

/**
 * Declaring STATE
 */
const useCustomState = () => {
  const [aliceValue, setAliceValue] = useState(0)
  const [bobValue, setBobValue] = useState(0)

  return { aliceValue, setAliceValue, bobValue, setBobValue }
}
const [TestProvider, useTest] = state(useCustomState)

/**
 * Counter
 */
const Counter = () => {
  const renderCounter = useRef(0)
  renderCounter.current = renderCounter.current + 1

  return <h3>rendered {renderCounter.current} times</h3>
}

/**
 * Alice counter
 */
const Alice = () => {
  const value = useTest((state) => state.aliceValue)

  return (
    <div>
      <h1>Alice</h1>
      <Counter />
      <p>value {value}</p>
    </div>
  )
}

/**
 * Buttons
 */
const Buttons = () => {
  // const [setAlice, setBob] = useTest((state) => [
  //   state.setAliceValue,
  //   state.setBobValue
  // ]);

  const setAlice = useTest((state) => state.setAliceValue)
  const setBob = useTest((state) => state.setBobValue)

  return (
    <div>
      <h1>Buttons</h1>
      <Counter />
      <button onClick={() => setAlice((value) => value + 1)}>
        Increment Alice
      </button>
      <button onClick={() => setBob((value) => value + 1)}>
        Increment Bob
      </button>
    </div>
  )
}

/**
 * Bob
 */
const Bob = () => {
  const value = useTest((state) => state.bobValue)

  return (
    <div>
      <h1>Bob</h1>
      <Counter />
      <p>value {value}</p>
    </div>
  )
}

/**
 * App
 */
const App = () => {
  return (
    <TestProvider>
      <Alice />
      <Buttons />
      <Bob />
    </TestProvider>
  )
}

export default App
