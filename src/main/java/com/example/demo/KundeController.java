package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
public class KundeController{

    @Autowired
    KundeRepository rep;
    @PostMapping("/lagre")
    public void lagreKunde(Kunde innKunde,  HttpServletResponse response) throws IOException {
       if (!rep.lagreKunde(innKunde)){
           response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB prøv- igjen senere");
       }
    }

    @GetMapping("/hentAlle")
    public List<Kunde> hentAlle(HttpServletResponse response)throws IOException{
        List<Kunde> hentAlle = rep.hetAlle();
        if (hentAlle == null){
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(),"Feil i DB- prøv igjen senere");
        }
        return rep.hetAlle();}

    @GetMapping("/seltteEn")
    public void seltteEn( String antall){
        rep.sletteEn(antall);
    }
    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlle(); }

}

