/******************************************************************************************************************************************/
/******************************************************************************************************************************************/
/**************************************************** BJA Umpackanweisungen ***************************************************************/
/****************************************************    Javascript Code    ***************************************************************/
/****************************************************  erstellt 01.02.2022  ***************************************************************/
/******************************************************************************************************************************************/
/******************************************************************************************************************************************/


// Get the modal
const modal = document.getElementById("myModal");
    
// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let abrechen = document.getElementsByClassName("close")[0];

let docFrag = document.createDocumentFragment();

let dateiAuswahl = document.getElementById("dateiAuswahl");

let inputLabel = document.getElementById('inputLabel');

let fName;

var dateiName;

var dateiNamenArray;

let scannId = document.getElementById('scannID');

const fileUrl = "./Umpackanweisungen/";



//Gives us the requested file
function dateiSuchen() {

        //If the name from the user reaches 10 chars
    
        var artikelNummer = scannId.value;

        var data = {};
        

        data["artikelNummer"] = artikelNummer;

        //Is for the loading logo

        data = JSON.parse(JSON.stringify(data));
        dateiNamenArray = {};
        $.ajax({
            //Sends request to dateisuchen.php to search and return text of the wanted php file
            url: "./php/dateisuchen.php",
            method: "POST",
            data: data,
            success: function(response)
            {
                dateiNamenArray = JSON.parse(response);
                if(dateiNamenArray["connectionError"] != null)
                {
                    $('.popupBox_hover').show();
                    document.getElementById('popupBox_Text').textContent = dateiNamenArray["connectionError"];
                }
                else if(dateiNamenArray["anmeldungError"] != null)
                {
                    $('.popupBox_hover').show();
                    document.getElementById('popupBox_Text').textContent = dateiNamenArray["anmeldungError"];
                }
                else
                {
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
                    inputLabel.textContent = "Keine Dateien gefunden";
                }
                else
                {
                    
                    if(anzahlElementsImObjekt == 1)
                    {
                        
                        console.log(anzahlElementsImObjekt);
                        console.log(dateiNamenArray);
                        fName = response;
                        dateiName = dateiNamenArray[Object.keys(dateiNamenArray)[0]];
                        if(dateiName[2] == false)
                        {
                            $('.popupBox_hover').show();
                            document.getElementById('popupBox_Text').textContent = "Datei Nr. " + dateiName[0].substr(0, dateiName[0].indexOf('_')) + 
                             ` hat einen Fehler in der Benennung. Bitte informieren Sie den Leitstand`;
                        }
                        document.getElementById('myFrame').src = fileUrl + dateiName[0];
                        document.getElementById('myFrame').style.display = "flex";
                        inputLabel.textContent = "Artikelnummer: " + dateiName[0].substr(0, dateiName[0].indexOf('_')) + 
                                                    "  |  " + (dateiName[1].substr(9, dateiName[1].length).trim() ? dateiName[1] : "Behälter nicht angegeben" ) + 
                                                    "  |  Dateiname: " + dateiName[0] +
                                                    "" + (dateiName[2] ? "": "  |  stimmt nicht überein");
                    }
                    else
                    {
                   
                        for(element in dateiNamenArray)
                        {
                            console.log(dateiNamenArray[element]);
                            // button
                            let dateiAuswahlBtn = document.createElement('input');
                            dateiAuswahlBtn.type = 'button';
                            dateiAuswahlBtn.value = dateiNamenArray[element][0].substr(0, dateiNamenArray[element][0].indexOf('_')) + " + " + dateiNamenArray[element][1].trim().replaceAll('\t', '');;
                            dateiAuswahlBtn.className = 'block';
                            dateiAuswahlBtn.id = element.trim().replaceAll(' ', '');
                            dateiAuswahlBtn.onclick = showSelectedArtikel;
                            docFrag.appendChild(dateiAuswahlBtn);
                        }
                        let div = document.createElement('div');
                        div.id = 'dateiAuswahlnode';
                        div.appendChild(docFrag)
                        dateiAuswahl.appendChild(div);

                        /**********************************************************/
                        /********************** Start modal ***********************/
                        /**********************************************************/
                             
                        // When the user clicks the button, open the modal 
                        modal.style.display = "block";

                        /*for(element in dateiNamenArray)
                        {
                            if(dateiNamenArray[element][2] == false)
                            {
                                $('.popupBox_hover').show();
                                document.getElementById('popupBox_Text').textContent = "Datei Nr. " + dateiNamenArray[element][0].substr(0, dateiNamenArray[element][0].indexOf('_')) + 
                                 ` hat einen Fehler in der Benennung. Bitte informieren Sie den Leitstand`;
                            }
                        }*/
                        
                        // When the user clicks anywhere outside of the modal, close it
                        /*window.onclick = function(event) {
                            if (event.target == modal) {
                            modal.style.display = "none";
                            }
                        }*/

                        /**********************************************************/
                        /********************** End modal *************************/
                        /**********************************************************/
                    }
                    
                }
                }
                
            }
        });
  }


/**********************************************************/
/******* Start, zeige den ausgewaehlten Artikel  **********/
/**********************************************************/

function showSelectedArtikel(event)
{

    var artikelNummerImButton = event.srcElement.value.substr(0, event.srcElement.value.indexOf('+')-1);
    var dateiName = event.srcElement.id;
    
    for(keyInArray in dateiNamenArray)
    {
        if(keyInArray == dateiName)
        {
            document.getElementById('myFrame').src = fileUrl + dateiNamenArray[keyInArray][0];
            document.getElementById('myFrame').style.display = "flex";
            modal.style.display = "none";
            let dateiAuswahlnode = document.getElementById('dateiAuswahlnode');
            if (dateiAuswahlnode.parentNode) {
                dateiAuswahlnode.parentNode.removeChild(dateiAuswahlnode);
            }
            inputLabel.textContent = "Artikelnummer: " + artikelNummerImButton  + 
                                    "  |  " + (dateiNamenArray[keyInArray][1].substr(9, dateiNamenArray[keyInArray][1].length).trim() ? dateiNamenArray[keyInArray][1] : "Behälter nicht angegeben" ) + 
                                    "  |  Dateiname: " + dateiNamenArray[keyInArray][0] +
                                    "" + (dateiNamenArray[keyInArray][2] ? "": "  |  stimmt nicht überein");
            if(dateiNamenArray[keyInArray][2] == false)
            {
                $('.popupBox_hover').show();
                document.getElementById('popupBox_Text').textContent = "Datei Nr. " + dateiNamenArray[keyInArray][0].substr(0, dateiNamenArray[keyInArray][0].indexOf('_')) + 
                 ` hat einen Fehler in der Benennung. Bitte informieren Sie den Leitstand`;
            }
        }
    }
}

/**********************************************************/
/******* Ende , zeige den ausgewaehlten Artikel  **********/
/**********************************************************/



// When the user clicks on <span> (x), close the modal
abrechen.onclick = function () {
    modal.style.display = "none";
    // reset buttons 
    let dateiAuswahlnode = document.getElementById('dateiAuswahlnode');
    if (dateiAuswahlnode.parentNode) {
        dateiAuswahlnode.parentNode.removeChild(dateiAuswahlnode);
    }
}




/**********************************************************/
/*******   **********/
/**********************************************************/
$(window).load(function () {
   /* $(".trigger_popup_fricc").click(function(){
       $('.popupBox_hover').show();
    });*/
   /* $('.popupBox_hover').click(function(){
        $('.popupBox_hover').hide();
    });*/
    $('.popupCloseButton').click(function(){
        $('.popupBox_hover').hide();
    });
});