
$.ajax({
    url: 'data.json',
    dataType: 'json',
    success: function(data) {
    let shopItems ="";
    load();
    for(var key in data){
        shopItems+=`<div class="col-md-3">
                    <div class="card">
                    <img id=cardImg class="card-img-top" src="${data[key].link}" alt="${data[key].name}">
                    <div class="card-body">
                    <span id="thisID" style="display:none">${data[key].id}</span>
                    <h5 class="card-title">${data[key].name}</h5>
                    <p id="itemPrice" class="card-text">Price: ${data[key].price}</p>
                    <p class="card-text">${data[key].Description}</p>
                    
                    `;
          if(localStorage.getItem(data[key].id) == null){
             shopItems+=`<button class="btn btn-primary addToCart divId${data[key].id}"style="display:inline">Add to Cart</button>
                        </div>
                        </div>
                        </div>`
          }
          else {
              
              shopItems+=`<button class="btn btn-primary addToCart"style="display:none">Add to Cart</button>
              </div>
              </div>
              </div>`
          }
        }
            
   
    $("#mainShopItems").html(shopItems);
//Lägger in hela JSON objektet till LocalStorage



    $(".addToCart").click(function(){
        $(this).css("display","none");
        let thisitemID=parseInt($(this).parent().find("#thisID").text());
        let objk = data[thisitemID];
        let serializeJS = JSON.stringify(objk);
        localStorage.setItem(thisitemID,serializeJS);
       
        load();
    
    
})//FirstaddEND
}//AJAXeND
});
//LOAD listan till varukorgen (anropas efter varje click);
function load(){
    let listLoad = "";
    for (var i = 0; i < localStorage.length; i++) {
    var keyLS = JSON.parse(localStorage.getItem(localStorage.key(i)));
    listLoad += `<tr>
                 
                 <td>${keyLS.name}</td>
                 <td>${keyLS.price}</td>
                 <td>${keyLS.quantity}</td>
                 <td><span id="thisID" style="display:none">${keyLS.id}</span><button id=addOneItem class="btn btn-success addOneItem">+</button></td>
                 <td><span id="thisID" style="display:none">${keyLS.id}</span><button id=removeOneItem class="btn btn-danger removeOneItem">-</button></td>
                 <td><span id="thisID" style="display:none">${keyLS.id}</span><button id=removeItem class="btn btn-danger removeItem">Remove</button></td>
                 </tr>`
    
    
                }
     if(listLoad != ""){
         $("#cleanCart").css("display","inline");
         $("#checkOut").css("display", "inline");
         
     }
     document.getElementById('itsTboDy1').innerHTML = listLoad;
}

 //Tar bort allt från LocalStorage(varukorgen)
 $("#cleanCart").click(function(){
    localStorage.clear();
    $(".addToCart").css("display","inline");
    $("#cleanCart").css("display","none");
    $("#checkOut").css("display", "none");
    load();
})
//För resterande functioner fick jag använda $(document).on eftersom knappar genererades med kod, DOM hade ingen koppling så
//får DOM "lyssna" på vad som händer med nya element
//Lägga på en quantity
$(function(){
    $(document).on("click","#addOneItem",function(){
       
        let ID = $(this).parent().find("#thisID").text();
        let jOBJ = JSON.parse(localStorage.getItem(ID));           
        localStorage.removeItem(ID);
        jOBJ.quantity = (parseInt(jOBJ.quantity) + 1).toString();
        localStorage.setItem(ID,JSON.stringify(jOBJ)); 
        load();
    });
   });


//Ta bort en quantity om QUAN blir 0 , ta bort elementet från LocalStorage helt åt hållet
$(function(){
    $(document).on("click","#removeOneItem",function(){
        let ID = $(this).parent().find("#thisID").text();
        let jOBJ = JSON.parse(localStorage.getItem(ID));
        localStorage.removeItem(ID);
        let counter = parseInt(jOBJ.quantity) - 1;
        if(counter == 0){
            localStorage.removeItem(ID);
            if(localStorage.length==0){
                $("#cleanCart").css("display","none");
                $("#checkOut").css("display", "none");
            }
            $(`.divId${ID}`).css("display","block");
            load();
        }
        else{
            jOBJ.quantity = counter;
            localStorage.setItem(ID,JSON.stringify(jOBJ));
        }
         load();
                                                       })
            })
//Ta bort hela elementet från LocalStorage
$(function(){
    $(document).on("click", "#removeItem",function(){
        let ID = $(this).parent().find("#thisID").text();
        localStorage.removeItem(ID);
        if(localStorage.length==0){
            $("#cleanCart").css("display","none");
        }
        $(`.divId${ID}`).css("display","block");
        load();
    
        
    })
})
