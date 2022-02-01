<?php
    include '../vendor/autoload.php';

    //Is needed to read from the file. Can only read text if it is really text (if it's not picture)
    $parser = new \Smalot\PdfParser\Parser();


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

        foreach($files as $file)
        {
            if(strpos($file, $artikelNummer) !== false)
            {
                if(substr($file, strlen($artikelNummer), 1) == "_")
                {
                    echo $file;
                    $eineDateiGefunden = true;
                    break;
                }
            }
        }

        if($eineDateiGefunden == false)
        {
            echo "nichts";
        }

    }
?>