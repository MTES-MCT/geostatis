<?php

$dossier = "../fichiers_stats";

function dirToArray($dossier)
{
   $resultat = array();
   $cdir = scandir($dossier);
   foreach ($cdir as $key => $value)
   {
      if (!in_array($value,array(".","..")))
      {
         if (is_dir($dossier . DIRECTORY_SEPARATOR . $value))
            $resultat[$value] = dirToArray($dossier . DIRECTORY_SEPARATOR . $value);
         else $resultat[] = $value;
      }
   }
   return $resultat;
}

$liste_fichiers = implode(";", dirToArray($dossier));
echo $liste_fichiers;


?>
