document
  .getElementById("generatorForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const lienClient = document.getElementById("lienClient").value.trim();
    const positions = Array.from(
      document.getElementById("positions").selectedOptions
    ).map((option) => option.value);

    // Validation basique du lien
    if (!lienClient.match(/^https?:\/\/.+/)) {
      alert(
        "Merci de saisir une URL valide commençant par http:// ou https://"
      );
      return;
    }

    if (positions.length === 0) {
      alert("Veuillez sélectionner au moins une position.");
      return;
    }

    const lienEncode = encodeURIComponent(lienClient);
    let resultHtml = "<h2>Liens générés :</h2>";

    // Slugs des positions WordPress
    const positionSlugs = {
      bannierehaute: "banniere-haute",
      article1: "article-1",
      article2: "article-2",
      footer: "footer",
    };

    positions.forEach((position) => {
      const slug = positionSlugs[position] || position;
      const urlRedirection = `https://preprod.dentaire365.fr/${slug}?redirect=${lienEncode}`;
      resultHtml += `<div class="generated-link"><strong>${position}</strong> : <a href="${urlRedirection}" target="_blank">${urlRedirection}</a></div>`;
    });

    document.getElementById("result").innerHTML = resultHtml;
  });
