<?php

$racine = "../";

if (isset($_REQUEST["json"])) {
  $jsonString = $_REQUEST["json"];
  $filename = $racine . "config.json";
  file_put_contents($filename, $jsonString);
  echo 0;
}
else {
  echo "Il y a eu un probleme !";
}