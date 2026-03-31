let expeditions = [];
let selectedMission = null;
const assignedCrew = [];
let flightSeconds = 0;

const missionContainer = document.getElementById('missions-container');
const tripsContainer = document.getElementById('trips-container');
const candidatesList = document.getElementById('candidates-list');
const nameInput = document.getElementById('crew-name');
const roleInput = document.getElementById('crew-role');
const crewForm = document.getElementById('crew-form');
const assignedCrewList = document.getElementById('assigned-crew-list');
const formMessage = document.getElementById('form-message');
const startMissionBtn = document.getElementById('start-mission-btn');
const missionStatus = document.getElementById('mission-status');
const timerElement = document.getElementById('flight-timer');
const crewHeader = document.getElementById('crew-managment');

async function initApp() {
    try {
        const response = await fetch('data.json');
        
        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        expeditions = data.expeditions;
        const availableCandidates = data.availableCandidates;

        renderMissions();
        renderCandidates(availableCandidates);
        setupTimer();
        setupStaticEventListeners();
    } catch (error) {
        console.error('Помилка завантаження даних:', error);
        if (missionContainer) {
            missionContainer.innerHTML = '<p style="color:red;">Помилка завантаження місій з сервера.</p>';
        }
    }
}

function renderMissions() {
    let missionsHTML = '';

    for (let i = 0; i < expeditions.length; i++) {
        const mission = expeditions[i];
        let tasksHTML = '';
        for (let j = 0; j < mission.tasks.length; j++) {
            tasksHTML += `<li>${mission.tasks[j]}</li>`;
        }

        let badgeHTML = '';
        if (mission.destination === 'Mars') {
            badgeHTML = '<span style="color: #ff9d00; font-size: 0.8em;">[Пріоритетна ціль]</span>';
        } else {
            badgeHTML = '<span style="color: gray; font-size: 0.8em;">[Стандартна місія]</span>';
        }

        missionsHTML += `
            <article class="mission" id="mission-card-${mission.id}">
                <h3>${mission.title} ${badgeHTML}</h3>
                <p class="mission-status" id="status-${mission.id}">Статус: Очікує</p>
                <div class="mission-details" id="details-${mission.id}" style="display: none;">
                    <p><strong>Опис:</strong> ${mission.description}</p>
                    <p><strong>Завдання:</strong></p>
                    <ol>
                        ${tasksHTML}
                    </ol>
                </div>

                <button class="btn toggle-btn" data-id="${mission.id}">Показати деталі</button>
                <button class="btn select-btn" data-id="${mission.id}">Обрати місію</button>
            </article>
        `;
    }

    missionContainer.innerHTML = missionsHTML;
    attachMissionEventListeners();
}

function attachMissionEventListeners() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const selectButtons = document.querySelectorAll('.select-btn');

    for (let i = 0; i < toggleButtons.length; i++) {
        toggleButtons[i].addEventListener('click', function() {
            const missionId = this.getAttribute('data-id');
            const detailsDiv = document.getElementById(`details-${missionId}`);

            if (detailsDiv.style.display === 'none') {
                detailsDiv.style.display = 'block';
                this.textContent = 'Сховати деталі';
            } else {
                detailsDiv.style.display = 'none';
                this.textContent = 'Показати деталі';
            }
        });
    }

    for (let i = 0; i < selectButtons.length; i++) {
        selectButtons[i].addEventListener('click', function() {
            const missionId = parseInt(this.getAttribute('data-id'));
            
            selectedMission = expeditions.find(mission => mission.id === missionId);

            for (let j = 0; j < selectButtons.length; j++) {
                selectButtons[j].textContent = 'Обрати місію';
                selectButtons[j].disabled = false;
                selectButtons[j].style.opacity = '1';
            }

            this.textContent = 'Обрано';
            this.disabled = true;
            this.style.opacity = '0.5';
            
            if (missionStatus) {
                missionStatus.textContent = '';
                missionStatus.classList.remove('error', 'success');
            }

            crewHeader.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
}

function renderCandidates(availableCandidates) {
    if (!candidatesList) return;
    
    for (let i = 0; i < availableCandidates.length; i++) {
        const candidate = availableCandidates[i];
        const listItem = document.createElement('li');

        listItem.textContent = `${candidate.name} - ${candidate.role}`;
        listItem.classList.add('candidate-item');

        listItem.addEventListener('click', function() {
            nameInput.value = candidate.name;
            roleInput.value = candidate.role;
        });

        candidatesList.appendChild(listItem);
    }
}

function setupTimer() {
    function formatTime(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const paddedHours = String(hours).padStart(2, '0');
        const paddedMinutes = String(minutes).padStart(2, '0');
        const paddedSeconds = String(seconds).padStart(2, '0');

        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }

    if (timerElement) {
        setInterval(function() {
            flightSeconds++;
            timerElement.textContent = formatTime(flightSeconds);
        }, 1000);
    }
}

function setupStaticEventListeners() {
    if (crewForm) {
        crewForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const nameValue = nameInput.value.trim();
            const roleValue = roleInput.value.trim();

            formMessage.classList.remove('error', 'success');

            if (nameValue === "" || roleValue === "") {
                formMessage.textContent = "Помилка: Заповніть ім'я та спеціалізацію";
                formMessage.classList.add('error');
            } else {
                formMessage.textContent = "";

                assignedCrew.push( {name: nameValue, role: roleValue });

                const crewMemberItem = document.createElement('li');
                crewMemberItem.innerHTML = `<strong>${nameValue}</strong> — <em>${roleValue}</em>`;
                assignedCrewList.appendChild(crewMemberItem);

                crewForm.reset();
            }
        });
    }

    if (startMissionBtn) {
        startMissionBtn.addEventListener('click', function() {
            missionStatus.classList.remove('error', 'success');

            if (!selectedMission) {
                missionStatus.textContent = "Увага: Спочатку оберіть місію зі списку експедицій вище.";
                missionStatus.classList.add('error');
                return;
            }

            if (assignedCrew.length === 0) {
                missionStatus.textContent = "Увага: Неможливо почати місію без екіпажу. Додайте мінімум одного спеціаліста.";
                missionStatus.classList.add('error');
                return;
            }

            let crewListHTML = '';
            for (let i = 0; i < assignedCrew.length; i++) {
                crewListHTML += `<li>${assignedCrew[i].name} — <em>${assignedCrew[i].role}</em></li>`;
            }

            const currentDate = new Date().toLocaleDateString();
            const newTripHTML = `
                <article class="trip">
                    <h3>${selectedMission.title}</h3>
                    <ul>
                        <li><strong>Статус:</strong> В процесі</li>
                        <li><strong>Дата початку:</strong> ${currentDate}</li>
                        <li><strong>Мета:</strong> ${selectedMission.description}</li>
                        <li><strong>Склад екіпажу:</strong>
                            <ul style="margin-top: 5px;">
                                ${crewListHTML}
                            </ul>
                        </li>
                    </ul>
                </article>
            `;

            tripsContainer.insertAdjacentHTML('afterbegin', newTripHTML);

            missionStatus.textContent = `Місія успішно розпочата! Екіпаж вирушив.`;
            missionStatus.classList.add('success');

            assignedCrew.length = 0; 
            assignedCrewList.innerHTML = '';
            selectedMission = null;
            
            const selectBtns = document.querySelectorAll('.select-btn');
            for (let i = 0; i < selectBtns.length; i++) {
                selectBtns[i].textContent = 'Обрати місію';
                selectBtns[i].disabled = false;
                selectBtns[i].style.opacity = '1';
            }
        });
    }
}

initApp();