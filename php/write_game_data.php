<?php


	if(isset($_POST['GAME_DATA'])){

		$GAME_DATA = $_POST['GAME_DATA'];
		
		echo $GAME_DATA;

		$fp = fopen('data.txt', 'w');
		if(fwrite($fp, $GAME_DATA)){
		
			echo 'saved';
		
		};
		fclose($fp);


	}



?>