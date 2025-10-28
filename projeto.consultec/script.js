class ConsultecApp {
    constructor() {
        this.doctors = [
            { 
                name: "Dr. Carlos Monteiro", 
                specialty: "Cardiologia", 
                city: "São Paulo, SP", 
                photo: "https://images.pexels.com/photos/5327914/pexels-photo-5327914.jpeg",
                experience: "15 anos",
                rating: 4.9
            },
            { 
                name: "Dra. Sofia Silva", 
                specialty: "Dermatologia", 
                city: "Rio de Janeiro, RJ", 
                photo: "https://images.pexels.com/photos/5069589/pexels-photo-5069589.jpeg",
                experience: "10 anos",
                rating: 4.8
            },
            { 
                name: "Dr. Roberto Lima", 
                specialty: "Ortopedia", 
                city: "Belo Horizonte, MG", 
                photo: "https://surgpli.com/wp-content/uploads/2023/03/AdobeStock_541200278.jpg",
                experience: "18 anos",
                rating: 4.9
            },
            { 
                name: "Dra. Juliana Faria", 
                specialty: "Pediatria", 
                city: "Porto Alegre, RS", 
                photo: "https://freerangestock.com/sample/146000/young-pediatrician-doctor-and-child-patient.jpg",
                experience: "11 anos",
                rating: 4.7
            }
        ];
        
        this.schedules = [];
        this.init();
    }

    init() {
        this.loadSchedules();
        this.renderDoctors(this.doctors);
        this.renderSchedules();
        this.populateDoctorsSelect();
        this.bindEvents();
        this.initAnimations();
       
        this.checkRedirectData();
        
        this.setMinDates();
    }

    renderDoctors(list) {
        const container = document.getElementById("doctorsList");
        if (!container) return;

        container.innerHTML = "";

        if (!list.length) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info fade-in">
                        <i class="fas fa-search me-2"></i>
                        Nenhum profissional encontrado com os filtros selecionados.
                    </div>
                </div>
            `;
            return;
        }

        list.forEach((doctor, index) => {
            const col = document.createElement("div");
            col.className = "col-md-6 col-lg-4 col-xl-3 fade-in";
            col.style.animationDelay = `${index * 0.1}s`;
            
            col.innerHTML = `
                <div class="card card-hover h-100 border-0 shadow-sm">
                    <img src="${doctor.photo}" 
                         class="card-img-top" 
                         alt="${doctor.name}"
                         style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title fw-bold text-dark">${doctor.name}</h5>
                        <p class="card-text text-primary fw-semibold mb-1">${doctor.specialty}</p>
                        <p class="card-text text-muted small mb-2">
                            <i class="fas fa-map-marker-alt me-1"></i>${doctor.city}
                        </p>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <span class="badge bg-light text-dark">
                                <i class="fas fa-star text-warning me-1"></i>${doctor.rating}
                            </span>
                            <span class="text-muted small">${doctor.experience}</span>
                        </div>
                        <button class="btn btn-primary w-100 btn-hover" 
                                onclick="app.scheduleWithDoctor('${doctor.name}')">
                            <i class="fas fa-calendar-plus me-2"></i>Agendar Consulta
                        </button>
                    </div>
                </div>
            `;
            
            container.appendChild(col);
        });
    }

    filterDoctors() {
        const specialty = document.getElementById("filterSpecialty")?.value.toLowerCase() || "";
        const city = document.getElementById("filterCity")?.value.toLowerCase() || "";

        const filtered = this.doctors.filter(doctor => {
            const matchesSpecialty = !specialty || doctor.specialty.toLowerCase().includes(specialty);
            const matchesCity = !city || doctor.city.toLowerCase().includes(city);
            return matchesSpecialty && matchesCity;
        });

        this.renderDoctors(filtered);
    }

    filterBySpecialty(specialty) {
        const filtered = specialty ? 
            this.doctors.filter(doctor => doctor.specialty === specialty) : 
            this.doctors;
        
        this.renderDoctors(filtered);
      
        const section = document.getElementById('profissionais');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    scheduleWithDoctor(doctorName) {
        const select = document.getElementById("doctor");
        if (select) {
            select.value = doctorName;
            
            const section = document.getElementById('marcar-consulta');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    addSchedule(event) {
        event.preventDefault();
        
        const date = document.getElementById("date").value;
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;

        if (!date || !startTime || !endTime) {
            this.showMessage("Por favor, preencha todos os campos.", "error");
            return;
        }

        if (startTime >= endTime) {
            this.showMessage("O horário inicial deve ser anterior ao horário final.", "error");
            return;
        }

        this.schedules.push({ date, startTime, endTime });
        this.saveSchedules();
        this.renderSchedules();
      
        event.target.reset();
        this.showMessage("Horário cadastrado com sucesso!", "success");
    }

    renderSchedules() {
        const container = document.getElementById("scheduleList");
        if (!container) return;

        if (!this.schedules.length) {
            container.innerHTML = `
                <div class="alert alert-info fade-in">
                    <i class="fas fa-info-circle me-2"></i>
                    Nenhum horário cadastrado ainda.
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <h5 class="fw-bold mb-3">Horários Cadastrados:</h5>
            <div class="list-group">
                ${this.schedules.map((schedule, index) => `
                    <div class="list-group-item d-flex justify-content-between align-items-center fade-in">
                        <div>
                            <strong>${schedule.date}</strong><br>
                            <small class="text-muted">${schedule.startTime} às ${schedule.endTime}</small>
                        </div>
                        <button class="btn btn-sm btn-outline-danger" onclick="app.removeSchedule(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
    }

    removeSchedule(index) {
        this.schedules.splice(index, 1);
        this.saveSchedules();
        this.renderSchedules();
        this.showMessage("Horário removido com sucesso!", "success");
    }

    updateAvailableTimes() {
        const selectedDate = document.getElementById("appointmentDate")?.value;
        const timeSelect = document.getElementById("appointmentTime");
        
        if (!timeSelect || !selectedDate) return;

        timeSelect.innerHTML = '<option value="">Selecione um horário disponível</option>';

        const available = this.schedules.filter(schedule => schedule.date === selectedDate);
        
        if (!available.length) {
            timeSelect.innerHTML += '<option disabled>Nenhum horário disponível para esta data</option>';
            return;
        }

        available.forEach(schedule => {
            const option = document.createElement("option");
            option.value = schedule.startTime;
            option.textContent = `${schedule.startTime} às ${schedule.endTime}`;
            timeSelect.appendChild(option);
        });
    }

    markAppointment(event) {
        event.preventDefault();
        
        const doctor = document.getElementById("doctor")?.value;
        const date = document.getElementById("appointmentDate")?.value;
        const time = document.getElementById("appointmentTime")?.value;

        if (!doctor || !date || !time) {
            this.showMessage("Por favor, preencha todos os campos.", "error");
            return;
        }

        const resultContainer = document.getElementById("appointmentResult");
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div class="alert alert-success fade-in">
                    <i class="fas fa-check-circle me-2"></i>
                    Consulta marcada com <strong>${doctor}</strong> no dia 
                    <strong>${date}</strong> às <strong>${time}</strong>.
                </div>
            `;
        }

        event.target.reset();
        this.showMessage("Consulta marcada com sucesso!", "success");
    }

    populateDoctorsSelect() {
        const select = document.getElementById("doctor");
        if (!select) return;

        select.innerHTML = '<option value="">Selecione um profissional</option>' +
            this.doctors.map(doctor => 
                `<option value="${doctor.name}">${doctor.name} - ${doctor.specialty}</option>`
            ).join("");
    }

    saveSchedules() {
        try {
            localStorage.setItem("consultec_schedules", JSON.stringify(this.schedules));
        } catch (error) {
            console.warn("Não foi possível salvar no localStorage:", error);
        }
    }

    loadSchedules() {
        try {
            const saved = localStorage.getItem("consultec_schedules");
            this.schedules = saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.warn("Não foi possível carregar do localStorage:", error);
            this.schedules = [];
        }
    }

    showMessage(message, type = "success") {
        const existingAlerts = document.querySelectorAll('.alert-custom');
        existingAlerts.forEach(alert => alert.remove());

        // Criar novo alerta
        const alert = document.createElement("div");
        alert.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-custom`;
        alert.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'check-circle'} me-2"></i>
            ${message}
        `;

        document.body.appendChild(alert);
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.opacity = '0';
                alert.style.transition = 'opacity 0.5s ease';
                setTimeout(() => alert.remove(), 500);
            }
        }, 4000);
    }

    checkRedirectData() {
        const selectedDoctor = localStorage.getItem('selectedDoctor');
        const selectedSpecialty = localStorage.getItem('selectedSpecialty');
        
        if (selectedDoctor && selectedSpecialty) {
            const select = document.getElementById("doctor");
            if (select) {
                select.value = selectedDoctor;
         
                const section = document.getElementById('marcar-consulta');
                if (section) {
                    setTimeout(() => {
                        section.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                }
            }

            localStorage.removeItem('selectedDoctor');
            localStorage.removeItem('selectedSpecialty');
        }
    }

    setMinDates() {
        const today = new Date().toISOString().split('T')[0];
        
        const dateInputs = document.querySelectorAll('input[type="date"]');
        dateInputs.forEach(input => {
            input.min = today;
        });
    }

    initAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.card, .specialty-card').forEach(el => {
            observer.observe(el);
        });
    }

    bindEvents() {
        const scheduleForm = document.getElementById("scheduleForm");
        if (scheduleForm) {
            scheduleForm.addEventListener("submit", (e) => this.addSchedule(e));
        }

        const appointmentDate = document.getElementById("appointmentDate");
        if (appointmentDate) {
            appointmentDate.addEventListener("change", () => this.updateAvailableTimes());
        }

        const appointmentForm = document.getElementById("appointmentForm");
        if (appointmentForm) {
            appointmentForm.addEventListener("submit", (e) => this.markAppointment(e));
        }

        const searchButton = document.querySelector(".search-box button");
        if (searchButton) {
            searchButton.addEventListener("click", () => this.filterDoctors());
        }

        const searchInputs = document.querySelectorAll('#filterSpecialty, #filterCity');
        searchInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.filterDoctors();
                }
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.app = new ConsultecApp();
});

function filterDoctors() {
    if (window.app) window.app.filterDoctors();
}

function filterBySpecialty(specialty) {
    if (window.app) window.app.filterBySpecialty(specialty);
}

function scheduleWithDoctor(doctorName) {
    if (window.app) window.app.scheduleWithDoctor(doctorName);
}
