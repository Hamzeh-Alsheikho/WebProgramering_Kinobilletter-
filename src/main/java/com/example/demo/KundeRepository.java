package com.example.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class KundeRepository {

    @Autowired
    private JdbcTemplate db;
    private Logger logger = LoggerFactory.getLogger(KundeRepository.class);

    public boolean lagreKunde(Kunde innKunde){
        String sql = "INSERT INTO Kunde (film, antall, navn, etternavn, telefonnr, epost) VALUES (?,?,?,?,?,?)";
        try {
            db.update(sql,innKunde.getFilm(),innKunde.getAntall(),innKunde.getNavn(),innKunde.getEtternavn(),innKunde.getTelefonnr(),innKunde.getEpost());
            return true;
        }
        catch (Exception e){
            logger.error("Feil i lagerKunde :"+e);

            return false;
        }
    }
    public List<Kunde > hetAlle (){
        String sql = "SELECT * FROM Kunde ORDER BY etternavn ASC";
        try {
            List<Kunde> allKunder = db.query(sql,new BeanPropertyRowMapper(Kunde.class));
            return allKunder;
        }
        catch (Exception e){
            logger.error("Feil i hetAlle: "+e);
            return null;
        }
    }
    public void sletteEn(String antall){
        String sql = "DELETE FROM Kunde WHERE antall=?";
        db.update(sql, antall);
    }

    public void slettAlle(){
        String sql = "DELETE FROM Kunde";
        db.update(sql);
    }
}
