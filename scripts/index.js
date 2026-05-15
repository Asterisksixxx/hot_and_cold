// TODO: Вынести в стор, все настроки игры, который нужно модифицировать $formSetting.max.value * 1 > Store.maxValue
import { checkAnswer, closeGame, handleFormGameButton } from "./game.js";
import {
  $buttonAnswer,
  $buttonLeave,
  $buttonStart,
  $inputFormGame,
} from "./selectors.js";
import { initGame } from "./setting.js";

const start = () => {};

const handleInitGame = (event) => {
  event.preventDefault();

  initGame();
};

document.addEventListener("DOMContentLoaded", start);
$buttonStart.addEventListener("click", handleInitGame);
$inputFormGame.addEventListener("input", handleFormGameButton);
$buttonAnswer.addEventListener("click", checkAnswer);
$buttonLeave.addEventListener("click", closeGame);
