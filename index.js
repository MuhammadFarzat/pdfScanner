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

const fileUrl = "data:application/pdf;base64,";



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
                console.log("response: ");
                console.log(response);
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
                else if(dateiNamenArray['datei'] != null)
                {
                    console.log(dateiNamenArray['behaelter'].replace('\t',''));
                    
                    inputLabel.textContent = "Artikelnummer: " + dateiNamenArray['dateiName'].substr(0, dateiNamenArray['dateiName'].indexOf('_')) + 
                                                    "  |  " + (dateiNamenArray['behaelter'].substr(9, dateiNamenArray['behaelter'].length).trim() ? dateiNamenArray['behaelter'] : "Behälter nicht angegeben" ) + 
                                                    "  |  Dateiname: " + dateiNamenArray['dateiName'] +
                                                    (dateiNamenArray['behaelterNameIstRichtig'] ? "": "  | Behälter stimmt nicht überein") +
                                                    (dateiNamenArray['dateiNameIstRichtig'] ? "": "  | Dateiname stimmt nicht überein");

                    if (! dateiNamenArray['dateiNameIstRichtig']) {
                        $('.popupBox_hover').show();
                        document.getElementById('popupBox_Text').textContent = "Datei Nr. " + dateiNamenArray['dateiName'].substr(0, dateiNamenArray['dateiName'].indexOf('_')) + 
                                              ` hat einen Fehler in der Benennung. Bitte informieren Sie den Leitstand`;
                    } else if (! dateiNamenArray['behaelterNameIstRichtig'] ) {
                        $('.popupBox_hover').show();
                        document.getElementById('popupBox_Text').textContent = "Datei Nr. " + dateiNamenArray['dateiName'].substr(0, dateiNamenArray['dateiName'].indexOf('_')) + 
                                              " hat einen Fehler in der Benennung des Behälters (" + dateiNamenArray['behaelter'] + "). Bitte informieren Sie den Leitstand";
                    } else {
                        document.getElementById('myFrame').src = fileUrl + dateiNamenArray['datei'];
                        document.getElementById('myFrame').style.display = "flex";
                    }
                    
                }
                else if (dateiNamenArray["meldung"] !== null )
                {
                    document.getElementById('myFrame').src = "";
                    document.getElementById('myFrame').style.display = "none";
                    scannId.placeholder  = "Artikelnummer";
                    inputLabel.textContent = "Keine Dateien gefunden";                
                } 
                else 
                {
                    $('.popupBox_hover').show();
                    document.getElementById('popupBox_Text').textContent = "Es ist ein Fehler aufgetretet !";
                }
                
            }
        });
  }


/**********************************************************/
/******* Start, zeige den ausgewaehlten Artikel  **********/
/**********************************************************/

/*function showSelectedArtikel(event)
{

    var artikelNummerImButton = event.srcElement.value.substr(0, event.srcElement.value.indexOf('+')-1);
    var itemNumber = event.srcElement.id;
    var anzahlItems = 0;
    
    for(keyInArray in dateiNamenArray)
    {
        if(itemNumber == anzahlItems)
        {
            console.log(fileUrl + dateiNamenArray[keyInArray][0]);
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
            break;
        }
        anzahlItems++;
    }
}*/

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