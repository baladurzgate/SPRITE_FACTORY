<?php

	if(isset($_POST['GD'])){

		$GAME_DATA = $_POST['GD'];

		$file = '../assets/game_data.json';
		
		//file_put_contents('data.txt', $GAME_DATA);
		
		$fp = fopen($file, 'w')or die('cannot open file :'.$file);
		if(fwrite($fp, $GAME_DATA)){
			echo 'game_data saved';
		
		};
		fclose($fp);


	}



?>