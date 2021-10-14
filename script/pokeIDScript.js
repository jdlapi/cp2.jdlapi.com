document.getElementById("id-submit").addEventListener("click", function(event) {
  const euroToDollarExchangeRate = 1.16;
  event.preventDefault();
  const id = document.getElementById("id-input").value;
  if (id === "")
    return;
  console.log(id);

  let url = "https://api.pokemontcg.io/v2/cards/" + id;

  console.log(url);

fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);
    let results = "";
    results += '<p class="results-count"><strong>Card found:</strong></h2>';
    results += '<div class="id-card">';
    results += '<div class="id-card-info">'
    results += '<p>' + "<strong>Name:</strong> " + json.data.name + '</p>';
    results += '<p>' + "<strong>ID:</strong> " + json.data.id + '</p>';
    results += '<p>' + "<strong>Rarity:</strong> " + json.data.rarity + '</p>';
    results += '<p>' + "<strong>Set:</strong> " + json.data.set.name + " -- " + json.data.set.series + '</p>';
    results += '<p>' + "<strong>Market value:</strong> ";
    if (json.data.hasOwnProperty('cardmarket') && json.data.cardmarket.prices.averageSellPrice !== null) {
      results += "$" + (json.data.cardmarket.prices.averageSellPrice * euroToDollarExchangeRate).toFixed(2) + '</p>';
    }
    else {
      results += "No recent data</p>";
    }
    results += '</div>';
    results += '<div class="id-image-conatainer"><img class="id-image" src="' + json.data.images.small + '"/></div>';
    results += '</div>';
    document.getElementById("id-results").innerHTML = results;
  });
});
