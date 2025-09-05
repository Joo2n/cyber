import React, { useRef, useState, useEffect } from 'react'
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize,
  SkipBack,
  SkipForward,
  Settings
} from 'lucide-react'

interface VideoPlayerProps {
  src: string
  title: string
  onProgress?: (currentTime: number, totalTime: number) => void
  onComplete?: () => void
  initialTime?: number
  className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  onProgress,
  onComplete,
  initialTime = 0,
  className = ''
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showControls, setShowControls] = useState(true)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [buffered, setBuffered] = useState(0)

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2]

  // 비디오 이벤트 핸들러
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      if (initialTime > 0) {
        video.currentTime = initialTime
        setCurrentTime(initialTime)
      }
    }

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
      
      // 30초마다 진도율 업데이트
      if (Math.floor(video.currentTime) % 30 === 0 && onProgress) {
        onProgress(video.currentTime, video.duration)
      }
    }

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const bufferedPercent = (bufferedEnd / video.duration) * 100
        setBuffered(bufferedPercent)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      if (onComplete) {
        onComplete()
      }
    }

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('progress', handleProgress)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('progress', handleProgress)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [initialTime, onProgress, onComplete])

  // 컨트롤 숨김 타이머
  useEffect(() => {
    let timer: NodeJS.Timeout
    
    if (isPlaying && showControls) {
      timer = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isPlaying, showControls])

  // 키보드 단축키
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return

      switch (e.code) {
        case 'Space':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowLeft':
          e.preventDefault()
          skip(-10)
          break
        case 'ArrowRight':
          e.preventDefault()
          skip(10)
          break
        case 'ArrowUp':
          e.preventDefault()
          changeVolume(0.1)
          break
        case 'ArrowDown':
          e.preventDefault()
          changeVolume(-0.1)
          break
        case 'KeyF':
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  // 재생/일시정지
  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }

  // 시간 이동
  const skip = (seconds: number) => {
    const video = videoRef.current
    if (!video) return

    video.currentTime += seconds
  }

  // 볼륨 조절
  const changeVolume = (delta: number) => {
    const newVolume = Math.max(0, Math.min(1, volume + delta))
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  // 음소거 토글
  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  // 전체화면 토글
  const toggleFullscreen = () => {
    const container = videoRef.current?.parentElement
    if (!container) return

    if (!document.fullscreenElement) {
      container.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // 배속 변경
  const changePlaybackRate = (rate: number) => {
    const video = videoRef.current
    if (!video) return

    video.playbackRate = rate
    setPlaybackRate(rate)
    setShowSpeedMenu(false)
  }

  // 진도바 클릭
  const handleProgressClick = (e: React.MouseEvent) => {
    const video = videoRef.current
    const progressBar = progressRef.current
    if (!video || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newTime = (clickX / width) * duration

    video.currentTime = newTime
    setCurrentTime(newTime)
  }

  // 시간 포맷팅
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  // 진도율 계산
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div 
      className={`video-player relative group bg-black rounded-lg overflow-hidden ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => !isPlaying && setShowControls(false)}
    >
      {/* 비디오 엘리먼트 */}
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        playsInline
      />

      {/* 로딩/에러 상태 */}
      {!src && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>비디오를 불러오는 중...</p>
          </div>
        </div>
      )}

      {/* 중앙 재생 버튼 */}
      {!isPlaying && showControls && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity"
        >
          <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
            <Play className="w-8 h-8 text-black ml-1" />
          </div>
        </button>
      )}

      {/* 컨트롤 바 */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* 진도바 */}
        <div 
          ref={progressRef}
          className="w-full h-2 bg-white/30 rounded-full cursor-pointer mb-4 relative"
          onClick={handleProgressClick}
        >
          {/* 버퍼링 바 */}
          <div 
            className="absolute top-0 left-0 h-full bg-white/50 rounded-full"
            style={{ width: `${buffered}%` }}
          />
          {/* 진도바 */}
          <div 
            className="absolute top-0 left-0 h-full bg-primary rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
          {/* 핸들 */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"
            style={{ left: `calc(${progressPercent}% - 8px)` }}
          />
        </div>

        {/* 컨트롤 버튼들 */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            {/* 재생/일시정지 */}
            <button onClick={togglePlay} className="hover:text-primary transition-colors">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            {/* 뒤로/앞으로 스킵 */}
            <button onClick={() => skip(-10)} className="hover:text-primary transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button onClick={() => skip(10)} className="hover:text-primary transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>

            {/* 볼륨 */}
            <div className="flex items-center space-x-2">
              <button onClick={toggleMute} className="hover:text-primary transition-colors">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value)
                  setVolume(newVolume)
                  if (videoRef.current) {
                    videoRef.current.volume = newVolume
                  }
                  if (newVolume > 0) setIsMuted(false)
                }}
                className="w-20 h-1 bg-white/30 rounded-full appearance-none slider"
              />
            </div>

            {/* 시간 표시 */}
            <span className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* 배속 조절 */}
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center space-x-1 hover:text-primary transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span className="text-sm">{playbackRate}x</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 min-w-[80px]">
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => changePlaybackRate(speed)}
                      className={`block w-full text-left px-2 py-1 text-sm hover:bg-white/20 rounded ${
                        playbackRate === speed ? 'text-primary' : ''
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 전체화면 */}
            <button onClick={toggleFullscreen} className="hover:text-primary transition-colors">
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 제목 표시 */}
      {title && showControls && (
        <div className="absolute top-4 left-4 right-4">
          <h3 className="text-white text-lg font-medium bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm">
            {title}
          </h3>
        </div>
      )}
    </div>
  )
}

export default VideoPlayer