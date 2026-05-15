import { getFocusOnGameInput, showRange, updateFormGame } from "./game.js";
import {
  $areaLabel,
  $clueFormGame,
  $clueSprite,
  $formGame,
  $formSetting,
  $inputFormGame,
  $timer,
} from "./selectors.js";
import Store from "./store.js";
import { startTimer } from "./timer.js";

const initGame = () => {
  if (
    $formSetting.min.value * 1 < $formSetting.max.value * 1 ||
    $formSetting.min.value === "" ||
    $formSetting.max.value === ""
  ) {
    getFormSettingValues();
    updateFormGame();
    switchForm();
    getFocusOnGameInput();
    showRange();
    startTimer();
  } else {
    alert(`Неверно задан диапазон значений`);
  }
};

const createMysteryValue = (settingValues) => {
  const min = settingValues.min === "" ? -10000 : +settingValues.min;
  const max = settingValues.max === "" ? 10000 : +settingValues.max;

  Store.setMysteryValue(
    Math.floor(Math.random() * (max * 1 - min * 1 + 1)) + min * 1,
  );
};

const getFormSettingValues = () => {
  const settingValues = {};
  for (const element of $formSetting.elements) {
    if (!element.name) {
      continue;
    }
    settingValues[element.name] = element.value;
  }
  createMysteryValue(settingValues);
};

const switchForm = () => {
  $formSetting.classList.toggle("_hide");
  $formGame.classList.toggle("_hide");
  $timer.classList.toggle("_hide");
  $areaLabel.textContent = "Отгадай число";
};

const clearForms = () => {
  for (const element of $formSetting.elements) {
    element.value = "";
  }
  $formSetting.difficult.value = "normal";
  $inputFormGame.value = "";
  $clueFormGame.textContent = "";
  $clueSprite.textContent = "";
  Store.setOldDifference("");
};

export { initGame, switchForm, clearForms };
