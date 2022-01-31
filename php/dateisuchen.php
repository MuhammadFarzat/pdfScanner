<?php
    include '../vendor/autoload.php';

    //Is needed to read from the file. Can only read text if it is really text (if it's not picture)
    $parser = new \Smalot\PdfParser\Parser();

    if(isset($_POST['artikelNummerLast']))
    {
        $path    = '../Umpackanweisungen';
        $files = scandir($path);
        
        $files = array_diff(scandir($path), array('.', '..'));
        //$files is an array of the names of all files in the "dateien" directory

        foreach($files as $file)
        {
            if(strpos($file, $_POST['artikelNummerLast']) !== false)
            {
                echo "http://localhost/pdfScanner-main/Umpackanweisungen/".$file;
                break;
            }
        }
    }

    //is called when we call the "dateiSuchen()" function from the index.js file
    if(isset($_POST['artikelNummer']))
    {
        //runs code to see if the requested file is unique of if there are many files, that have the same name

        $artikelNummer = $_POST['artikelNummer'];
        $mehrereDateienGefunden = false;
        $eineDateiGefunden = false;
        $startSearching = false;
        $checkLength = true;

        $path    = '../Umpackanweisungen';
        $files = scandir($path);
        
        $files = array_diff(scandir($path), array('.', '..'));
        //$files is an array of the names of all files in the "dateien" directory

        foreach($files as $file)
        {
            if($checkLength == true)
            {
                if(substr($file, strlen($artikelNummer), 1) == "-" || substr($file, strlen($artikelNummer), 1) == " -" || substr($file, strlen($artikelNummer), 1) == "_")
                {
                    $startSearching = true;
                    $checkLength = false;
                }
            }
            
            //Checking if name has an "-" or " -" after it, then we know there are many versios of the file.
            if($startSearching == true)
            {
                if(substr($file, strlen($artikelNummer), 1) == "-" || substr($file, strlen($artikelNummer), 1) == " -")
                {
                    $mehrereDateienGefunden = true;
                    echo "Es gibt mehrere";
                    break;
                }
            }
        }

        if($startSearching == true)
        {
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
                        $pdfFile = $parser->parseFile("../Umpackanweisungen/".$file);

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
        else
        {
            echo "";
        }
        $startSearching = true;
    }

    if(isset($_POST['artikelNummerNr2']))
    {
        $artikelNummerNr2 = $_POST['artikelNummerNr2'];

        $path    = '../Umpackanweisungen';
        $files = scandir($path);
        
        $files = array_diff(scandir($path), array('.', '..'));

        $filesList = "";


        foreach($files as $file)
        {

            if(strpos($file, $artikelNummerNr2) !== false)
            {
                $indexUnterstrich = strpos($file, '_');

                if($filesList != "")
                {
                    $filesList = $filesList . ";";
                }

                $filesList = $filesList . substr($file, 0, $indexUnterstrich);
            }
        
        }

        echo $filesList;
        $filesList = "";
    }
?>