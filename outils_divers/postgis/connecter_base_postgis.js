/*
Fonction permettant d'afficher seulement des communes de la bbox
*/
function placesAvecBasePostGis(echelle,pas){
  //Définition des limites avec un pas pour se donner une marge (en degrés)
  var bounds = mapFranceMetropolitaine.getBounds();
  var xmin = bounds.getEast() - pas;
  var xmax = bounds.getWest() + pas;
  var ymin = bounds.getSouth() - pas;
  var ymax = bounds.getNorth() + pas;

  //Écriture de la requete à envoyer au fichier php qui renverra un geojson
  var data = "xmin=" + xmin;
  data += "&xmax=" + xmax;
  data += "&ymin=" + ymin;
  data += "&ymax=" + ymax;
  data += "&echelle=" + echelle;

  //Initialisation de la variable AJAX
  var ajaxPostGis = new XMLHttpRequest();

  //Destination et type de la requête AJAX (asynchrone)
  ajaxPostGis.open('POST', './fichiers_php/connecter_base_postgis.php', false);

  //Métadonnées de la requête AJAX
  ajaxPostGis.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  //Événement de changement d'état de la requête
  ajaxPostGis.addEventListener('readystatechange',  function(e) {
      //Si l'état est le numéro 4 et que la ressource est trouvée
      if(ajaxPostGis.readyState == 4 && ajaxPostGis.status == 200) {

        //Retour de la requete (soit 'erreur' soit un geojson)
        var resultat = ajaxPostGis.responseText;

        //Cas où il n'y a pas d'erreur
        if (resultat!= "erreur"){
          //Mise à jour de la géométrie
          places = JSON.parse(ajaxPostGis.responseText);
        }

      }})

  //Envoi de la requête à connecter_base_postgis.php
  ajaxPostGis.send(data);

}
