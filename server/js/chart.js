var chartEntrada = new Chart(document.getElementById("chart-entrada"), {
    type: 'line',
    data: {
      labels: [0],
      datasets: [{ 
          data: [0],
          label: 'Volumen entrada',
          borderColor: "#3e95cd",
          
        },
      ]
    },
    options: {
      
    }
});

var chartSalida = new Chart(document.getElementById("chart-salida"), {
  type: 'line',
  data: {
    labels: [0],
    datasets: [{ 
        data: [0],
        label: 'Volumen salida',
        borderColor: "#3e95cd",
        
      },
    ]
  },
  options: {
    
  }
});