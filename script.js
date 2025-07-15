// Ejemplo mínimo de datos (completa según tu PDF real)
const datos = {
  "1": [
    { id: "M1", nombre: "Matemática Básica", prereqs: [], creditosReq: 0 },
    { id: "F1", nombre: "Fundamentos de Marketing", prereqs: [], creditosReq: 0 }
  ],
  "2": [
    { id: "E1", nombre: "Estadística Descriptiva", prereqs: ["M1"], creditosReq: 0 },
    { id: "C1", nombre: "Fundamentos de Contabilidad", prereqs: [], creditosReq: 0 }
  ]
};

let completados = new Set(JSON.parse(localStorage.getItem("completados") || "[]"));

function canTake(curso) {
  for (let p of curso.prereqs) if (!completados.has(p)) return false;
  return true;
}

function render() {
  const cont = document.getElementById("tabla-ciclos");
  cont.innerHTML = "";
  for (let ciclo in datos) {
    const table = document.createElement("table");
    const header = document.createElement("th");
    header.colSpan = 3;
    header.innerText = "Ciclo " + ciclo;
    table.appendChild(header);
    datos[ciclo].forEach(c => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.id = c.id;
      td.innerText = c.nombre;
      if (completados.has(c.id)) td.className = "completado";
      else if (canTake(c)) td.className = "disponible";
      else td.className = "bloqueado";
      td.onclick = () => {
        if (completados.has(c.id)) completados.delete(c.id);
        else if (canTake(c)) completados.add(c.id);
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
