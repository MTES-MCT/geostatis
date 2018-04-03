<?php

$json_name=$_POST["json_name"];

$fp = fopen($json_name, 'w+');

fputs($fp, $_POST["json"]);
fclose($fp);

?>
