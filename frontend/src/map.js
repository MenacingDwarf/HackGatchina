function initMap(names, order, points) {

    //alert(cafe_locations);
    let npoints = [];
    let nnames = [];
    order.forEach(ord => {
        npoints = [...npoints, points[ord]];
        nnames = [...nnames, names[ord]]
    });

    multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: npoints,
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
        multiRoute.model.setReferencePoints([npoints[0], npoints[1]]);
    });

    changePointsButton.events.add('deselect', function () {
        multiRoute.model.setReferencePoints([npoints[1], npoints[0]]);
    });

    // Создаем карту с добавленной на нее кнопкой.
    var myMap = new ymaps.Map('map', {
        center: [59.55971, 30.102793],
        zoom: 7,
        controls: [changePointsButton]
    }, {
        buttonMaxWidth: 300
    });


    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);

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

ymaps.ready(initMap);