// Get the modal
let modal = document.getElementById("myModal");
    
// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let abrechen = document.getElementsByClassName("close")[0];

let docFrag = document.createDocumentFragment();

let dateiAuswahl = document.getElementById("dateiAuswahl");

let scannId = document.getElementById('scannID');


//Gives us the requested file
function dateiSuchen() {

        //If the name from the user reaches 10 chars
    
        var artikelNummer = scannId.value;

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
                dateiNamenArray = JSON.parse(response);
                var anzahlElementsImObjekt = 0;
                for(element in dateiNamenArray)
                {
                    anzahlElementsImObjekt++;
                }

                //We are interested for now only in the else statement, which gives us the text
                if(response.includes("Keine"))
                {
                    console.log(response);
                    document.getElementById('myFrame').src = "";
                    document.getElementById('myFrame').style.display = "none";
                    scannId.placeholder  = "Artikelnummer";
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
                        //document.getElementById('dateiName').innerHTML = dateiName.substring(dateiName.length - 4 , 0);
                    }
                    else
                    {
                        console.log(anzahlElementsImObjekt);
                        var dateiNamenArray2 = [];
                        for(element in dateiNamenArray)
                        {
                            console.log(dateiNamenArray[element]);
                            dateiNamenArray2.push(dateiNamenArray[element] + "\n");
                            // button
                            let dateiAuswahlBtn = document.createElement('input');
                            dateiAuswahlBtn.type = 'button';
                            dateiAuswahlBtn.value = dateiNamenArray[element][0].substr(0, dateiNamenArray[element][0].indexOf('_')) + " + " + dateiNamenArray[element][1].trim().replaceAll('\t', '');;
                            dateiAuswahlBtn.className = 'block';
                            dateiAuswahlBtn.id = element.trim().replaceAll(' ', '');
                            docFrag.appendChild(dateiAuswahlBtn);
                        }
                        let div = document.createElement('div');
                        div.id = 'dateiAuswahlnode';
                        div.appendChild(docFrag)
                        dateiAuswahl.appendChild(div);

                        /* start modal */
                             
                        // When the user clicks the button, open the modal 
                        modal.style.display = "block";

                        for(element in dateiNamenArray)
                        {
                            if(dateiNamenArray[element][2] == false)
                            {
                                alert("Datei Nr. " + dateiNamenArray[element][0].substr(0, dateiNamenArray[element][0].indexOf('_')) + 
                                ` hat einen Fehler in der Benennung. Bitte informieren Sie den Administrator`);
                            }
                        }
                        //document.getElementById('dateienAuswahl').textContent = dateiNamenArray2 + "\n";

                        

                        
                        // When the user clicks anywhere outside of the modal, close it
                        /*window.onclick = function(event) {
                            if (event.target == modal) {
                            modal.style.display = "none";
                            }
                        }*/
                        /* end modal */
                    }
                    
                }
            }
        });
  }







// When the user clicks on <span> (x), close the modal
abrechen.onclick = function () {
    modal.style.display = "none";
    // reset buttons 
    let dateiAuswahlnode = document.getElementById('dateiAuswahlnode');
    if (dateiAuswahlnode.parentNode) {
        dateiAuswahlnode.parentNode.removeChild(dateiAuswahlnode);
    }
}


