const RANKS = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const SUITS = [
  { id: "spades", symbol: "♠", color: "black" },
  { id: "hearts", symbol: "♥", color: "red" },
  { id: "clubs", symbol: "♣", color: "black" },
  { id: "diamonds", symbol: "♦", color: "red" }
];

const boardEl = document.querySelector("#board");
const foundationsEl = document.querySelector("#foundations");
const stockBtn = document.querySelector("#stock");
const stockText = document.querySelector("#stockText");
const moveCountEl = document.querySelector("#moveCount");
const completeCountEl = document.querySelector("#completeCount");
const timerEl = document.querySelector("#timer");
const statusText = document.querySelector("#statusText");
const toastEl = document.querySelector("#toast");
const winDialog = document.querySelector("#winDialog");
const winStats = document.querySelector("#winStats");
const startOverlay = document.querySelector("#startOverlay");
const gameView = document.querySelector("#gameView");
const sceneTransition = document.querySelector("#sceneTransition");
const newGameDialog = document.querySelector("#newGameDialog");
const exitGameDialog = document.querySelector("#exitGameDialog");
const continueBtn = document.querySelector("#continueBtn");
const tutorialTrack = document.querySelector("#tutorialTrack");
const tutorialCarousel = document.querySelector("#tutorialCarousel");
const languageSelect = document.querySelector("#languageSelect");
const musicVolumeInput = document.querySelector("#musicVolume");
const sfxVolumeInput = document.querySelector("#sfxVolume");
const musicVolumeValue = document.querySelector("#musicVolumeValue");
const sfxVolumeValue = document.querySelector("#sfxVolumeValue");
const BGM_SRC = "assets/bgm-lofi-loop.ogg";
const BGM_GAIN = 0.05;
const SETTINGS_VERSION = 4;
const GAME_SAVE_KEY = "spiderSavedGame";
const GAME_SAVE_VERSION = 1;
const TEST_PARAMS = ["smoke", "dragSmoke", "dealSmoke", "completeSmoke", "hintSmoke", "winSmoke", "skillSmoke"];
const IS_TEST_MODE = TEST_PARAMS.some((key) => new URLSearchParams(location.search).has(key));

const TEXT = {
  zh: {
    title: "蜘蛛纸牌",
    objective: "把同花色 K 到 A 排成整套",
    selectedStatus: "点另一列放牌，或继续拖动",
    moves: "步数",
    time: "时间",
    complete: "完成",
    oneSuit: "1 花色",
    twoSuits: "2 花色",
    fourSuits: "4 花色",
    newGame: "新局",
    exitGame: "退出",
    playAgain: "开启新一局游戏",
    chooseAgain: "重新选择难度",
    confirmNewTitle: "开始新局？",
    confirmNewBody: "当前牌局进度会被清空。",
    confirmExitTitle: "退出本局？",
    confirmExitBody: "当前牌局会结束，并回到开始界面。",
    cancel: "取消",
    confirm: "确认",
    startGame: "开始游戏",
    continueGame: "继续游戏",
    tutorial: "教程",
    settings: "设置",
    chooseDifficulty: "选择难度",
    easyDesc: "适合练习和轻松通关",
    normalDesc: "需要更认真地整理牌序",
    hardDesc: "完整挑战，容错更低",
    tutorialMove: "把整组 Q-J 拖到 K 下面，牌序必须从大到小连续。",
    tutorialRun: "同花色连续牌可以整组拖动，不能把被压住的中间牌单独抽走。",
    tutorialComplete: "凑齐同花色 K 到 A 会自动收进完成库。",
    tutorialStock: "没有好走法时可以补牌；技能 ✦ 会重排你选中的亮牌。",
    tutorialStepMoveTitle: "单张移动",
    tutorialStepMoveBody: "把小 1 点的牌拖到大 1 点的牌下面，例如 Q 放到 K 下面。",
    tutorialStepRunTitle: "整组拖动",
    tutorialStepRunBody: "同花色连续牌可以整组移动；被压住的中间牌不能单独抽走。",
    tutorialStepCompleteTitle: "自动收套",
    tutorialStepCompleteBody: "同花色从 K 到 A 凑齐后，会叠起来并自动收进完成库。",
    tutorialStepToolsTitle: "补牌和技能",
    tutorialStepToolsBody: "没有好走法时点牌堆补牌；技能 ✦ 会把选中的亮牌重新从左到右发出去。",
    language: "语言 / language",
    musicVolume: "音乐音量",
    sfxVolume: "音效音量",
    producer: "制作人",
    winTitle: "胜利！",
    stockLeft: (n) => `${n}`,
    newStarted: (n) => `${n} 花色新局开始`,
    continuedGame: "已继续上局",
    noSavedGame: "没有可继续的牌局",
    noUndo: "没有可撤销的步骤",
    chooseFaceUp: "先选中一列亮出的牌",
    onlyFaceUp: "只能重排已经亮出的牌",
    completedRun: "完成一整套！",
    noMoveStock: "没有明显移动，可以发牌",
    noMove: "暂时没有可用移动",
    invalidMove: "这列不能接这组牌",
    selectedForSkill: "已选中，可用技能重排",
    winStats: (time, moves) => `用时 ${time}，共 ${moves} 步。`
  },
  en: {
    title: "Spider Solitaire",
    objective: "Build same-suit runs from K to A",
    selectedStatus: "Tap another column, or keep dragging",
    moves: "Moves",
    time: "Time",
    complete: "Done",
    oneSuit: "1 Suit",
    twoSuits: "2 Suits",
    fourSuits: "4 Suits",
    newGame: "New",
    exitGame: "Exit",
    playAgain: "New Game",
    chooseAgain: "Choose Difficulty",
    confirmNewTitle: "Start a new game?",
    confirmNewBody: "Your current progress will be cleared.",
    confirmExitTitle: "Exit this game?",
    confirmExitBody: "This run will end and return to the start screen.",
    cancel: "Cancel",
    confirm: "Confirm",
    startGame: "Start Game",
    continueGame: "Continue",
    tutorial: "Tutorial",
    settings: "Settings",
    chooseDifficulty: "Choose Difficulty",
    easyDesc: "Relaxed mode for learning",
    normalDesc: "More sorting and planning",
    hardDesc: "Full challenge, low forgiveness",
    tutorialMove: "Drag the Q-J run onto K. Runs must descend by one rank.",
    tutorialRun: "Same-suit sequences move as a group; covered middle cards cannot be pulled out alone.",
    tutorialComplete: "A same-suit K to A run is collected automatically.",
    tutorialStock: "Deal when stuck; ✦ redistributes your selected face-up cards.",
    tutorialStepMoveTitle: "Single Card",
    tutorialStepMoveBody: "Drag a card one rank lower under a card one rank higher, such as Q under K.",
    tutorialStepRunTitle: "Move a Run",
    tutorialStepRunBody: "Same-suit sequences move together; covered middle cards cannot be pulled out alone.",
    tutorialStepCompleteTitle: "Auto Collect",
    tutorialStepCompleteBody: "A same-suit K to A run stacks up and moves into the completed area.",
    tutorialStepToolsTitle: "Deal and Skill",
    tutorialStepToolsBody: "Tap the stock when stuck; ✦ redistributes the selected face-up cards from left to right.",
    language: "Language / 语言",
    musicVolume: "Music",
    sfxVolume: "SFX",
    producer: "Producer",
    winTitle: "Victory!",
    stockLeft: (n) => `${n}`,
    newStarted: (n) => `${n}-suit game started`,
    continuedGame: "Game continued",
    noSavedGame: "No saved game",
    noUndo: "No moves to undo",
    chooseFaceUp: "Select face-up cards first",
    onlyFaceUp: "Only face-up cards can be redistributed",
    completedRun: "Run completed!",
    noMoveStock: "No clear move. Try dealing.",
    noMove: "No move available",
    invalidMove: "That stack cannot go there",
    selectedForSkill: "Selected. ✦ can redistribute it.",
    winStats: (time, moves) => `Time ${time}, ${moves} moves.`
  }
};

const savedSettings = JSON.parse(localStorage.getItem("spiderSettings") || "{}");
const settings = {
  language: savedSettings.language || "zh",
  musicVolume: savedSettings.version >= SETTINGS_VERSION ? (savedSettings.musicVolume ?? 0.3) : 0.3,
  sfxVolume: savedSettings.version >= SETTINGS_VERSION ? (savedSettings.sfxVolume ?? 0.3) : 0.3
};

let state;
let selected = null;
let drag = null;
let toastTimer = 0;
let timerId = 0;
let animatedCardIds = new Set();
let animatedCardDelays = new Map();
let landedCardIds = new Set();
let flippedCardIds = new Set();
let foundationPulse = false;
let audioCtx = null;
let musicGain = null;
let sfxGain = null;
let musicTimer = 0;
let musicStep = 0;
let bgmAudio = null;
let dealAudioBuffer = null;
let dealAudioLoading = false;
let dealSlices = [];
let dealSampleCursor = 0;
let hintLayer = null;
let bgmDuckFactor = 1;
let bgmDuckTimer = 0;
let tutorialIndex = 0;
let tutorialPointerStart = null;

function buildDeck(suitCount) {
  const suits = SUITS.slice(0, suitCount);
  const deck = [];
  let id = 1;
  for (let copy = 0; copy < 8 / suitCount; copy += 1) {
    for (const suit of suits) {
      for (let rank = 1; rank <= 13; rank += 1) {
        deck.push({ id: id++, suit: suit.id, symbol: suit.symbol, color: suit.color, rank, faceUp: false });
      }
    }
  }
  return deck;
}

function shuffle(cards) {
  const copy = cards.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function newGame(suitCount = state?.suitCount || 1, options = {}) {
  if (!options.keepMenu) {
    startOverlay?.classList.add("hidden");
    gameView?.classList.remove("hidden");
  }
  startMusic();
  const deck = shuffle(buildDeck(suitCount));
  const columns = Array.from({ length: 10 }, () => []);
  for (let i = 0; i < 54; i += 1) {
    columns[i % 10].push(deck.pop());
  }
  for (const column of columns) {
    column[column.length - 1].faceUp = true;
  }
  state = {
    suitCount,
    columns,
    stock: Array.from({ length: 5 }, () => deck.splice(0, 10)),
    completed: [],
    moves: 0,
    startTime: Date.now(),
    elapsedBeforePause: 0,
    history: [],
    resolving: false,
    won: false
  };
  selected = null;
  drag = null;
  animatedCardIds = new Set(columns.flat().map((card) => card.id));
  animatedCardDelays = new Map();
  landedCardIds = new Set();
  flippedCardIds = new Set();
  foundationPulse = false;
  if (winDialog.open) winDialog.close();
  restartTimer();
  render();
  showToast(t("newStarted", suitCount));
}

function startGameWithTransition(suitCount) {
  startMusic();
  gameView?.classList.remove("hidden");
  gameView?.classList.add("entering");
  startOverlay?.classList.add("leaving-to-game");
  newGame(suitCount, { keepMenu: true });
  setTimeout(() => {
    startOverlay?.classList.add("hidden");
    startOverlay?.classList.remove("leaving-to-game");
  }, 640);
  setTimeout(() => {
    gameView?.classList.remove("entering");
  }, 760);
}

function openNewGameConfirm() {
  if (!state) {
    newGame(1);
    return;
  }
  if (newGameDialog?.open) return;
  newGameDialog?.showModal();
}

function closeNewGameConfirm() {
  if (newGameDialog?.open) newGameDialog.close();
}

function openExitGameConfirm() {
  if (exitGameDialog?.open) return;
  exitGameDialog?.showModal();
}

function closeExitGameConfirm() {
  if (exitGameDialog?.open) exitGameDialog.close();
}

function leaveGameToMenu(screenName = "home", options = {}) {
  closeExitGameConfirm();
  if (winDialog.open) winDialog.close();
  clearInterval(timerId);
  if (options.clearSave) clearSavedGame();
  selected = null;
  drag = null;
  state = null;
  boardEl.innerHTML = "";
  foundationsEl.innerHTML = "";
  startMusic();
  startOverlay?.classList.remove("hidden");
  openMenuScreen(screenName);
  startOverlay?.classList.add("entering-from-game");
  gameView?.classList.add("leaving-to-menu");
  setTimeout(() => {
    gameView?.classList.add("hidden");
    gameView?.classList.remove("leaving-to-menu");
  }, 560);
  setTimeout(() => {
    startOverlay?.classList.remove("entering-from-game");
  }, 720);
}

function t(key, ...args) {
  const value = TEXT[settings.language]?.[key] ?? TEXT.zh[key] ?? key;
  return typeof value === "function" ? value(...args) : value;
}

function saveSettings() {
  localStorage.setItem("spiderSettings", JSON.stringify({ ...settings, version: SETTINGS_VERSION }));
}

function readSavedGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(GAME_SAVE_KEY) || "null");
    if (!saved || saved.version !== GAME_SAVE_VERSION) return null;
    if (!Array.isArray(saved.columns) || !Array.isArray(saved.stock) || !Array.isArray(saved.completed)) return null;
    return saved;
  } catch {
    return null;
  }
}

function updateContinueButton() {
  if (!continueBtn) return;
  continueBtn.hidden = !readSavedGame();
}

function clearSavedGame() {
  localStorage.removeItem(GAME_SAVE_KEY);
  updateContinueButton();
}

function saveGameState() {
  if (IS_TEST_MODE || !state || state.resolving || state.won) return;
  const payload = {
    version: GAME_SAVE_VERSION,
    suitCount: state.suitCount,
    columns: state.columns,
    stock: state.stock,
    completed: state.completed,
    moves: state.moves,
    elapsedSeconds: getElapsedSeconds()
  };
  try {
    localStorage.setItem(GAME_SAVE_KEY, JSON.stringify(payload));
    updateContinueButton();
  } catch {
    // Storage can be unavailable in private modes; gameplay should continue.
  }
}

function loadSavedGame(saved) {
  state = {
    suitCount: saved.suitCount || 1,
    columns: saved.columns,
    stock: saved.stock,
    completed: saved.completed,
    moves: saved.moves || 0,
    startTime: Date.now() - Math.max(0, saved.elapsedSeconds || 0) * 1000,
    elapsedBeforePause: 0,
    history: [],
    resolving: false,
    won: false
  };
  selected = null;
  drag = null;
  animatedCardIds = new Set();
  animatedCardDelays = new Map();
  landedCardIds = new Set();
  flippedCardIds = new Set();
  foundationPulse = false;
  if (winDialog.open) winDialog.close();
  restartTimer();
  render();
}

function continueSavedGame() {
  const saved = readSavedGame();
  if (!saved) {
    updateContinueButton();
    showToast(t("noSavedGame"));
    return;
  }
  startMusic();
  gameView?.classList.remove("hidden");
  gameView?.classList.add("entering");
  startOverlay?.classList.add("leaving-to-game");
  loadSavedGame(saved);
  showToast(t("continuedGame"));
  setTimeout(() => {
    startOverlay?.classList.add("hidden");
    startOverlay?.classList.remove("leaving-to-game");
  }, 640);
  setTimeout(() => {
    gameView?.classList.remove("entering");
  }, 760);
}

function applyLanguage() {
  document.documentElement.lang = settings.language === "zh" ? "zh-CN" : "en";
  document.title = t("title");
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  if (state) render();
}

function updateVolumeLabels() {
  if (musicVolumeValue) musicVolumeValue.textContent = `${Math.round(settings.musicVolume * 100)}%`;
  if (sfxVolumeValue) sfxVolumeValue.textContent = `${Math.round(settings.sfxVolume * 100)}%`;
}

function bindButtonClickSounds() {
  if (document.documentElement.dataset.buttonSoundBound) return;
  document.documentElement.dataset.buttonSoundBound = "true";
  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest("button");
    if (!button || button.disabled) return;
    playSound("menu");
  }, { capture: true });
}

function openMenuScreen(screenName) {
  document.querySelectorAll(".menu-screen").forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === screenName);
  });
  if (screenName === "home") updateContinueButton();
  if (screenName === "tutorial") showTutorialSlide(tutorialIndex);
}

function showTutorialSlide(index) {
  if (!tutorialTrack) return;
  const slides = Array.from(tutorialTrack.children);
  if (!slides.length) return;
  tutorialIndex = (index + slides.length) % slides.length;
  tutorialTrack.style.transform = `translateX(${-tutorialIndex * 100}%)`;
  document.querySelectorAll("[data-tutorial-dot]").forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.tutorialDot) === tutorialIndex);
  });
}

function bindTutorialCarousel() {
  if (!tutorialTrack || !tutorialCarousel) return;
  document.querySelector("[data-tutorial-prev]")?.addEventListener("click", () => showTutorialSlide(tutorialIndex - 1));
  document.querySelector("[data-tutorial-next]")?.addEventListener("click", () => showTutorialSlide(tutorialIndex + 1));
  document.querySelectorAll("[data-tutorial-dot]").forEach((dot) => {
    dot.addEventListener("click", () => showTutorialSlide(Number(dot.dataset.tutorialDot)));
  });
  tutorialCarousel.addEventListener("pointerdown", (event) => {
    tutorialPointerStart = event.clientX;
  });
  tutorialCarousel.addEventListener("pointerup", (event) => {
    if (tutorialPointerStart === null) return;
    const delta = event.clientX - tutorialPointerStart;
    tutorialPointerStart = null;
    if (Math.abs(delta) < 36) return;
    showTutorialSlide(tutorialIndex + (delta < 0 ? 1 : -1));
  });
  tutorialCarousel.addEventListener("pointercancel", () => {
    tutorialPointerStart = null;
  });
  showTutorialSlide(0);
}

function initMenu() {
  languageSelect.value = settings.language;
  musicVolumeInput.value = Math.round(settings.musicVolume * 100);
  sfxVolumeInput.value = Math.round(settings.sfxVolume * 100);
  applyLanguage();
  updateVolumeLabels();
  bindButtonClickSounds();
  bindTutorialCarousel();
  updateContinueButton();

  document.querySelectorAll("[data-open-screen]").forEach((button) => {
    button.addEventListener("click", () => {
      startMusic();
      openMenuScreen(button.dataset.openScreen);
    });
  });
  document.querySelectorAll("[data-start-suits]").forEach((button) => {
    button.addEventListener("click", () => {
      const suitCount = Number(button.dataset.startSuits);
      startGameWithTransition(suitCount);
    });
  });
  continueBtn?.addEventListener("click", continueSavedGame);
  startOverlay?.addEventListener("pointerdown", startMusic, { once: true });
  languageSelect.addEventListener("change", () => {
    settings.language = languageSelect.value;
    saveSettings();
    applyLanguage();
  });
  musicVolumeInput.addEventListener("input", () => {
    settings.musicVolume = Number(musicVolumeInput.value) / 100;
    saveSettings();
    updateVolumeLabels();
    updateAudioVolumes();
    if (settings.musicVolume > 0) startMusic();
  });
  sfxVolumeInput.addEventListener("input", () => {
    settings.sfxVolume = Number(sfxVolumeInput.value) / 100;
    saveSettings();
    updateVolumeLabels();
    updateAudioVolumes();
  });
  const initialScreen = new URLSearchParams(location.search).get("screen");
  if (initialScreen) openMenuScreen(initialScreen);
  setTimeout(startMusic, 250);
}

function snapshot() {
  return JSON.stringify({
    suitCount: state.suitCount,
    columns: state.columns,
    stock: state.stock,
    completed: state.completed,
    moves: state.moves,
    elapsedSeconds: getElapsedSeconds()
  });
}

function restore(serialized) {
  const snap = JSON.parse(serialized);
  state.suitCount = snap.suitCount || state.suitCount;
  state.columns = snap.columns;
  state.stock = snap.stock;
  state.completed = snap.completed;
  state.moves = snap.moves;
  state.startTime = Date.now() - Math.max(0, snap.elapsedSeconds || 0) * 1000;
  state.resolving = false;
  state.won = false;
  selected = null;
  drag = null;
  restartTimer();
  render();
}

function pushHistory() {
  state.history.push(snapshot());
  if (state.history.length > 80) state.history.shift();
}

function isOrderedRun(cards) {
  for (let i = 0; i < cards.length - 1; i += 1) {
    if (!cards[i].faceUp || !cards[i + 1].faceUp) return false;
    if (cards[i].suit !== cards[i + 1].suit) return false;
    if (cards[i].rank !== cards[i + 1].rank + 1) return false;
  }
  return cards.every((card) => card.faceUp);
}

function movableRun(column, index) {
  const run = state.columns[column].slice(index);
  return run.length > 0 && isOrderedRun(run);
}

function canPlace(cards, targetColumn) {
  if (!cards.length) return false;
  const target = state.columns[targetColumn];
  if (target.length === 0) return true;
  const top = target[target.length - 1];
  return top.faceUp && top.rank === cards[0].rank + 1;
}

function flipTop(columnIndex) {
  const column = state.columns[columnIndex];
  if (column.length && !column[column.length - 1].faceUp) {
    column[column.length - 1].faceUp = true;
    flippedCardIds.add(column[column.length - 1].id);
  }
}

function collectCompleted() {
  let changed = false;
  for (const column of state.columns) {
    if (column.length < 13) continue;
    const run = column.slice(-13);
    const isComplete = run[0].rank === 13 && run[12].rank === 1 && isOrderedRun(run);
    if (isComplete) {
      state.completed.push(run[0].suit);
      column.splice(column.length - 13, 13);
      changed = true;
      foundationPulse = true;
    }
  }
  if (changed) {
    state.columns.forEach((_, index) => flipTop(index));
    showToast(t("completedRun"));
  }
}

function moveCards(fromColumn, fromIndex, toColumn) {
  if (state.resolving) return false;
  if (fromColumn === toColumn) return false;
  const source = state.columns[fromColumn];
  const cards = source.slice(fromIndex);
  if (!movableRun(fromColumn, fromIndex) || !canPlace(cards, toColumn)) return false;
  pushHistory();
  state.columns[toColumn].push(...source.splice(fromIndex));
  landedCardIds = new Set(cards.map((card) => card.id));
  flipTop(fromColumn);
  state.moves += 1;
  selected = null;
  playSound("move");
  render();
  resolveCompletedRuns();
  return true;
}

function dealStock() {
  if (state.resolving) return;
  if (state.stock.length === 0) return;
  pushHistory();
  const pack = state.stock.shift();
  const dealDelays = pack.map((_, index) => index * 250);
  state.resolving = true;
  animatedCardIds = new Set(pack.map((card) => card.id));
  animatedCardDelays = new Map(pack.map((card, index) => [card.id, dealDelays[index]]));
  pack.forEach((card, index) => {
    card.faceUp = true;
    state.columns[index].push(card);
  });
  state.moves += 1;
  playDealCascade(dealDelays);
  selected = null;
  render();
  setTimeout(() => {
    state.resolving = false;
    resolveCompletedRuns();
    saveGameState();
  }, Math.max(...dealDelays) + 950);
}

function useSkill() {
  if (state.resolving) return;
  if (!selected) {
    showToast(t("chooseFaceUp"));
    return;
  }
  const source = state.columns[selected.column];
  const cards = source.slice(selected.index);
  if (!cards.length || cards.some((card) => !card.faceUp)) {
    showToast(t("onlyFaceUp"));
    return;
  }

  pushHistory();
  state.resolving = true;
  const movedCards = source.splice(selected.index);
  selected = null;
  playSound("skill");
  flipTopAfterSkill(source, movedCards);
}

function flipTopAfterSkill(sourceColumn, movedCards) {
  const sourceColumnIndex = state.columns.indexOf(sourceColumn);
  if (sourceColumnIndex >= 0) {
    flipTop(sourceColumnIndex);
  }
  render();
  setTimeout(() => redealSkillCards(movedCards), 320);
}

function redealSkillCards(cards) {
  const dealDelays = cards.map((_, index) => index * 250);
  cards.forEach((card, index) => {
    const columnIndex = index % 10;
    card.faceUp = true;
    state.columns[columnIndex].push(card);
  });
  animatedCardIds = new Set(cards.map((card) => card.id));
  animatedCardDelays = new Map(cards.map((card, index) => [card.id, dealDelays[index]]));
  landedCardIds = new Set();
  render();
  playDealCascade(dealDelays);
  setTimeout(() => {
    state.moves += 1;
    state.resolving = false;
    resolveCompletedRuns();
    saveGameState();
  }, Math.max(...dealDelays, 0) + 950);
}

function findCompletedRun() {
  for (let columnIndex = 0; columnIndex < state.columns.length; columnIndex += 1) {
    const column = state.columns[columnIndex];
    if (column.length < 13) continue;
    const startIndex = column.length - 13;
    const run = column.slice(startIndex);
    if (run[0].rank === 13 && run[12].rank === 1 && isOrderedRun(run)) {
      return { columnIndex, startIndex, suit: run[0].suit };
    }
  }
  return null;
}

function resolveCompletedRuns() {
  if (state.resolving) return;
  const completed = findCompletedRun();
  if (!completed) {
    checkWin();
    return;
  }
  state.resolving = true;
  animateCompletedRun(completed, () => {
    state.columns[completed.columnIndex].splice(completed.startIndex, 13);
    state.completed.push(completed.suit);
    foundationPulse = true;
    flipTop(completed.columnIndex);
    state.resolving = false;
    playSound("complete");
    showToast(t("completedRun"));
    render();
    saveGameState();
    resolveCompletedRuns();
  });
}

function animateCompletedRun(completed, done) {
  const cards = Array.from(
    document.querySelectorAll(`.card[data-column="${completed.columnIndex}"]`)
  ).filter((el) => Number(el.dataset.index) >= completed.startIndex);
  if (cards.length !== 13) {
    done();
    return;
  }

  const target = foundationsEl.children[state.completed.length] || foundationsEl.lastElementChild;
  const targetRect = target.getBoundingClientRect();
  const targetX = targetRect.left + targetRect.width * 0.5;
  const targetY = targetRect.top + targetRect.height * 0.5;
  const layer = document.createElement("div");
  layer.className = "complete-layer";
  document.body.appendChild(layer);

  cards.forEach((cardEl, offset) => {
    const rect = cardEl.getBoundingClientRect();
    const clone = cardEl.cloneNode(true);
    const collapseX = targetX - rect.left - rect.width / 2;
    const collapseY = targetY - rect.top - rect.height / 2 - offset * 1.5;
    clone.classList.remove("selected", "deal-in", "landed", "flipped", "hint");
    clone.classList.add("complete-card");
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.zIndex = 100 + offset;
    clone.style.setProperty("--collapse-x", `${collapseX}px`);
    clone.style.setProperty("--collapse-y", `${collapseY}px`);
    clone.style.animationDelay = `${offset * 18}ms`;
    layer.appendChild(clone);
    cardEl.classList.add("completing-source");
  });

  setTimeout(() => {
    layer.remove();
    cards.forEach((cardEl) => cardEl.classList.remove("completing-source"));
    done();
  }, 1050);
}

function undo() {
  if (state.resolving) return;
  const last = state.history.pop();
  if (!last) {
    showToast(t("noUndo"));
    return;
  }
  restore(last);
}

function checkWin() {
  if (state.completed.length === 8 && !state.won) {
    state.won = true;
    clearSavedGame();
    clearInterval(timerId);
    playSound("win");
    animateWin(() => {
      winStats.textContent = t("winStats", timerEl.textContent, state.moves);
      winDialog.showModal();
    });
  }
}

function animateWin(done) {
  const layer = document.createElement("div");
  layer.className = "win-layer";
  layer.innerHTML = `
    <div class="win-burst"></div>
    <div class="win-title">胜利</div>
    <div class="win-foundation-fan"></div>
  `;
  const fan = layer.querySelector(".win-foundation-fan");
  state.completed.forEach((suit, index) => {
    const card = document.createElement("div");
    card.className = "win-mini-card";
    card.textContent = SUITS.find((s) => s.id === suit)?.symbol || "♠";
    card.style.animationDelay = `${index * 70}ms`;
    card.style.setProperty("--spin", `${(index - 3.5) * 7}deg`);
    card.style.setProperty("--fan-x", `${(index - 3.5) * 28}px`);
    fan.appendChild(card);
  });
  document.body.appendChild(layer);
  setTimeout(() => {
    layer.classList.add("leaving");
    setTimeout(() => {
      layer.remove();
      done();
    }, 420);
  }, 1700);
}

function unlockAudio() {
  if (audioCtx) return audioCtx;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  audioCtx = new AudioContextClass();
  musicGain = audioCtx.createGain();
  sfxGain = audioCtx.createGain();
  musicGain.connect(audioCtx.destination);
  sfxGain.connect(audioCtx.destination);
  updateAudioVolumes();
  loadDealAudio();
  return audioCtx;
}

function updateAudioVolumes() {
  if (bgmAudio) {
    bgmAudio.volume = getBgmTargetVolume();
  }
  if (!audioCtx || !musicGain || !sfxGain) return;
  musicGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.04);
  sfxGain.gain.setTargetAtTime(settings.sfxVolume, audioCtx.currentTime, 0.04);
}

function getBgmTargetVolume() {
  return Math.max(0, Math.min(1, settings.musicVolume * BGM_GAIN * bgmDuckFactor));
}

function duckBgm(duration = 360, factor = 0.34) {
  if (!bgmAudio || settings.musicVolume <= 0 || settings.sfxVolume <= 0) return;
  bgmDuckFactor = factor;
  updateAudioVolumes();
  clearTimeout(bgmDuckTimer);
  bgmDuckTimer = setTimeout(() => {
    bgmDuckFactor = 1;
    updateAudioVolumes();
  }, duration);
}

function playTone(freq, start, duration, gainValue = 0.045, type = "sine") {
  const ctx = unlockAudio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(gainValue, ctx.currentTime + start + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  osc.connect(gain).connect(sfxGain || ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration + 0.02);
}

function loadDealAudio() {
  if (!audioCtx || dealAudioBuffer || dealAudioLoading) return;
  dealAudioLoading = true;
  fetch("assets/card-deal-real.mp3")
    .then((response) => response.arrayBuffer())
    .then((data) => audioCtx.decodeAudioData(data))
    .then((buffer) => {
      dealAudioBuffer = buffer;
      dealSlices = extractDealSlices(buffer);
    })
    .catch(() => {
      dealAudioBuffer = null;
      dealSlices = [];
    })
    .finally(() => {
      dealAudioLoading = false;
    });
}

function extractDealSlices(buffer) {
  const channel = buffer.getChannelData(0);
  const sampleRate = buffer.sampleRate;
  const windowSize = Math.max(256, Math.floor(sampleRate * 0.045));
  const step = Math.max(128, Math.floor(sampleRate * 0.018));
  const windows = [];
  let maxEnergy = 0;
  for (let start = 0; start < channel.length - windowSize; start += step) {
    let sum = 0;
    for (let i = 0; i < windowSize; i += 32) {
      const sample = channel[start + i];
      sum += sample * sample;
    }
    const energy = Math.sqrt(sum / Math.ceil(windowSize / 32));
    maxEnergy = Math.max(maxEnergy, energy);
    windows.push({ time: start / sampleRate, energy });
  }
  const threshold = maxEnergy * 0.28;
  const candidates = windows
    .filter((item, index) => item.energy > threshold
      && item.energy >= (windows[index - 1]?.energy ?? 0)
      && item.energy >= (windows[index + 1]?.energy ?? 0))
    .sort((a, b) => b.energy - a.energy);
  const picked = [];
  for (const item of candidates) {
    if (picked.every((time) => Math.abs(time - item.time) > 0.13)) {
      picked.push(Math.max(0, item.time - 0.018));
    }
    if (picked.length >= 36) break;
  }
  return picked.sort((a, b) => a - b);
}

function playRealDealSample(start = 0) {
  const ctx = unlockAudio();
  if (!dealAudioBuffer) loadDealAudio();
  if (!ctx || !dealAudioBuffer || !dealSlices.length || settings.sfxVolume <= 0) return false;
  const when = ctx.currentTime + start;
  const source = ctx.createBufferSource();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  const offset = dealSlices[dealSampleCursor % dealSlices.length];
  dealSampleCursor += 1;
  source.buffer = dealAudioBuffer;
  source.playbackRate.setValueAtTime(0.96 + Math.random() * 0.08, when);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(4200, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.linearRampToValueAtTime(0.12, when + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.18);
  source.connect(filter).connect(gain).connect(sfxGain || ctx.destination);
  source.start(when, offset, 0.2);
  return true;
}

function playCardFlick(start = 0) {
  const ctx = unlockAudio();
  if (playRealDealSample(start)) return;
  if (!ctx || settings.sfxVolume <= 0) return;
  const when = ctx.currentTime + start;
  const bufferSize = Math.floor(ctx.sampleRate * 0.12);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    const fade = 1 - i / bufferSize;
    const scrape = Math.sin(i * 0.11 + Math.random() * 0.6) * 0.35;
    data[i] = (Math.random() * 2 - 1 + scrape) * fade * fade;
  }
  const noise = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  noise.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2400 + Math.random() * 600, when);
  filter.Q.setValueAtTime(0.55, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.linearRampToValueAtTime(0.058, when + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.135);
  noise.connect(filter).connect(gain).connect(sfxGain || ctx.destination);
  noise.start(when);
  noise.stop(when + 0.15);
}

function playMenuClick() {
  const ctx = unlockAudio();
  if (!ctx || settings.sfxVolume <= 0) return;
  const when = ctx.currentTime;
  const bufferSize = Math.floor(ctx.sampleRate * 0.045);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i += 1) {
    const fade = 1 - i / bufferSize;
    data[i] = (Math.random() * 2 - 1) * fade * fade;
  }
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = buffer;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(1900, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.linearRampToValueAtTime(0.075, when + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.052);
  source.connect(filter).connect(gain).connect(sfxGain || ctx.destination);
  source.start(when);
  source.stop(when + 0.06);
}

function playMusicTone(freq, start, duration, gainValue = 0.032, type = "triangle") {
  const ctx = unlockAudio();
  if (!ctx || settings.musicVolume <= 0) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(type === "sine" ? 980 : 1400, ctx.currentTime + start);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
  gain.gain.exponentialRampToValueAtTime(gainValue, ctx.currentTime + start + 0.08);
  gain.gain.setTargetAtTime(gainValue * 0.58, ctx.currentTime + start + duration * 0.52, 0.2);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
  osc.connect(filter).connect(gain).connect(musicGain || ctx.destination);
  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration + 0.08);
}

function ensureBgmAudio() {
  if (bgmAudio) return bgmAudio;
  bgmAudio = new Audio(BGM_SRC);
  bgmAudio.loop = true;
  bgmAudio.preload = "auto";
  bgmAudio.volume = getBgmTargetVolume();
  return bgmAudio;
}

function startMusic() {
  const audio = ensureBgmAudio();
  updateAudioVolumes();
  if (settings.musicVolume <= 0 || !audio.paused) return;
  const playPromise = audio.play();
  if (playPromise) {
    playPromise.catch(() => {
      // Browsers may block autoplay until the first user gesture.
    });
  }
}

function playMusicLoop() {
  const loopMs = 12800;
  clearTimeout(musicTimer);
  musicTimer = setTimeout(playMusicLoop, loopMs);
  if (settings.musicVolume <= 0) return;
  const sections = [
    {
      lead: [392, 0, 440, 494, 523, 0, 494, 440, 392, 0, 330, 392, 440, 0, 494, 523, 494, 0, 440, 392, 370, 0, 392, 0],
      bass: [196, 196, 220, 247, 196, 220],
      pad: [392, 440, 392]
    },
    {
      lead: [330, 0, 392, 440, 494, 0, 440, 392, 370, 0, 392, 494, 523, 0, 494, 440, 392, 0, 330, 370, 392, 0, 330, 0],
      bass: [165, 196, 220, 196, 165, 196],
      pad: [330, 392, 370]
    },
    {
      lead: [523, 0, 587, 659, 587, 0, 523, 494, 440, 0, 494, 523, 587, 0, 523, 494, 440, 0, 392, 440, 494, 0, 440, 0],
      bass: [262, 247, 220, 196, 220, 196],
      pad: [523, 494, 440]
    }
  ];
  const section = sections[musicStep % sections.length];
  section.lead.forEach((freq, index) => {
    if (!freq) return;
    const accent = index % 8 === 0 ? 0.018 : 0.012;
    playMusicTone(freq, index * 0.5, 0.36, accent, index % 6 === 0 ? "sine" : "triangle");
  });
  section.bass.forEach((freq, index) => {
    playMusicTone(freq, index * 2.0, 1.1, 0.008, "sine");
  });
  section.pad.forEach((freq, index) => {
    playMusicTone(freq, index * 4.0, 3.25, 0.0038, "sine");
  });
  musicStep += 1;
}

function playSound(kind) {
  const ctx = unlockAudio();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const duckDurations = { select: 180, menu: 220, move: 420, deal: 320, skill: 720, complete: 1100, hint: 620, win: 1800 };
  duckBgm(duckDurations[kind] || 360, kind === "win" ? 0.2 : 0.34);
  if (kind === "select") {
    playTone(520, 0, 0.06, 0.025, "triangle");
  } else if (kind === "menu") {
    playMenuClick();
  } else if (kind === "move") {
    playTone(420, 0, 0.05, 0.03, "triangle");
    playTone(620, 0.045, 0.08, 0.035, "triangle");
  } else if (kind === "deal") {
    playCardFlick();
  } else if (kind === "skill") {
    [300, 520, 740].forEach((freq, index) => playTone(freq, index * 0.055, 0.11, 0.04, "triangle"));
  } else if (kind === "complete") {
    [523, 659, 784, 1046].forEach((freq, index) => playTone(freq, index * 0.09, 0.16, 0.05, "triangle"));
  } else if (kind === "hint") {
    playTone(740, 0, 0.055, 0.025, "triangle");
    playTone(880, 0.1, 0.07, 0.025, "triangle");
  } else if (kind === "win") {
    [523, 659, 784, 1046, 1318, 1568].forEach((freq, index) => {
      playTone(freq, index * 0.11, 0.22, 0.055, "triangle");
    });
    [196, 262, 330].forEach((freq, index) => {
      playTone(freq, index * 0.18, 0.28, 0.035, "sine");
    });
  }
}

function playDealCascade(delays) {
  const timeline = Array.isArray(delays) ? delays : Array.from({ length: delays }, (_, index) => index * 250);
  for (const delay of timeline) {
    setTimeout(() => playSound("deal"), delay);
  }
}

function getElapsedSeconds() {
  if (!state) return 0;
  return Math.floor((Date.now() - state.startTime) / 1000);
}

function updateTimerText() {
  const seconds = getElapsedSeconds();
  timerEl.textContent = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

function restartTimer() {
  clearInterval(timerId);
  updateTimerText();
  timerId = setInterval(() => {
    updateTimerText();
  }, 500);
}

function render() {
  if (!state) return;
  boardEl.innerHTML = "";
  foundationsEl.innerHTML = "";

  moveCountEl.textContent = state.moves;
  completeCountEl.textContent = `${state.completed.length}/8`;
  stockText.textContent = t("stockLeft", state.stock.length);
  stockBtn.disabled = state.stock.length === 0;
  statusText.textContent = selected ? t("selectedStatus") : t("objective");

  for (let i = 0; i < 8; i += 1) {
    const pile = document.createElement("div");
    pile.className = `foundation${state.completed[i] ? " filled" : ""}`;
    if (foundationPulse && i === state.completed.length - 1) {
      pile.classList.add("completed-pop");
    }
    pile.textContent = state.completed[i] ? SUITS.find((s) => s.id === state.completed[i]).symbol : "K";
    foundationsEl.appendChild(pile);
  }

  state.columns.forEach((column, columnIndex) => {
    const columnEl = document.createElement("div");
    columnEl.className = "column";
    columnEl.dataset.column = columnIndex;
    columnEl.addEventListener("pointerdown", onColumnPointerDown);
    boardEl.appendChild(columnEl);

    let y = 8;
    column.forEach((card, cardIndex) => {
      const cardEl = document.createElement("div");
      cardEl.className = `card ${card.faceUp ? card.color : "face-down"}`;
      cardEl.dataset.column = columnIndex;
      cardEl.dataset.index = cardIndex;
      cardEl.dataset.cardId = card.id;
      cardEl.style.top = `${y}px`;
      cardEl.style.zIndex = cardIndex + 1;
      if (selected && selected.column === columnIndex && cardIndex >= selected.index) {
        cardEl.classList.add("selected");
      }
      if (animatedCardIds.has(card.id)) {
        cardEl.classList.add("deal-in");
        const dealDelay = animatedCardDelays.get(card.id);
        cardEl.style.animationDelay = `${dealDelay ?? Math.min(columnIndex * 158 + cardIndex * 24, 1680)}ms`;
      }
      if (landedCardIds.has(card.id)) {
        cardEl.classList.add("landed");
      }
      if (flippedCardIds.has(card.id)) {
        cardEl.classList.add("flipped");
      }
      if (card.faceUp) {
        cardEl.innerHTML = `<span class="rank">${RANKS[card.rank]}</span><span class="suit">${card.symbol}</span>`;
        cardEl.addEventListener("pointerdown", onCardPointerDown);
        cardEl.addEventListener("dblclick", () => autoMove(columnIndex, cardIndex));
      }
      columnEl.appendChild(cardEl);
      y += card.faceUp ? px("--stack-step") : px("--closed-step");
    });
  });
  animatedCardIds.clear();
  animatedCardDelays.clear();
  landedCardIds.clear();
  flippedCardIds.clear();
  foundationPulse = false;
  saveGameState();
}

function px(varName) {
  px.probe ||= (() => {
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.style.visibility = "hidden";
    el.style.pointerEvents = "none";
    el.style.height = "0";
    document.body.appendChild(el);
    return el;
  })();
  px.probe.style.width = `var(${varName})`;
  return px.probe.getBoundingClientRect().width;
}

function cardAtDataset(target) {
  const cardEl = target.closest(".card");
  if (!cardEl || cardEl.classList.contains("face-down")) return null;
  return {
    el: cardEl,
    column: Number(cardEl.dataset.column),
    index: Number(cardEl.dataset.index)
  };
}

function updateSelectionClasses() {
  document.querySelectorAll(".card.selected").forEach((el) => el.classList.remove("selected"));
  if (!selected) return;
  document.querySelectorAll(`.card[data-column="${selected.column}"]`).forEach((el) => {
    if (Number(el.dataset.index) >= selected.index) {
      el.classList.add("selected");
    }
  });
  statusText.textContent = t("selectedStatus");
}

function onCardPointerDown(event) {
  if (state.resolving) return;
  const data = cardAtDataset(event.target);
  if (!data) {
    return;
  }
  event.preventDefault();
  playSound("select");
  const rect = data.el.getBoundingClientRect();
  selected = { column: data.column, index: data.index };
  if (!movableRun(data.column, data.index)) {
    drag = null;
    updateSelectionClasses();
    showToast(t("selectedForSkill"));
    return;
  }
  drag = {
    pointerId: event.pointerId,
    column: data.column,
    index: data.index,
    startX: event.clientX,
    startY: event.clientY,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    active: false
  };
  data.el.setPointerCapture(event.pointerId);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp, { once: true });
  updateSelectionClasses();
}

function onPointerMove(event) {
  if (!drag || event.pointerId !== drag.pointerId) return;
  const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
  if (!drag.active && distance < 7) return;
  if (!drag.active) {
    drag.active = true;
    createDragLayer(event);
  }
  moveDragLayer(event);
  highlightDrop(event.clientX, event.clientY);
}

function onPointerUp(event) {
  window.removeEventListener("pointermove", onPointerMove);
  document.querySelectorAll(".drop-ok").forEach((el) => el.classList.remove("drop-ok"));
  if (!drag || event.pointerId !== drag.pointerId) return;
  const target = columnFromPoint(event.clientX, event.clientY);
  if (drag.active && target !== null && moveCards(drag.column, drag.index, target)) {
    cleanupDragLayer();
    selected = null;
    drag = null;
    return;
  }
  if (!drag.active) {
    selected = { column: drag.column, index: drag.index };
    updateSelectionClasses();
    drag = null;
    return;
  }
  cleanupDragLayer();
  drag = null;
  render();
}

function createDragLayer(event) {
  const originals = Array.from(document.querySelectorAll(`.card[data-column="${drag.column}"]`))
    .filter((el) => Number(el.dataset.index) >= drag.index);
  const firstRect = originals[0].getBoundingClientRect();
  const layer = document.createElement("div");
  layer.className = "drag-layer";
  layer.style.width = `${firstRect.width}px`;
  layer.style.height = `${firstRect.height + Math.max(0, originals.length - 1) * px("--stack-step")}px`;
  originals.forEach((el, offset) => {
    const clone = el.cloneNode(true);
    clone.classList.remove("selected", "deal-in", "landed", "flipped", "hint");
    clone.classList.add("drag-card");
    clone.style.left = "0";
    clone.style.top = `${offset * px("--stack-step")}px`;
    clone.style.width = `${firstRect.width}px`;
    clone.style.height = `${firstRect.height}px`;
    clone.style.zIndex = offset + 1;
    layer.appendChild(clone);
    el.classList.add("drag-source");
  });
  document.body.appendChild(layer);
  drag.layer = layer;
  moveDragLayer(event);
}

function moveDragLayer(event) {
  if (!drag?.layer) return;
  drag.layer.style.transform = `translate3d(${event.clientX - drag.offsetX}px, ${event.clientY - drag.offsetY}px, 0)`;
}

function cleanupDragLayer() {
  drag?.layer?.remove();
  document.querySelectorAll(".drag-source").forEach((el) => el.classList.remove("drag-source"));
}

function onColumnPointerDown(event) {
  if (state.resolving) return;
  if (event.target.closest(".card")) return;
  if (!selected) return;
  const targetColumn = Number(event.currentTarget.dataset.column);
  if (moveCards(selected.column, selected.index, targetColumn)) {
    selected = null;
  } else {
    showToast(t("invalidMove"));
    render();
  }
}

function columnFromPoint(x, y) {
  const el = document.elementFromPoint(x, y)?.closest(".column");
  return el ? Number(el.dataset.column) : null;
}

function highlightDrop(x, y) {
  document.querySelectorAll(".drop-ok").forEach((el) => el.classList.remove("drop-ok"));
  const target = columnFromPoint(x, y);
  if (target === null || !drag) return;
  const cards = state.columns[drag.column].slice(drag.index);
  if (canPlace(cards, target)) {
    document.querySelector(`.column[data-column="${target}"]`)?.classList.add("drop-ok");
  }
}

function autoMove(columnIndex, cardIndex) {
  if (!movableRun(columnIndex, cardIndex)) return;
  for (let target = 0; target < 10; target += 1) {
    if (moveCards(columnIndex, cardIndex, target)) return;
  }
}

function findHint() {
  for (let from = 0; from < 10; from += 1) {
    for (let index = 0; index < state.columns[from].length; index += 1) {
      if (!movableRun(from, index)) continue;
      const cards = state.columns[from].slice(index);
      for (let to = 0; to < 10; to += 1) {
        if (from !== to && canPlace(cards, to)) return { from, index, to };
      }
    }
  }
  return null;
}

function showHint() {
  if (state.resolving) return;
  const hint = findHint();
  if (!hint) {
    showToast(state.stock.length ? t("noMoveStock") : t("noMove"));
    return;
  }
  playSound("hint");
  animateHint(hint);
}

function animateHint(hint) {
  hintLayer?.remove();
  const sourceCards = Array.from(document.querySelectorAll(`.card[data-column="${hint.from}"]`))
    .filter((el) => Number(el.dataset.index) >= hint.index);
  const targetColumn = document.querySelector(`.column[data-column="${hint.to}"]`);
  if (!sourceCards.length || !targetColumn) return;

  sourceCards[0].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  targetColumn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  setTimeout(() => playHintPass(sourceCards, targetColumn), 220);
}

function playHintPass(sourceCards, targetColumn) {
  const firstRect = sourceCards[0].getBoundingClientRect();
  const targetTop = state.columns[Number(targetColumn.dataset.column)].length;
  const targetRect = targetColumn.getBoundingClientRect();
  const targetX = targetRect.left + targetRect.width / 2 - firstRect.width / 2;
  const targetY = targetRect.top + 8 + targetTop * px("--stack-step");
  const dx = targetX - firstRect.left;
  const dy = targetY - firstRect.top;

  hintLayer = document.createElement("div");
  hintLayer.className = "hint-layer";
  sourceCards.forEach((el, offset) => {
    const rect = el.getBoundingClientRect();
    const clone = el.cloneNode(true);
    clone.classList.remove("selected", "deal-in", "landed", "flipped", "hint");
    clone.classList.add("hint-card");
    clone.style.left = `${rect.left}px`;
    clone.style.top = `${rect.top}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.zIndex = offset + 1;
    clone.style.setProperty("--hint-x", `${dx}px`);
    clone.style.setProperty("--hint-y", `${dy}px`);
    clone.style.animationDelay = `${offset * 22}ms`;
    hintLayer.appendChild(clone);
  });
  document.body.appendChild(hintLayer);
  sourceCards.forEach((el) => el.classList.add("hint-source"));
  targetColumn.classList.add("drop-ok", "hint-target");

  setTimeout(() => {
    hintLayer?.remove();
    hintLayer = null;
    sourceCards.forEach((el) => el.classList.remove("hint-source"));
    targetColumn.classList.remove("drop-ok", "hint-target");
  }, 2300);
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add("show");
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
}

document.addEventListener("pointerdown", startMusic, { once: true });
document.addEventListener("keydown", startMusic, { once: true });
window.addEventListener("focus", startMusic);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    saveGameState();
  } else {
    startMusic();
  }
});
window.addEventListener("beforeunload", saveGameState);

stockBtn.addEventListener("click", dealStock);
document.querySelector("#undoBtn").addEventListener("click", undo);
document.querySelector("#hintBtn").addEventListener("click", showHint);
document.querySelector("#skillBtn").addEventListener("click", useSkill);
document.querySelector("#newBtn").addEventListener("click", openNewGameConfirm);
document.querySelector("#exitBtn").addEventListener("click", openExitGameConfirm);
document.querySelector("#playAgainBtn").addEventListener("click", () => newGame(state?.suitCount || 1));
document.querySelector("#chooseDifficultyBtn").addEventListener("click", () => leaveGameToMenu("start"));
document.querySelector("#cancelNewBtn").addEventListener("click", closeNewGameConfirm);
document.querySelector("#confirmNewBtn").addEventListener("click", () => {
  const suitCount = state?.suitCount || 1;
  closeNewGameConfirm();
  newGame(suitCount);
});
newGameDialog?.addEventListener("cancel", closeNewGameConfirm);
document.querySelector("#cancelExitBtn").addEventListener("click", closeExitGameConfirm);
document.querySelector("#confirmExitBtn").addEventListener("click", () => leaveGameToMenu("home", { clearSave: true }));
exitGameDialog?.addEventListener("cancel", closeExitGameConfirm);

window.addEventListener("resize", () => {
  if (state) render();
});

initMenu();

function prepareSmokeGame() {
  startOverlay?.classList.add("hidden");
  gameView?.classList.remove("hidden");
  newGame(1);
}

if (new URLSearchParams(location.search).has("smoke")) {
  prepareSmokeGame();
  runSmokeTest();
}

if (new URLSearchParams(location.search).has("dragSmoke")) {
  prepareSmokeGame();
  runDragSmokeTest();
}

if (new URLSearchParams(location.search).has("dealSmoke")) {
  prepareSmokeGame();
  runDealSmokeTest();
}

if (new URLSearchParams(location.search).has("completeSmoke")) {
  prepareSmokeGame();
  runCompleteSmokeTest();
}

if (new URLSearchParams(location.search).has("hintSmoke")) {
  prepareSmokeGame();
  runHintSmokeTest();
}

if (new URLSearchParams(location.search).has("winSmoke")) {
  prepareSmokeGame();
  runWinSmokeTest();
}

if (new URLSearchParams(location.search).has("skillSmoke")) {
  prepareSmokeGame();
  runSkillSmokeTest();
}

function runSmokeTest() {
  const king = { id: 9001, suit: "spades", symbol: "♠", color: "black", rank: 13, faceUp: true };
  const queen = { id: 9002, suit: "spades", symbol: "♠", color: "black", rank: 12, faceUp: true };
  state.columns = Array.from({ length: 10 }, () => []);
  state.columns[0].push(queen);
  state.columns[1].push(king);
  state.stock = [];
  state.completed = [];
  state.moves = 0;
  state.history = [];
  render();
  const ok = moveCards(0, 0, 1);
  const ids = state.columns[1].map((card) => card.id).join(",");
  const cardsInDom = Array.from(document.querySelectorAll('.card[data-column="1"]')).map((el) => el.dataset.cardId).join(",");
  const result = ok && ids === "9001,9002" && cardsInDom === "9001,9002";
  document.body.dataset.smoke = result ? "pass" : `fail:${ids}:${cardsInDom}`;
  console.log(`smoke:${document.body.dataset.smoke}`);
}

function runDragSmokeTest() {
  state.columns = Array.from({ length: 10 }, () => []);
  state.columns[0].push({ id: 9101, suit: "spades", symbol: "♠", color: "black", rank: 12, faceUp: true });
  state.stock = [];
  state.completed = [];
  state.moves = 0;
  state.history = [];
  render();
  const card = document.querySelector('.card[data-column="0"][data-index="0"]');
  const rect = card.getBoundingClientRect();
  drag = {
    pointerId: 1,
    column: 0,
    index: 0,
    startX: rect.left + rect.width / 2,
    startY: rect.top + rect.height / 2,
    offsetX: rect.width / 2,
    offsetY: rect.height / 2,
    active: true
  };
  createDragLayer({ clientX: 220, clientY: 260 });
  const transform = drag.layer.style.transform;
  const ok = transform.includes("translate3d(") && !transform.includes("-999") && !transform.includes("0px, 0px");
  cleanupDragLayer();
  drag = null;
  document.body.dataset.dragSmoke = ok ? "pass" : `fail:${transform}`;
  console.log(`dragSmoke:${document.body.dataset.dragSmoke}`);
}

function runDealSmokeTest() {
  state.columns = Array.from({ length: 10 }, () => []);
  state.columns[0].push({ id: 9201, suit: "spades", symbol: "♠", color: "black", rank: 9, faceUp: true });
  state.stock = [Array.from({ length: 10 }, (_, index) => ({
    id: 9300 + index,
    suit: "spades",
    symbol: "♠",
    color: "black",
    rank: 8,
    faceUp: false
  }))];
  state.completed = [];
  state.moves = 0;
  state.history = [];
  state.resolving = false;
  dealStock();
  const lengths = state.columns.map((column) => column.length);
  const ok = state.stock.length === 0 && lengths[0] === 2 && lengths.slice(1).every((length) => length === 1);
  document.body.dataset.dealSmoke = ok ? "pass" : `fail:${lengths.join(",")}`;
  console.log(`dealSmoke:${document.body.dataset.dealSmoke}`);
}

function runCompleteSmokeTest() {
  const run = [];
  for (let rank = 13; rank >= 1; rank -= 1) {
    run.push({ id: 9400 + rank, suit: "spades", symbol: "♠", color: "black", rank, faceUp: true });
  }
  state.columns = Array.from({ length: 10 }, () => []);
  state.columns[0] = run;
  state.stock = [];
  state.completed = [];
  state.moves = 0;
  state.history = [];
  state.resolving = false;
  render();
  resolveCompletedRuns();
  setTimeout(() => {
    const ok = state.completed.length === 1 && state.columns[0].length === 0 && !state.resolving;
    document.body.dataset.completeSmoke = ok ? "pass" : `fail:${state.completed.length}:${state.columns[0].length}:${state.resolving}`;
    console.log(`completeSmoke:${document.body.dataset.completeSmoke}`);
  }, 1200);
}

function runHintSmokeTest() {
  state.columns = Array.from({ length: 10 }, () => []);
  state.columns[0].push({ id: 9501, suit: "spades", symbol: "♠", color: "black", rank: 12, faceUp: true });
  state.columns[1].push({ id: 9502, suit: "spades", symbol: "♠", color: "black", rank: 13, faceUp: true });
  state.stock = [];
  state.completed = [];
  state.moves = 0;
  state.history = [];
  state.resolving = false;
  render();
  showHint();
  setTimeout(() => {
    const ok = !!document.querySelector(".hint-layer .hint-card") && !toastEl.textContent.includes("第");
    document.body.dataset.hintSmoke = ok ? "pass" : "fail";
    console.log(`hintSmoke:${document.body.dataset.hintSmoke}`);
  }, 420);
}

function runWinSmokeTest() {
  state.columns = Array.from({ length: 10 }, () => []);
  state.stock = [];
  state.completed = Array.from({ length: 8 }, () => "spades");
  state.moves = 88;
  state.history = [];
  state.resolving = false;
  state.won = false;
  render();
  checkWin();
  setTimeout(() => {
    const ok = state.won && !document.querySelector(".win-layer") && winDialog.open;
    document.body.dataset.winSmoke = ok ? "pass" : "fail";
    console.log(`winSmoke:${document.body.dataset.winSmoke}`);
  }, 2300);
}

function runSkillSmokeTest() {
  state.columns = Array.from({ length: 10 }, () => []);
  state.columns[3] = [
    { id: 9701, suit: "spades", symbol: "♠", color: "black", rank: 5, faceUp: false },
    { id: 9702, suit: "hearts", symbol: "♥", color: "red", rank: 9, faceUp: true },
    { id: 9703, suit: "clubs", symbol: "♣", color: "black", rank: 4, faceUp: true },
    { id: 9704, suit: "diamonds", symbol: "♦", color: "red", rank: 7, faceUp: true }
  ];
  state.stock = [];
  state.completed = [];
  state.moves = 0;
  state.history = [];
  state.resolving = false;
  selected = { column: 3, index: 1 };
  render();
  useSkill();
  setTimeout(() => {
    const flipped = state.columns[3].length === 1 && state.columns[3][0].faceUp;
    const redealt = state.columns[0].some((card) => card.id === 9702)
      && state.columns[1].some((card) => card.id === 9703)
      && state.columns[2].some((card) => card.id === 9704);
    const ok = flipped && redealt && state.moves === 1 && !state.resolving;
    document.body.dataset.skillSmoke = ok ? "pass" : "fail";
    console.log(`skillSmoke:${document.body.dataset.skillSmoke}`);
  }, 2600);
}
