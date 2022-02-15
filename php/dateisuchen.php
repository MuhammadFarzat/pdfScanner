<?php
    include '../vendor/autoload.php';

    //Is needed to read from the file. Can only read text if it is really text (if it's not picture)
    $parser = new \Smalot\PdfParser\Parser();
    //header('Content-Type: application/json; charset=utf-8');
    header("Access-Control-Allow-Headers: *");
    $anzahlCharsZuBeachten = 8;

    //is called when we call the "dateiSuchen()" function from the index.js file
    if(isset($_POST['artikelNummer']))
    {
        if(preg_match("/[a-z]/i", $_POST['artikelNummer'])){
            $anzahlCharsZuBeachten = 9;
        }
        else
        {
            $anzahlCharsZuBeachten = 8;
        }
        if(strlen($_POST['artikelNummer']) >= $anzahlCharsZuBeachten)
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
                if(count($filesZumSenden) == 1)
                {
                    //$pdf = $parser->parseFile($filesZumSenden[0]);
                    $document = $parser->parseFile($path."/".array_values($filesZumSenden)[0]);
                    $content  = nl2br($document->getText());
                    $posVomBehaelter = strpos($content, "Behälter");
                    $posVomBreak = strpos($content, "<br />", $posVomBehaelter);
                    $behaelter = substr($content, $posVomBehaelter, $posVomBreak-$posVomBehaelter);
                    $filesZumSenden['behaelter'] = $behaelter;
                }
                echo json_encode($filesZumSenden);
            }
        }
        else
        {
            echo json_encode("nichts");
        }

    }
?>