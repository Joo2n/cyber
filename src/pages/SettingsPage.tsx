import { useState } from 'react'
import { Bell, Globe, Palette, Shield, Download } from 'lucide-react'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    courseReminders: true,
    language: 'ko',
    theme: 'light',
    autoPlay: true,
    dataUsage: 'wifi-only'
  })

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // Mock save logic
    alert('설정이 저장되었습니다.')
  }

  const handleExportData = () => {
    // Mock data export
    alert('데이터 내보내기가 시작되었습니다. 완료되면 이메일로 알려드립니다.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">설정</h1>
          <p className="text-neutral-600">학습 환경과 알림 설정을 관리할 수 있습니다.</p>
        </div>

        <div className="space-y-6">
          {/* 알림 설정 */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center space-x-3 mb-6">
                <Bell className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-neutral-900">알림 설정</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">이메일 알림</h3>
                    <p className="text-sm text-neutral-600">새로운 강의와 공지사항을 이메일로 받습니다</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.emailNotifications}
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">푸시 알림</h3>
                    <p className="text-sm text-neutral-600">브라우저 푸시 알림을 받습니다</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.pushNotifications}
                      onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-neutral-900">강의 리마인더</h3>
                    <p className="text-sm text-neutral-600">미완료 강의에 대한 알림을 받습니다</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={settings.courseReminders}
                      onChange={(e) => handleSettingChange('courseReminders', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 언어 및 지역 */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-neutral-900">언어 및 지역</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  언어 선택
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => handleSettingChange('language', e.target.value)}
                  className="input w-full max-w-xs"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                  <option value="zh">中文</option>
                </select>
                <p className="text-sm text-neutral-600 mt-1">인터페이스 언어를 선택하세요</p>
              </div>
            </div>
          </div>

          {/* 테마 설정 */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center space-x-3 mb-6">
                <Palette className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-neutral-900">테마 설정</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  화면 테마
                </label>
                <div className="grid grid-cols-3 gap-3 max-w-md">
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={settings.theme === 'light'}
                      onChange={(e) => handleSettingChange('theme', e.target.value)}
                      className="sr-only peer"
                    />
                    <div className="p-3 border-2 border-neutral-200 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                      <div className="w-8 h-6 bg-white border border-neutral-300 rounded mb-2"></div>
                      <p className="text-sm font-medium">라이트</p>
                    </div>
                  </label>
                  
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={settings.theme === 'dark'}
                      onChange={(e) => handleSettingChange('theme', e.target.value)}
                      className="sr-only peer"
                    />
                    <div className="p-3 border-2 border-neutral-200 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                      <div className="w-8 h-6 bg-neutral-800 rounded mb-2"></div>
                      <p className="text-sm font-medium">다크</p>
                    </div>
                  </label>
                  
                  <label className="cursor-pointer">
                    <input
                      type="radio"
                      name="theme"
                      value="auto"
                      checked={settings.theme === 'auto'}
                      onChange={(e) => handleSettingChange('theme', e.target.value)}
                      className="sr-only peer"
                    />
                    <div className="p-3 border-2 border-neutral-200 rounded-lg peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                      <div className="w-8 h-6 bg-gradient-to-r from-white to-neutral-800 rounded mb-2"></div>
                      <p className="text-sm font-medium">자동</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 개인정보 및 보안 */}
          <div className="card">
            <div className="card-body">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-neutral-900">개인정보 및 보안</h2>
              </div>
              
              <div className="space-y-4">
                <button
                  onClick={handleExportData}
                  className="flex items-center space-x-3 w-full p-4 text-left border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <Download className="w-5 h-5 text-neutral-500" />
                  <div>
                    <h3 className="font-medium text-neutral-900">내 데이터 내보내기</h3>
                    <p className="text-sm text-neutral-600">학습 기록과 개인 정보를 다운로드합니다</p>
                  </div>
                </button>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-2">데이터 보호</h3>
                  <p className="text-sm text-yellow-700">
                    귀하의 개인정보는 안전하게 보호되며, 학습 목적으로만 사용됩니다. 
                    자세한 내용은 개인정보처리방침을 참고해주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 저장 버튼 */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
            >
              설정 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
