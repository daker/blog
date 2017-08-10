---
layout: post.html
title: Fix Morocco borders on Google Maps (2017 version)
tags: [gmap]
---
Since the [first solution][0] helped many moroccan developers, i am going to update it to use some new ES6 features like ```Async``` and ```Arrows```.

The first thing you need to do is create a simple map Google Maps JavaScript API :

``` javascript
<script type="text/javascript">
    init = () => {
        const mapOptions = {
            zoom: 5,
            center: new google.maps.LatLng(29.54619, -7.36133),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        const map = new google.maps.Map(document.getElementById("map"), mapOptions);
    };
</script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=init">
</script>
```

``` html
<div id="map" style="width:650px; height:500px;"></div>
```

As you can see the map is splitted in two. To fix it we need to set ```administrative.country``` feature visibility to off, which will remove the borders and the countries, then you need to load custom Geodata from a ```FusionTablesLayer``` source and draw the borders again :

``` javascript
<script type="text/javascript">
    init = () => {
        const mapOptions = {
            zoom: 5,
            center: new google.maps.LatLng(29.54619, -7.36133),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        const map = new google.maps.Map(document.getElementById("map"), mapOptions),
        mapStyles = [{featureType: "administrative.country", stylers: [{ visibility: "off" }]}],
        mapType = new google.maps.StyledMapType(mapStyles , {name: "Maroc"});
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
    };
</script>
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=init">
</script>
```
Note that you will need an [API key][1] to use the Google Maps JavaScript API, and finally the div that will hold the map :

``` html
<div id="map" style="width:650px; height:500px;"></div>
```

And the finale result will look like this

![Morocco Map](/assets/posts/morocco.png)

[0]: http://daker.me/2015/01/fix-morocco-borders-on-google-maps.html
[1]: https://developers.google.com/maps/documentation/javascript/get-api-key
