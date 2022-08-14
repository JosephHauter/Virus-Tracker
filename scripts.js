fetch('https://unpkg.com/us-atlas/states-10m.json').then((r) => r.json()).then((us) => {
  const nation = ChartGeo.topojson.feature(us, us.objects.nation).features[0];
  const states = ChartGeo.topojson.feature(us, us.objects.states).features;

  const chart = new Chart(document.getElementById("canvas").getContext("2d"), {
    type: 'choropleth',
    data: {
      labels: states.map((d) => d.properties.name),
      datasets: [{
        label: 'States',
        outline: nation,
        data: states.map((d) => ({feature: d, value: Math.random() * 100})),
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
      },
      scales: {
        xy: {
          projection: 'albersUsa'
        },
        color: {
          quantize: 5,
          legend: {
            position: 'bottom-right',
            align: 'bottom'
          },
        }
      },
    }
  });
});
console.log("hello");

        chartIt();

        async function chartIt() {
            const data = await getData();
            const ctx = document.getElementById('chart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',

                data: {
                    labels: data.label,
                        datasets: [{
                            label: 'Monkeypox Cases by Location',
                            data: data.ycount,
                            backgroundColor: [
                            'rgb(69, 123, 157)', 
                            ],
                            hoverOffset: 4
                        }]
                },

            });
        }



            getData();
            async function getData() {
                const label = [];
                const ycount = [];
                const response = await fetch('monkeypox.csv');
                const data = await response.text();


            const rows = data.split('\n').slice(1);
            rows.forEach(elt => {
                const cols = elt.split(",");
                const location = cols[0];
                label.push(location);
                const cases = cols[1];
                ycount.push(cases);
                //parseFloat : turn str into #
                console.log(location, cases);
            });
            return{label, ycount};
            //returning an obj with x and y
            }

    chartItCovid();
        
        async function chartItCovid() {
            const data = await getData();
            const ctx = document.getElementById('chart').getContext('2d');
            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.statelabel ,
                    datasets: [
                        {
                        label: 'Total Covid Cases in the United States',
                        data: data.totalcase,
                        backgroundColor:'rgba(158, 42, 43)',
                       
                        borderWidth: 1
                    }]
                },
                
            });
        }



            getcovidData();
            async function getcovidData() {
                const statelabel = [];
                const totalcase = [];
                const response = await fetch('covid.csv');
                const data = await response.text();
            

            const rows = data.split('\n').slice(1);
            rows.forEach(elt => {
                const columns = elt.split(",");
                const state = columns[1];
                statelabel.push(state);
                const cases = columns[2];
                totalcase.push(cases);
                //parseFloat : turn str into #
                console.log(state, cases);
            });
            return{statelabel, totalcase};
            //returning an obj with x and y
            }
