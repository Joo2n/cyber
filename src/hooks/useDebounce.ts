import { useState, useEffect } from 'react'

/**
 * 디바운싱 훅
 * @param value - 디바운싱할 값
 * @param delay - 지연 시간 (밀리초)
 * @returns 디바운싱된 값
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // 지연 시간 후에 값을 업데이트하는 타이머 설정
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // 새로운 값이 들어오거나 컴포넌트가 언마운트될 때 타이머 정리
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
