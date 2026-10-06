//deklarera variabler
const uppgifter = [];                         //tom array
let sistaTillagdaUppgift = -1;               //index på senasge tillagda uppgift basically
let senastToggladeIndex = -1;                //BEHÖVS FÖR ATT HÅLLA KOLL PÅ TOGGELN :(

const addKnapp = document.querySelector("#addListBtn");     //
const input = document.querySelector("#numbOfLists");       // input = de som skrivs i numbOfLists/runta
const ul = document.querySelector("#uppgiftLista");         //  ul = de som står i uppgiftlistan = DEN ÄR TOM I BÖRJAN
const antalKlarH2 = document.querySelector("#antalKlara");
const noTextP =document.querySelector("#noText");


//add hör grejern på knappen
addKnapp.addEventListener(
    "click",    
    textCheck
    
);

// lyssnar på hela uppgift listan
ul.addEventListener(
    "click",
    toggleKlar
);



//Skapa Function -  

function toggleKlar(event){
    const list = event.target.closest("li");        //hittar rätt <li> 
    

    if(!list){return;}
    const i = Number(list.dataset.i);               //görs till nummer för well lättare jämförelse
    

    if(event.target.classList.contains("delete-btn")){
        uppgifter.splice(i, 1);         //tar bort uppgiften ur arreyen
        senastToggladeIndex = -1;        // ingen animation vid radering :)
        reFreshList();                  //refreshar så den försvinner 
        return;                         //ends här
    }

    uppgifter[i].klar = !uppgifter[i].klar;  // häm,tar objekt i arrayen via i > ändrar/vänder på KLAR VÄRDET. Så true blir false och false blir true
    
    senastToggladeIndex = uppgifter[i].klar ? i: -1;     //bara animera OM uppgiften blir markerad som KLAR (borde fixa så den körs varje gång) och inte spelar om den för alla
    reFreshList();

}

function textCheck(){
        let text = input.value;             //text = input > de som skrivs in i numbOfLists som TEXT eller dens "VÄRDE"
       
        

        noTextP.textContent ="";            //nollställer felmedelandet varje gång den härfunk körs

        if(text.trim() === ""){             // OM texten tom oavsett om du bara HAR en massa MELLAN SLAG.  både typ å värdet ä tomt
            noTextP.textContent = "Input must not be empty";         //skrivs de här ut om inget är i rutan
            noTextP.classList.remove("blinka");     //tar bort blinka

            void noTextP.offsetWidth; // KANSKE nolsstäleler blink animationen så den kan spelas igen?

            noTextP.classList.add("blinka") //lägger tillbaka blinka klassen = animationen spelas



            return;         //return vad mer finns de att säga
        }

        //skapar ett nytt objekt och lägger till den i slutet av arrayen
        uppgifter.push({
            text: text, klar: false
        });

        sistaTillagdaUppgift = uppgifter.length -1;    // MAYBE KOMMERE IHÅG VILKET INDEX SOM ÄR NYTT? JUST MAYBE
        input.value =""; // tömmer iinput/textrutan varje gång du skrivit något i den. Så text inte stannar kvar

        //uppdaterar listan
        reFreshList();
}



function reFreshList(){

    ul.innerHTML ="";       //TÖM LISTAn

    uppgifter.forEach(function(uppgift,i){              // kollar både uppgift och i/index
        const list = document.createElement("li");             //
        list.dataset.i = i;             

        if(uppgift.klar){                               // OM uppgift är klar. Är bara ÄR DET SANT ELLER FALSKT så behövs inge ===
            list.classList.add("Klar");                 // gör så att 
            if(i === senastToggladeIndex){
                list.classList.add("bara-Toggled");
            }
        }
        //nu finns new-item och kan köra den animationen i csss så den fadar in
        if(i ===sistaTillagdaUppgift){
            list.classList.add("new-item");
        }

        //wrapern basically håller texten och soptunnan separat + banvända flex. Så jag slipper vöälja mellan punktlista eller en fin soptuna på höger sida
        const wrapper = document.createElement("div");
        wrapper.classList.add("li-wrapper");
    
        
        const egenText = document.createElement("span");    /* egen span åt texten*/
        egenText.classList.add("egenText");
        egenText.textContent = uppgift.text;

        const deleteBtn = document.createElement("span");
        deleteBtn.textContent= "🗑️";
        deleteBtn.classList.add("delete-btn");

        wrapper.appendChild(egenText);      /*texten först  sen kommer soptunnan*/
        wrapper.appendChild(deleteBtn);
        list.appendChild(wrapper);    
    


        ul.appendChild(list);                           // de som står i listan skrivs ut i UPPGIFTLISTAN + lägger till LISTAN

});

    senastToggladeIndex = -1;               // ja du  den ska ju spelas varje gång... refresh körs.. = så nollställer vi den
    sistaTillagdaUppgift =-1;               //nollställs animationen så den kan köras i nästa togle/delete
    countAntalKlara();                          //anropa den så antal färdiga uppdateras
}




function countAntalKlara(){
    let antal =0;

    uppgifter.forEach(function(uppgift){
        if(uppgift.klar){
            antal++;
        }
    });

    antalKlarH2.textContent = antal + " Completed";
}







