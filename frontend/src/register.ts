import './styles/style.scss';
import { initRegister } from './utils/registerUtil';

document.getElementById("registerForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    initRegister();
})