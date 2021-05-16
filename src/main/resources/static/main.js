function kjopBilletter() {
    let utFeilFilm=" *Må velge filmen her! ";
    let utFeilAntall=" *Tallet må være større enn 0! ";
    let utFeilFoenavn=" *Må skrive riktig fornavn! ";
    let utFeilEtterNavn=" *Må skrive riktig etternavn! ";
    let utFeilTelefonnr=" *Telefonnr må være minst 6 tall! ";
    let utFeilEpost=" *Må skrive riktig epost! ";

    let velgFilmenInput  =  $("#velgFilmen").val();
    let antallInput  =  $("#antall").val();
    let fornavnInput  =  $("#fornavn").val();
    let etternavnInput  =  $("#etternavn").val();
    let telefonnerInput  =  $("#telefonner").val();
    let epostInput  =  $("#epost").val();

    let ut1= false
    let ut2 = false
    let ut3 = false
    let ut4 = false
    let ut5 = false
    let ut6 = false


    if (velgFilmenInput === "" ){
        $("#filmVelgFeil").html(utFeilFilm.fontcolor("red"));
    }else{
        $("#filmVelgFeil").html("");
        ut1 = true
    }

    if (parseInt(antallInput) <1 || antallInput===""){
        $("#antallFile").html(utFeilAntall.fontcolor("red"));
    }else{
        $("#antallFile").html("");
        ut2 = true
    }

    if ( fornavnInput ==="" || !isNaN(fornavnInput)){
        $("#navnFeil").html(utFeilFoenavn.fontcolor("red"));
    }else{
        $("#navnFeil").html("");
        ut3 = true
    }
    if (etternavnInput===""|| !isNaN(etternavnInput)){
        $("#etternavnfeil").html(utFeilEtterNavn.fontcolor("red"));
    }else{
        $("#etternavnfeil").html("");
        ut4 = true
    }
    if (parseInt(telefonnerInput)<1 ||telefonnerInput.length<6){
        $("#telefonnrFeil").html(utFeilTelefonnr.fontcolor("red"));
    }else{
        $("#telefonnrFeil").html("");
        ut5 = true
    }

    const pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
    if (epostInput==="" || !epostInput.match(pattern)){
        $("#epostFeil").html(utFeilEpost.fontcolor("red"));
    }else{
        $("#epostFeil").html("");
        ut6 = true
    }
    if (ut1 && ut2 && ut3 && ut4 && ut5 && ut6){
    const kunde = {
        film : velgFilmenInput,
        antall : antallInput,
        navn : fornavnInput,
        etternavn : etternavnInput,
        telefonnr : telefonnerInput,
        epost : epostInput,
    };

    $.post("/lagre", kunde, function(){
    });

        $("#velgFilmen").val("");
    $('input').val("")
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}
    else return;
}
function vis(){
    $.get( "/hentAlle", function( data ) {
        formaterData(data); })
.fail(function(jqXHR) {
        const json = $.parseJSON(jqXHR.responseText);
        $("#feil").html(json.message);
    });
}
function formaterData(kun){

        let ut = "<table class='table-striped'><tr><th>Film</th><th>Antall</th><th>Navn</th><th>Etternavn</th><th>Telefonner</th><th>E-post</th><th></th></tr>";
        for (const kunde of kun){
            ut+="<tr>" +
                "<td style='padding-top: 10px'>"+kunde.film+"</td>" +
                "<td>"+kunde.antall+"</td>" +
                "<td>"+kunde.navn+"</td>" +
                "<td>"+kunde.etternavn+"</td>" +
                "<td>"+kunde.telefonnr+"</td>" +
                "<td>"+kunde.epost+"</td>" +
                "<td><button class='btn btn-danger' onclick='sletteEn("+kunde.antall +")'>Slett</button> </td>" +
                "</tr>";
        }
        ut+="</table>";
    $("#kvittering").html(ut)
        .fail(function(jqXHR) {
            const json = $.parseJSON(jqXHR.responseText);
            $("#feil").html(json.message);
        });
}
function sletteEn(antall){
    const url = "/seltteEn?antall="+antall;
    $.get(url, function (){
        window.location.href = "/index.html";
    })
}
function nullstille() {
    $.get( "/slettAlle", function() {
        window.location.href = "/index.html";
    });
}