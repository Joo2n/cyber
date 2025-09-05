# 🚀 실행 상태 확인

## 현재 실행 중인 서비스들:
- ✅ **포트 3000**: Vite 개발 서버 (React 앱)
- ✅ **포트 3055**: 기존 Figma 소켓 서버
- ❌ **포트 3056**: 새로운 Cyber Academy 소켓 서버 (실행 필요)

## 올바른 실행 방법:

### 방법 1: 각각 실행
```bash
# 터미널 1: 개발 서버
bun run dev

# 터미널 2: 소켓 서버
bun socket
```

### 방법 2: 동시 실행
```bash
# 하나의 터미널에서 둘 다 실행
bun run dev:full
```

## Figma 연결 정보:
- **WebSocket URL**: `ws://localhost:3056`
- **개발 서버**: `http://localhost:3000`
