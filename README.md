
# Task Manager App (ReactJS)

Az alábbi dokumentáció bemutatja a Task Manager APP kliensoldalának beüzemelését, működését. A backend dokumentációja itt található (https://github.com/domcos223/to-do-asp.net#README.md)

# Beüzemelés

Fejlesztői környezet: [Visual Studio Code](https://code.visualstudio.com/)

Modulok, Packagek kezeléséhez feltétlen szükséges telepíteni: [Node.js](https://nodejs.org/en/)

Töltsük vagy klónozzuk le a repository-t melyben ez a dokumentáció megtalálható. Ha megnyitottuk a fejlesztőkörnyezetben a mappát nyissunk egy új terminált (Terminal -> New Terminal)
és adjuk ki a következő parancsokat:

```bash
  npm install
```
(vulnerabilities esetén kövessük a terminál utasításait.)

Ha minden rendben, indítható az oldal hasonló módon, a terminálban
```bash
  npm start
```
http://localhost:3000/ címen megnyílik a weboldal.

!!Fontos, hogy eközben fusson háttérben a szerveroldal is párhuzamosan, enélkül nem tudunk kommunikálni a szerverrel.

## Felépítés

Stílusozásra Bootstrap-et, styled-components-et használtam, és mivel a hozzáadás más oldalon történik React-Routingra is szükségem volt. A drap-and-drop megvalósításához **react-beautiful-dnd**-t használtam. (npm install-al telepíthetőek).

A kommunikációhoz axios-t használtam.

Három főmappában tárolom a szükséges fájlokat. A .css típusú fájlok a **styles** mappába kerültek, ezekben található az egyes komponensek stílusozása.
**pages** mappában található a hozzáadás oldal komponense, valamint egy Notfound.jsx fájl mely rossz elérési út megadása esetén egyszerű Not Found szöveget ír ki a képernyőre.
A **components** mappa tartalmazza az alkalmazást felépítő komponenseket.

## DroppableContext.jsx

A kontextus ami az oszlopok és tartalma megjelenítéséért, frissítéséért felel. Ebben található több kisebb komponens.
Itt található az onDragEnd-ben a drag-and-drop logikája mely alapján frissítjük a state-t, és adatot küldünk a szervernek a változásokról.
Elég hosszú a kód de részeire bontva : kezeli, ha ugyanarra a helyre húztuk az elemet, külön kezeli, ha ugyanabban az oszlopban mozgattunk, és kezeli azt is ha egyik oszlopból a másikba szeretnénk áthúzni.
Minden beavatkozás után állítjuk a state-t, hogy automatikusan frissüljön az oldal, és axios-sal regisztráljuk a változásokat.

### Column.jsx
**Droppable** -be csomagoljuk, ezzel elérhetővé tesszük a mozgatás fogadásához szükséges propertyket.

Oszlop komponens kirajzolása benne több kisebb komponenssel mint TaskList, InnerList, Task.
Hozzáadás gomb eseménykezelője itt található, mely az Add komponens által reprezentált oldalra navigál, ahol valójában történik a hozzáadás.

### Add.jsx

Megjelenít egy formot melybe adatokat írunk és ezt elküldi a szervernek. Mentés után visszadob a főoldalra, mely újra lekéri az adatbázisból az adatokat.
A felület így frissül az újonnan hozzáadott adatok megjelennek. 
A módosítás is ezt a komponenst használja. Url alapján dönt, hogy mi történik.

### Task.jsx
**Draggable** -be csomagoljuk, ezzel elérhetővé tesszük a mozgatáshoz szükséges propertyket.

A Task komponens a todo megjelenítése, és gombjaihoz tartozó logikák. Edit gomb megnyomására átirányít a módosítás oldalára, ahol a form-ba betölti a task adatait.
A törlés gombbal el tudjuk távolítani az adott todo-t.

### InnerList, TaskList.jsx

Szükséges a Task komponensek helyzetének frissítésére. Emiatt a felépítés miatt a dev tools segítségével látható, hogy mozgatáskor csak az érintett komponensek renderelődnek újra.

### Header.jsx, AddHeader.jsx, EditHeader.jsx

Különböző header komponensek, az oldaltól függően renderelődnek.







