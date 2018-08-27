$(document).ready(function () {

    $("#signBtn").click(logovanje);
    $("#regBtn").click(registrovanje);
    $("#dugme").click(dodajPost);
    $("#odjava").click(odjaviSe);
    
   
});

function registrovanje() {

    let regIme = /^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/;
    let regBroj = /^\+[\d]{1,3}\-[\d]{2}\-[\d]{2}\-[\d]{2}\-[\d]{3}$/;
    let regEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    let regPass = /(?:[a-z].*[0-9])|(?:[a-z].*[a-z]){8,}/;

    let provera = true;
    let user = {
        name: $("#ime").val(),
        lastName: $("#pre").val(),
        tel: $("#tel").val(),
        email: $("#email").val(),
        password: $("#pasvord").val(),
        image: $("#slika").val(),
        datum: $("#datum").val(),
        pol: $(":radio").val()

    }


    let g3 = document.getElementById("greska3");
    let g4 = document.getElementById("greska4");
    let g5 = document.getElementById("greska5");
    let g6 = document.getElementById("greska6");
    let g7 = document.getElementById("greska7");
    let g9 = document.getElementById("greska9");
    let g10 = document.getElementById("greska10");

    if (!regIme.test($("#ime").val())) {
        g3.innerHTML = ("Unesite Vas ime");
        provera = false;
    }
    if (!regIme.test($("#pre").val())) {
        g4.innerHTML = ("Unesite Vas prezime")
        provera = false;
    }
    if (!regBroj.test($("#tel").val())) {
        g5.innerHTML = ("Unesite Vas broj telefona")
        provera = false;
    }
    if (!regEmail.test($("#email").val())) {
        g6.innerHTML = ("Unesite Vas email ispravno")
        provera = false;
    }
    if (!regPass.test($("#pasvord").val())) {
        g7.innerHTML = ("Unesite Vas pasvord ispravno")
        provera = false;
    }

    if ($("#datum").val() == 0) {
        g9.innerHTML = ("Unesite datum rodjenja")
        provera = false;
    }
    if ($(":radio").val() === "") {
        g10.innerHTML = ("Odaberite pol")
        provera = false;
    }

    let korisniciStorage = JSON.parse(localStorage.getItem("korisnici"));
    let korisnici = [];



    if (provera) {
        let record = JSON.stringify(user);


        korisnici.push(" Gmail je: " + $("#email").val() + " Pasvord je: " + $("#pasvord").val())
        localStorage.setItem(user.email, record);
    } else {
        korisniciStorage = JSON.parse(korisniciStorage);
        korisnici = korisniciStorage;


        korisnici.push(" Gmail je: " + $("#email").val() + " Pasvord je: " + $("#pasvord").val())
        localStorage.setItem(user.email, record);
    }


    document.getElementById("regForma").reset();
}

/// LOGOVANJE KORISNIKA ////
function logovanje() {



    let g1 = document.getElementById("greska1");
    let g2 = document.getElementById("greska2");

    let regEmailLog = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    let regPassLog = /(?:[a-z].*[0-9])|(?:[a-z].*[a-z]){8,}/;

    let logEmail = document.getElementById("gmail").value;
    let logPass = document.getElementById("pass1").value;
    let provera = true;

    if (!regEmailLog.test($("#gmail").val())) {
        g1.innerHTML = "Email nije ispravan";
        provera = false;
    }
    else {
        g1.innerHTML = "";
    }

    if (!regPassLog.test($("#pass1").val())) {
        g2.innerHTML = "Pasvord nije ispravan";
        provera = false;
    }
    else {
        g2.innerHTML = "";
    }


    let kor = JSON.parse(localStorage.getItem(logEmail));

    if (kor !== null) {
        if (kor.password == logPass) {
            window.location.href = "wall.html?id=" + logEmail;
            localStorage.setItem("aktivKorisnik", JSON.stringify(kor))
        }

        else {

        }

    }

    document.getElementById("gmail").value = "";
    document.getElementById("pass1").value = "";
}

//// SLIKA NA PROFILU ////



function postaviSliku() {
    

    let slike = document.getElementsByTagName("img").value;
    let preview = document.querySelector('img');
    let file = document.querySelector('input[type=file]').files[0];
    let image = document.getElementById("sl").value;
    let reader = new FileReader();
    
    
    reader.onloadend = function (event) {
        preview.src = reader.result;
        the_url = event.target.result
        $('#imgProf').html("<img src='" + the_url + "' />")
        localStorage.setItem("sacuvajSliku", the_url)
       
    }

    if (file) {
      
        reader.readAsDataURL(file);

    } else {
        preview.src = "";
    }

    if (file !== null) {
        document.getElementById("sl").style.display = "none";
    }
    
}



//// INFORMACIJE O KORISNIKU NA ZIDU ///

let korisnikAktivni = JSON.parse(localStorage.getItem("aktivKorisnik"))
document.getElementById("i").innerHTML = korisnikAktivni.name;
document.getElementById("p").innerHTML = korisnikAktivni.lastName;
document.getElementById("d").innerHTML = korisnikAktivni.datum;


document.getElementById("pozdrav").innerHTML = "Zdravo" + " " + korisnikAktivni.name + "!";



/// DODAVANJE POSTOVA /////

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("lista").innerHTML = localStorage.getItem("postovi");

});


function dodajPost() {
    let inputValue = document.getElementById("postovi").value;

    let li = document.createElement("li");
    let slikaProfil = document.createElement("img");
    let ulLista = document.getElementById("lista");


    slikaProfil.setAttribute("src", localStorage.getItem("sacuvajSliku"));
    slikaProfil.setAttribute("height", "70px");
    slikaProfil.setAttribute("width", "70px");
    slikaProfil.setAttribute("id", "slikaPost");
    li.appendChild(slikaProfil);


    let tekst = document.createElement("span");
    let t = document.createTextNode(inputValue);
    tekst.appendChild(t);
    li.appendChild(tekst);

    document.getElementById("lista").appendChild(li);
    document.getElementById("postovi").value = "";


    let listaSave = document.getElementById("lista").innerHTML;
    localStorage.setItem("postovi", listaSave);

}

//// ODJAVA ////
function odjaviSe() {

    window.location.href = "index.html";

}


