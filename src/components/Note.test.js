import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  
  const {container}=render(<Note note={note} />)
  
  //log html
  // screen.debug()

  const element = screen.getByText('Component testing is done with react-testing-library')
  //log html
  // screen.debug(element)
  expect(element).toBeDefined()
  
  const div = container.querySelector('.note')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  
})

test('clicking the button calls event handler once',async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  // mock function defined with Jest
  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportance={mockHandler}/>
  )

  //This allows to write multiple consecutive interactions 
  //that behave just like the described interactions by a real user.
  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)
  
  expect(mockHandler.mock.calls).toHaveLength(1)
})