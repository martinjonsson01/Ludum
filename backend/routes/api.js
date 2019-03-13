const express = require('express');
const Data = require("../data");
const router = express.Router();

// GET all available data in the database.
router.get("/getNews", (req, res) => {
    setTimeout(() =>
        res.json([
            {
                title: "Påminnelse om Plugg- och Mattestuga",
                author: {
                    name: "Stina Geijer",
                    image: "https://www.lbs.se/wp-content/uploads/resized/0a/Stina_680x532_f3d695f7bd8bed00c95e236893ecb0b0.jpg"
                },
                date: "15 mar",
                body: `Hej allihopa!
    
     
    
          Nu är Pluggstugan och Mattestugan igång i Magenta och Cyan. Här finns lärare som har massor med tid till att hjälpa de elever som behöver stöd i studierna, jobba ikapp, planera sina studier, öva inför prov, plugga inför prövningar osv. Alla som inte ligger 100 % i fas med kurserna borde vara här. Det är nu ni har chansen! 
          
           
          
          Hälsningar Stina, rektor`,
            },
            {
                title: "Pluggstuga v. 11",
                author: {
                    name: "Stina Geijer",
                    image: "https://www.lbs.se/wp-content/uploads/resized/0a/Stina_680x532_f3d695f7bd8bed00c95e236893ecb0b0.jpg"
                },
                date: "6 mar",
                body: "Vecka 11 är det dags för utvecklingssamtal och då bryter vi undervisningen vid lunch. Varje eftermiddag finns möjlighet att få extra hjälp med sina studier i form av Räknestuga i Cyan och Pluggstuga i Magenta. Det kommer finnas lärare på plats mellan kl 13.00-15.45. Världens chans att ta tag i sina studier! Alla elever är välkomna!",
            },
            {
                title: "Tider för IT-support med Bea",
                author: {
                    name: "Agnes Johansson",
                    image: "https://www.lbs.se/wp-content/uploads/resized/7d/Agnes_680x532_ceeab99e798d0715ed48c78026829195.jpg"
                },
                date: "9 jan",
                body: `Beatrice som har hand om IT-support på skolan har satt upp nya tider som hon är tilgänglig för detta endamål. Tiderna är: 
    
     
    
          mån: 10-12
          tors: 13-15
          
           
          
          Bea sitter i ett av rummen i korridoren till E-sport rummet. `,
            },
            {
                title: "Låna bok skolbiblioteket",
                author: {
                    name: "Agnes Johansson",
                    image: "https://www.lbs.se/wp-content/uploads/resized/7d/Agnes_680x532_ceeab99e798d0715ed48c78026829195.jpg"
                },
                date: "12 mar 2018",
                body: `LÅNA BOK
    
          Ska du låna en bok från skolbiblioteket? Det är enkelt!
          
           
          
          Scanna QR-koden och fyll i formuläret så har du lånat boken i 1 månad.
          
          Vill du låna den längre är det bara att fylla i formuläret igen. Du kan som mest låna boken 3 gånger i rad.
          
           
          
          När du ska lämna tillbaka boken så lägger du den i "facket" på väggen utanför Agnes kontor (administrationen), är facket fullt eller boken är för tjock, lägg den på Agnes skrivbord.
          
           
          
          Ingen QR-läsare?
          
          Gå till formuläret via länken: https://goo.gl/forms/PpXhYWJhg4oo2QCI2
          
          Finns även på LBS.se under ”elevinformation”.
          
           
          
          Frågor? 
          - Kontakta Agnes`,
                attached: [
                    "https://sms.schoolsoft.se/lbs/jsp/student/showFileImage.jsp?fileid=21088&tn=1&object=news&requestid2=1&requestid3=0&requestid1=5124&hash=58b5f95879a3040531b446d9c1e2f44d&rnd=1520841573336",
                ],
            },
            {
                title: "Ledighetsansökan",
                author: {
                    name: "Cecilia Båge",
                    image: "https://www.lbs.se/wp-content/uploads/resized/b7/Cissi_680x532_4d214144e4293d8b5634690b1aad558f.jpg"
                },
                date: "16 nov 2018",
                body: `Ni kommer åt ledighetsansökan på hemsidan http://www.lbs.se/terminstider.
    
          Klicka här för direktlänk!`,
            },
        ]), 1000);
});

// GET all available data in the database.
router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// POST updates to data in the database.
router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    Data.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// DELETE data from the database.
router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// POST new data to the database
router.post("/putData", (req, res) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;