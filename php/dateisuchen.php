<?php
    include '../vendor/autoload.php';

    //Is needed to read from the file. Can only read text if it is really text (if it's not picture)
 
 
    header("Access-Control-Allow-Headers: *");

    $parser = new \Smalot\PdfParser\Parser();

    $path    = '../Umpackanweisungen';

    //is called when we call the "dateiSuchen()" function from the index.js file
    if(isset($_POST['artikelNummer']))
    {
       

        if(strlen($_POST['artikelNummer']) >= 9)
        {
            $artikelNummer = $_POST['artikelNummer'];
           
            $files = scandir($path);
            
            $files = array_diff(scandir($path), array('.', '..'));
            //$files is an array of the names of all files in the "dateien" directory
    
            $filesZumSenden = [];
     

            foreach($files as $file)
            {
               
                //Wenn der Artikel ein Buchstabe an der Stelle 5 beinhaltet, die Datei anzeigen
                if(preg_match("/[a-z]/i", substr($artikelNummer, 4, 1))){
                    if(strpos($file, $artikelNummer) !== false)
                    {
                   
                        $filesZumSenden[$file] = [];
                        array_push($filesZumSenden[$file], $file);
                        array_push($filesZumSenden[$file], readDateiInhaltBehaelter($file));
                        array_push($filesZumSenden[$file], readDateiInhaltArtikel($file, $artikelNummer));
                        break;
                    }
                }
                //Ansonsten ersetze die Stelle 5 bei allen Dateien mit dem Wert "0" und zeige alle betroffene Dateien
                else
                {
                    $fileNameMitBuchstabe = substr_replace($file, "0", 4, 1);
                    if(strpos($fileNameMitBuchstabe, $artikelNummer) !== false)
                    {
           
                        $filesZumSenden[$file] = [];
                        array_push($filesZumSenden[$file], $file);
                        array_push($filesZumSenden[$file], readDateiInhaltBehaelter($file));
                        array_push($filesZumSenden[$file], readDateiInhaltArtikel($file, $artikelNummer));
                    }
                }
                
                
            }
            //Wenn Dateien im Array $filesZumSenden sind dann diesen Array senden
            if(count($filesZumSenden) !== 0)
            {
                echo json_encode($filesZumSenden);
            }
            //Ansonsten diesen String senden
            else
            {
                echo json_encode("Keine Dateien gefunden");
            }
        }
        else
        {
            echo json_encode("Keine Dateien gefunden");
        }

    }
    
    function readDateiInhaltBehaelter($fileName)
    {
        global $parser;
        global $path;

        $document = $parser->parseFile($path."/".$fileName);
        $content  = nl2br($document->getText());
        $posVomBehaelter = strpos($content, "Behälter");
        $posVomBreak = strpos($content, "<br />", $posVomBehaelter);
        $behaelter = substr($content, $posVomBehaelter, $posVomBreak - $posVomBehaelter);

        return $behaelter;
    }

    function readDateiInhaltArtikel($fileName, $artikel)
    {
        global $parser;
        global $path;

        $document = $parser->parseFile($path."/".$fileName);
        $content  = preg_replace('/\s+/', '', nl2br($document->getText()));
        $erste200Stellen = substr($content, 0, 200);
     
       
        
        $artikelNummerExistiert = (strpos($erste200Stellen, $artikel) !== false) ? true : false;
        
        return $artikelNummerExistiert;
    }
    
   
?>