<?php
header('Content-type: text/plain; charset=utf-8');

$json_name=$_POST["json_name"];

$fp = fopen($json_name, 'w+');

fputs($fp, $_POST["json"]);
fclose($fp);

?>
