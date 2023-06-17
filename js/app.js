// AFRAME.registerComponent('change-site', {
//     schema: {
//         img:{type: 'string'}//importante destacar el tipo de valor en comillas
//     },

//     init: function () {
//      var data = this.data;//this.data da a la referencia de lo que se pasa
//      var el =this.el;// daria referencia  al la entidad donde colocamos el componente
//      console.log(data.img)
//     el.addEventListener("mouseenter",()=>{
//         var mySky = document.querySelector("#my-sky")
//         mySky.setAttribute('src',data.img)
//         // console.log(data.img)
//     })
//     }


// });

AFRAME.registerComponent('change-site', {
    schema: {
        img: { type: 'string' },//importante destacar el tipo de valor en comillas
        zone: { type: 'string'},
        sound: { type: 'string'}
    },

    init: function () {
        var data = this.data;//this.data da a la referencia de lo que se pasa
        var el = this.el;// daria referencia  al la entidad donde colocamos el componente
        //  console.log(data.img)
        el.addEventListener("mouseenter", () => {

            var parentEntity = el.parentNode;// en este apartado hacemos referencia a la entidad padre donde se coloco el componente
            var grandParentEntity = parentEntity.parentNode;// Tomamos al anterior para sacar su padre de la entidad

            var thisAplane = parentEntity.querySelector("a-plane");// obtiene del padre el plano
            thisAplane.classList.remove('clickeable')// elimina la clase clickeable

            var allAPlane = grandParentEntity.querySelectorAll("a-plane");// obtiene todos los planos desde el abuelo   

            //?console.log(allAPlane)
            //!imprime en consola del browser en un array los planos que se encuentran en el abuelo o entorno general del scenario

            Object.keys(allAPlane).forEach(function (key) {// tenemos que recorrer la cantida de planos que obtuvo con allAPlane
                if (allAPlane[key] != thisAplane) {// el elemento que no hayamos hecho click
                    allAPlane[key].classList.add("clickeable");// le aniade la clase clickeable
                }
            });

            //?console.log(Object.keys(allAPlane)) 
            //! en este apartado consultamos si nos devuelve la indexacion de los planos que se encuentran gracias a Object.keys(dato)

            var allABox = grandParentEntity.querySelectorAll("a-box");
            Object.keys(allABox).forEach(function(key){
                allABox[key].setAttribute('visible','false');
            });

            var parentEntityABox = parentEntity.querySelector("a-box");
            parentEntityABox.setAttribute("visible","true");

            var allAText = grandParentEntity.querySelectorAll("a-text");
            Object.keys(allAText).forEach(function(key){
                allAText[key].setAttribute("color","gray");
            });

            var aText = thisAplane.querySelector("a-text");
            if (aText) aText.setAttribute("color","white");

            // para el circulo o imagen salida

            var allACircle = grandParentEntity.querySelectorAll("a-circle");
            Object.keys(allACircle).forEach(function(key){
                allACircle[key].setAttribute("visible","false")
                allACircle[key].classList.remove("clickeable");
            });
            
            var allACircleInThisZone = parentEntity.querySelectorAll(data.zone);
            Object.keys(allACircleInThisZone).forEach(function(key){
                allACircleInThisZone[key].setAttribute("visible","true")
                allACircleInThisZone[key].classList.add("clickeable");
            });



            var mySky = document.querySelector("#my-sky")
            mySky.setAttribute('src', data.img)
            // console.log(data.img)
            
            mySky.setAttribute("sounding",data.sound);
            if (mySky.getAttribute("sounding") == "true") {
                mySky.components.sound.playSound();
            }

        })
    }


});
