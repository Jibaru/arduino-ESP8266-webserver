new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: {
      labels: [1,2,3,4,5,6,7,8,9,10],
      datasets: [{ 
          data: [86,114,23,106,356,111,133,221,783,2478],
          label: 'Volumen',
          borderColor: "#3e95cd",
          
        },
      ]
    },
    options: {
      
    }
});