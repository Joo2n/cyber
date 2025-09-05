import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  Printer, 
  CheckCircle,
  Calendar,
  User,
  BookOpen,
  Clock,
  FileText,
  ExternalLink
} from 'lucide-react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useAuthStore } from '../../store/authStore'
import { Certificate } from '../../types'
import CertificateTemplate from '../../components/ui/CertificateTemplate'
import { formatStudyTime, getCertificateStatusColor, getCertificateStatusText } from '../../utils/certificateUtils'

const CertificateDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuthStore()
  const [certificate, setCertificate] = useState<Certificate | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const certificateRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadCertificate = async () => {
      if (!id || !isAuthenticated) return
      
      setIsLoading(true)
      
      // Mock API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Mock 수료증 데이터
      const mockCertificate: Certificate = {
        id,
        userId: user?.id || '',
        courseId: 'course-1',
        courseName: 'JavaScript 기초 완성 과정',
        userName: user?.name || '홍길동',
        instructorName: '김자바',
        certificateNumber: 'TOM-202408-A1B2C3D4-XY9Z',
        issuedAt: '2024-07-15T10:00:00Z',
        completionDate: '2024-07-14T16:30:00Z',
        totalHours: 20,
        templateType: 'basic',
        status: 'active'
      }
      
      setCertificate(mockCertificate)
      setIsLoading(false)
    }

    loadCertificate()
  }, [id, isAuthenticated, user])

  // PDF 다운로드 기능
  const handleDownloadPDF = async () => {
    if (!certificate || !certificateRef.current) return

    setIsDownloading(true)

    try {
      // HTML 요소를 캔버스로 변환
      const canvas = await html2canvas(certificateRef.current, {
        scale: 2, // 고해상도
        allowTaint: true,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 1123, // A4 가로 크기 (mm를 px로 변환)
        height: 794   // A4 세로 크기 (mm를 px로 변환)
      })

      // PDF 생성
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })

      const imgData = canvas.toDataURL('image/png')
      const imgWidth = 297 // A4 가로 크기 (mm)
      const imgHeight = 210 // A4 세로 크기 (mm)

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

      // 파일명 생성
      const fileName = `${certificate.courseName}_수료증_${certificate.userName}_${certificate.certificateNumber}.pdf`
      
      // PDF 다운로드
      pdf.save(fileName)

      // 다운로드 기록 (실제로는 API 호출)
      console.log('PDF 다운로드 완료:', fileName)
      
    } catch (error) {
      console.error('PDF 생성 오류:', error)
      alert('PDF 생성 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsDownloading(false)
    }
  }

  // 인쇄 기능
  const handlePrint = () => {
    window.print()
  }

  // 공유 기능
  const handleShare = async () => {
    const shareData = {
      title: `${certificate?.courseName} 수료증`,
      text: `${certificate?.userName}님의 ${certificate?.courseName} 수료증입니다.`,
      url: window.location.href
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (error) {
        // 공유 취소 시 에러 무시
      }
    } else {
      // 링크 복사
      await navigator.clipboard.writeText(window.location.href)
      alert('링크가 복사되었습니다.')
    }
  }

  // 수료증 진위 확인
  const handleVerify = () => {
    if (!certificate) return
    
    alert(`수료증 진위 확인
    
수료증 번호: ${certificate.certificateNumber}
수료자: ${certificate.userName}
과정명: ${certificate.courseName}
발급일: ${new Date(certificate.issuedAt).toLocaleDateString('ko-KR')}
상태: ${getCertificateStatusText(certificate.status)}

✅ 이 수료증은 토마토패스 사이버연수원에서 정식 발급된 유효한 수료증입니다.`)
  }

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className="text-neutral-600">수료증을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!certificate) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <FileText className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">수료증을 찾을 수 없습니다</h3>
          <p className="text-neutral-600 mb-4">요청하신 수료증이 존재하지 않거나 접근 권한이 없습니다</p>
          <button
            onClick={() => navigate('/certificates')}
            className="btn btn-primary"
          >
            수료증 목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 뒤로 가기 */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/certificates')}
          className="inline-flex items-center space-x-2 text-neutral-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>수료증 목록으로 돌아가기</span>
        </button>
      </div>

      {/* 상단 액션 바 */}
      <div className="card mb-8">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 mb-2">{certificate.courseName}</h1>
              <div className="flex items-center gap-4 text-sm text-neutral-600">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{certificate.userName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>발급일: {formatDate(certificate.issuedAt)}</span>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCertificateStatusColor(certificate.status)}`}>
                  {getCertificateStatusText(certificate.status)}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="flex items-center gap-1 px-3 py-2 text-sm border border-neutral-300 hover:bg-neutral-50 rounded-lg transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>공유</span>
              </button>
              
              <button
                onClick={handlePrint}
                className="flex items-center gap-1 px-3 py-2 text-sm border border-neutral-300 hover:bg-neutral-50 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>인쇄</span>
              </button>
              
              <button
                onClick={handleDownloadPDF}
                disabled={isDownloading}
                className="flex items-center gap-1 px-4 py-2 bg-primary text-white hover:bg-primary-dark rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>생성 중...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>PDF 다운로드</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 수료증 정보 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          {/* 수료증 미리보기 */}
          <div className="card">
            <div className="card-body p-2">
              <div className="bg-neutral-100 rounded-lg p-4 overflow-auto">
                <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '200%', height: '200%' }}>
                  <CertificateTemplate
                    ref={certificateRef}
                    certificate={certificate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* 수료증 상세 정보 */}
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">수료증 정보</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-neutral-600">수료증 번호</p>
                  <p className="font-mono text-sm bg-neutral-100 p-2 rounded">{certificate.certificateNumber}</p>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-600">과정명</p>
                  <p className="font-medium">{certificate.courseName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-600">수료자</p>
                  <p className="font-medium">{certificate.userName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-neutral-600">담당 강사</p>
                  <p className="font-medium">{certificate.instructorName}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-600">교육 시간</p>
                    <p className="font-medium">{formatStudyTime(certificate.totalHours * 3600)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">템플릿</p>
                    <p className="font-medium capitalize">{certificate.templateType}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-600">수료일</p>
                    <p className="font-medium">{formatDate(certificate.completionDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">발급일</p>
                    <p className="font-medium">{formatDate(certificate.issuedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 진위 확인 */}
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">수료증 진위 확인</h3>
              <p className="text-sm text-neutral-600 mb-4">
                이 수료증의 진위를 확인할 수 있습니다. 수료증 번호를 통해 발급 여부를 검증할 수 있습니다.
              </p>
              <button
                onClick={handleVerify}
                className="w-full flex items-center justify-center gap-2 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>진위 확인하기</span>
              </button>
            </div>
          </div>

          {/* 관련 링크 */}
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">관련 링크</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors text-left">
                  <span className="text-sm">과정 상세 정보</span>
                  <ExternalLink className="w-4 h-4 text-neutral-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors text-left">
                  <span className="text-sm">학습 기록 확인</span>
                  <ExternalLink className="w-4 h-4 text-neutral-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 hover:bg-neutral-50 rounded-lg transition-colors text-left">
                  <span className="text-sm">강사 정보</span>
                  <ExternalLink className="w-4 h-4 text-neutral-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="card">
        <div className="card-body">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">수료증 관련 주의사항</h3>
          <div className="prose prose-sm max-w-none text-neutral-600">
            <ul>
              <li>수료증은 발급일로부터 <strong>5년간</strong> 유효합니다.</li>
              <li>수료증 분실 시 재발급이 가능하며, 재발급 수수료는 <strong>5,000원</strong>입니다.</li>
              <li>수료증의 위조나 변조는 법적 처벌 대상입니다.</li>
              <li>수료증 진위 확인은 토마토패스 사이버연수원 홈페이지에서 언제든 가능합니다.</li>
              <li>수료증에 오타나 오류가 있는 경우 즉시 고객센터로 연락주시기 바랍니다.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateDetailPage