<?php
    include '../vendor/autoload.php';

    //Is needed to read from the file. Can only read text if it is really text (if it's not picture)
 
 
    header("Access-Control-Allow-Headers: *");

    $parser = new \Smalot\PdfParser\Parser();

    $ftp_server = '10.131.6.113';

    $sftp_user_name = 'BJAT';

    $sftp_user_pass = 'BJA2022';

   //$path    = '../Umpackanweisungen';

    $fehlerMeldungenObject;

/**********************************************************/
/**************** Start sftp Verbindung *******************/
/**********************************************************/
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//Use this


//$connection = ssh2_connect($ftp_server, 22);
// $auth = ssh2_auth_password($connection,  $sftp_user_name,  $sftp_user_pass);

/*if ( !$connection) {
    $fehlerMeldungenObject["connectionError"] = "Verbindung mit dem Server " . $ftp_server . " fehlgeschlagen";
    $fehlerMeldungenObject["serverName"] = $ftp_server;
    $fehlerMeldungenObject["benutzername"] = $sftp_user_name;
}
else if (! ssh2_auth_password($connection,  $sftp_user_name,  $sftp_user_pass)) {
    $fehlerMeldungenObject["anmeldungError"] = "Benutzer '" . $sftp_user_name . "' konnte nicht im Server " . $ftp_server . " einloggen, bitte prüfen Sie den Benutzername oder das Kennwort '". $sftp_user_pass."'";
    $fehlerMeldungenObject["serverName"] = $ftp_server;
    $fehlerMeldungenObject["benutzername"] = $sftp_user_name;
}*/
$path = "../Umpackanweisungen";
//$sftp = ssh2_sftp($connection);
//$realpath = ssh2_sftp_realpath($sftp, '/home/fritz_bja_t/Umpackanweisungen');
//$stream = fopen('ssh2.sftp://'.$realpath, 'r');
//$remote_dir = '/home/BJAT/Umpackanweisungen';
//$path = "ssh2.sftp://{$sftp}{$remote_dir}"; 
/*$handle = opendir("ssh2.sftp://{$sftp}".'/home//Umpackanweisungen' );
while (false != ($entry = readdir($handle))){
    echo "$entry\n";
}**/
/**********************************************************/
/******************* Ende sftp Verbindung *****************/
/**********************************************************/
 
// Store the file name into variable
/*$file = $path.'/701700205_AAWKAT-2145.pdf';
$filename = $path.'/701700205_AAWKAT-2145.pdf';
  
// Header content type
header('Content-type: application/pdf');

header('Content-Disposition: inline; filename="' . $filename . '"');
  
header('Content-Transfer-Encoding: binary');
  
header('Accept-Ranges: bytes');
  
// Read the file
@readfile($file);
*/

//$lesen = readfile($path.'/701700205_AAWKAT-2145.pdf');
//echo "<iframe src=\"data:application/pdf;base64,$lesen\" type=\"text/html\" width=\"100%\" style=\"height:100%\"></iframe>";


    $response = [];
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
               
                if(strpos($file, $artikelNummer) !== false)
                {
                    /*if(substr($file, strlen($artikelNummer), 1) == "_" || strlen($file) - 4 == strlen($artikelNummer))
                    {*/
                        $fileContents =  file_get_contents("../Umpackanweisungen/".$file);
                        $response['datei'] = base64_encode($fileContents);
                        break;
                    //}
                
                }
                //Wenn der Artikel ein Buchstabe an der Stelle 5 beinhaltet, die Datei anzeigen
                /*if(preg_match("/[a-z]/i", substr($artikelNummer, 4, 1))){
                    /*if(strpos($file, $artikelNummer) !== false)
                    {
                        if(substr($file, strlen($artikelNummer), 1) == "_" || strlen($file) - 4 == strlen($artikelNummer))
                        {
                            
                            $filesZumSenden[$file] = [];
                            array_push($filesZumSenden[$file], $file);
                            array_push($filesZumSenden[$file], readDateiInhaltBehaelter($file));
                            array_push($filesZumSenden[$file], readDateiInhaltArtikel($file, $artikelNummer));
                            break;
                        }
                    
                    }
                }
                //Ansonsten ersetze die Stelle 5 bei allen Dateien mit dem Wert "0" und zeige alle betroffene Dateien
                else
                {
                    /*$fileNameMitBuchstabe = substr_replace($file, "0", 4, 1);
                    if(strpos($fileNameMitBuchstabe, $artikelNummer) !== false)
                    {
                        if(substr($file, strlen($artikelNummer), 1) == "_" || strlen($file) - 4 == strlen($artikelNummer))
                        {
                            $filesZumSenden[$file] = [];
                            array_push($filesZumSenden[$file], $file);
                            array_push($filesZumSenden[$file], readDateiInhaltBehaelter($file));
                            array_push($filesZumSenden[$file], readDateiInhaltArtikel($file, $artikelNummer));
                        }
                    }
                }*/
                
                
            }
            if($response['datei'] == null)
            {
                $response['meldung'] = "Keine Dateien zum Senden gefunden";
            }

           /* //Wenn Dateien im Array $filesZumSenden sind dann diesen Array senden
            if(count($filesZumSenden) !== 0)
            {
                echo json_encode($filesZumSenden);
            }
            //Ansonsten diesen String senden
            else
            {
                $fehlerMeldungenObject["dateiSucheError"] = "Keine Dateien gefunden, zum Senden";
                echo json_encode($fehlerMeldungenObject);
            }
        */}
        else
        {
            $response['meldung'] = "Keine Dateien gefunden < 9";
        }
        echo json_encode($response);
    }
    
    function readDateiInhaltBehaelter($fileName)
    {
        global $parser;
        global $path;

        $document = $parser->parseFile($path."/".$fileName);
        $content  = nl2br($document->getText());
        $posVomBehaelter = strpos($content, "Behälter");
        if($posVomBehaelter !== false)
        {
            $posVomBreak = strpos($content, "<br />", $posVomBehaelter);
            $behaelter = substr($content, $posVomBehaelter, $posVomBreak - $posVomBehaelter);
        }
        else
        {
            $behaelter = "Behälter: nicht angegeben";
        }

        return $behaelter;
    }

    function readDateiInhaltArtikel($fileName, $artikelNummer)
    {
        global $parser;
        global $path;

        // auch wenn Dateiname beinhaltet kein "_" , zeige sie 
        $artikel = (substr($fileName, 0, strpos($fileName, '_')) ? substr($fileName, 0, strpos($fileName, '_')) : $artikelNummer );

        $document = $parser->parseFile($path."/".$fileName);
        $content  = preg_replace('/\s+/', '', nl2br($document->getText()));
        $erste200Stellen = substr($content, 0, 200);
     
       
        
        $artikelNummerExistiert = (strpos($erste200Stellen, $artikel) !== false) ? true : false;

        if($artikelNummerExistiert)
        {
            $posArtikelNummer = strpos($erste200Stellen, $artikel);
            if(substr($erste200Stellen, $posArtikelNummer+strlen($artikel), 1) == '-')
            {
                $artikelNummerExistiert = false;
            }
        }
        
        return $artikelNummerExistiert;
    }
    
   
?>