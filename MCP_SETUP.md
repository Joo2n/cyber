# 🚀 Tomatopass Cyber Academy - Figma MCP 연결 가이드

## 📋 설정 완료 상태

✅ **WebSocket 서버**: 3055 포트에서 실행 중  
✅ **MCP 설정**: mcp.json 파일 생성됨  
✅ **패키지 설치**: 모든 의존성 설치 완료  
✅ **소켓 스크립트**: `bun socket` 명령어 준비됨  

## 🎯 사용 방법

### 1. WebSocket 서버 실행
```bash
# tomatopass-cyber-academy 폴더에서
bun socket
```

### 2. 포트 확인
- **포트**: `3055`
- **주소**: `ws://localhost:3055`
- **상태**: 🟢 LISTENING

### 3. Figma MCP 연결
- mcp.json 설정이 자동으로 Figma와 연결됩니다
- WebSocket URL: `ws://localhost:3055`

## 📁 추가된 파일들

- `socket.ts` - WebSocket 서버 (3055 포트)
- `mcp.json` - MCP 서버 설정
- `package.json` - 소켓 스크립트 및 의존성 추가

## 🔧 주요 스크립트

```json
{
  "socket": "bun run socket.ts",
  "mcp:start": "bunx cursor-talk-to-figma-mcp@latest"
}
```

## 💡 연결 확인

서버가 정상 실행되면 다음 메시지들이 표시됩니다:
- 🚀 Tomatopass Cyber Academy WebSocket server is running on port 3055
- 🎓 Cyber Academy Socket server ready for Figma MCP connection
- 🔗 Ready to receive design updates from Figma

## 🐛 문제 해결

### 포트 충돌 시
```bash
# 3055 포트 사용 중인 프로세스 확인
netstat -ano | findstr :3055

# 프로세스 종료 후 다시 실행
bun socket
```

### 의존성 문제 시
```bash
# 의존성 재설치
bun install
```

## 🎨 Figma 연동

1. Figma에서 MCP 플러그인 활성화
2. WebSocket URL 설정: `ws://localhost:3055`
3. 연결 확인 후 디자인 업데이트 전송
4. Cyber Academy 프로젝트에서 실시간 반영 확인

---

**🏆 설정 완료!** 이제 Figma와 Tomatopass Cyber Academy가 실시간으로 연결되었습니다.
