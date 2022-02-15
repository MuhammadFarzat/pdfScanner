<?php
    include '../vendor/autoload.php';

    //Is needed to read from the file. Can only read text if it is really text (if it's not picture)
    $parser = new \Smalot\PdfParser\Parser();
    //header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Headers: *");


    //is called when we call the "dateiSuchen()" function from the index.js file
    if(isset($_POST['artikelNummer']))
    {
        //runs code to see if the requested file is unique of if there are many files, that have the same name

        $artikelNummer = $_POST['artikelNummer'];
        $eineDateiGefunden = false;
        
        $path    = '../Umpackanweisungen';
        $files = scandir($path);
        
        $files = array_diff(scandir($path), array('.', '..'));
        //$files is an array of the names of all files in the "dateien" directory

        $filesOriginaleName = [];
        $fileNameKopie;
        $filesZumSenden = [];

        foreach($files as $file)
        {
            $charPosition = 0;
            $positionVonUnterstrich = strpos($file, '_');
            $positionVomMinusZeichen = strpos($file, '-');
            $endPosition = 0;

            if($positionVomMinusZeichen !== FALSE)
            {
                if($positionVonUnterstrich > $positionVomMinusZeichen)
                {
                    $endPosition = $positionVonUnterstrich - $positionVomMinusZeichen;
                }
                else
                    $endPosition = 0;
            }

            while($charPosition < $positionVonUnterstrich-$endPosition)
            {
                if(is_numeric(substr($file, $charPosition, 1)) != 1)
                {
                    $fileNameKopie = $file;
                    $file = substr_replace($file, null, $charPosition, 1);
                    $filesOriginaleName[$file] = $fileNameKopie;
                    break;
                }

                $charPosition++;
            }
            
            /*if(strpos($file, $artikelNummer) !== false)
            {
                if(substr($file, strlen($artikelNummer), 1) == "_")
                {
                    echo json_encode($filesOriginaleName[$file]);
                    $eineDateiGefunden = true;
                    break;
                }
            }*/
        }

        //$fileName ist mit Buchstabe und $key ist ohne
        foreach ($filesOriginaleName as $key => $fileName) {
            if(strpos($fileName, $artikelNummer) !== false || strpos($key, $artikelNummer) !== false)
            {
                
                $filesZumSenden[$key] = $fileName;
                $eineDateiGefunden = true;
                
            }
        }
        
        if($eineDateiGefunden == false)
        {
            echo json_encode("nichts");
        }
        else
        {
            echo json_encode($filesZumSenden);
        }

    }
?>