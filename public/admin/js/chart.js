/*declare chart options*/
const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];
  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

/*wire the options together*/
const lineConfig = {
    type: 'line',
    data,
    options: {}
  };

  const barConfig = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };

  const radarConfig = {
    type: 'radar',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3
        }
      }
    },
  };

  const pieConfig = {
    type: 'pie',
    data: data,
  };


/*create charts*/
var myLineChart = new Chart(
    document.getElementById('myLineChart'),
    lineConfig
  );

  var myBarChart = new Chart(
    document.getElementById('myBarChart'),
    barConfig
  );

  var myRadarChart = new Chart(
    document.getElementById('myRadarChart'),
    radarConfig
  );

  var myPieChart = new Chart(
    document.getElementById('myPieChart'),
    pieConfig
  );