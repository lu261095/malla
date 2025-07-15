// script.js completo con toda la malla EPE de Negocios Internacionales (UPC)

const datos = {
  "1": [
    { id: "HE59", nombre: "Estrategias de Redacción", prereqs: [], creditosReq: 0 },
    { id: "HE61", nombre: "Ética y Ciudadanía", prereqs: [], creditosReq: 0 },
    { id: "CE101", nombre: "Matemática", prereqs: [], creditosReq: 0 },
    { id: "NP51", nombre: "Negocios Internacionales", prereqs: [], creditosReq: 0 }
  ],
  "2": [
    { id: "AP124", nombre: "Fundamentos de la Gerencia", prereqs: [], creditosReq: 0 },
    { id: "NP53", nombre: "Inteligencia Comercial Internacional", prereqs: [], creditosReq: 0 },
    { id: "CE102", nombre: "Matemática Empresarial", prereqs: ["CE101"], creditosReq: 0 },
    { id: "EL1", nombre: "Electivo I", prereqs: [], creditosReq: 0 }
  ],
  "3": [
    { id: "HE60", nombre: "Estrategias de Comunicación", prereqs: ["HE59"], creditosReq: 0 },
    { id: "NP96", nombre: "Comercio Internacional", prereqs: ["NP53"], creditosReq: 0 },
    { id: "FP28", nombre: "Economía", prereqs: [], creditosReq: 0 },
    { id: "MP71", nombre: "Marketing", prereqs: [], creditosReq: 0 }
  ],
  "4": [
    { id: "CE141", nombre: "Estadística Descriptiva", prereqs: ["CE102"], creditosReq: 0 },
    { id: "HE68", nombre: "Seminario de Investigación Académica", prereqs: [], creditosReq: 40 },
    { id: "NP97", nombre: "Aduanas", prereqs: ["NP96"], creditosReq: 0 },
    { id: "CP38", nombre: "Contabilidad", prereqs: [], creditosReq: 0 }
  ],
  "5": [
    { id: "CE142", nombre: "Estadística Inferencial", prereqs: ["CE141"], creditosReq: 0 },
    { id: "CP41", nombre: "Costos y Presupuestos", prereqs: ["CP38"], creditosReq: 0 },
    { id: "NP52", nombre: "E-Business", prereqs: ["NP53"], creditosReq: 0 },
    { id: "RH554", nombre: "Gestión del capital humano", prereqs: [], creditosReq: 60 }
  ],
  "6": [
    { id: "NP57", nombre: "Costos, Precios y Cotizaciones Internacionales", prereqs: ["NP97"], creditosReq: 0 },
    { id: "NP99", nombre: "Legislación del comercio internacional", prereqs: ["NP97"], creditosReq: 0 },
    { id: "FP30", nombre: "Matemática Financiera", prereqs: ["CE102"], creditosReq: 0 },
    { id: "CE105", nombre: "Métodos Cuantitativos para los Negocios", prereqs: ["CE141"], creditosReq: 0 }
  ],
  "7": [
    { id: "FP32", nombre: "Finanzas Aplicadas", prereqs: ["FP30"], creditosReq: 0 },
    { id: "NP56", nombre: "Integración Económica", prereqs: ["NP99"], creditosReq: 0 },
    { id: "NP60", nombre: "International Supply Chain Management", prereqs: ["NP99"], creditosReq: 0 },
    { id: "EL2", nombre: "Electivo II", prereqs: [], creditosReq: 90 }
  ],
  "8": [
    { id: "FP35", nombre: "Evaluación de Proyectos", prereqs: ["FP32"], creditosReq: 0 },
    { id: "NP59", nombre: "Operaciones Financieras Internacionales", prereqs: ["FP32"], creditosReq: 0 },
    { id: "EL3", nombre: "Electivo III", prereqs: [], creditosReq: 0 },
    { id: "EL4", nombre: "Electivo IV", prereqs: [], creditosReq: 120 }
  ],
  "9": [
    { id: "NP98", nombre: "Desarrollo de Proyecto Internacional", prereqs: ["NP59", "FP35"], creditosReq: 0 },
    { id: "AP127", nombre: "Dirección y Planificación Estratégica", prereqs: [], creditosReq: 140 },
    { id: "AP423", nombre: "Proyecto de Investigación I", prereqs: [], creditosReq: 120 },
    { id: "EL5", nombre: "Electivo V", prereqs: [], creditosReq: 0 }
  ],
  "10": [
    { id: "AP425", nombre: "Proyecto de Investigación II", prereqs: ["AP423"], creditosReq: 0 },
    { id: "AP432", nombre: "Estrategias de Negociación", prereqs: [], creditosReq: 140 },
    { id: "NP62", nombre: "Gerencia Comercial Internacional", prereqs: ["NP98"], creditosReq: 0 },
    { id: "EL6", nombre: "Electivo VI", prereqs: [], creditosReq: 0 }
  ]
};

let completados = new Set(JSON.parse(localStorage.getItem("completados") || "[]"));

function totalCreditos() {
  let total = 0;
  for (let ciclo in datos) {
    for (let curso of datos[ciclo]) {
      if (completados.has(curso.id)) total += 5;
    }
  }
  return total;
}

function puedeLlevar(curso) {
  if (totalCreditos() < curso.creditosReq) return false;
  for (let pre of curso.prereqs) if (!completados.has(pre)) return false;
  return true;
}

function render() {
  const cont = document.getElementById("tabla-ciclos");
  cont.innerHTML = "";
  for (let ciclo in datos) {
    const table = document.createElement("table");
    const header = document.createElement("tr");
    const th = document.createElement("th");
    th.colSpan = 3;
    th.innerText = "Ciclo " + ciclo;
    header.appendChild(th);
    table.appendChild(header);

    datos[ciclo].forEach(c => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.id = c.id;
      td.innerText = c.nombre;

      if (completados.has(c.id)) td.className = "completado";
      else if (puedeLlevar(c)) td.className = "disponible";
      else td.className = "bloqueado";

      td.onclick = () => {
        if (completados.has(c.id)) completados.delete(c.id);
        else if (puedeLlevar(c)) completados.add(c.id);
        localStorage.setItem("completados", JSON.stringify([...completados]));
        render();
      };

      tr.appendChild(td);
      table.appendChild(tr);
    });

    cont.appendChild(table);
  }
}

render();
