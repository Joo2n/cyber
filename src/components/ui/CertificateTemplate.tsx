import React, { forwardRef } from 'react'
import { Certificate } from '../../types'
import { formatStudyTime } from '../../utils/certificateUtils'

interface CertificateTemplateProps {
  certificate: Certificate
  className?: string
}

const CertificateTemplate = forwardRef<HTMLDivElement, CertificateTemplateProps>(
  ({ certificate, className = '' }, ref) => {
    // 날짜 포맷팅
    const formatDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return (
      <div 
        ref={ref}
        className={`bg-white ${className}`}
        style={{ 
          width: '297mm', 
          height: '210mm', 
          padding: '20mm',
          fontFamily: 'serif'
        }}
      >
        {/* 메인 테두리 */}
        <div className="w-full h-full border-8 border-primary relative">
          {/* 내부 테두리 */}
          <div className="w-full h-full border-2 border-primary m-4 relative flex flex-col">
            
            {/* 헤더 */}
            <div className="text-center pt-12">
              {/* 로고 영역 */}
              <div className="mb-8">
                <div className="w-20 h-20 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">토</span>
                </div>
                <h1 className="text-3xl font-bold text-primary">토마토패스 사이버연수원</h1>
                <p className="text-lg text-neutral-600 mt-2">TOMATO PASS CYBER ACADEMY</p>
              </div>

              {/* 수료증 제목 */}
              <div className="mb-12">
                <h2 className="text-5xl font-bold text-neutral-800 mb-4">수 료 증</h2>
                <h3 className="text-2xl text-neutral-600">CERTIFICATE OF COMPLETION</h3>
              </div>
            </div>

            {/* 수료자 정보 */}
            <div className="flex-1 flex flex-col justify-center text-center px-12">
              {/* 성명 */}
              <div className="mb-8">
                <p className="text-xl text-neutral-600 mb-2">성 명</p>
                <h3 className="text-4xl font-bold text-neutral-800 border-b-2 border-neutral-300 pb-2 inline-block min-w-[200px]">
                  {certificate.userName}
                </h3>
              </div>

              {/* 과정명 */}
              <div className="mb-8">
                <p className="text-lg text-neutral-600 mb-4">
                  위 사람은 본원에서 실시한 다음 과정을 수료하였음을 증명합니다.
                </p>
                <div className="bg-neutral-50 p-6 rounded-lg">
                  <h4 className="text-2xl font-bold text-primary mb-2">{certificate.courseName}</h4>
                  <div className="flex justify-center gap-8 text-neutral-600">
                    <span>교육시간: {formatStudyTime(certificate.totalHours * 3600)}</span>
                    <span>담당강사: {certificate.instructorName}</span>
                  </div>
                </div>
              </div>

              {/* 수료 정보 */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-neutral-600 mb-2">수료일자</p>
                  <p className="text-xl font-semibold text-neutral-800">
                    {formatDate(certificate.completionDate)}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-600 mb-2">발급일자</p>
                  <p className="text-xl font-semibold text-neutral-800">
                    {formatDate(certificate.issuedAt)}
                  </p>
                </div>
              </div>
            </div>

            {/* 하단 서명 영역 */}
            <div className="pb-8">
              <div className="text-center">
                <p className="text-lg text-neutral-600 mb-6">
                  {new Date(certificate.issuedAt).getFullYear()}년 {new Date(certificate.issuedAt).getMonth() + 1}월 {new Date(certificate.issuedAt).getDate()}일
                </p>
                
                <div className="flex justify-center items-end gap-16">
                  <div className="text-center">
                    <div className="w-24 h-24 border-2 border-neutral-300 rounded mb-4 mx-auto flex items-center justify-center">
                      <span className="text-xs text-neutral-500">원장 직인</span>
                    </div>
                    <p className="text-lg font-semibold">토마토패스 사이버연수원</p>
                    <p className="text-lg font-semibold">원장 김토마토</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 수료증 번호 - 우측 하단 */}
            <div className="absolute bottom-4 right-4">
              <p className="text-sm text-neutral-500">
                수료증 번호: {certificate.certificateNumber}
              </p>
            </div>

            {/* 장식 요소들 */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-primary"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-primary"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-primary"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }
)

CertificateTemplate.displayName = 'CertificateTemplate'

export default CertificateTemplate