<?php
function jxgcompress($filename) 
{   
    if (file_exists($filename)) {
        $base64 = base64_encode(gzcompress(rawurlencode(file_get_contents($filename)),9));
        echo "var jxgcompressed = " . $base64 . ";\n";
    } else {
        throw new Exception("$filename not found");
    }
}
?>

<?php 
    jxgcompress("./fonds_carte/json/com-dep-reg_tout_topo_v2.json");
?>   