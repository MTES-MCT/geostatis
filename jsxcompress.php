<?php
function jxgcompress($filename) 
{   
    if (file_exists($filename)) {
        $gzbin = gzcompress(rawurlencode(file_get_contents($filename)),9);
        $base64 = base64_encode($gzbin);
        return $base64;
    } else {
        throw new Exception("$filename not found");
    }
}
?>

<?php 
    $myjson = "./fonds_carte/json/reg_topo_v2.json";
    $myjsoncompressed = $myjson.".b64";
    $nbbytes = file_put_contents($myjsoncompressed, jxgcompress($myjson));
    echo $nbbytes;
?>