
🎮 Game Store & Library Web Application
사용자가 게임을 탐색하고, 장바구니에 담아 구매하며, 구매한 게임을 개인 라이브러리에서 관리할 수 있는 React 기반의 게임 스토어 웹 애플리케이션입니다.

🚀 프로젝트 실행 방법 (Quick Start)
소스 코드를 받으신 후, 아래 명령어를 순차적으로 실행하여 패키지를 설치하고 프로젝트를 구동할 수 있습니다.

패키지 설치

Bash
npm install
이 명령어를 실행하면 package.json에 명시된 react-icons, react-bootstrap, react-redux 등 모든 필수 패키지가 자동으로 설치됩니다.

프로젝트 실행

Bash
npm start
브라우저에서 http://localhost:3000 접속을 통해 확인 가능합니다.
웹 https://finalgamestore.vercel.app/

🛠 사용된 기술 스택 (Tech Stack)
Frontend: React (TypeScript)

State Management: Redux Toolkit (상태 전역 관리 및 비즈니스 로직 처리)

UI Framework: React-Bootstrap (그리드 및 컴포넌트 활용)

Styling: CSS3 (커스텀 정렬 및 애니메이션)

Icons: React Icons (FaGamepad, FaPlay 등)

Routing: React Router DOM (페이지 전환)

✨ 핵심 구현 기능
1. 상점 (Shop) 및 상세 페이지

추천상품: 부트스트랩 케러셀을 이용해 추천상품 이미지 배치

상품 목록: 부트스트랩 그리드를 이용한 반응형 게임 카드 배치

상세 보기: 게임의 상세 설명, 별점, 가격 정보 확인

조건부 버튼: 이미 라이브러리에 보유한 게임은 '라이브러리에 있음'으로 표시되며, 클릭 시 라이브러리의 해당 위치로 이동합니다.

2. 장바구니 (Cart)

수량 조절: 상품의 수량 증감 및 실시간 총합계 계산

구매 트랜잭션: 결제 시 장바구니 아이템이 라이브러리 스토어로 이동하며 장바구니가 비워집니다.

3. 라이브러리 (Library)

2분할 레이아웃: 좌측 리스트와 우측 상세 정보창의 유기적 연결

상태 동기화: 상세 페이지에서 클릭한 게임이 라이브러리에서 즉시 선택되어 나타나도록 구현

UI 디테일: 텍스트가 길어질 경우 말줄임표(...) 처리 및 호버 시 레이아웃 확장 기능

🎨 디자인 시스템 (Color Palette)
일관된 사용자 경험을 위해 아래의 고유 컬러 팔레트를 메인 테마로 사용하였습니다.

Main Background: #202731

Primary/Button: #374a67

Secondary/Card: #727397

Highlight/Active: #9e7b9b

Text/Light: #c9daea

📁 프로젝트 구조 안내
src/data/store.tsx: Redux Toolkit을 이용한 전역 상태 관리 (장바구니, 라이브러리)

src/pages/: 각 기능별 페이지 컴포넌트 (Home, List, Detail, Cart, Library)

src/components/: 재사용 가능한 UI 컴포넌트 (GameItem 등)

src/data/games.ts: 게임 상품 데이터 관리
