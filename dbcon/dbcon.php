<?php 
	try{
		$source ='mysql:host=46.22.105.127;dbname=SquadThunder';
		$user = 'SquadThunder';
		$password ='thundersquad';

		$pdo = new PDO($source,$user,$password);
	}
	catch (PDOExeption $e){
		echo "Connection fail". "<br>".$e->getMessage();
}


