

//Gives us the requested file
function dateiSuchen() {

        //If the name from the user reaches 10 chars
    
        var artikelNummer = document.getElementById('scannID').value;

        var data = {};
        const fileUrl = "./Umpackanweisungen/";

        data["artikelNummer"] = artikelNummer;
        //Is for the loading logo

        data = JSON.parse(JSON.stringify(data));
        var dateiNamenArray = {};
        $.ajax({
            //Sends request to dateisuchen.php to search and return text of the wanted php file
            url: "./php/dateisuchen.php",
            method: "POST",
            data: data,
            success: function(response)
            {
                console.log(JSON.parse(response));
                //dateiNamenArray = JSON.parse(response);
                /*var anzahlElementsImObjekt = 0;
                for(element in dateiNamenArray)
                {
                    anzahlElementsImObjekt++;
                }

                //We are interested for now only in the else statement, which gives us the text
                if(response.includes("nichts"))
                {
                    console.log(response);
                    document.getElementById('myFrame').src = "";
                    document.getElementById('myFrame').style.display = "none";
                    document.getElementById('scannID').placeholder  = "Artikelnummer";
                    document.getElementById('dateiName').innerHTML = "Keine Dateien gefunden";
                }
                else
                {
                    if(anzahlElementsImObjekt == 1)
                    {
                        console.log(anzahlElementsImObjekt);
                        console.log(dateiNamenArray);
                        let fName = response;
                        var dateiName = dateiNamenArray[Object.keys(dateiNamenArray)[0]];
                        document.getElementById('myFrame').src = fileUrl + dateiName[0];
                        document.getElementById('myFrame').style.display = "flex";
                        // document.getElementById('scannID').placeholder  = dateiName.substring(dateiName.length - 4 , 0);
                        document.getElementById('dateiName').innerHTML = dateiName.substring(dateiName.length - 4 , 0);
                    }
                    else
                    {
                        console.log(anzahlElementsImObjekt);
                        var dateiNamenArray2 = [];
                        for(element in dateiNamenArray)
                        {
                            console.log(dateiNamenArray[element]);
                            dateiNamenArray2.push(dateiNamenArray[element] + "\n");
                        }
                        alert("Mehrere Dateien gefunden:\n" + dateiNamenArray2);
                    }
                    
                }*/
            }
        });
  }