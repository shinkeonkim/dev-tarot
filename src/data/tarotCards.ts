export interface TarotCard {
  id: number;
  name: string;
  nameKo: string;
  emoji: string;
  fortune: string;
  advice: string;
  luckyStack: string;
  mood: "great" | "good" | "neutral" | "caution" | "danger";
}

const tarotCards: TarotCard[] = [
  {
    id: 0, name: "The Fool", nameKo: "바보", emoji: "🃏",
    fortune: "오늘은 새로운 프로젝트를\n시작하기 좋은 날!\n두려워 말고 `git init`을 치세요.",
    advice: "모르는 기술이라도 일단 시작하세요.\n초보자의 행운이 함께합니다.",
    luckyStack: "Rust", mood: "great"
  },
  {
    id: 1, name: "The Magician", nameKo: "마법사", emoji: "🧙",
    fortune: "당신의 코드가 마법처럼\n한번에 돌아갈 운명입니다.\n컴파일 에러 0개의 축복!",
    advice: "오늘 배운 것을 동료에게 공유하세요.\n지식은 나눌수록 늘어납니다.",
    luckyStack: "TypeScript", mood: "great"
  },
  {
    id: 2, name: "The High Priestess", nameKo: "여사제", emoji: "🔮",
    fortune: "직감을 믿으세요.\n그 버그의 원인,\n당신은 이미 알고 있습니다.",
    advice: "Stack Overflow보다\n공식 문서를 먼저 읽어보세요.",
    luckyStack: "Python", mood: "good"
  },
  {
    id: 3, name: "The Empress", nameKo: "여황제", emoji: "👑",
    fortune: "풍요로운 코드 리뷰의 날.\nPR이 순조롭게 머지될 것입니다.",
    advice: "아름다운 코드를 작성하세요.\nClean Code의 기운이 함께합니다.",
    luckyStack: "Swift", mood: "great"
  },
  {
    id: 4, name: "The Emperor", nameKo: "황제", emoji: "🏛️",
    fortune: "아키텍처 설계에 좋은 날.\n당신의 결정이\n프로젝트의 방향을 바꿉니다.",
    advice: "디자인 패턴을 하나 적용해보세요.\nSOLID 원칙을 기억하세요.",
    luckyStack: "Java", mood: "good"
  },
  {
    id: 5, name: "The Hierophant", nameKo: "교황", emoji: "📚",
    fortune: "시니어 개발자의 조언을 구하세요.\n코드 리뷰에서\n인생 수업을 얻을 수 있습니다.",
    advice: "레거시 코드에도 지혜가 숨어 있습니다.\n겸허하게 읽어보세요.",
    luckyStack: "C++", mood: "neutral"
  },
  {
    id: 6, name: "The Lovers", nameKo: "연인", emoji: "💕",
    fortune: "페어 프로그래밍의 날!\n동료와 함께하면\n버그가 반으로 줄어듭니다.",
    advice: "코드와 사랑에 빠지세요.\n하지만 과도한 커플링은 피하세요.",
    luckyStack: "React", mood: "great"
  },
  {
    id: 7, name: "The Chariot", nameKo: "전차", emoji: "⚡",
    fortune: "스프린트를 질주할 운명!\n오늘의 티켓은 빠르게 처리됩니다.",
    advice: "CI/CD 파이프라인을 믿고\n빠르게 배포하세요.",
    luckyStack: "Go", mood: "great"
  },
  {
    id: 8, name: "Strength", nameKo: "힘", emoji: "💪",
    fortune: "거대한 레거시 코드를\n리팩토링할 힘이 생깁니다.\n두려워 마세요.",
    advice: "테스트 코드를 먼저 작성하면\n자신감이 붙습니다.",
    luckyStack: "Kotlin", mood: "good"
  },
  {
    id: 9, name: "The Hermit", nameKo: "은둔자", emoji: "🏔️",
    fortune: "슬랙 알림을 끄고\n딥 워크에 빠져보세요.\n혼자만의 시간이 필요합니다.",
    advice: "집중 모드 ON.\n혼자 조용히 코딩하면\n생산성이 3배가 됩니다.",
    luckyStack: "Vim", mood: "good"
  },
  {
    id: 10, name: "Wheel of Fortune", nameKo: "운명의 수레바퀴", emoji: "🎡",
    fortune: "배포 후 예상치 못한 일이\n일어날 수 있습니다.\n롤백 계획을 세우세요.",
    advice: "오늘은 운이 변동적입니다.\n중요한 배포는 내일로 미루세요.",
    luckyStack: "Docker", mood: "caution"
  },
  {
    id: 11, name: "Justice", nameKo: "정의", emoji: "⚖️",
    fortune: "코드 리뷰의 날.\n공정하고 건설적인 피드백이\n오고 갑니다.",
    advice: "린터 규칙을 어기지 마세요.\nESLint가 당신을 지켜보고 있습니다.",
    luckyStack: "ESLint", mood: "neutral"
  },
  {
    id: 12, name: "The Hanged Man", nameKo: "매달린 사람", emoji: "🙃",
    fortune: "관점을 바꿔야 할 때.\n그 어려운 문제,\n반대로 생각해보세요.",
    advice: "산책을 하세요.\n모니터에서 벗어나면\n해결책이 떠오릅니다.",
    luckyStack: "Haskell", mood: "neutral"
  },
  {
    id: 13, name: "Death", nameKo: "죽음", emoji: "💀",
    fortune: "레거시 코드의 종말!\n`rm -rf`할 용기가\n생기는 날입니다.",
    advice: "낡은 코드를 과감히 삭제하세요.\n끝은 새로운 시작입니다.",
    luckyStack: "Bash", mood: "caution"
  },
  {
    id: 14, name: "Temperance", nameKo: "절제", emoji: "☯️",
    fortune: "완벽주의를 내려놓으세요.\n적당히 좋은 코드가\n최고의 코드입니다.",
    advice: "오버엔지니어링 주의보.\nYAGNI 원칙을 기억하세요.",
    luckyStack: "Ruby", mood: "neutral"
  },
  {
    id: 15, name: "The Devil", nameKo: "악마", emoji: "😈",
    fortune: "기술 부채의 유혹이 다가옵니다.\n`// TODO: 나중에 고치기`의\n늪에 빠지지 마세요.",
    advice: "하드코딩의 유혹에 저항하세요.\n환경변수를 사용하세요.",
    luckyStack: "PHP", mood: "caution"
  },
  {
    id: 16, name: "The Tower", nameKo: "탑", emoji: "🗼",
    fortune: "프로덕션 장애 경보!\n오늘 레거시 코드를\n만날 운명입니다.",
    advice: "리팩토링의 기운이 필요합니다.\n모니터링 대시보드를 확인하세요.",
    luckyStack: "Grafana", mood: "danger"
  },
  {
    id: 17, name: "The Star", nameKo: "별", emoji: "⭐",
    fortune: "GitHub 스타가 빛나는 날!\n오픈소스 기여의 때가 왔습니다.",
    advice: "새로운 라이브러리를 발견할 운명.\nnpm을 탐색해보세요.",
    luckyStack: "Next.js", mood: "great"
  },
  {
    id: 18, name: "The Moon", nameKo: "달", emoji: "🌙",
    fortune: "야근의 기운이 감지됩니다.\n밤에 집중력이\n극대화될 수 있습니다.",
    advice: "다크 모드를 켜고 조용히 코딩하세요.\n달빛 아래 최고의 코드가 탄생합니다.",
    luckyStack: "Neovim", mood: "neutral"
  },
  {
    id: 19, name: "The Sun", nameKo: "태양", emoji: "☀️",
    fortune: "모든 테스트가 초록불!\n자신감 넘치는\n배포의 날입니다.",
    advice: "오늘 작성한 코드는\n미래의 자신이 감사할 것입니다.",
    luckyStack: "Svelte", mood: "great"
  },
  {
    id: 20, name: "Judgement", nameKo: "심판", emoji: "📯",
    fortune: "성능 최적화의 날.\n프로파일링을 돌려보면\n놀라운 결과가 나옵니다.",
    advice: "기술 면접이 다가온다면,\n오늘 준비하세요.\n심판의 날에 유리합니다.",
    luckyStack: "Webpack", mood: "good"
  },
  {
    id: 21, name: "The World", nameKo: "세계", emoji: "🌍",
    fortune: "프로젝트 완성의 기운!\n마지막 커밋을 푸시하고\n축하하세요.",
    advice: "풀스택의 경지에 다가가고 있습니다.\n오늘은 쉬어도 됩니다.",
    luckyStack: "Full Stack", mood: "great"
  },
];

export function drawRandomCards(count: number): TarotCard[] {
  const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function drawRandomCard(): TarotCard {
  return tarotCards[Math.floor(Math.random() * tarotCards.length)];
}

export default tarotCards;
