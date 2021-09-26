const log = console.log;
const start_btn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const time_list = document.querySelector('#time-list');
const time_element = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['#3d4', '#d5d', '#dee', '#fdd', '#dd0'];
let time = 0;
let score = 0;

start_btn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

time_list.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        start_game();
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        create_random_circle();
    }
})

function start_game() {
    interval = setInterval(() => decrease_time(interval), 1000);
    create_random_circle();
    time_element.innerHTML = `00:${time}`;
}

function decrease_time(interval) {
    time--;
    if (time === 0) {
        finish_game();
        clearInterval(interval);
    };
    set_time(time);
}

function set_time(value) {
    time_element.innerHTML = `00:${value >= 10? value: '0' + value}`;
}

function finish_game() {
    time_element.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class='primary'>${score}</span></h1>`;
};

function create_random_circle() {
    const min = 30;
    const max = 60;
    const size = get_random_number(min, max);

    const qqq = board.getBoundingClientRect();
    const x = get_random_number(max, qqq.width - size);
    const y = get_random_number(max, qqq.height - size);

    const circle = document.createElement('div');
    circle.classList.add('circle');
    circle.style.background = get_random_color();
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    board.append(circle);
}

function get_random_number(min, max) {
    return Math.random() * (max - min) + min;
}

function get_random_color() {
    let index = Math.floor(Math.random() * colors.length);
    return colors[index];
}