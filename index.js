//Doesn't run right now. It isn't used
function dateienEmpfangen(artikelNummer)
{
    var data = {};

    data["artikelNummer2"] = artikelNummer;

    document.getElementById('loader').style.display = "flex";
        $.ajax({
            url: "http://localhost/Test2211/php/dateisuchen.php",
            type: "POST",
            data: data,
            success: function(response)
            {
                document.getElementById('loader').style.display = "none";
                alert(response);
            }
    });
}

function getAllFiles(artikelNummer)
{
    var data = {};

    data["artikelNummerNr2"] = artikelNummer;
    document.getElementById('loader').style.display = "flex";

    $.ajax({
        //Sends request to dateisuchen.php to search and return text of the wanted php file
        url: "http://localhost/pdfScanner-main/php/dateisuchen.php",
        type: "POST",
        data: data,
        success: function(response)
        {
            document.getElementById('loader').style.display = "none";
            console.log(response);
        }
    });
}

function getWantedFile(artikelNummer)
{
    var data = {};

    data["artikelNummerLast"] = artikelNummer;
    //Is for the loading logo
    document.getElementById('loader').style.display = "flex";

    $.ajax({
        //Sends request to dateisuchen.php to search and return text of the wanted php file
        url: "http://localhost/pdfScanner-main/php/dateisuchen.php",
        type: "POST",
        data: data,
        success: function(response)
        {
            document.getElementById('loader').style.display = "none";
            document.getElementById('myFrame').src=response;
            document.getElementById('myFrame').style.display = "flex";
        }
    });
}
//Gives us the requested file
function dateiSuchen() {

    //If the name from the user reaches 10 chars
    //if(document.getElementById('scannID').value.length == 10)
    //{
        var artikelNummer = document.getElementById('scannID').value;

        var data = {};

        data["artikelNummer"] = artikelNummer;
        //Is for the loading logo
        document.getElementById('loader').style.display = "flex";

        $.ajax({
            //Sends request to dateisuchen.php to search and return text of the wanted php file
            url: "http://localhost/pdfScanner-main/php/dateisuchen.php",
            type: "POST",
            data: data,
            success: function(response)
            {
                document.getElementById('loader').style.display = "none";
                //We are interested for now only in the else statement, which gives us the text
                if(response == "Es gibt mehrere")
                {
                    alert(response);
                    getAllFiles(artikelNummer);
                }
                else if(response == "Keine Datei gefunden")
                {
                    console.log(response);
                }
                else
                {
                    getWantedFile(artikelNummer);
                    console.log(response);
                }
            }});


     
    //}
  }