import { useEffect } from 'react'

interface AccessibilityOptions {
  skipToMain?: boolean
  focusManagement?: boolean
  announcements?: boolean
}

/**
 * 접근성 개선 훅
 * 키보드 네비게이션, 스크린 리더 지원 등을 제공
 */
export const useAccessibility = (options: AccessibilityOptions = {}) => {
  const {
    skipToMain = true,
    focusManagement = true,
    announcements = true
  } = options

  useEffect(() => {
    // Skip to main content 링크 추가
    if (skipToMain) {
      const skipLink = document.createElement('a')
      skipLink.href = '#main-content'
      skipLink.textContent = '메인 콘텐츠로 건너뛰기'
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg'
      
      // body의 첫 번째 요소로 추가
      document.body.insertBefore(skipLink, document.body.firstChild)

      return () => {
        if (document.body.contains(skipLink)) {
          document.body.removeChild(skipLink)
        }
      }
    }
  }, [skipToMain])

  useEffect(() => {
    // 포커스 관리
    if (focusManagement) {
      const handleRouteChange = () => {
        // 페이지 변경 시 메인 콘텐츠에 포커스
        const mainContent = document.getElementById('main-content')
        if (mainContent) {
          mainContent.focus()
        }
      }

      // URL 변경 감지 (React Router 사용 시)
      const originalPushState = history.pushState
      const originalReplaceState = history.replaceState

      history.pushState = function(...args) {
        originalPushState.apply(history, args)
        setTimeout(handleRouteChange, 100)
      }

      history.replaceState = function(...args) {
        originalReplaceState.apply(history, args)
        setTimeout(handleRouteChange, 100)
      }

      window.addEventListener('popstate', handleRouteChange)

      return () => {
        history.pushState = originalPushState
        history.replaceState = originalReplaceState
        window.removeEventListener('popstate', handleRouteChange)
      }
    }
  }, [focusManagement])

  // 라이브 리전 생성 및 관리
  useEffect(() => {
    if (announcements) {
      // 폴라이트 라이브 리전 (덜 긴급한 알림)
      const politeRegion = document.createElement('div')
      politeRegion.id = 'live-region-polite'
      politeRegion.setAttribute('aria-live', 'polite')
      politeRegion.setAttribute('aria-atomic', 'true')
      politeRegion.className = 'sr-only'
      document.body.appendChild(politeRegion)

      // 어서티브 라이브 리전 (긴급한 알림)
      const assertiveRegion = document.createElement('div')
      assertiveRegion.id = 'live-region-assertive'
      assertiveRegion.setAttribute('aria-live', 'assertive')
      assertiveRegion.setAttribute('aria-atomic', 'true')
      assertiveRegion.className = 'sr-only'
      document.body.appendChild(assertiveRegion)

      return () => {
        if (document.body.contains(politeRegion)) {
          document.body.removeChild(politeRegion)
        }
        if (document.body.contains(assertiveRegion)) {
          document.body.removeChild(assertiveRegion)
        }
      }
    }
  }, [announcements])

  // 스크린 리더 알림 함수들
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const region = document.getElementById(`live-region-${priority}`)
    if (region) {
      region.textContent = message
      // 동일한 메시지 반복 시를 위해 잠시 후 초기화
      setTimeout(() => {
        region.textContent = ''
      }, 1000)
    }
  }

  const announcePolite = (message: string) => announce(message, 'polite')
  const announceAssertive = (message: string) => announce(message, 'assertive')

  return {
    announce,
    announcePolite,
    announceAssertive
  }
}

/**
 * 키보드 네비게이션 훅
 * 탭 트랩, 화살표 키 네비게이션 등을 제공
 */
export const useKeyboardNavigation = (containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleKeyDown = (event: KeyboardEvent) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const focusableArray = Array.from(focusableElements) as HTMLElement[]
      const currentIndex = focusableArray.indexOf(document.activeElement as HTMLElement)

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          event.preventDefault()
          const nextIndex = (currentIndex + 1) % focusableArray.length
          focusableArray[nextIndex]?.focus()
          break

        case 'ArrowUp':
        case 'ArrowLeft':
          event.preventDefault()
          const prevIndex = currentIndex <= 0 ? focusableArray.length - 1 : currentIndex - 1
          focusableArray[prevIndex]?.focus()
          break

        case 'Home':
          event.preventDefault()
          focusableArray[0]?.focus()
          break

        case 'End':
          event.preventDefault()
          focusableArray[focusableArray.length - 1]?.focus()
          break

        case 'Escape':
          // ESC 키 처리 (모달 닫기 등)
          const closeButton = container.querySelector('[data-close-on-escape]') as HTMLElement
          closeButton?.click()
          break
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    return () => container.removeEventListener('keydown', handleKeyDown)
  }, [containerRef])
}

/**
 * 트랩 포커스 훅
 * 모달이나 드롭다운에서 포커스를 가둠
 */
export const useTrapFocus = (isActive: boolean, containerRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!isActive) return

    const container = containerRef.current
    if (!container) return

    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleTabKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault()
          firstElement?.focus()
        }
      }
    }

    // 첫 번째 요소에 포커스
    firstElement?.focus()

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isActive, containerRef])
}
