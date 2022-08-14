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

   
