import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, RenderResult } from '@testing-library/react'

import { Switch } from './Switch'

describe('Switch', () => {
  let wrapper: RenderResult
  let onChangeSpy: (event: React.FormEvent<HTMLInputElement>) => void

  describe('when all props are specified', () => {
    beforeEach(() => {
      onChangeSpy = jest.fn()

      wrapper = render(
        <Switch
          className="rn-switch--modifier"
          label="Switch label"
          name="switch-name"
          onChange={onChangeSpy}
          options={[
            { label: 'Day', value: '1' },
            { label: 'Week', value: '2' },
            { label: 'Month', value: '3' },
            { label: 'Year', value: '4' },
          ]}
          value="3"
        />
      )
    })

    it('should set the CSS modifier', () => {
      expect(wrapper.getByTestId('switch-wrapper').classList).toContain(
        'rn-switch--modifier'
      )
    })

    it('should render the label', () => {
      expect(wrapper.getByText('Switch label')).toBeInTheDocument()
    })

    it('should set the name', () => {
      const switchInputs = wrapper.getAllByTestId('switch-input')
      expect(switchInputs[0].getAttribute('name')).toEqual('switch-name')
      expect(switchInputs[1].getAttribute('name')).toEqual('switch-name')
      expect(switchInputs[2].getAttribute('name')).toEqual('switch-name')
      expect(switchInputs[3].getAttribute('name')).toEqual('switch-name')
    })

    it('should render 4 options', () => {
      expect(wrapper.getByText('Day')).toBeInTheDocument()
      expect(wrapper.getByText('Week')).toBeInTheDocument()
      expect(wrapper.getByText('Month')).toBeInTheDocument()
      expect(wrapper.getByText('Year')).toBeInTheDocument()
      expect(wrapper.getAllByTestId('switch-input')).toHaveLength(4)
    })

    it('should set the value', () => {
      expect(wrapper.getByText('Month').classList).toContain('is-active')
    })

    describe('when the selected option is changed', () => {
      beforeEach(() => {
        wrapper.getByText('Year').click()
      })

      it('should set the value', () => {
        expect(wrapper.getByText('Year').classList).toContain('is-active')
      })

      it('should call the onClick callback', () => {
        expect(onChangeSpy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('when minimal props are specified', () => {
    beforeEach(() => {
      onChangeSpy = jest.fn()

      wrapper = render(
        <Switch
          name="switch-name"
          options={[
            { label: 'Day', value: '1' },
            { label: 'Week', value: '2' },
            { label: 'Month', value: '3' },
            { label: 'Year', value: '4' },
          ]}
        />
      )
    })

    it('should not render the label', () => {
      expect(wrapper.queryAllByTestId('switch-legend')).toHaveLength(0)
    })

    it('should not set the value', () => {
      expect(wrapper.getByText('Day').classList).not.toContain('is-active')
      expect(wrapper.getByText('Week').classList).not.toContain('is-active')
      expect(wrapper.getByText('Month').classList).not.toContain('is-active')
      expect(wrapper.getByText('Year').classList).not.toContain('is-active')
    })
  })
})
