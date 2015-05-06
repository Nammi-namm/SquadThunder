<?php

$FILENAME = "data.json";

function readDataFile() {
  global $FILENAME;
  $contents = file_get_contents($FILENAME);
  return $contents;
}

function writeDataFile($data) {
  global $FILENAME;
  $contents = json_encode($data);
  file_put_contents($FILENAME, $contents);
}

if($_SERVER['REQUEST_METHOD'] == "GET") {
  echo readDataFile();
} elseif($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = json_decode(readDataFile());
  $data[] = json_decode($HTTP_RAW_POST_DATA); //the gögn
  writeDataFile($data);
}
