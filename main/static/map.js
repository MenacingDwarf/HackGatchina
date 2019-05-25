function init() {
        var names = document.getElementById("names").innerHTML;
        names = names.split('\'');
        names = JSON.parse(names.join('"'));


        multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: points,
            params: {
                //Тип маршрутизации - пешеходная маршрутизация.
                routingMode: 'pedestrian'
            }
        }, {
            // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
            boundsAutoApply: true
        });

    //Создаем кнопку.
    var changePointsButton = new ymaps.control.Button({
        data: {content: "Поменять местами точки А и В"},
        options: {selectOnClick: true}
    });

    //Объявляем обработчики для кнопки.
    changePointsButton.events.add('select', function () {
        multiRoute.model.setReferencePoints([pointB, pointA]);
    });

    changePointsButton.events.add('deselect', function () {
        multiRoute.model.setReferencePoints([pointA, pointB]);
    });

    // Создаем карту с добавленной на нее кнопкой.
    var myMap = new ymaps.Map('map', {
        center: [59.55971, 30.102793],
        zoom: 12,
        controls: [changePointsButton]
    }, {
        buttonMaxWidth: 300
    });



    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);

    for (var i=0; i<points.length; i++) {
        myMap.geoObjects.add(myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [points[i][0], points[i][1] - 0.002]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: names[i],
                //hintContent: 'Ну давай уже тащи'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
            // Метку можно перемещать.
            draggable: true
        }))
    }
}

ymaps.ready(init);