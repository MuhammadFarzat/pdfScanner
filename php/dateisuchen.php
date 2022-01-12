<?php
    include '../vendor/autoload.php';

    //Is needed to read from the file. Can only read text if it is really text (if it's not picture)
    $parser = new \Smalot\PdfParser\Parser();

    //is called when we call the "dateiSuchen()" function from the index.js file
    if(isset($_POST['artikelNummer']))
    {
        //runs code to see if the requested file is unique of if there are many files, that have the same name

        $artikelNummer = $_POST['artikelNummer'];
        $mehrereDateienGefunden = false;
        $eineDateiGefunden = false;

        $path    = '../dateien';
        $files = scandir($path);
        
        $files = array_diff(scandir($path), array('.', '..'));
        //$files is an array of the names of all files in the "dateien" directory

        foreach($files as $file)
        {
            //Checking if name has an "-" or " -" after it, then we know there are many versios of the file.

            if(strpos($file, $artikelNummer."-") !== false || strpos($file, $artikelNummer." -") !== false)
            {
                $mehrereDateienGefunden = true;
                echo "Es gibt mehrere";
                break;
            }
        }
        //Runs if there is only one file
        if($mehrereDateienGefunden == false)
        {
            foreach($files as $file)
            {
                if(strpos($file, $artikelNummer) !== false)
                {
                    //Gets the requested file.
                    //file is the complete name of the requested file but $artikelNummer is the entered
                    //name from the user. So we check if the name of the file contains the name entered by the user.
                    $pdfFile = $parser->parseFile("../dateien/".$file);

                    $text = $pdfFile->getText();


                    $eineDateiGefunden = true;
                    //Send text
                    echo $text;
                    break;
                }
            }
            if($eineDateiGefunden == false)
            {
                echo "Keine Datei gefunden";
            }
        }
        $eineDateiGefunden = false;
        $mehrereDateienGefunden = false;
    }

   
?>