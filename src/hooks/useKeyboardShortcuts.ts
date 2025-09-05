import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useThemeStore } from '../store/themeStore'
import { useAuthStore } from '../store/authStore'

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  altKey?: boolean
  shiftKey?: boolean
  metaKey?: boolean
  action: () => void
  description: string
  category: string
}

/**
 * 키보드 단축키 훅
 * 전역 키보드 단축키를 관리
 */
export const useKeyboardShortcuts = () => {
  const navigate = useNavigate()
  const { toggleTheme } = useThemeStore()
  const { isAuthenticated, logout } = useAuthStore()

  const shortcuts: KeyboardShortcut[] = [
    // 네비게이션
    {
      key: 'h',
      altKey: true,
      action: () => navigate('/'),
      description: '홈으로 이동',
      category: '네비게이션'
    },
    {
      key: 'd',
      altKey: true,
      action: () => isAuthenticated && navigate('/dashboard'),
      description: '대시보드로 이동',
      category: '네비게이션'
    },
    {
      key: 'c',
      altKey: true,
      action: () => isAuthenticated && navigate('/classroom'),
      description: '나의 강의실로 이동',
      category: '네비게이션'
    },
    {
      key: 's',
      altKey: true,
      action: () => navigate('/courses'),
      description: '수강신청으로 이동',
      category: '네비게이션'
    },
    {
      key: 'n',
      altKey: true,
      action: () => navigate('/notices'),
      description: '공지사항으로 이동',
      category: '네비게이션'
    },

    // 테마
    {
      key: 't',
      ctrlKey: true,
      shiftKey: true,
      action: () => toggleTheme(),
      description: '다크/라이트 모드 전환',
      category: '테마'
    },

    // 계정
    {
      key: 'l',
      ctrlKey: true,
      shiftKey: true,
      action: () => !isAuthenticated ? navigate('/login') : logout(),
      description: isAuthenticated ? '로그아웃' : '로그인 페이지로 이동',
      category: '계정'
    },

    // 검색
    {
      key: 'k',
      ctrlKey: true,
      action: () => {
        // 검색 모달 열기 (추후 구현)
        console.log('검색 모달 열기')
      },
      description: '검색 열기',
      category: '검색'
    },

    // 도움말
    {
      key: '?',
      shiftKey: true,
      action: () => {
        // 키보드 단축키 도움말 모달 열기 (추후 구현)
        console.log('키보드 단축키 도움말')
      },
      description: '키보드 단축키 도움말',
      category: '도움말'
    }
  ]

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // 입력 필드에서는 단축키 비활성화
    const target = event.target as HTMLElement
    if (
      target.tagName === 'INPUT' || 
      target.tagName === 'TEXTAREA' || 
      target.contentEditable === 'true'
    ) {
      return
    }

    const shortcut = shortcuts.find(s => 
      s.key.toLowerCase() === event.key.toLowerCase() &&
      !!s.ctrlKey === event.ctrlKey &&
      !!s.altKey === event.altKey &&
      !!s.shiftKey === event.shiftKey &&
      !!s.metaKey === event.metaKey
    )

    if (shortcut) {
      event.preventDefault()
      shortcut.action()
    }
  }, [shortcuts])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return { shortcuts }
}

/**
 * 키보드 단축키 도움말 모달용 훅
 */
export const useShortcutHelp = () => {
  const { shortcuts } = useKeyboardShortcuts()

  const formatShortcut = (shortcut: KeyboardShortcut) => {
    const keys = []
    if (shortcut.ctrlKey) keys.push('Ctrl')
    if (shortcut.altKey) keys.push('Alt')
    if (shortcut.shiftKey) keys.push('Shift')
    if (shortcut.metaKey) keys.push('Cmd')
    keys.push(shortcut.key.toUpperCase())
    return keys.join(' + ')
  }

  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = []
    }
    acc[shortcut.category].push(shortcut)
    return acc
  }, {} as Record<string, KeyboardShortcut[]>)

  return { shortcuts, groupedShortcuts, formatShortcut }
}
