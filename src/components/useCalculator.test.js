
import { renderHook, screen, act } from '@testing-library/react';
import {useCalculator} from './useCalculator'

describe("useCalculator", ()=> {
  it("returns empty input", ()=> {
    const {result} = renderHook(()=> useCalculator())
    expect(result.current.input).toEqual([])
  })

  it("add number when handleNumbers is called", () => {
    const {result} = renderHook(() => useCalculator())

    act(() => result.current.handleNumbers(7))
    expect(result.current.input).toEqual([7])
  })

  it("second number to append to first number", () => {
    const {result} = renderHook(() => useCalculator())
    act(() => {
      result.current.handleNumbers(8)
      result.current.handleNumbers(7)
    })
    expect(result.current.input).toEqual([87])
  })


  it("when C is pressed, input is cleared", () => {
    const {result} = renderHook(() => useCalculator())
    act(()=> result.current.handleNumbers(8))
    act(() => result.current.handleClear())
    expect(result.current.input).toEqual([])
  })

  //doesn't work
  it("decimal appended when '.' pressed", () => {
    const {result} = renderHook(() => useCalculator())

    act(() => {
      result.current.handleNumbers(8)
      result.current.handleDecimal()
      result.current.handleNumbers(9)
      result.current.handleEquals()
    })
    expect(result.current.input).toEqual([8.9])
  })

  describe("test operations", () => {
    it("addition functionality works", ()=> {
      const {result} = renderHook(() => useCalculator())
      act(() => {
        result.current.handleNumbers(5)
        result.current.handleOperations('+')
        result.current.handleNumbers(1)
        result.current.handleEquals()
      })
      expect(result.current.input).toEqual([6])
    })

    it("multiplication functionality works", () => {
      const {result} = renderHook(() => useCalculator())
      act(() => {
        result.current.handleNumbers(5)
        result.current.handleOperations('x')
        result.current.handleNumbers(5)
        result.current.handleEquals()
      })
      expect(result.current.input).toEqual([25])
    })

    it("subtraction functionality works", () => {
      const {result} = renderHook(() => useCalculator())
      act(() => {
        result.current.handleNumbers(20)
        result.current.handleOperations('-')
        result.current.handleNumbers(2)
        result.current.handleEquals()
      })
      expect(result.current.input).toEqual([18])
    })

    it("division functionality works", () => {
      const {result} = renderHook(() => useCalculator())
      act(() => {
        result.current.handleNumbers(36)
        result.current.handleOperations('÷')
        result.current.handleNumbers(6)
        result.current.handleEquals()
      })
      expect(result.current.input).toEqual([6])
    })
  })
})


