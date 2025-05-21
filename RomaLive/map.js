mapboxgl.accessToken = "pk.eyJ1Ijoia2V3ZXJuZXIiLCJhIjoiY2lqMGprNjVmMDA0NnYwbTVibHh5bWx6aSJ9.zB8-7hnUeIeYJsqzOjJ2Fg";

if (!mapboxgl.supported()) {
    alert("Your browser session crashed. Maybe your hardware and/or software does not support GL operations. If it is persistent, you should think about an update.");
} else {
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/kewerner/cjhubrvva0n2d2rlm3451o80u",
        center: [12.465859, 41.89875],
        hash: true,
        zoom: 15.70,
        pitch: 0,
        maxPitch: 0,
        bearing: 17.7,
        antialias: true
    });
}

const bounds = [
    [12.40, 41.81], // [west, south]
    [12.64, 41.95]  // [east, north]
];

map.setMaxBounds(bounds);

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
    input.onclick = (layer) => {
        const layerId = layer.target.id;
        map.setStyle('mapbox://styles/kewerner/' + layerId);
    };
}


map.on("style.load", function () {

// Layers
// Sequence is: base => core => lost => croads

//BASE Layer
    map.addSource("base", {
        "type": "geojson",
        "data": "data/wdosmlupa_rome_base.geojson"
    });

    map.addLayer({
        "id": "basepolygon",
        "type": "fill",
        "slot": "top",
        "source": "base",
        "layout": {},
        "paint": {
            "fill-color": 'rgb(166,122,120)',
            "fill-outline-color": "white",
            "fill-opacity": 1
        },
        'filter': ['==', '$type', 'Polygon'],
        "interactive": true
    });
    map.addLayer({
        "id": "baseline",
        "type": "line",
        "source": "base",
        "layout": {},
        "paint": {
            "line-width": 6,
            "line-color": 'rgb(166,122,120)',
            "line-opacity": 1
        },
        'filter': ['==', '$type', 'LineString'],
        "interactive": true
    });
    map.addLayer({
        'id': 'basepoint',
        'type': 'circle',
        'source': 'base',
        'paint': {
            'circle-radius': 8,
            'circle-color': 'rgb(166,122,120)',  //149,77,72//rgb(142,28,21)
            "circle-stroke-width": 1,
            "circle-stroke-color": 'white',
            "circle-stroke-opacity": 1,
            "circle-opacity": 1
        },
        'filter': ['==', '$type', 'Point'],
        "interactive": true
    });

//CORE Layer

    map.addSource("core", {
        "type": "geojson",
        "data": "data/wdosmlupa_rome_core.geojson"
    });

    map.addLayer({
        "id": "corepolygon",
        "type": "fill",
        "slot": "top",
        "source": "core",
        "layout": {},
        "paint": {
            "fill-color": 'rgb(166,122,120)',
            "fill-outline-color": "white",
            "fill-opacity": 1
        },
        'filter': ['==', '$type', 'Polygon'],
        "interactive": true
    });
    map.addLayer({
        "id": "coreline",
        "type": "line",
        "source": "core",
        "layout": {},
        "paint": {
            "line-width": 6,
            "line-color": 'rgb(166,122,120)',
            "line-opacity": 1
        },
        'filter': ['==', '$type', 'LineString'],
        "interactive": true
    });
    map.addLayer({
        'id': 'corepoint',
        'type': 'circle',
        'source': 'core',
        'paint': {
            'circle-radius': 8,
            'circle-color': 'rgb(166,122,120)',  //149,77,72//rgb(142,28,21)
            "circle-stroke-width": 1,
            "circle-stroke-color": 'white',
            "circle-stroke-opacity": 1,
            "circle-opacity": 1
        },
        'filter': ['==', '$type', 'Point'],
        "interactive": true
    });

//LOST Layer

    map.addSource("lost", {
        "type": "geojson",
        "data": "data/wdosmlupa_rome_core.geojson"
    });

    map.addLayer({
        "id": "lostpolygon",
        "type": "fill",
        "slot": "top",
        "source": "lost",
        "layout": {},
        "paint": {
            "fill-color": 'rgb(166,122,120)',
            "fill-outline-color": "white",
            "fill-opacity": 1
        },
        'filter': ['==', '$type', 'Polygon'],
        "interactive": true
    });

//CROADS Layer

    map.addSource("croads", {
        "type": "geojson",
        "data": "data/wdosmlupa_rome_croads.geojson"
    });

    map.addLayer({
        "id": "croadsline",
        "type": "line",
        "source": "croads",
        "layout": {},
        "paint": {
            "line-width": 6,
            "line-color": 'rgb(166,122,120)',
            "line-opacity": 1
        },
        'filter': ['==', '$type', 'LineString'],
        "interactive": true
    });

    //Wikidata Labels on top
    map.addLayer({
        'id': 'baselabel',
        'type': 'symbol',
        'source': 'base',
        'layout': {
            // 'icon-image': 'circle-15',
            // 'icon-size': 0.5,
            'text-field': ['get', 'name'],
            'text-font': ['Noto Sans SemiCondensed Medium'],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 1,
            'text-justify': 'auto',
            'text-size': 14
        },
        'paint': {
            'text-color': 'rgb(83,19,15)',
            'text-halo-width': 1,
            'text-halo-blur': 0.5,
            'text-halo-color': 'white'
        },
        "interactive": true
    });
    map.addLayer({
        'id': 'corelabel',
        'type': 'symbol',
        'source': 'core',
        'layout': {
            // 'icon-image': 'circle-15',
            // 'icon-size': 0.5,
            'text-field': ['get', 'name'],
            'text-font': ['Noto Sans SemiCondensed Medium'],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 1,
            'text-justify': 'auto',
            'text-size': 14
        },
        'paint': {
            'text-color': 'rgb(83,19,15)',
            'text-halo-width': 1,
            'text-halo-blur': 0.5,
            'text-halo-color': 'white'
        },
        "interactive": true
    });
    map.addLayer({
        'id': 'lostlabel',
        'type': 'symbol',
        'source': 'lost',
        'layout': {
            // 'icon-image': 'circle-15',
            // 'icon-size': 0.5,
            'text-field': ['get', 'name'],
            'text-font': ['Noto Sans SemiCondensed Medium'],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 1,
            'text-justify': 'auto',
            'text-size': 14
        },
        'paint': {
            'text-color': 'rgb(83,19,15)',
            'text-halo-width': 1,
            'text-halo-blur': 0.5,
            'text-halo-color': 'white'
        },
        "interactive": true
    });
    map.addLayer({
        'id': 'croadslabel',
        'type': 'symbol',
        'source': 'croads',
        'layout': {
            // 'icon-image': 'circle-15',
            // 'icon-size': 0.5,
            'text-field': ['get', 'name'],
            'text-font': ['Noto Sans SemiCondensed Medium'],
            'text-variable-anchor': ['bottom'],
            'text-radial-offset': 1,
            'text-justify': 'auto',
            'text-size': 14
        },
        'paint': {
            'text-color': 'rgb(83,19,15)',
            'text-halo-width': 1,
            'text-halo-blur': 0.5,
            'text-halo-color': 'white'
        },
        "interactive": true
    });

    //ArcheoSitar
    // map.addSource('archeositar', {
    //     type: 'vector',
    //     url: 'mapbox://kewerner.8s2mayod'
    // });
    // map.addLayer(
    //     {
    //         'id': 'archeositarline',
    //         'type': 'fill',
    //         'source': 'archeositar',
    //         'source-layer': 'archeositar_conversion-511ksz',
    //         'layout': {},
    //         'paint': {
    //             "fill-color": "transparent", //darkblue
    //             "fill-opacity": 0.05
    //         },
    //         "interactive": true
    //     });

});

document.getElementById("myData").innerHTML = '';

// only used for iframes from lupa list:
function showframe() {
    document.getElementById("frameHolder").style.display = "block";
    document.getElementById("frame").style.display = "block";
}

// PLEIADES: https://pleiades.stoa.org/places/874299107  NOT IFRAME COMPATIBLE



map.on("click", function (e) {

    $("#welcome").fadeOut('5000');

    var features = map.queryRenderedFeatures(e.point, {
        layers: ['basepolygon', 'baseline', 'basepoint', 'corepolygon', 'coreline', 'corepoint', 'lostpolygon','croadsline']
    });

    //important for resetting
    if (!features.length) {
        target.style.visibility = 'hidden';
        console.log('no data under mouse');
    }

    var llist = features[0].properties.references;

    var dlist = features[0].properties.textreferences;

    var wdata = features[0].properties.wikidata;

    target = document.getElementById("myData");
    target.innerHTML = '';

    if (wdata) {

        console.log('wdata: ' + wdata + ' | wdata length: ' + wdata.length);

        const url = 'https://www.wikidata.org/w/api.php?action=wbgetentities&origin=*&format=json&ids=' + wdata;

        fetch(url)   //, {mode: "no-cors"}
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                appendData(data);
            })
            .catch(function (data) {
                console.log('error : ' + data);
            });


        function appendData(data) {
            const mainContainer = document.getElementById("myData");
            mainContainer.style.visibility = 'visible';
            mainContainer.style.display = 'block';


            const header = document.createElement("h1");
            header.innerHTML = jsonpath.query(data, '$..labels.it.value');
            mainContainer.appendChild(header);

            const wq = document.createElement("button");
            wq.innerHTML += '<span id="wq" title="Property ' + wdata + '">Wikidata</span>';
            mainContainer.appendChild(wq);

            if (jsonpath.value(data, '$..sitelinks.itwiki')) {
                const thumb = document.createElement("button");
                thumb.innerHTML += '<span id="wikipedia" title="' + jsonpath.query(data, '$..sitelinks.itwiki.title') + '">Wikipedia</span>';
                mainContainer.appendChild(thumb);
            }
            if (jsonpath.value(data, '$..claims.P227')) {
                const gnd = document.createElement("button");
                gnd.innerHTML = '<span id="bhmpibib" title="GND ' + jsonpath.query(data, '$..claims.P227[0].mainsnak.datavalue.value') + '" >Biblioteca</span>';
                mainContainer.appendChild(gnd);
            }
            if (jsonpath.value(data, '$..claims.P12855')) {
                const bhmpi = document.createElement("button");
                bhmpi.innerHTML = '<span id="bhmpifoto" title="OBJ ' + jsonpath.query(data, '$..claims.P12855[0].mainsnak.datavalue.value') + '">Fototeca</span>';
                mainContainer.appendChild(bhmpi);
            }

            const fotoapi = document.createElement("button");
            fotoapi.innerHTML += '<span id="fotoapi" title="Search for ' + jsonpath.query(data, '$..labels.it.value') + '">Fototeca API</span>';
            mainContainer.appendChild(fotoapi);

            const graph = document.createElement("button");
            graph.innerHTML = '<span id="graph" title="Wikidata BlazeGraph" >Interactive Graph</span>';
            mainContainer.appendChild(graph);
            // if (jsonpath.value(data, '$..claims.P625')) {
            //     const location = document.createElement("p");
            //     location.innerHTML = '<span class="block" id="map" title="Wikidata Property P625">Interactive Map</span>';
            //     mainContainer.appendChild(location);
            // }
            // VIAF is blocked
            // if (jsonpath.value(data, '$..claims.P214')) {
            //     const viaf = document.createElement("button");
            //     viaf.innerHTML = '<span id="viaf" title="VIAF ' + jsonpath.query(data, '$..claims.P214[0].mainsnak.datavalue.value') + '">VIAF</span>';
            //     mainContainer.appendChild(viaf);
            // }
            if (jsonpath.value(data, '$..claims.P12835')) {
                const census = document.createElement("button");
                census.innerHTML += '<span id="census" title="Census ' + jsonpath.query(data, '$..claims.P12835[0].mainsnak.datavalue.value') + '">Census</span>';
                mainContainer.appendChild(census);
            }
            // ARCHINFORM is blocked
            // if (jsonpath.value(data, '$..claims.P5383')) {
            //     const archinform = document.createElement("button");
            //     archinform.innerHTML += '<span id="archinform" title="ArchInform ' + jsonpath.query(data, '$..claims.P5383[0].mainsnak.datavalue.value') + '">ArchInform</span>';
            //     mainContainer.appendChild(archinform);
            // }
            if (jsonpath.value(data, '$..claims.P5611')) {
                const beweb = document.createElement("button");
                beweb.innerHTML += '<span id="beweb" title="BeWeb ' + jsonpath.query(data, '$..claims.P5611[0].mainsnak.datavalue.value') + '">BeWeb</span>';
                mainContainer.appendChild(beweb);
            }
            if (jsonpath.value(data, '$..claims.P8068')) {
                const topos = document.createElement("button");
                topos.innerHTML += '<span id="topostext" title="ToposText ' + jsonpath.query(data, '$..claims.P8068[0].mainsnak.datavalue.value') + '">ToposText</span>';
                mainContainer.appendChild(topos);
            }
            if (jsonpath.value(data, '$..claims.P1669')) {
                const cona = document.createElement("button");
                cona.innerHTML += '<span id="cona" title="CONA ' + jsonpath.query(data, '$..claims.P1669[0].mainsnak.datavalue.value') + '" >CONA</span>';
                mainContainer.appendChild(cona);
            }
            if (jsonpath.value(data, '$..claims.P5782')) {
                const dbunico = document.createElement("button");
                dbunico.innerHTML += '<span id="dbunico" title="DBUnico ' + jsonpath.query(data, '$..claims.P5782[0].mainsnak.datavalue.value') + '">DBUnico</span>';
                mainContainer.appendChild(dbunico);
            }
            // no conditions neeeded, we always have the name
                const iccdfoto = document.createElement("button");
                iccdfoto.innerHTML = '<a target="website" href="https://fotografia.cultura.gov.it/fotografie#h.lrcr=Lazio&h.lrcp=Roma&h.lrcc=Roma&k.text=' + jsonpath.query(data, '$..labels.it.value') + '"><span id="iccdfoto" title="ICCD Fotografie per ' + name + '">ICCD Fotografie</span></a>';
                mainContainer.appendChild(iccdfoto);
            if (jsonpath.value(data, '$..claims.P6287')) {
                const iccdcf = document.createElement("button");
                iccdcf.innerHTML += '<span id="iccdcf" title="ICCD-CF ' + jsonpath.query(data, '$..claims.P6287[0].mainsnak.datavalue.value') + '">ICCD-CF</span>';
                mainContainer.appendChild(iccdcf);
            }
            if (jsonpath.value(data, '$..claims.P6286')) {
                const iccds = document.createElement("button");
                iccds.innerHTML += '<span id="iccds" title="ICCD-S ' + jsonpath.query(data, '$..claims.P6286[0].mainsnak.datavalue.value') + '">ICCD-S</span>';
                mainContainer.appendChild(iccds);
            }
            if (jsonpath.value(data, '$..claims.P1949')) {
                const cultura = document.createElement("button");
                cultura.innerHTML += '<span id="cultura" title="CI ' + jsonpath.query(data, '$..claims.P1949[0].mainsnak.datavalue.value') + '">Cultura Italia</span>';
                mainContainer.appendChild(cultura);
            }
            if (jsonpath.value(data, '$..claims.P9050')) {
                const iccdsite = document.createElement("button");
                iccdsite.innerHTML = '<a target="website" href="https://catalogo.beniculturali.it/' + jsonpath.query(data, '$..claims.P9050[0].mainsnak.datavalue.value') + '"><span id="iccdsite" title="ICCD Site ID ' + jsonpath.query(data, '$..claims.P9051[0].mainsnak.datavalue.value') + '">ICCD Site</span></a>';
                mainContainer.appendChild(iccdsite);
            }
            // if (jsonpath.value(data, '$..claims.P1566')) {
            //     const geonames = document.createElement("p");
            //     geonames.innerHTML += '<span class="block" id="geonames" title="Wikidata Property P1566">GeoNames ' + jsonpath.query(data, '$..claims.P1566[0].mainsnak.datavalue.value') + '</span>';
            //     mainContainer.appendChild(geonames);
            // }
            if (jsonpath.value(data, '$..claims.P10510')) {
                const arachne = document.createElement("button");
                arachne.innerHTML += '<span id="arachne" title="Arachne ' + jsonpath.query(data, '$..claims.P10510[0].mainsnak.datavalue.value') + '">Arachne</span>';
                mainContainer.appendChild(arachne);
            }
            if (jsonpath.value(data, '$..claims.P373')) {
                const commons = document.createElement("button");
                commons.innerHTML += '<span id="commons" title="Commons ' + jsonpath.query(data, '$..claims.P373[0].mainsnak.datavalue.value') + '">Commons</span>';
                mainContainer.appendChild(commons);
            }
            //start thumbnail
            if (jsonpath.value(data, '$..claims.P18')) {
                const thumb = document.createElement("div");
                thumb.setAttribute("id", "dThumb");
                thumb.innerHTML += '<img alt="[no reference image]" src="https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURI(jsonpath.query(data, '$..claims.P18[0].mainsnak.datavalue.value')) + '"/>';
                mainContainer.appendChild(thumb);
            }

            //for dlib and rara
            if (dlist || llist) {
                document.getElementById("frameHolder").innerHTML = '<iframe src="" style="display:none" id="frame" name="liveframe" title="Biblioteca Digitale" width="100%" height="100%" scrolling="yes" frameborder="no" allow=""></iframe>';
            }

                // start dlib live
            if (dlist) {
//                document.getElementById("frameHolder").innerHTML = '<iframe src="" style="display:none" id="frame" name="dlibframe" title="Biblioteca Digitale" width="100%" height="100%" scrolling="yes" frameborder="no" allow=""></iframe>';
                const dlib = document.createElement("div");
                dlib.setAttribute("id", "dlib");
                dlib.innerHTML += '<br/><hr/><p>Bibliotheca Digitale<p><hr/>';
                dlib.innerHTML += '<p>R. Krautheimer, Profile of a city 312 - 1308 (1980)<p>';
                const myObj = JSON.parse(dlist);
                $.each(myObj, function (key, val) {
                    //console.log(val.year + ' ' + val.reference);
                    dlib.innerHTML += `<li><a onclick="showframe()"  title="${val.canvas}" class="link" target="liveframe" href="https://viewer-f044f0.pages.mpcdf.de/?manifest=https://dlib.biblhertz.it/iiif/dm5055800/manifest.json&view=annotations&canvas=${Number(val.canvas)}">p.${val.canvas}</a> &nbsp; […] ${val.chars} […]</li>`; // ↗
                });
                mainContainer.appendChild(dlib);
            }
            // end lupa live

            // start lupa live
            if (llist) {
//                document.getElementById("frameHolder").innerHTML = '<iframe src="" style="display:none" id="frame" name="lupaframe" title="Rara Biblioteca" width="100%" height="100%" scrolling="yes" frameborder="no" allow=""></iframe>';
                const lupa = document.createElement("div");
                lupa.setAttribute("id", "dlupa");
                lupa.innerHTML += '<br/><hr/><p>Rari Bibliotheca<p><hr/>';
                const myObj = JSON.parse(llist);
                $.each(myObj, function (key, val) {
                    //console.log(val.year + ' ' + val.reference);
                    lupa.innerHTML += `<li><a onclick="showframe()"  title="${val.reference}" class="link" target="liveframe" href="${val.link}">${val.year}</a> &nbsp; ${val.citation}</li>`; // ↗
                });
                mainContainer.appendChild(lupa);
            }
            // end lupa live

            // start wikipedia live
            if (jsonpath.query(data, '$..sitelinks.itwiki.title')) {
                var xhr = new XMLHttpRequest();
                var url = 'https://it.wikipedia.org//w/api.php?action=query&format=json&origin=*&prop=revisions&formatversion=2&prop=extracts&titles=' + jsonpath.query(data, '$..sitelinks.itwiki.title');   //versione stesa
                xhr.open('GET', url, true);
                xhr.onload = function () {
                    // Parse the request into JSON
                    var data = JSON.parse(this.response);
                    for (var i in data.query.pages) {
                        var title = data.query.pages[i].title;
                        var text = data.query.pages[i].extract;
                        const wikitext = document.createElement("div");
                        wikitext.setAttribute("id", "dWPedia");
                        //wikitext.innerHTML += '<div><h4>' + title + '</h4><div>' + text + '<br/>Licenza <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.it">CC BY-SA</a></div></div>';
                        wikitext.innerHTML += '<br/><hr/><p>Wikipedia</p><hr/><div>' + text + '<p style="text-align: right">Estratto Wikipedia, Licenza <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.it">CC BY-SA 4</a>4.</p></div>';
                        mainContainer.appendChild(wikitext);
                    }
                }
                xhr.send();
            }
            //end live wikipedia


            $("#myData").on('click', '#wq', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://wikidata.org/wiki/' + wdata + '?lang=it" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#bhmpibib', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://aleph.mpg.de/F/?func=find-a&local_base=KUB01&find_code=IGD&request=' + jsonpath.query(data, '$..claims.P227[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
                // document.getElementById("frameHolder").innerHTML = '<iframe src="https://aleph.mpg.de/F/?func=find-a&find_code=PER&request=&request_op=AND&find_code=WTI&request=&request_op=AND&find_code=WKO&request=&request_op=AND&filter_code_1=WSP&filter_request_1=&filter_code_2=WYR&filter_request_2=&filter_code_3=WYR&filter_request_3=&filter_code_4=WEF&filter_request_4=&local_base=KUB01&filter_code_7=WEM&filter_code_8=WAK&find_code=IGD&request=' + jsonpath.query(data, '$..claims.P227[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#bhmpifoto', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://foto.biblhertz.it/document/obj/' + jsonpath.query(data, '$..claims.P12855[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#fotoapi', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://dlib.biblhertz.it/fotoapi?q=' + jsonpath.query(data, '$..labels.it.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#graph', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://query.wikidata.org/embed.html#%23defaultView%3AGraph%0ASELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20%3Fimage%20%3Farchitect%20%3FarchitectLabel%20%3Fcreator%20%3FcreatorLabel%20%3Fcommissioned_by%20%3Fcommissioned_byLabel%20%3Fdesigned_by%20%3Fdesigned_byLabel%20%3Fnotable_work%20%3Fnotable_workLabel%20%3Fcollection%20%3FcollectionLabel%20%3Fhas_works_in_the_collection%20%3Fhas_works_in_the_collectionLabel%20%3Fconnects_with%20%3Fconnects_withLabel%20%3Fadjacent_building%20%3Fadjacent_buildingLabel%20%3Fpart_of%20%3Fpart_ofLabel%20%3Fhas_part%20%3Fhas_PartLabel%20%3Fstructure_replaces%20%3Fstructure_replacesLabel%20%3Fplace_of_burial%20%3Fplace_of_burialLabel%20%3Flocation%20%3FlocationLabel%20%3Flocated_on_street%20%3Flocated_on_streetLabel%20%3Flocation_of_discovery%20%3Flocation_of_discoveryLabel%20%3Fdepicts%20%3FdepictsLabel%20%3Fdepth%20WHERE%20{%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Farchitect%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP84.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fcreator%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP170.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fcommissioned_by%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP88.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fdesigned_by%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP287.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fnotable_work%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP800.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fconnects_with%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP2789.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fadjacent_building%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP3032.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fpart_of%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP361.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fhas_part%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP527.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fstructure_replaces%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP1398.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fcollection%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP195.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fhas_works_in_the_collection%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP6379.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fplace_of_burial%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP119.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Flocation%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP276.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Flocated_on_street%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP669.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Flocation_of_discovery%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%203%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP189.%0A%20%20%20%20}%0A%20%20}%0A%20%20UNION%0A%20%20{%0A%20%20%20%20SERVICE%20gas%3Aservice%20{%0A%20%20%20%20%20%20gas%3Aprogram%20gas%3AgasClass%20%22com.bigdata.rdf.graph.analytics.SSSP%22%3B%0A%20%20%20%20%20%20%20%20gas%3Ain%20wd%3A' + wdata + '%3B%0A%20%20%20%20%20%20%20%20gas%3AtraversalDirection%20%22Undirected%22%3B%0A%20%20%20%20%20%20%20%20gas%3Aout%20%3Fitem%3B%0A%20%20%20%20%20%20%20%20gas%3Aout1%20%3Fdepth%3B%0A%20%20%20%20%20%20%20%20gas%3Aout2%20%3Fdepicts%3B%0A%20%20%20%20%20%20%20%20gas%3AmaxVisited%201%20%3B%0A%20%20%20%20%20%20%20%20gas%3AlinkType%20wdt%3AP180.%0A%20%20%20%20}%0A%20%20}%0A%20%20OPTIONAL%20{%20%3Fitem%20wdt%3AP18%20%3Fimage.%20}%0A%20%20SERVICE%20wikibase%3Alabel%20{%20bd%3AserviceParam%20wikibase%3Alanguage%20%22en%2Cit%2C[AUTO_LANGUAGE]%2Cit%22.%20}%0A}%0AORDER%20BY%20(%3Fdepth)%0ALIMIT%20100" title="iFrame" width="100%" height="100%" allow=""></iframe>';
                //}).on('click', '#map', function () {
                // $("iframe").remove();
                // $("#frameHolder").show('slow');
                // document.getElementById("frameHolder").innerHTML = '<iframe src="https://dlib.biblhertz.it/urbs/#17/' + jsonpath.query(data, '$..claims.P625[0].mainsnak.datavalue.value.latitude') + '/' + jsonpath.query(data, '$..claims.P625[0].mainsnak.datavalue.value.longitude') + '/0" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            // }).on('click', '#viaf', function () {
            //     $("iframe").remove();
            //     $("#frameHolder").show('slow');
            //     document.getElementById("frameHolder").innerHTML = '<iframe src="https://viaf.org/viaf/' + jsonpath.query(data, '$..claims.P214[0].mainsnak.datavalue.value') + '/" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#census', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://database.census.de/#/detail/' + jsonpath.query(data, '$..claims.P12835[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            // }).on('click', '#archinform', function () {
            //     $("iframe").remove();
            //     $("#frameHolder").show('slow');
            //     document.getElementById("frameHolder").innerHTML = '<iframe src="https://www.archinform.net/projekte/' + jsonpath.query(data, '$..claims.P5383[0].mainsnak.datavalue.value') + '.htm" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#beweb', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://chieseitaliane.chiesacattolica.it/chieseitaliane/AccessoEsterno.do?mode=guest&type=auto&code=' + jsonpath.query(data, '$..claims.P5611[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#topostext', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://topostext.org/place/' + jsonpath.query(data, '$..claims.P8068[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#cona', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://www.getty.edu/cona/CONAFullSubject.aspx?subid=' + jsonpath.query(data, '$..claims.P1669[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#dbunico', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://dati.beniculturali.it/mibact/luoghi/resource/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P5782[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#iccdcf', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://dati.beniculturali.it/iccd/cf/resource/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P6287[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#iccds', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://dati.beniculturali.it/iccd/schede/resource/uod/S0' + jsonpath.query(data, '$..claims.P6286[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#cultura', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://www.culturaitalia.it/dettaglio/?id=' + jsonpath.query(data, '$..claims.P1949[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
                // }).on('click', '#geonames', function () {
                //     $("iframe").remove();
                //     $("#frameHolder").show('slow');
                //     document.getElementById("frameHolder").innerHTML = '<iframe src="https://www.geonames.org/' + jsonpath.query(data, '$..claims.P1566[0].mainsnak.datavalue.value') + '/" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#arachne', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://arachne.dainst.org/entity/' + jsonpath.query(data, '$..claims.P10510[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#commons', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://commons.wikimedia.org/wiki/Category:' + encodeURI(jsonpath.query(data, '$..claims.P373[0].mainsnak.datavalue.value')) + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#wikipedia', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://it.wikipedia.org/wiki/' + encodeURI(jsonpath.query(data, '$..sitelinks.itwiki.title')) + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            });

            $("#frameHolder").on('click', function () {
                $("iframe").remove('slow');
                $("#frameHolder").hide('fast');
            });
        }
    } else {
        target.style.visibility = 'hidden';
        console.log('no data under mouse');
        console.log('wdata: ' + wdata );
        //alert('no data under mouse');
    }
});

//adding some controls
map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    bbox: [12.40, 41.81, 12.64, 41.95],
    mapboxgl: mapboxgl
}));

map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));
map.addControl(new mapboxgl.NavigationControl());
map.addControl(
    new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    })
);
