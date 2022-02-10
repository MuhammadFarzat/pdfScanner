//Doesn't run right now. It isn't used
function dateienEmpfangen(artikelNummer)
{
    var data = {};

    data["artikelNummer2"] = artikelNummer;

    document.getElementById('loader').style.display = "flex";
        $.ajax({
            url: "./php/dateisuchen.php",
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
        url: "./php/dateisuchen.php",
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
        url: "./php/dateisuchen.php",
        type: "POST",
        data: data,
        success: function(response)
        {
            document.getElementById('loader').style.display = "none";
           
        }
    });
}

//Gives us the requested file
function dateiSuchen() {

        //If the name from the user reaches 10 chars
    
        var artikelNummer = document.getElementById('scannID').value;

        var data = {};
        const fileUrl = "./Umpackanweisungen/";

        data["artikelNummer"] = artikelNummer;
        //Is for the loading logo


        $.ajax({
            //Sends request to dateisuchen.php to search and return text of the wanted php file
            url: "./php/dateisuchen.php",
            type: "POST",
            data: data,
            success: function(response)
            {
             
                //We are interested for now only in the else statement, which gives us the text
                if(response == "nichts")
                {
                    console.log(response);
                }
                else
                {
                    let fName = response; 
                    document.getElementById('myFrame').src = fileUrl + response;
                    document.getElementById('myFrame').style.display = "flex";
                    document.getElementById('scannID').placeholder  = fName.substring(fName.length - 4 , 0);
                    document.getElementById('dateiName').innerHTML = fName.substring(fName.length - 4 , 0);
                }
            }
        });
  }