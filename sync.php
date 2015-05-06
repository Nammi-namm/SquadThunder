<?php
//defina json file
$FILENAME = "data.json";

//lesir gögn úr json file.
function readDataFile() {
  global $FILENAME;
  $contents = file_get_contents($FILENAME);
  return $contents;
}

//skrifar gogn í json file
function writeDataFile($data) {
  global $FILENAME;
  $contents = json_encode($data);
  file_put_contents($FILENAME, $contents);
}


if($_SERVER['REQUEST_METHOD'] == "GET") { // keyrist þegar er fyrst loadaðtil að lesa file
  echo readDataFile();
} elseif($_SERVER["REQUEST_METHOD"] == "POST") { // eftir notandi sendir input er sent yfir i json filein.
  $data = json_decode(readDataFile());
  $data[] = json_decode($HTTP_RAW_POST_DATA); //the gögn
  writeDataFile($data);
}
