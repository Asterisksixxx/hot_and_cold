import {
  $areaImage,
  $areaLabel,
  $areaSprite,
  $areaValue,
  $buttonAnswer,
  $clueFormGame,
  $clueUse,
  $formGame,
  $formSetting,
  $inputFormGame,
} from "./selectors.js";
import { clearForms, switchForm } from "./setting.js";
import Store from "./store.js";
import { pauseTimer, stopTimer } from "./timer.js";

const checkAnswer = (event) => {
  event.preventDefault();

  const isValidValue = +$formGame.answer.value === +Store.mysteryValue;

  isValidValue ? finishGame() : calculateDifference();

  $inputFormGame.focus();
};

const calculateDifference = () => {
  const difficult = $formSetting.difficult.value;
  const countValues = +$inputFormGame.max - +$inputFormGame.min;
  console.log(+$formGame.answer.value - +Store.mysteryValue, countValues);

  // TODO: rename
  const diff =
    (Math.abs(+$formGame.answer.value - +Store.mysteryValue) / countValues) *
    100;

  const difference =
    (countValues <= 100 && diff) ||
    (countValues < 1000 && diff * 2) ||
    (countValues >= 1000 && diff * 20);

  createClue(difficult, difference);
};

const createClue = (difficult, difference) => {
  let clueText = "";
  let svgHref = "assets/sprite.svg#clue__sprite_";

  // TODO: refactor
  // const { clueText, svgHref } = {
  //   hard: createClueHard(),
  //   easy: createClueEasy(),
  // }[difficult]

  console.log("raznica,", difference);
  switch (true) {
    case difference * 1 <= 2:
      clueText = "Пожар";
      svgHref += "fire";
      break;
    case difference <= 5:
      clueText = "Огонь";
      svgHref += "blaze";
      break;
    case difference <= 7:
      clueText = "Жара";
      svgHref += "heat";
      break;
    case difference <= 10:
      clueText = "Тепло";
      svgHref += "warm";
      break;
    case difference <= 12:
      clueText = "Прохладно";
      svgHref += "cool";
      break;
    case difference <= 20:
      clueText = "Холодно";
      svgHref += "cold";
      break;
    case difference <= 30:
      clueText = "Лед";
      svgHref += "ice";
      break;
    default:
      clueText = "Белый хлад";
      svgHref += "arctic";
  }
  console.log(Store.oldDifference, difficult, Store.mysteryValue);
  if (Store.oldDifference && difficult === "easy") {
    clueText +=
      Store.oldDifference > difference
        ? ", (стало теплее)"
        : ", (стало холоднее)";
    console.log("tut");
  }
  switch (difficult) {
    case "hard":
      clueText = "";
      svgHref = "";
      break;
    default:
      break;
  }

  Store.setOldDifference(difference);
  $clueUse.setAttribute("href", svgHref);
  $clueFormGame.textContent = clueText;
  $areaSprite.classList.add("area__sprite_wrong");
  setTimeout(() => {
    $areaSprite.classList.remove("area__sprite_wrong");
  }, 1500);
};

const finishGame = () => {
  pauseTimer();
  $areaValue.textContent = Store.mysteryValue;
  $areaImage.style.display = "none";

  setTimeout(() => {
    $areaImage.style.display = "flex";
    $areaValue.textContent = "";
    closeGame();
    stopTimer();
  }, 3000);
};

const handleFormGameButton = () => {
  const isFormGameValueEmpty = $inputFormGame.value.trim() === "";

  $buttonAnswer.disabled = isFormGameValueEmpty || !checkRange();
};

const checkRange = () => {
  return (
    $formGame.answer.value * 1 >= $formGame.answer.min * 1 &&
    $formGame.answer.value * 1 <= $formGame.answer.max * 1
  );
};

const showRange = () => {
  $areaLabel.textContent = `Диапазон чисел [${$inputFormGame.min * 1}...${$inputFormGame.max * 1}]`;
};

const getFocusOnGameInput = () => {
  $inputFormGame.focus();
};

const updateFormGame = () => {
  $formGame.answer.min = $formSetting.min.value || -10000;
  $formGame.answer.max = $formSetting.max.value || 10000;
};

const closeGame = () => {
  stopTimer();
  switchForm();
  clearForms();
};

export {
  handleFormGameButton,
  closeGame,
  checkAnswer,
  updateFormGame,
  getFocusOnGameInput,
  showRange,
};
