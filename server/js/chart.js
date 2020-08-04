var chart = new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: {
      labels: [0],
      datasets: [{ 
          data: [0],
          label: 'Volumen',
          borderColor: "#3e95cd",
          
        },
      ]
    },
    options: {
      
    }
});