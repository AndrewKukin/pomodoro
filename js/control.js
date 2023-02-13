import { state } from "./state.js";
import { showTime, startTimer } from "./timer.js";

const btnStart = document.querySelector('.control__btn_start');
const btnStop = document.querySelector('.control__btn_stop');
const navigationBtns = document.querySelectorAll('.navigation__btn');

export const changeActiveBtn = (dataUse) => {
    state.status = dataUse;
    // state.timeLeft = state[state.status] * 60; необязательные строчки (при переключении с отдыха на работу обновляют таймер)
    // showTime(state.timeLeft);
    const btn = document.querySelector(`[data-use="${dataUse}"]`);

    for (let i = 0; i < navigationBtns.length; i++) {
        navigationBtns[i].classList.remove('navigation__btn_active')
    }
    
    btn.classList.add('navigation__btn_active');
}

// функция кнопки Стоп
export const stop = () => {
    clearTimeout(state.timerId);
    state.isActive = false;
    btnStart.textContent = 'Старт';
    state.timeLeft = state[state.status] * 60;
    showTime(state.timeLeft);
}

export const initControl = () => {
    // кнопка старт
    btnStart.addEventListener('click', () => {
        if (state.isActive) {
            clearTimeout(state.timerId);
            state.isActive = false;
            btnStart.textContent = 'Старт';
        } else {
            state.isActive = true;
            btnStart.textContent = 'Пауза';
            startTimer();
        }

    });

    // кнопка Стоп
    btnStop.addEventListener('click', stop);

    // переключение кнопок "Помодоро", "Отдых", "Перерыв"
    for (let i = 0; i < navigationBtns.length; i++) {
        navigationBtns[i].addEventListener('click', () => {
            changeActiveBtn(navigationBtns[i].dataset.use);
            stop();
        });
    }
}

showTime(state.timeLeft);