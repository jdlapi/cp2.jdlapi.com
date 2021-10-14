document.getElementById("name-submit").addEventListener("click", function(event) {
  const euroToDollarExchangeRate = 1.16;
  event.preventDefault();
  const name = document.getElementById("name-input").value;
  if (name === "")
    return;
  const type = document.getElementById("type").value;
  const subtype = document.getElementById("subtype").value;
  console.log(name);
  console.log(type);
  console.log(subtype);

  let url = "https://api.pokemontcg.io/v2/cards?q=name:" + name;
  if (type != "none" && subtype != "none") {
    url += " (subtypes:" + subtype + " AND types:" + type + ")";
  }
  else if (type != "none" && subtype == "none") {
    url += " (types:" + type + ")";
  }
  else if (type == "none" && subtype != "none") {
    url += "  (subtypes:" + subtype + ")";
  }

  console.log(url);

fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    let results = "";
          results += '<p class="results-count"><strong>Results:</strong> ' + json.count + "</h2>";
          for (let i=0; i < json.count; i++) {
    	       results += '<div class="name-card">';
             results += '<div class="name-card-info">'
             results += '<p>' + "<strong>Name:</strong> " + json.data[i].name + '</p>';
             results += '<p>' + "<strong>ID:</strong> " + json.data[i].id + '</p>';
             results += '<p>' + "<strong>Rarity:</strong> " + json.data[i].rarity + '</p>';
             results += '<p>' + "<strong>Set:</strong> " + json.data[i].set.name + " -- " + json.data[i].set.series + '</p>';
             results += '<p>' + "<strong>Market value:</strong> ";
             if (json.data[i].hasOwnProperty('cardmarket') && json.data[i].cardmarket.prices.averageSellPrice !== null) {
                 results += "$" + (json.data[i].cardmarket.prices.averageSellPrice * euroToDollarExchangeRate).toFixed(2) + '</p>';
             }
             else {
               results += "No recent data</p>";
             }

             results += '</div>';
             results += '<div class="name-image-conatainer"><img class="name-image" src="' + json.data[i].images.small + '"/></div>';
             results += '</div>';
          }
          document.getElementById("name-results").innerHTML = results;
  });
});
