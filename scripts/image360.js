// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

var viewer = PhotoSphereViewer({
    container: 'container-360-laundry',

    panorama: 'images/lavanderia-360.jpg',
    default_fov: 70,
    default_lat: Math.radians(0),
    default_long: Math.radians(0),
    // latitude_range: [Math.radians(-75), Math.radians(35)],
    latitude_range: [Math.radians(0), Math.radians(0)],
    longitude_range: [Math.radians(-135), Math.radians(140)],

    time_anim: false,
    mousewheel: false,
    size: {
        width: '100%',
        height: '100%'
    }
});

viewer.hideNavbar();

viewer.on('ready', function() {

    viewer.addMarker({
        id: 'marker-lavadora',
        image: 'images/pin.png',
        width: 24,
        height: 24,
        x: 2157,
        y: 1358
    });

    viewer.addMarker({
        id: 'marker-porta-lavanderia',
        image: 'images/pin.png',
        width: 24,
        height: 24,
        x: 3123,
        y: 1113
    });

    viewer.on('select-marker', function(marker) {
      //alert('Select ' + marker.id);
      var target;

      if(marker.id == 'marker-lavadora') {
        target = 'washer';
        openModal(target);

      } else if(marker.id == 'marker-porta-lavanderia') {
        $('.menu-white-line .btn-kitchen').parent().addClass('active').siblings().removeClass('active');
        $('#wrapper-white-line .slider-pages').slick('slickGoTo', 1);
      }
    });
});


var viewer2 = PhotoSphereViewer({
    container: 'container-360',

    panorama: 'images/cozinha-360.jpg',
    default_fov: 60,
    default_lat: Math.radians(-8),
    default_long: Math.radians(-5),
    latitude_range: [Math.radians(-50), Math.radians(18.5)],
    latitude_range: [Math.radians(-8), Math.radians(-8)],
    longitude_range: [Math.radians(-140), Math.radians(115)],

    time_anim: false,
    mousewheel: false,
    size: {
        width: '100%',
        height: '100%'
    }
});

viewer2.hideNavbar();

viewer2.on('ready', function() {
    viewer2.addMarker({
        id: 'marker-coifa',
        image: 'images/pin.png',
        width: 24,
        height: 24,
        x: 1679,
        y: 974
    });

    viewer2.addMarker({
        id: 'marker-cooktop',
        image: 'images/pin.png',
        width: 24,
        height: 24,
        x: 1668,
        y: 1179
    });

    viewer2.addMarker({
        id: 'marker-microondas',
        image: 'images/pin.png',
        width: 24,
        height: 24,
        x: 2115,
        y: 1101
    });

    viewer2.addMarker({
        id: 'marker-forno',
        image: 'images/pin.png',
        width: 24,
        height: 24,
        x: 2129,
        y: 1237
    });

    viewer2.addMarker({
        id: 'marker-lava-louca',
        image: 'images/pin.png',
        width: 24,
        height: 24,
        x: 2733,
        y: 1267
    });

    viewer2.addMarker({
        id: 'marker-refrigerador',
        image: 'images/pin.png',
        width: 24,
        height: 24,
        x: 2447,
        y: 1051
    });

    viewer2.addMarker({
        id: 'marker-porta-cozinha',
        image: 'images/pin.png',
        width: 24,
        height: 24,
        x: 1146,
        y: 1114
    });

    viewer2.on('select-marker', function(marker) {
      //alert('Select ' + marker.id);
      var target;

      if(marker.id == 'marker-coifa') {
        target = 'coif';
        openModal(target);

      } else if(marker.id == 'marker-cooktop') {
        target = 'cooktop';
        openModal(target);

      } else if(marker.id == 'marker-microondas') {
        target = 'microwave';
        openModal(target);

      } else if(marker.id == 'marker-forno') {
        target = 'oven';
        openModal(target);

      } else if(marker.id == 'marker-refrigerador') {
        target = 'refrigerator';
        openModal(target);

      } else if(marker.id == 'marker-lava-louca') {
        target = 'dishwasher';
        openModal(target);

      } else if(marker.id == 'marker-porta-cozinha') {
        $('.menu-white-line .btn-laundry').parent().addClass('active').siblings().removeClass('active');
        $('#wrapper-white-line .slider-pages').slick('slickGoTo', 2);
      }
    });
});
