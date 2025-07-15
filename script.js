
const datos = {
  "1": [
    { id: "HE59", nombre: "Estrategias de Redacción", prereqs: [], creditosReq: 0, creditos: 5 },
    { id: "HE61", nombre: "Ética y Ciudadanía", prereqs: [], creditosReq: 0, creditos: 5 },
    { id: "CE101", nombre: "Matemática", prereqs: [], creditosReq: 0, creditos: 5 },
    { id: "NP51", nombre: "Negocios Internacionales", prereqs: [], creditosReq: 0, creditos: 5 }
  ],
  "2": [
    { id: "AP124", nombre: "Fundamentos de la Gerencia", prereqs: [], creditosReq: 0, creditos: 5 },
    { id: "NP53", nombre: "Inteligencia Comercial Internacional", prereqs: [], creditosReq: 0, creditos: 5 },
    { id: "CE102", nombre: "Matemática Empresarial", prereqs: ["CE101"], creditosReq: 0, creditos: 5 },
    { id: "EL1", nombre: "Electivo I", prereqs: [], creditosReq: 0, creditos: 5 }
  ],
  "3": [
    { id: "HE60", nombre: "Estrategias de Comunicación", prereqs: ["HE59"], creditosReq: 0, creditos: 5 },
    { id: "NP96", nombre: "Comercio Internacional", prereqs: ["NP53"], creditosReq: 0, creditos: 5 },
    { id: "FP28", nombre: "Economía", prereqs: [], creditosReq: 0, creditos: 5 },
    { id: "MP71", nombre: "Marketing", prereqs: [], creditosReq: 0, creditos: 5 }
  ],
  "4": [
    { id: "CE141", nombre: "Estadística Descriptiva", prereqs: ["CE102"], creditosReq: 0, creditos: 5 },
    { id: "HE68", nombre: "Seminario de Investigación Académica", prereqs: [], creditosReq: 40, creditos: 5 },
    { id: "NP97", nombre: "Aduanas", prereqs: ["NP96"], creditosReq: 0, creditos: 5 },
    { id: "CP38", nombre: "Contabilidad", prereqs: [], creditosReq: 0, creditos: 5 }
  ],
  "5": [
    { id: "CE142", nombre: "Estadística Inferencial", prereqs: ["CE141"], creditosReq: 0, creditos: 5 },
    { id: "CP41", nombre: "Costos y Presupuestos", prereqs: ["CP38"], creditosReq: 0, creditos: 5 },
    { id: "NP52", nombre: "E-Business", prereqs: ["NP53"], creditosReq: 0, creditos: 5 },
    { id: "RH554", nombre: "Gestión del capital humano", prereqs: [], creditosReq: 60, creditos: 5 }
  ],
  "6": [
    { id: "NP57", nombre: "Costos, Precios y Cotizaciones Internacionales", prereqs: ["NP97"], creditosReq: 0, creditos: 5 },
    { id: "NP99", nombre: "Legislación del comercio internacional", prereqs: ["NP97"], creditosReq: 0, creditos: 5 },
    { id: "FP30", nombre: "Matemática Financiera", prereqs: ["CE102"], creditosReq: 0, creditos: 5 },
    { id: "CE105", nombre: "Métodos Cuantitativos para los Negocios", prereqs: ["CE141"], creditosReq: 0, creditos: 5 }
  ],
  "7": [
    { id: "FP32", nombre: "Finanzas Aplicadas", prereqs: ["FP30"], creditosReq: 0, creditos: 5 },
    { id: "NP56", nombre: "Integración Económica", prereqs: ["NP99"], creditosReq: 0, creditos: 5 },
    { id: "NP60", nombre: "International Supply Chain Management", prereqs: ["NP99"], creditosReq: 0, creditos: 5 },
    { id: "EL2", nombre: "Electivo II", prereqs: [], creditosReq: 90, creditos: 5 }
  ],
  "8": [
    { id: "FP35", nombre: "Evaluación de Proyectos", prereqs: ["FP32"], creditosReq: 0, creditos: 5 },
    { id: "NP59", nombre: "Operaciones Financieras Internacionales", prereqs: ["FP32"], creditosReq: 0, creditos: 5 },
    { id: "EL3", nombre: "Electivo III", prereqs: [], creditosReq: 0, creditos: 5 },
    { id: "EL4", nombre: "Electivo IV", prereqs: [], creditosReq: 120, creditos: 5 }
  ],
  "9": [
    { id: "NP98", nombre: "Desarrollo de Proyecto Internacional", prereqs: ["NP59", "FP35"], creditosReq: 0, creditos: 5 },
    { id: "AP127", nombre: "Dirección y Planificación Estratégica", prereqs: [], creditosReq: 140, creditos: 5 },
    { id: "AP423", nombre: "Proyecto de Investigación I", prereqs: [], creditosReq: 120, creditos: 5 },
    { id: "EL5", nombre: "Electivo V", prereqs: [], creditosReq: 0, creditos: 5 }
  ],
  "10": [
    { id: "AP425", nombre: "Proyecto de Investigación II", prereqs: ["AP423"], creditosReq: 0, creditos: 5 },
    { id: "AP432", nombre: "Estrategias de Negociación", prereqs: [], creditosReq: 140, creditos: 5 },
    { id: "NP62", nombre: "Gerencia Comercial Internacional", prereqs: ["NP98"], creditosReq: 0, creditos: 5 },
    { id: "EL6", nombre: "Electivo VI", prereqs: [], creditosReq: 0, creditos: 5 }
  ]
};

let completados = new Set(JSON.parse(localStorage.getItem("completados") || "[]"));

function totalCreditos() {
  let total = 0;
  for (let ciclo in datos) {
    for (let c of datos[ciclo]) {
      if (completados.has(c.id)) total += c.creditos;
    }
  }
  return total;
}

function puedeLlevar(curso) {
  if (totalCreditos() < curso.creditosReq) return false;
  return curso.prereqs.every(p => completados.has(p));
}

function render() {
  const cont = document.getElementById("tabla-ciclos");
  const progress = document.getElementById("progress-bar");
  cont.innerHTML = "";
  let total = 0;
  let completado = 0;

  for (let ciclo in datos) {
    const div = document.createElement("div");
    div.className = "ciclo";

    const titulo = document.createElement("h2");
    titulo.innerText = "Ciclo " + ciclo;
    div.appendChild(titulo);

    datos[ciclo].forEach(curso => {
      total += curso.creditos;
      const card = document.createElement("div");
      card.className = "card";
      card.innerText = curso.nombre;

      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.innerHTML = `<strong>Créditos:</strong> ${curso.creditos}<br><strong>Requiere:</strong> 
        ${curso.prereqs.length > 0 ? curso.prereqs.join(", ") : "Ninguno"}
        ${curso.creditosReq > 0 ? "<br>+" + curso.creditosReq + " créditos" : ""}`;

      card.appendChild(tooltip);

      if (completados.has(curso.id)) {
        card.classList.add("completado");
        completado += curso.creditos;
      } else if (puedeLlevar(curso)) {
        card.classList.add("disponible");
      } else {
        card.classList.add("bloqueado");
      }

      card.onclick = () => {
        if (completados.has(curso.id)) completados.delete(curso.id);
        else if (puedeLlevar(curso)) completados.add(curso.id);
        localStorage.setItem("completados", JSON.stringify([...completados]));
        render();
      };

      div.appendChild(card);
    });

    cont.appendChild(div);
  }

  const percent = Math.round((completado / total) * 100);
  progress.innerText = `Créditos completados: ${completado}/${total} (${percent}%)`;
}

render();
