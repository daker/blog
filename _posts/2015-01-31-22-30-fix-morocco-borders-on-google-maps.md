---
layout: post.html
title: Fix Morocco borders on Google Maps
tags: [gmap]
---
Everyone needs to pay attention when using Morocco Map, specially if it doesn't include the Sahara, so here i'll explain how to fix the borders in Google Map.

The first thing you need to do is to create a simple map :

``` javascript
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"> </script>
<script type="text/javascript">
    var map;
    var morocco = new google.maps.LatLng(29.54619, -7.36133);
    function init() {
        var mapOptions = {
            zoom: 5,
            center: morocco,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
    }
    google.maps.event.addDomListener(window, 'load', init);
</script>
```

``` html
<div id="map" style="width:650px; height:500px;"></div>
```

As you can see the map is splitted in two, to fix that you need to hide ```administrative.country``` map feature, which will remove the borders and the countries names, then you need to use ```FusionTablesLayer``` to load custom Geodata so we can draw the borders

``` javascript
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"> </script>
<script type="text/javascript">
    var map;
    var mapStyles = [{featureType: "administrative.country",stylers: [{ visibility: "off" }]}];
    var mapType = new google.maps.StyledMapType(mapStyles ,{name: "Maroc"});
    var morocco = new google.maps.LatLng(29.54619, -7.36133);
    function init() {
        var mapOptions = {
            zoom: 5,
            center: morocco,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        map.mapTypes.set('maroc', mapType );
        map.setMapTypeId('maroc');
        layer = new google.maps.FusionTablesLayer({
                    query: {
                select: 'geometry',
                from: '1S4aLkBE5u_WS0WMVSchhBgMLdAARuPEjyW4rs20',
                    where: "col1 contains 'MAR'"
                },
                styles: [{
                    polylineOptions: {
                        strokeColor: "#333333",
                        strokeWeight: 2
                    },
                }],
                suppressInfoWindows: true,
        });
        layer.setMap(map);
    }
    google.maps.event.addDomListener(window, 'load', init);
</script>
```
``` html
<div id="map" style="width:650px; height:500px;"></div>
```

And the finale result will look like this

![Morocco Map](/assets/posts/morocco.png)
