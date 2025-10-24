document.addEventListener("DOMContentLoaded", () => {
  const app = {
    doctors: [
      { name: "Dr. Carlos Monteiro", specialty: "Cardiologia", city: "São Paulo, SP", photo: "https://randomuser.me/api/portraits/men/10.jpg" },
      { name: "Dra. Sofia Silva", specialty: "Dermatologia", city: "Rio de Janeiro, RJ", photo: "https://randomuser.me/api/portraits/women/20.jpg" },
      { name: "Dr. Roberto Lima", specialty: "Ortopedia", city: "Belo Horizonte, MG", photo: "https://randomuser.me/api/portraits/men/30.jpg" },
      { name: "Dra. Juliana Faria", specialty: "Pediatria", city: "Porto Alegre, RS", photo: "https://randomuser.me/api/portraits/women/40.jpg" }
    ],
    schedules: [],

    init() {
      this.loadSchedules();
      this.renderDoctors(this.doctors);
      this.renderSchedules();
      this.populateDoctorsSelect();
      this.bindEvents();
      this.initButtonEffects();
    },

    renderDoctors(list) {
      const container = document.getElementById("doctorsList");
      container.innerHTML = "";
      if (!list.length) {
        container.innerHTML = "<p>Nenhum profissional encontrado.</p>";
        return;
      }

      list.forEach((doc, i) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.opacity = 0;
        card.style.transition = "opacity 0.4s ease";
        card.innerHTML = `
          <img src="${doc.photo}" alt="${doc.name}" />
          <h3>${doc.name}</h3>
          <p>${doc.specialty}</p>
          <p>${doc.city}</p>
        `;
        container.appendChild(card);
        setTimeout(() => (card.style.opacity = 1), i * 120);
      });
    },

    filterDoctors() {
      const specialty = document.getElementById("filterSpecialty").value.toLowerCase();
      const city = document.getElementById("filterCity").value.toLowerCase();

      const list = this.doctors.filter(doc =>
        (!specialty || doc.specialty.toLowerCase() === specialty) &&
        (!city || doc.city.toLowerCase().includes(city))
      );
      this.renderDoctors(list);
    },

    addSchedule(e) {
      e.preventDefault();
      const date = document.getElementById("date").value;
      const startTime = document.getElementById("startTime").value;
      const endTime = document.getElementById("endTime").value;

      if (startTime >= endTime) {
        app.showMessage("O horário inicial deve ser anterior ao final.", "error");
        return;
      }

      app.schedules.push({ date, startTime, endTime });
      app.saveSchedules();
      app.renderSchedules();
      e.target.reset();
      app.showMessage("Horário cadastrado com sucesso!", "success");
    },

    renderSchedules() {
      const container = document.getElementById("scheduleList");
      if (!this.schedules.length) {
        container.innerHTML = "<p>Nenhum horário cadastrado.</p>";
        return;
      }
      container.innerHTML = `
        <h3>Horários Cadastrados:</h3>
        <ul>
          ${this.schedules
            .map(sch => `<li>${sch.date} - ${sch.startTime} às ${sch.endTime}</li>`)
            .join("")}
        </ul>`;
    },

    updateAvailableTimes() {
      const selectedDate = document.getElementById("appointmentDate").value;
      const timeSelect = document.getElementById("appointmentTime");
      timeSelect.innerHTML = "<option value=''>Selecione um horário</option>";

      const available = this.schedules.filter(sch => sch.date === selectedDate);
      if (!available.length) {
        timeSelect.innerHTML += "<option disabled>Sem horários disponíveis</option>";
        return;
      }

      available.forEach(sch => {
        const option = document.createElement("option");
        option.value = sch.startTime;
        option.textContent = `${sch.startTime} às ${sch.endTime}`;
        timeSelect.appendChild(option);
      });
    },

    markAppointment(e) {
      e.preventDefault();
      const doctor = document.getElementById("doctor").value;
      const date = document.getElementById("appointmentDate").value;
      const time = document.getElementById("appointmentTime").value;

      if (!doctor || !date || !time) {
        app.showMessage("Por favor, preencha todos os campos.", "error");
        return;
      }

      document.getElementById("appointmentResult").innerHTML = `
        <p>Consulta marcada com <strong>${doctor}</strong> no dia <strong>${date}</strong> às <strong>${time}</strong>.</p>
      `;
      e.target.reset();
      document.getElementById("appointmentTime").innerHTML = "<option value=''>Selecione um horário</option>";
      app.showMessage("Consulta marcada com sucesso!", "success");
    },

    populateDoctorsSelect() {
      const select = document.getElementById("doctor");
      select.innerHTML = '<option value="">Selecione</option>' +
        this.doctors.map(doc => `<option value="${doc.name}">${doc.name} - ${doc.specialty}</option>`).join("");
    },

    saveSchedules() {
      localStorage.setItem("schedules", JSON.stringify(this.schedules));
    },

    loadSchedules() {
      const saved = localStorage.getItem("schedules");
      if (saved) this.schedules = JSON.parse(saved);
    },

    showMessage(msg, type = "success") {
      const box = document.createElement("div");
      box.className = `alert ${type}`;
      box.textContent = msg;
      document.body.appendChild(box);

      requestAnimationFrame(() => (box.style.opacity = 1));

      setTimeout(() => {
        box.style.opacity = 0;
        setTimeout(() => box.remove(), 500);
      }, 3000);
    },

    initButtonEffects() {
      document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("mousedown", () => (btn.style.transform = "scale(0.95)"));
        btn.addEventListener("mouseup", () => (btn.style.transform = "scale(1)"));
        btn.addEventListener("mouseleave", () => (btn.style.transform = "scale(1)"));
      });
    },
    bindEvents() {
      document.getElementById("scheduleForm").addEventListener("submit", this.addSchedule);
      document.getElementById("appointmentDate").addEventListener("change", this.updateAvailableTimes.bind(this));
      document.getElementById("appointmentForm").addEventListener("submit", this.markAppointment);
      document.querySelector(".search-box button").addEventListener("click", this.filterDoctors.bind(this));
    }
  };

  app.init();
});
