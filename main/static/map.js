function send_food(elem) {
    console.log('hi');
    window.location.href += "&food=" + food_text.value;
}

var food = document.getElementById("sendFood");
food.setAttribute("onclick", "send_food(this)");
var food_text = document.getElementById("food-text");

function init() {
    var names = document.getElementById("names").innerHTML;
    names = names.split('"');
    //alert(names.join('"'));
    names = names.join('\\"');
    names = names.split('\'');
    //alert(names.join('"'));
    names = names.join('"');
    names = JSON.parse(names);
    //alert(names);

    var cafes = document.getElementById("cafes").innerHTML;
    cafes = cafes.split('"');
    //alert(names.join('"'));
    cafes = cafes.join('\\"');
    cafes = cafes.split('\'');
    //alert(names.join('"'));
    cafes = cafes.join('"');
    cafes = JSON.parse(cafes);


    let npoints = [];
    let nnames = [];
    console.log(order);
    order.forEach(ord => {
        npoints = [...npoints, points[ord]];
        nnames = [...nnames, names[ord]]
    });

    //alert(cafe_locations);

    multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: npoints,
        params: {
            //Тип маршрутизации - пешеходная маршрутизация.
            routingMode: 'pedestrian'
        }
    }, {
        // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
        //boundsAutoApply: true
    });


    // Создаем карту с добавленной на нее кнопкой.
    var myMap = new ymaps.Map('map', {
        center: [59.55971, 30.102793],
        zoom: 15,
        controls: ['smallMapDefaultSet']
    }, {
        buttonMaxWidth: 300
    });


    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);

    //alert(cafes);
    for (var i = 0; i < cafe_locations.length; i++) {
        //alert(cafe_locations[i]);
        var cafe = {
            name: cafes[i],
            coords: cafe_locations[i]
        };
        cafe.name = cafe.name.split(' ');
        cafe.name = cafe.name.join('+');
        var link = window.location.href + "&cafe=" + JSON.stringify(cafe);
        myMap.geoObjects.add(new ymaps.Placemark(cafe_locations[i], {
            balloonContent: '<p>' + cafes[i] + '</p><a href='+link+'><button><p style="color: green">Добавить в маршрут</p></button></a>'
        }, {
            preset: 'islands#redSportIcon'
        }));
    }

    console.log(points.join('\n'));
    for (var i = 0; i < npoints.length; i++) {
        myMap.geoObjects.add(myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [npoints[i][0], npoints[i][1] - 0.002]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: nnames[i],
                //hintContent: 'Ну давай уже тащи'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
            // Метку можно перемещать.
            draggable: true
        }));
    }
}


ymaps.ready(init);