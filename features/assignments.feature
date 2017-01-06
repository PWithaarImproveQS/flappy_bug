Feature: Workshop features
  - Teams maken : programmeerervaring, geen progammeerervaring wel testervaring en 'rest' op 3 plekken in de ruimte (staged), verder nummeren 
  - stel jezelf voor in je team (10m)
  - kleine intro flappy bug 
      Filmpje , geen requirements
    
  - test strategie stap 1 (15m)
      free format 
  - uitdelen urls frontend (als niet eerder om gevraagd)
  - test strategie stap 2 (15m)
    afsluiten met demo per team max. 5m (30m)
  - voorbereiding stap 3 aanvullen met RST strategie plaatjes -> ga er van uit dat alles kan
  - test strategie stap 3 (15m)
    aanvullen o.b.v. demo's andere teams + RST info
    
    -> Huib vragen om voorbeeld mindmap/lijst dimensies te maken
       (doel Flappy Bug: workshop geven!)
  
  KOFFIEPAUZE?
  
  welke selecteren we? -> risico's & prio
    - performance / security
    - functionaliteiten bij score X / na tijd X
  per onderwerp: hoe gaan we dit testen? 
    (valkuil: tools en denken in technische oplossingen, maar samen met dev. oplossen! testability vraag)
    eerst per team nadenken (15m)
    plenaire discussie per onderwerp (45m) + overtuigen inspanning voor testability
    
    LUNCH
    
  - Flappy Bug competitie 1 (15m) -> proefrondje, daarna echt
  
  - Theorie blok 1 (Een goede geautomatiseerde test)
  Lagerhuis sessie (30m) : 
    - Script vs scenario (feature player names)
    - Documentation goal 
    - Implementation TA : UI / Dev tools
    
  
    Uitleg (30m)
    - Waar voldoet een goede TA aan?
    - testpiramide (dev. faced, business faced -> player name)
    - mock/stub
    - dependency injection
    - Communiceren met de ontwikkelaar
    
      feature: player names (15m)
      - uniek
      - max. 8 characters (verschillende versies om duur aan te tonen)
      feature: player names & highscores
      -omgaan met highscores

      dev:
      - juist opgeslagen in db
      - overschrijven in db
      
    - discussie regressie vs. tijdelijk (15m)

   KOFFIEPAUZE?

  - theorie blok 2 (m.b.v. tools handmatig testen) (30m)
    - testen vs. checken (100 spelers, 256 score,... elke keer uitvoeren?)
    - client side hacken
    
  Server in control voor handmatig testen:
  - Asynchroon / synchroon
  - Timeouts
  - Deterministic / non-deterministic
  - Regressie check en mbv aut. tools testen
  - M.b.v. tools : bv SoapUI, Cucumber, Selenium, Unit, Stubs, Mocks
  
  Playground testautomatiseren (45m)
  
  - Einde : Conclusie (30m)
  - Vragen? (15m)
  - Competitie 2 + prijsuitreiking Flappybug bokaal (15m+)
  
  
  Todo: 
    - feature overzicht flappy bug tbv test strategie
    - cheat sheet
    - Offline backup (sticky + node.js)
    - Offline 2 : https://cloud9-sdk.readme.io/docs/running-cloud9-desktop 
    - Flappy bug bokaal
    
  Features aanpassen:
    - Start timeout muliplayer
    - Nacht dag overgang op x
    - Dubbele player namen
    - Limiet aantal spelers
    - Niveau verhogen na x
    - Database opslag scores / spelers
  
    
    
    
    