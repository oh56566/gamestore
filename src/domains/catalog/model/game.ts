export interface Game {
  id: number; //식별자
  name: string; // 게임 이름
  description: string; // 설명
  price: number; // 제품 가격
  category?: string[]; // 제품 카테고리 (선택 사항)
  isOnSale: boolean; // 세일 여부
  discountedPrice?: number; // 세일 가격 (선택 사항)
  star: string;
}

const games: Game[] = [
  {
    id: 1,
    name: "데스티니 가디언즈",
    description:
      "데스티니 가디언즈는 끝없이 진화하는 하나의 세계에서 플레이하는 액션 MMO입니다.",
    price: 0,
    category: ["무료 플레이", "MMO RPG", "협동", "멀티 플레이"],
    isOnSale: false,
    star: "⭐⭐⭐",
  },
  {
    id: 2,
    name: "산나비",
    description:
      "기계팔로 무장한 퇴역 군인은 초거대 재벌의 부패한 사유도시를 오릅니다.",
    price: 15500,
    category: ["액션 어드벤쳐", "인디", "사이버펑크", "싱글 플레이"],
    isOnSale: false,
    star: "⭐⭐⭐⭐⭐",
  },
  {
    id: 3,
    name: "아세토코르사",
    description:
      "차세대 레이싱 시뮬레이터 아세토코르사. 현실적인 주행 경험을 제공합니다.",
    price: 20500,
    category: ["레이싱", "멀티 플레이"],
    isOnSale: true,
    discountedPrice: 15000,
    star: "⭐⭐⭐⭐",
  },
  {
    id: 4,
    name: "엘든 링",
    description:
      "광대한 오픈 월드에서 펼쳐지는 액션 RPG 엘든 링. 도전과 모험이 가득한 세계로 떠나보세요.",
    price: 59000,
    category: ["소울라이크", "액션 RPG", "싱글 플레이"],
    isOnSale: false,
    star: "⭐⭐⭐⭐⭐",
  },
  {
    id: 5,
    name: "사이버펑크 2077",
    description:
      "미래 도시 나이트 시티에서 펼쳐지는 오픈 월드 RPG 사이버펑크 2077. 고도로 발전한 기술과 어두운 음모가 얽힌 세계를 탐험하세요.",
    price: 66000,
    category: ["사이버펑크", "액션 RPG", "싱글 플레이"],
    isOnSale: false,
    star: "⭐⭐⭐⭐⭐",
  },
  {
    id: 6,
    name: "Among Us",
    description:
      "우주선을 배경으로 한 멀티플레이어 소셜 디덕션 게임 Among Us. 친구들과 함께 음모를 밝혀내세요.",
    price: 5500,
    category: ["협동", "캐주얼", "멀티 플레이"],
    isOnSale: false,
    star: "⭐⭐",
  },
  {
    id: 7,
    name: "Hollow Knight",
    description:
      "할로우 나이트에서 자신만의 길을 구축하세요! 크게 파괴된 곤충과 영웅의 왕국을 통한 서사 액션 어드벤처입니다. 손으로 그린 클래식 2D 스타일로 구불구불한 동굴을 탐험하고 오염된 생물과 싸우고 이상한 곤충들과 친구가 되어 보세요.",
    price: 8250,
    category: ["소울라이크", "플랫폼", "인디", "액션 어드벤쳐", "싱글 플레이"],
    isOnSale: false,
    star: "⭐⭐",
  },
];

export default games;
