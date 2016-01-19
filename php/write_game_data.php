<?php

	if(isset($_POST['GD'])){

		$GAME_DATA = $_POST['GD'];

		$file = 'data.txt';
		
		//file_put_contents('data.txt', $GAME_DATA);
		
		$fp = fopen('data.txt', 'w')or die('cannot open file :'.$file);
		if(fwrite($fp, $GAME_DATA)){
			echo 'game_data saved';
		
		};
		fclose($fp);


	}



?>