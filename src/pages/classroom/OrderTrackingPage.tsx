import { useState, useEffect } from 'react'
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Calendar } from 'lucide-react'

/**
 * 주문 상태 타입 정의
 */
type OrderStatus = 'ordered' | 'preparing' | 'shipped' | 'delivered' | 'cancelled'

/**
 * 배송 추적 정보 인터페이스
 */
interface TrackingInfo {
  date: string
  time: string
  status: string
  location: string
  description: string
}

/**
 * 주문 정보 인터페이스
 */
interface OrderItem {
  id: string
  orderNumber: string
  courseName: string
  materialName: string
  orderDate: string
  status: OrderStatus
  trackingNumber?: string
  deliveryAddress: string
  phoneNumber: string
  estimatedDelivery?: string
  actualDelivery?: string
  trackingInfo: TrackingInfo[]
}

/**
 * 주문배송조회 페이지 컴포넌트
 * 수강생들이 교재나 학습자료 주문 및 배송 상태를 조회할 수 있는 페이지
 */
const OrderTrackingPage = () => {
  // 상태 관리
  const [orders, setOrders] = useState<OrderItem[]>([])
  const [filteredOrders, setFilteredOrders] = useState<OrderItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('전체')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null)

  // 상태 필터 옵션
  const statusOptions = ['전체', '주문완료', '준비중', '배송중', '배송완료', '취소']

  /**
   * 주문 목록 데이터 초기화
   */
  useEffect(() => {
    const mockOrderData: OrderItem[] = [
      {
        id: '1',
        orderNumber: 'ORD-20240315-001',
        courseName: '웹 개발 기초',
        materialName: 'HTML/CSS 완벽 가이드북',
        orderDate: '2024-03-15 10:30:00',
        status: 'delivered',
        trackingNumber: 'TRK123456789',
        deliveryAddress: '서울시 강남구 테헤란로 123, 456호',
        phoneNumber: '010-1234-5678',
        estimatedDelivery: '2024-03-18',
        actualDelivery: '2024-03-17 14:30:00',
        trackingInfo: [
          {
            date: '2024-03-15',
            time: '10:30',
            status: '주문접수',
            location: '주문센터',
            description: '주문이 접수되었습니다.'
          },
          {
            date: '2024-03-15',
            time: '16:45',
            status: '상품준비',
            location: '물류센터',
            description: '상품 포장을 준비하고 있습니다.'
          },
          {
            date: '2024-03-16',
            time: '09:00',
            status: '배송출발',
            location: '서울 물류센터',
            description: '배송이 시작되었습니다.'
          },
          {
            date: '2024-03-17',
            time: '14:30',
            status: '배송완료',
            location: '서울시 강남구',
            description: '배송이 완료되었습니다.'
          }
        ]
      },
      {
        id: '2',
        orderNumber: 'ORD-20240318-002',
        courseName: '자바스크립트 심화',
        materialName: 'JavaScript 실무 프로젝트 교재',
        orderDate: '2024-03-18 14:20:00',
        status: 'shipped',
        trackingNumber: 'TRK987654321',
        deliveryAddress: '부산시 해운대구 해운대로 456, 789호',
        phoneNumber: '010-9876-5432',
        estimatedDelivery: '2024-03-21',
        trackingInfo: [
          {
            date: '2024-03-18',
            time: '14:20',
            status: '주문접수',
            location: '주문센터',
            description: '주문이 접수되었습니다.'
          },
          {
            date: '2024-03-18',
            time: '18:30',
            status: '상품준비',
            location: '물류센터',
            description: '상품 포장이 완료되었습니다.'
          },
          {
            date: '2024-03-19',
            time: '08:15',
            status: '배송출발',
            location: '서울 물류센터',
            description: '부산행 배송차량에 적재되었습니다.'
          },
          {
            date: '2024-03-20',
            time: '11:22',
            status: '배송중',
            location: '부산 집하장',
            description: '부산 지역 배송센터에 도착했습니다.'
          }
        ]
      },
      {
        id: '3',
        orderNumber: 'ORD-20240320-003',
        courseName: '리액트 프로젝트',
        materialName: 'React 실습용 스타터키트',
        orderDate: '2024-03-20 11:15:00',
        status: 'preparing',
        deliveryAddress: '대구시 중구 동성로 789, 101호',
        phoneNumber: '010-5555-6666',
        estimatedDelivery: '2024-03-25',
        trackingInfo: [
          {
            date: '2024-03-20',
            time: '11:15',
            status: '주문접수',
            location: '주문센터',
            description: '주문이 접수되었습니다.'
          },
          {
            date: '2024-03-20',
            time: '15:00',
            status: '상품준비',
            location: '물류센터',
            description: '상품 준비 중입니다.'
          }
        ]
      },
      {
        id: '4',
        orderNumber: 'ORD-20240312-004',
        courseName: 'TypeScript 마스터클래스',
        materialName: 'TypeScript 개발 환경 설정 가이드 + USB',
        orderDate: '2024-03-12 16:40:00',
        status: 'delivered',
        trackingNumber: 'TRK555123789',
        deliveryAddress: '인천시 남동구 구월동 1234, 505호',
        phoneNumber: '010-7777-8888',
        estimatedDelivery: '2024-03-15',
        actualDelivery: '2024-03-14 13:20:00',
        trackingInfo: [
          {
            date: '2024-03-12',
            time: '16:40',
            status: '주문접수',
            location: '주문센터',
            description: '주문이 접수되었습니다.'
          },
          {
            date: '2024-03-12',
            time: '20:15',
            status: '상품준비',
            location: '물류센터',
            description: '상품 포장이 완료되었습니다.'
          },
          {
            date: '2024-03-13',
            time: '07:30',
            status: '배송출발',
            location: '서울 물류센터',
            description: '인천행 배송차량에 적재되었습니다.'
          },
          {
            date: '2024-03-14',
            time: '13:20',
            status: '배송완료',
            location: '인천시 남동구',
            description: '배송이 완료되었습니다. 수령인: 홍길동'
          }
        ]
      },
      {
        id: '5',
        orderNumber: 'ORD-20240308-005',
        courseName: 'Node.js 백엔드 개발',
        materialName: '서버 개발 실습 교재 + 예제 소스코드 USB',
        orderDate: '2024-03-08 09:25:00',
        status: 'delivered',
        trackingNumber: 'TRK999888777',
        deliveryAddress: '광주시 서구 치평동 567, 아파트 203동 1502호',
        phoneNumber: '010-2222-3333',
        estimatedDelivery: '2024-03-12',
        actualDelivery: '2024-03-11 16:45:00',
        trackingInfo: [
          {
            date: '2024-03-08',
            time: '09:25',
            status: '주문접수',
            location: '주문센터',
            description: '주문이 접수되었습니다.'
          },
          {
            date: '2024-03-08',
            time: '14:10',
            status: '상품준비',
            location: '물류센터',
            description: '상품 포장이 완료되었습니다.'
          },
          {
            date: '2024-03-09',
            time: '08:00',
            status: '배송출발',
            location: '서울 물류센터',
            description: '광주행 배송차량에 적재되었습니다.'
          },
          {
            date: '2024-03-10',
            time: '15:30',
            status: '배송중',
            location: '광주 집하장',
            description: '광주 지역 배송센터에 도착했습니다.'
          },
          {
            date: '2024-03-11',
            time: '16:45',
            status: '배송완료',
            location: '광주시 서구',
            description: '배송이 완료되었습니다. 경비실 보관'
          }
        ]
      },
      {
        id: '6',
        orderNumber: 'ORD-20240305-006',
        courseName: 'UI/UX 디자인 기초',
        materialName: 'Figma 디자인 시스템 템플릿 + 컬러 가이드북',
        orderDate: '2024-03-05 11:50:00',
        status: 'cancelled',
        deliveryAddress: '대전시 유성구 봉명동 123, 빌라 2층',
        phoneNumber: '010-4444-5555',
        trackingInfo: [
          {
            date: '2024-03-05',
            time: '11:50',
            status: '주문접수',
            location: '주문센터',
            description: '주문이 접수되었습니다.'
          },
          {
            date: '2024-03-06',
            time: '10:30',
            status: '주문취소',
            location: '주문센터',
            description: '고객 요청에 의해 주문이 취소되었습니다.'
          }
        ]
      },
      {
        id: '7',
        orderNumber: 'ORD-20240322-007',
        courseName: 'Python 데이터 분석',
        materialName: '데이터 사이언스 실습 키트 + Jupyter 환경 가이드',
        orderDate: '2024-03-22 14:15:00',
        status: 'ordered',
        deliveryAddress: '제주시 아라동 456, 오피스텔 1205호',
        phoneNumber: '010-6666-7777',
        estimatedDelivery: '2024-03-27',
        trackingInfo: [
          {
            date: '2024-03-22',
            time: '14:15',
            status: '주문접수',
            location: '주문센터',
            description: '주문이 접수되었습니다. 결제 확인 중입니다.'
          }
        ]
      },
      {
        id: '8',
        orderNumber: 'ORD-20240319-008',
        courseName: '모바일 앱 개발 (React Native)',
        materialName: 'React Native 개발 가이드 + 모바일 테스트 디바이스',
        orderDate: '2024-03-19 10:05:00',
        status: 'shipped',
        trackingNumber: 'TRK777555333',
        deliveryAddress: '울산시 남구 삼산동 789, 아파트 101동 304호',
        phoneNumber: '010-8888-9999',
        estimatedDelivery: '2024-03-23',
        trackingInfo: [
          {
            date: '2024-03-19',
            time: '10:05',
            status: '주문접수',
            location: '주문센터',
            description: '주문이 접수되었습니다.'
          },
          {
            date: '2024-03-19',
            time: '15:20',
            status: '상품준비',
            location: '물류센터',
            description: '상품 포장이 완료되었습니다.'
          },
          {
            date: '2024-03-20',
            time: '07:45',
            status: '배송출발',
            location: '서울 물류센터',
            description: '울산행 배송차량에 적재되었습니다.'
          },
          {
            date: '2024-03-21',
            time: '16:30',
            status: '배송중',
            location: '울산 집하장',
            description: '울산 지역 배송센터에 도착했습니다.'
          }
        ]
      },
      {
        id: '9',
        orderNumber: 'ORD-20240325-009',
        courseName: 'AWS 클라우드 아키텍처',
        materialName: '클라우드 인프라 설계 가이드북 + AWS 크레딧 쿠폰',
        orderDate: '2024-03-25 13:30:00',
        status: 'preparing',
        deliveryAddress: '경기도 성남시 분당구 정자동 123, 아파트 205동 801호',
        phoneNumber: '010-1111-2222',
        estimatedDelivery: '2024-03-28',
        trackingInfo: [
          {
            date: '2024-03-25',
            time: '13:30',
            status: '주문접수',
            location: '주문센터',
            description: '주문이 접수되었습니다.'
          },
          {
            date: '2024-03-25',
            time: '17:45',
            status: '상품준비',
            location: '물류센터',
            description: '상품 포장을 준비하고 있습니다.'
          }
        ]
      },
      {
        id: '10',
        orderNumber: 'ORD-20240301-010',
        courseName: '블록체인 기술의 이해',
        materialName: '암호화폐 & DeFi 실습 가이드북',
        orderDate: '2024-03-01 16:20:00',
        status: 'delivered',
        trackingNumber: 'TRK111222333',
        deliveryAddress: '강원도 춘천시 효자동 234, 단독주택',
        phoneNumber: '010-3333-4444',
        estimatedDelivery: '2024-03-05',
        actualDelivery: '2024-03-04 11:15:00',
        trackingInfo: [
          {
            date: '2024-03-01',
            time: '16:20',
            status: '주문접수',
            location: '주문센터',
            description: '주문이 접수되었습니다.'
          },
          {
            date: '2024-03-02',
            time: '09:00',
            status: '상품준비',
            location: '물류센터',
            description: '상품 포장이 완료되었습니다.'
          },
          {
            date: '2024-03-02',
            time: '14:30',
            status: '배송출발',
            location: '서울 물류센터',
            description: '춘천행 배송차량에 적재되었습니다.'
          },
          {
            date: '2024-03-03',
            time: '18:45',
            status: '배송중',
            location: '춘천 집하장',
            description: '춘천 지역 배송센터에 도착했습니다.'
          },
          {
            date: '2024-03-04',
            time: '11:15',
            status: '배송완료',
            location: '강원도 춘천시',
            description: '배송이 완료되었습니다. 수령인: 김철수'
          }
        ]
      }
    ]
    
    setOrders(mockOrderData)
    setFilteredOrders(mockOrderData)
    setIsLoading(false)
  }, [])

  /**
   * 검색 및 필터링 처리
   */
  useEffect(() => {
    let filtered = orders

    // 검색어 필터링
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.trackingNumber && order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // 상태 필터링
    if (statusFilter !== '전체') {
      const statusMap: { [key: string]: OrderStatus } = {
        '주문완료': 'ordered',
        '준비중': 'preparing',
        '배송중': 'shipped',
        '배송완료': 'delivered',
        '취소': 'cancelled'
      }
      const status = statusMap[statusFilter]
      filtered = filtered.filter(order => order.status === status)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter])

  /**
   * 주문 상태별 스타일 반환
   */
  const getStatusStyle = (status: OrderStatus) => {
    const styles = {
      ordered: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      preparing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      shipped: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      delivered: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
    }
    return styles[status] || styles.ordered
  }

  /**
   * 주문 상태별 한글 변환
   */
  const getStatusText = (status: OrderStatus) => {
    const statusText = {
      ordered: '주문완료',
      preparing: '준비중',
      shipped: '배송중',
      delivered: '배송완료',
      cancelled: '취소'
    }
    return statusText[status] || '알 수 없음'
  }

  /**
   * 주문 상태별 아이콘 반환
   */
  const getStatusIcon = (status: OrderStatus) => {
    const icons = {
      ordered: <Clock className="h-4 w-4" />,
      preparing: <Package className="h-4 w-4" />,
      shipped: <Truck className="h-4 w-4" />,
      delivered: <CheckCircle className="h-4 w-4" />,
      cancelled: <Clock className="h-4 w-4" />
    }
    return icons[status] || icons.ordered
  }

  /**
   * 날짜 포맷팅
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  /**
   * 주문 상세 정보 모달 열기
   */
  const openOrderDetail = (order: OrderItem) => {
    setSelectedOrder(order)
  }

  /**
   * 주문 상세 정보 모달 닫기
   */
  const closeOrderDetail = () => {
    setSelectedOrder(null)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          주문배송조회
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          교재 및 학습자료의 주문 현황과 배송 상태를 확인하세요.
        </p>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 검색 입력 */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="주문번호, 강의명, 교재명, 송장번호로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* 상태 필터 */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
            <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">주문 내역이 없습니다.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </span>
                    {order.trackingNumber && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm">
                        송장: {order.trackingNumber}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {order.materialName}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {order.courseName}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span>주문번호: {order.orderNumber}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(order.orderDate)}
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => openOrderDetail(order)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  상세보기
                </button>
              </div>

              {/* 배송 정보 요약 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  <span>{order.deliveryAddress}</span>
                </div>
                {order.estimatedDelivery && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Truck className="h-4 w-4" />
                    <span>
                      {order.actualDelivery 
                        ? `배송완료: ${formatDate(order.actualDelivery)}`
                        : `예상배송: ${order.estimatedDelivery}`
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* 주문 상세 정보 모달 */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                주문 상세 정보
              </h2>
              <button
                onClick={closeOrderDetail}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="p-6">
              {/* 주문 기본 정보 */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">주문 정보</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">주문번호:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedOrder.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">강의명:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedOrder.courseName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">교재명:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedOrder.materialName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">주문일시:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatDate(selectedOrder.orderDate)}</span>
                  </div>
                  {selectedOrder.trackingNumber && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">송장번호:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedOrder.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 배송 정보 */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">배송 정보</h3>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">배송지:</span>
                    <span className="font-medium text-gray-900 dark:text-white text-right">{selectedOrder.deliveryAddress}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">연락처:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedOrder.phoneNumber}</span>
                  </div>
                  {selectedOrder.estimatedDelivery && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">예상배송일:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{selectedOrder.estimatedDelivery}</span>
                    </div>
                  )}
                  {selectedOrder.actualDelivery && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">실제배송일:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formatDate(selectedOrder.actualDelivery)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 배송 추적 정보 */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">배송 추적</h3>
                <div className="space-y-4">
                  {selectedOrder.trackingInfo.map((track, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900 dark:text-white">{track.status}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{track.date} {track.time}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="h-3 w-3" />
                            {track.location}
                          </div>
                          <p>{track.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderTrackingPage