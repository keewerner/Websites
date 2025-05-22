mapboxgl.accessToken = "pk.eyJ1Ijoia2V3ZXJuZXIiLCJhIjoiY2lqMGprNjVmMDA0NnYwbTVibHh5bWx6aSJ9.zB8-7hnUeIeYJsqzOjJ2Fg";

if (!mapboxgl.supported()) {
    alert("Your browser session crashed. Maybe your hardware and/or software does not support GL operations. If it is persistent, you should think about an update.");
} else {
    var map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/kewerner/clu9v8k53000q01nt0v7yd3h1",
        center: [13.398465, 42.349872],
        hash: true,
        zoom: 15.7,
        pitch: 64,
//        maxPitch: 40,
        bearing: -70
    });
}

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
    input.onclick = (layer) => {
        const layerId = layer.target.id;
        map.setStyle('mapbox://styles/kewerner/' + layerId);
    };
}


map.on('style.load', () => {
    //adding some useful niceties
    map.addSource("comuni", {
        "type": "geojson",
        "data": "data/municipalities.geojson"
    });
    map.addLayer({
        "id": "comuni-layer",
        "type": "fill", //line
        "source": "comuni",
        "layout": {},
        "paint": {
            // "line-color": "darkmagenta",
            // "line-width": 40,
            // 'line-opacity': 0.15
            "fill-color": "transparent",
//            "fill-outline-color": "rgb(255, 0, 204)"
        }
    });
    map.addLayer({
        "id": "comuni-line", "type": "line", "source": "comuni", "layout": {}, "paint": {
            "line-opacity": 0.4,
            "line-width": 3,
            "line-color": "rgb(255, 0, 204)",
        }, "interactive": true
    });
    map.addLayer({
        'id': 'comuni-label', 'type': 'symbol', 'source': 'comuni', 'layout': {
            // 'icon-size': 0.5,
            'text-field': ['get', 'name'],
            'text-font': ['Overpass Regular'],
            'text-variable-anchor': ['bottom'],
            // 'text-radial-offset': 1,
            'text-justify': 'auto',
            'text-size': 15
        }, 'paint': {
            'text-color': 'rgb(195, 0, 194)', //'rgb(255, 0, 204)'
            'text-halo-width': 1,
            'text-halo-blur': 0,
            'text-halo-color': 'rgb(255,255,255)'
        }, "interactive": true
    });
    //now the real stuff
    map.addSource("wikidata", {
        "type": "geojson", "data": "data/wdosm.geojson"
    });
    map.addSource("wikilost", {
        "type": "geojson", "data": "data/wdohm_lost.geojson"
    });
//Example for changing values by data

// 'fill-color': [
//   "case",
//   ["has", "wikidata"],
//   "hsl(0, 37%, 57%)",
//   "hsl(0, 0%, 100%)"
// ]

    map.addLayer({
        "id": "wd-polygon", "type": "fill", "slot": "top", "source": "wikidata", "layout": {}, "paint": {
            "fill-opacity": 0.2,
            "fill-color": "rgb(255, 0, 204)",
            "fill-outline-color": "black",
        }, 'filter': ['==', '$type', 'Polygon'], "interactive": true
    });
    map.addLayer({
        "id": "wd-polygon-contour", "type": "line", "slot": "top", "source": "wikidata", "layout": {}, "paint": {
            "line-opacity": 1,
            "line-color": "rgb(255, 0, 204)",
            "line-width": 1,
        }, 'filter': ['==', '$type', 'Polygon'], "interactive": true
    });
    map.addLayer({
        "id": "wd-line", "type": "line", "source": "wikidata", "layout": {}, "paint": {
            "line-opacity": 0.4,
            "line-width": 6,
            "line-color": "rgb(255, 0, 204)",
        }, 'filter': ['==', '$type', 'LineString'], "interactive": true
    });
    map.addLayer({
        'id': 'wd-point', 'type': 'circle', 'source': 'wikidata', 'paint': {
            'circle-radius': 12, // 'circle-color': 'crimson',
            'circle-opacity': 0.5,
            'circle-color': "rgb(255, 0, 204)"
        }, 'filter': ['==', '$type', 'Point'], "interactive": true
    });
    map.addLayer({
        'id': 'wd-label', 'type': 'symbol', 'source': 'wikidata', 'layout': {
//          'icon-image': 'tw-provincial-2', //            'icon-image': 'leader_line',
//            'text-offset': [0, -12.5],
//             'icon-size': 0.5,
            'text-field': ['get', 'name'],
            'text-font': ['Overpass Regular'],
            'text-variable-anchor': ['bottom'],
            // 'text-radial-offset': 1,
            'text-justify': 'auto',
            'text-size': 15
        }, 'paint': {
            'text-color': 'rgb(10, 10, 10)',
            'text-halo-width': 1,
            'text-halo-blur': 0,
            'text-halo-color': 'rgb(255,255,255)'
        }, "interactive": true
    });
    //adding lost buildings from wd and openhistoricalmaps
    map.addLayer({
        "id": "wdlost-polygon", "type": "fill", "slot": "top", "source": "wikilost", "layout": {}, "paint": {
            "fill-opacity": 0.2,
            "fill-color": "rgb(255, 0, 204)",
            "fill-outline-color": "black",
        }, 'filter': ['==', '$type', 'Polygon'], "interactive": true
    });
    map.addLayer({
        "id": "wdlost-polygon-contour", "type": "line", "slot": "top", "source": "wikilost", "layout": {}, "paint": {
            "line-opacity": 1,
            "line-color": "rgb(255, 0, 204)",
            "line-width": 1,
        }, 'filter': ['==', '$type', 'Polygon'], "interactive": true
    });
    map.addLayer({
        'id': 'wdlost-label', 'type': 'symbol', 'source': 'wikilost', 'layout': {
            'text-field': ['concat', ['get', 'name'], ' †'],
            'text-font': ['Overpass Regular'],
            'text-variable-anchor': ['bottom'],
            'text-justify': 'auto',
            'text-size': 15
        }, 'paint': {
            'text-color': 'rgb(10, 10, 10)',
            'text-halo-width': 1,
            'text-halo-blur': 0,
            'text-halo-color': 'rgb(255,255,255)'
        }, "interactive": true
    });
});

document.getElementById("myData").innerHTML='';

map.on("click", function (e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['comuni-layer', 'wd-polygon', 'wd-line', 'wd-point', 'wdlost-polygon']
    });

    //important for resetting
    if (!features.length) {
        target.style.visibility = 'hidden';
        console.log('no data under mouse');
    }

    //start city
    // var city =  features[0].properties.name;
    //stop city

    var wdata = features[0].properties.wikidata;

    var name = features[0].properties.name;

    var cstring = features[0].properties.cstring;

    // map.on("click", (['wd-polygon', 'wd-line', 'wd-point']), (e) => {
//     const wdata = e.features[0].properties.wikidata;

    target = document.getElementById("myData");
    target.innerHTML = '';

    //start city
    // if (city.length) {
    //     console.log('city: ' + city + ' | city length: ' + city.length);
    // }
    //stop city

    if (wdata.length) {    //maybe if(wdata) is the better option? no errors if not found!

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
                console.log('error: ' + data);
            });


        function appendData(data) {
            const mainContainer = document.getElementById("myData");
            mainContainer.style.visibility = 'visible';
            mainContainer.style.display = 'block';


            const header = document.createElement("h1");
            header.innerHTML = jsonpath.query(data, '$..labels.it.value') + ' &nbsp; <small>' + wdata + '</small>';
            mainContainer.appendChild(header);

            // if (jsonpath.value(data, '$..claims.P1566')) {
            //     const geonames = document.createElement("p");
            //     geonames.innerHTML += '<span class="block" id="geonames" title="Wikidata Property P1566">GeoNames ' + jsonpath.query(data, '$..claims.P1566[0].mainsnak.datavalue.value') + '</span>';
            //     mainContainer.appendChild(geonames);
            // }
            //start thumbnail
            if (jsonpath.value(data, '$..claims.P18')) {
                const thumb = document.createElement("div");
                thumb.setAttribute("id", "dThumb");
                thumb.innerHTML += '<img alt="[no reference image]" src="https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURI(jsonpath.query(data, '$..claims.P18[0].mainsnak.datavalue.value')) + '"/>';
                mainContainer.appendChild(thumb);
            }
            //start getting live wikipedia. works:
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
                        wikitext.innerHTML += '<div>' + text + '<p style="text-align: right">Estratto Wikipedia, Licenza <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.it">CC BY-SA 4</a>4.</p></div>';
                        mainContainer.appendChild(wikitext);
                    }
                }
                xhr.send();
            }
            //end live wikipedia

            //aggregating bibliography
            if (jsonpath.value(data, '$..claims.P227')) {
                //header
                const bibliography = document.createElement("menu");
                bibliography.innerHTML += 'Bibliografia';
                mainContainer.appendChild(bibliography);

                const gnd = document.createElement("aside");
                gnd.innerHTML = '<span id="bhmpibib" title="GND ' + jsonpath.query(data, '$..claims.P227[0].mainsnak.datavalue.value') + '" >Hertziana Biblioteca (Old)</span>';
                mainContainer.appendChild(gnd);
            }

            const swd = document.createElement("aside");
            swd.innerHTML = '<span id="bhmpibibN" title="Search word ' + jsonpath.query(data, '$..labels.it.value') + '" >Hertziana Biblioteca (New)</span>';
            mainContainer.appendChild(swd);


            //aggregating all records
            //header
            const records = document.createElement("menu");
            records.innerHTML += 'Schede';
            mainContainer.appendChild(records);

            const wq = document.createElement("aside");
            wq.innerHTML += '<span id="wq" title="Property ' + wdata + '">Wikidata</span>';
            mainContainer.appendChild(wq);

            if (jsonpath.value(data, '$..claims.P9050')) {
                const iccdsite = document.createElement("aside");
                iccdsite.innerHTML = '<span id="iccdsite" title="ICCD Site ID ' + jsonpath.query(data, '$..claims.P9051[0].mainsnak.datavalue.value') + '"><a target="website" href="https://catalogo.beniculturali.it/' + jsonpath.query(data,'$..claims.P9050[0].mainsnak.datavalue.value') + '">ICCD Sito</a></span>';
                mainContainer.appendChild(iccdsite);
            }
            if (jsonpath.value(data, '$..claims.P9051')) {
                const iccdch = document.createElement("aside");
                iccdch.innerHTML = '<span id="iccdch" title="ICCD Cultural Heritage ID ' + jsonpath.query(data, '$..claims.P9051[0].mainsnak.datavalue.value') + '"><a target="website" href="https://catalogo.beniculturali.it/detail/' + jsonpath.query(data,'$..claims.P9051[0].mainsnak.datavalue.value') + '">ICCD Cultural Heritage</a></span>';
                mainContainer.appendChild(iccdch);
            }
            if (cstring) {
                const iccdrecords = document.createElement("aside");
                iccdrecords.innerHTML = '<span id="iccdrecord" title="ICCD Schede per ' + name  + '"><a target="website" href="https://catalogo.beniculturali.it/search?municipality=' + name + '&startPage=12&paging=true">ICCD Schede</a></span>';
                mainContainer.appendChild(iccdrecords);
            }
            // works for SITES only but all sites now already integrated by kew in wikidata
            //    iccdsites.innerHTML = '<span id="iccdsites" title="ICCD Luoghi di Cultura per ' + name  + '"><a target="website" href="https://dati.cultura.gov.it/sparql?default-graph-uri=&query=PREFIX+pico%3A+<http%3A%2F%2Fdata.cochrane.org%2Fontologies%2Fpico%2F>%0D%0APREFIX+dcterms%3A+<http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F>%0D%0APREFIX+clv%3A+<https%3A%2F%2Fw3id.org%2Fitalia%2Fonto%2FCLV%2F>%0D%0A%0D%0Aselect+distinct+%0D%0A%23+%3Fbc+as+%3Flink%0D%0A+str%28%3FatSiteLabel%29+as+%3FatSiteLabel%0D%0A+str%28%3FatSite%29+as+%3FatSite%0D%0Astr%28%3FhasCulturalInstituteOrSiteLabel%29+as+%3FhasCulturalInstituteOrSiteLabel%0D%0Astr%28%3FhasCulturalInstituteOrSite%29+as+%3FhasCulturalInstituteOrSite%0D%0Afrom+<https%3A%2F%2Fw3id.org%2Farco%2Fdata>+%7B++%0D%0A++%3Fbc+a-cat%3AisDescribedByCatalogueRecord+%3Fr++%0D%0A+++%3B+rdfs%3Alabel+%3Flabel++%0D%0A+++%3B+a-loc%3AhasCulturalPropertyAddress%2Fclvapit%3AhasCity+<https%3A%2F%2Fw3id.org%2Farco%2Fresource%2FCity%2F' + cstring + '>+%0D%0A+++%3B++a-loc%3AhasTimeIndexedTypedLocation%2Fa-loc%3AatSite++%3FatSite%0D%0A++%3B++a-loc%3AhasTimeIndexedTypedLocation%2Fa-loc%3AatSite%2Frdfs%3Alabel++%3FatSiteLabel%0D%0A%23++%3B+a-loc%3AhasCulturalInstituteOrSite++%3FhasCulturalInstituteOrSite%0D%0A%23++%3B+a-loc%3AhasCulturalInstituteOrSite%2Frdfs%3Alabel++%3FhasCulturalInstituteOrSiteLabel%0D%0A+.++%0D%0A+++OPTIONAL+%7B+%3Fbc+a-loc%3AhasCulturalInstituteOrSite++%3FhasCulturalInstituteOrSite+%7D%0D%0A+++OPTIONAL+%7B+%3Fbc+a-loc%3AhasCulturalInstituteOrSite%2Frdfs%3Alabel++%3FhasCulturalInstituteOrSiteLabel+%7D%0D%0A%23+++OPTIONAL+%7B+%3Fbc+a-loc%3AhasTimeIndexedTypedLocation%2Fa-loc%3AatSite++%3FatSite+%7D%0D%0A%23+++OPTIONAL+%7B+%3Fbc+a-loc%3AhasTimeIndexedTypedLocation%2Fa-loc%3AatSite%2Frdfs%3Alabel++%3FatSiteLabel+%7D%0D%0A+%7D++%0D%0Aorder+by+%3FatSiteLabel%0D%0Alimit+500%0D%0A&format=text%2Fhtml&timeout=0&signal_void=on">ICCD Luoghi di Cultura</a></span>';
            if (cstring) {
                const iccdsites = document.createElement("aside");
                iccdsites.innerHTML = '<span id="iccdsites" title="ICCD Patrimonio architettonico per ' + name  + '"><a target="website" href="https://dati.cultura.gov.it/sparql?default-graph-uri=&query=++select+distinct+str%28%3Fl%29+as+%3Flabel%2C+%3Fs+as+%3Flink++%7B%0D%0A++values%3Fc%7B&quot;' + name + '&quot;%7D%0D%0A++%7Bgraph+<http%3A%2F%2Fdati.beniculturali.it%2Ficcd%2FCF>+%7B%0D%0A+++%3Fs+a+cis%3ASite%3Brdfs%3Alabel%3Fl%0D%0A++++%3B++cis%3AsiteAddress%2Fclvapit%3AhasCity%2Frdfs%3Alabel%3Fc%0D%0A++%7D%7D%0D%0A++union%7Bgraph+<https%3A%2F%2Fw3id.org%2Farco%2Fdata>+%7B%0D%0A+++%3Fs+a+arco%3AImmovableCulturalProperty%0D%0A++++%3B+rdfs%3Alabel%3Fl%0D%0A++++%3B+a-loc%3AhasCulturalPropertyAddress%2Fclvapit%3AhasCity%2Frdfs%3Alabel+%3Fc%0D%0A++%7D%7D%0D%0A+%7D%0D%0A+limit+100&format=text%2Fx-html%2Btr&timeout=0&signal_void=on">ICCD Patrimonio architettonico</a></span>';
                mainContainer.appendChild(iccdsites);
            }
            if (jsonpath.value(data, '$..claims.P6287')) {
                const iccdcfr = document.createElement("aside");
                iccdcfr.innerHTML += '<span id="iccdcfr" title="ICCD-CF ' + jsonpath.query(data, '$..claims.P6287[0].mainsnak.datavalue.value') + '"><a target="website" href="http://catalogo.beniculturali.it/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P6287[0].mainsnak.datavalue.value') + '">ICCD-CF (Schede)</a></span>';
                mainContainer.appendChild(iccdcfr);
                const iccdcfd = document.createElement("aside");
                iccdcfd.innerHTML += '<span id="iccdcfd" title="ICCD-CF ' + jsonpath.query(data, '$..claims.P6287[0].mainsnak.datavalue.value') + '"><a target="website" href="http://dati.beniculturali.it/iccd/cf/resource/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P6287[0].mainsnak.datavalue.value') + '">ICCD-CF (Dati)</a></span>';
                mainContainer.appendChild(iccdcfd);
            }
            if (jsonpath.value(data, '$..claims.P6288')) {
                const iccdcg = document.createElement("aside");
                iccdcg.innerHTML += '<span id="iccdcg" title="ICCD-CG ' + jsonpath.query(data, '$..claims.P6288[0].mainsnak.datavalue.value') + '"><a target="website" href="https://catalogo.beniculturali.it/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P6288[0].mainsnak.datavalue.value') + '">ICCD-CG</a></span>';
                mainContainer.appendChild(iccdcg);
            }
            if (jsonpath.value(data, '$..claims.P6286')) {
                const iccds = document.createElement("aside");
                iccds.innerHTML += '<span id="iccds" title="ICCD-S ' + jsonpath.query(data, '$..claims.P6286[0].mainsnak.datavalue.value') + '"><a target="website" href="https://dati.beniculturali.it/iccd/schede/resource/uod/S0' + jsonpath.query(data, '$..claims.P6286[0].mainsnak.datavalue.value') + '">ICCD-S</a></span>';
                mainContainer.appendChild(iccds);
            }
            if (jsonpath.value(data, '$..claims.P5782')) {
                const dbunico = document.createElement("aside");
                dbunico.innerHTML += '<a id="dbunico" title="DBUnico MIBACT ' + jsonpath.query(data, '$..claims.P5782[0].mainsnak.datavalue.value') + '"><a target="website" href="https://dati.beniculturali.it/mibact/luoghi/resource/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P5782[0].mainsnak.datavalue.value') + '">DBUnico MIBACT</a></span>';
                mainContainer.appendChild(dbunico);
            }
            if (jsonpath.value(data, '$..claims.P5383')) {
                const archinform = document.createElement("aside");
                archinform.innerHTML += '<span id="archinform" title="ArchInform ' + jsonpath.query(data, '$..claims.P5383[0].mainsnak.datavalue.value') + '">ArchInform</span>';
                mainContainer.appendChild(archinform);
            }
            if (jsonpath.value(data, '$..claims.P5611')) {
                const beweb = document.createElement("aside");
                beweb.innerHTML += '<span id="beweb" title="BeWeb ' + jsonpath.query(data, '$..claims.P5611[0].mainsnak.datavalue.value') + '">BeWeb</span>';
                mainContainer.appendChild(beweb);
            }
            if (jsonpath.value(data, '$..claims.P1949')) {
                const cultura = document.createElement("aside");
                cultura.innerHTML += '<span id="cultura" title="CI ' + jsonpath.query(data, '$..claims.P1949[0].mainsnak.datavalue.value') + '">Cultura Italia</span>';
                mainContainer.appendChild(cultura);
            }
            if (jsonpath.value(data, '$..claims.P1669')) {
                const cona = document.createElement("aside");
                cona.innerHTML += '<span id="cona" title="CONA ' + jsonpath.query(data, '$..claims.P1669[0].mainsnak.datavalue.value') + '" >CONA</span>';
                mainContainer.appendChild(cona);
            }

            //aggregating all images
            //header
            const images = document.createElement("menu");
            images.innerHTML += 'Immagini';
            mainContainer.appendChild(images);

            if (jsonpath.value(data, '$..claims.P12855')) {
                const bhmpi = document.createElement("aside");
                bhmpi.innerHTML = '<span id="bhmpifoto" title="OBJ ' + jsonpath.query(data, '$..claims.P12855[0].mainsnak.datavalue.value') + '">Hertziana Fototeca</span>';
                mainContainer.appendChild(bhmpi);
            }
            if (!cstring) { //for specific monuments
                const fotoapiobj = document.createElement("aside");
                fotoapiobj.innerHTML += '<span id="fotoapiobj" title="Search for ' + jsonpath.query(data, '$..labels.it.value') + '">Hertziana Fototeca API</span>';
                mainContainer.appendChild(fotoapiobj);
            }
            if (cstring) {  //for entire municipalities
                const fotoapicom = document.createElement("aside");
                fotoapicom.innerHTML += '<span id="fotoapicom" title="Search for ' + name + '">Hertziana Fototeca API</span>';
                mainContainer.appendChild(fotoapicom);
            }
            if (!cstring) {//object clicked, we take the provincia/text route. comune is NOT working because P131 stores the referencing ID only, not the textual name of the comune
                const iccdfoto = document.createElement("aside");
                iccdfoto.innerHTML = '<span id="iccdfoto" title="ICCD Fotografie per ' + name + '"><a target="website" href="https://fotografia.cultura.gov.it/fotografie#h.lrcr=Abruzzo&h.lrcp=L&apos;Aquila&k.text=' + jsonpath.query(data, '$..labels.it.value') + '">ICCD fotografie</a></span>';
                mainContainer.appendChild(iccdfoto);
            }
            if (cstring) {//map background clicked, we take the provincia/comune route
                const iccdfoto = document.createElement("aside");
                iccdfoto.innerHTML = '<span id="iccdfoto" title="ICCD Fotografie per ' + name + '"><a target="website" href="https://fotografia.cultura.gov.it/fotografie#h.lrcr=Abruzzo&h.lrcp=L&apos;Aquila&h.lrcc=' + name + '">ICCD fotografie</a></span>';
                mainContainer.appendChild(iccdfoto);
            }
            if (jsonpath.value(data, '$..claims.P373')) {
                const commons = document.createElement("aside");
                commons.innerHTML += '<span id="commons" title="Commons ' + jsonpath.query(data, '$..claims.P373[0].mainsnak.datavalue.value') + '">Wikimedia immagini</span>';
                mainContainer.appendChild(commons);
            }
            if (jsonpath.value(data, '$..claims.P373')) {
                const wikimap = document.createElement("aside");
                wikimap.innerHTML += '<span id="wikimap" title="Wikimap ' + jsonpath.query(data, '$..claims.P373[0].mainsnak.datavalue.value') + '">Wikimedia posizione immagini</span>';
                mainContainer.appendChild(wikimap);
            }


            //aggregating all post antiquity
            //header
            if (jsonpath.value(data, '$..claims.P12835')||jsonpath.value(data, '$..claims.P8068')||jsonpath.value(data, '$..claims.P10510')) {
                const postantique = document.createElement("menu");
                postantique.innerHTML += 'Post Antichita';
                mainContainer.appendChild(postantique);

                if (jsonpath.value(data, '$..claims.P12835')) {
                    const census = document.createElement("aside");
                    census.innerHTML += '<span id="census" title="Census ' + jsonpath.query(data, '$..claims.P12835[0].mainsnak.datavalue.value') + '">Census</span>';
                    mainContainer.appendChild(census);
                }
                if (jsonpath.value(data, '$..claims.P8068')) {
                    const topos = document.createElement("aside");
                    topos.innerHTML += '<span id="topostext" title="ToposText ' + jsonpath.query(data, '$..claims.P8068[0].mainsnak.datavalue.value') + '">ToposText</span>';
                    mainContainer.appendChild(topos);
                }
                if (jsonpath.value(data, '$..claims.P10510')) {
                    const arachne = document.createElement("aside");
                    arachne.innerHTML += '<span id="arachne" title="Arachne ' + jsonpath.query(data, '$..claims.P10510[0].mainsnak.datavalue.value') + '">Arachne</span>';
                    mainContainer.appendChild(arachne);
                }
            }

            //aggregating description
            //header
            const other = document.createElement("menu");
            other.innerHTML += 'Altro';
            mainContainer.appendChild(other);

            const graph = document.createElement("aside");
            graph.innerHTML = '<span id="graph" title="Graph delle relazioni (Claude)" >Graph di relazioni</span>';
            mainContainer.appendChild(graph);

            if (jsonpath.value(data, '$..claims.P856')) {
                const website = document.createElement("aside");
                website.innerHTML = '<span id="website" title="Website ' + jsonpath.query(data, '$..claims.P856[0].mainsnak.datavalue.value') + '" ><a target="website" href="' + jsonpath.query(data, '$..claims.P856[0].mainsnak.datavalue.value') + '">Website ufficiale</a></span>';
                mainContainer.appendChild(website);
            }
            if (jsonpath.value(data, '$..claims.P3749')) {
                const gmaps = document.createElement("aside");
                gmaps.innerHTML += '<span id="gmaps" title="Google Maps ' + jsonpath.query(data, '$..claims.P3749[0].mainsnak.datavalue.value') + ' in new window"><a target="gmaps" href="https://www.google.com/maps?cid=' + jsonpath.query(data, '$..claims.P3749[0].mainsnak.datavalue.value') + '">Google Maps</a></span>';
                mainContainer.appendChild(gmaps);
            }

            //aggregating description
            if (jsonpath.value(data, '$..sitelinks.itwiki')) {
                //header
            const wikip = document.createElement("menu");
            wikip.innerHTML += '<a href="https://it.wikipedia.org/wiki/' + encodeURI(jsonpath.query(data, '$..sitelinks.itwiki.title')) + '">Wikipedia ↗</a>'; //'Wikipedia';
            mainContainer.appendChild(wikip);
                // const thumb = document.createElement("aside");
                // thumb.innerHTML += '<span id="wikipedia" title="' + jsonpath.query(data, '$..sitelinks.itwiki.title') + '">Wikipedia</span>';
                // mainContainer.appendChild(thumb);
            }


            // if (jsonpath.value(data, '$..claims.P625')) {
            //     const location = document.createElement("p");
            //     location.innerHTML = '<span class="block" id="map" title="Wikidata Property P625">Interactive Map</span>';
            //     mainContainer.appendChild(location);
            // }
            // if (jsonpath.value(data, '$..claims.P214')) {
            //     const viaf = document.createElement("aside");
            //     viaf.innerHTML = '<span id="viaf" title="VIAF ' + jsonpath.query(data, '$..claims.P214[0].mainsnak.datavalue.value') + '">VIAF</span>';
            //     mainContainer.appendChild(viaf);
            // }


            $("#myData").on('click', '#wq', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://wikidata.org/wiki/' + wdata + '?lang=it" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#fotoapicom', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://dlib.biblhertz.it/fotoapi?q=' + name + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#fotoapiobj', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://dlib.biblhertz.it/fotoapi?q=' + jsonpath.query(data, '$..labels.it.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#bhmpibib', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                //document.getElementById("frameHolder").innerHTML = '<iframe src="https://www.kubikat.org/discovery/search?query=any,contains,' + encodeURI(jsonpath.query(data, '$..labels.it.value')) + ',OR&query=any,contains,' + encodeURI(jsonpath.query(data, '$..labels.de.value')) + ',OR&query=any,contains,' + encodeURI(jsonpath.query(data, '$..labels.en.value')) + ',AND&tab=Everything&search_scope=MyInst_and_CI&vid=49MPG_KUBIKAT:VU1&lang=en&mode=advanced&offset=0" title="iFrame" width="100%" height="100%" allow=""></iframe>';
                //old query for kubikat + GND
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://aleph.mpg.de/F/?func=find-a&local_base=KUB01&find_code=IGD&request=' + jsonpath.query(data, '$..claims.P227[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#bhmpibibN', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://www.kubikat.org/discovery/search?query=any,contains,' + encodeURI(jsonpath.query(data, '$..labels.it.value')) + ',OR&query=any,contains,' + encodeURI(jsonpath.query(data, '$..labels.de.value')) + ',OR&query=any,contains,' + encodeURI(jsonpath.query(data, '$..labels.en.value')) + ',AND&tab=Everything&search_scope=MyInst_and_CI&vid=49MPG_KUBIKAT:VU1&lang=en&mode=advanced&offset=0" title="iFrame" width="100%" height="100%" allow=""></iframe>';
                //old query for kubikat + GND
                //document.getElementById("frameHolder").innerHTML = '<iframe src="https://aleph.mpg.de/F/?func=find-a&local_base=KUB01&find_code=IGD&request=' + jsonpath.query(data, '$..claims.P227[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#bhmpifoto', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://foto.biblhertz.it/document/obj/' + jsonpath.query(data, '$..claims.P12855[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
                // direct link, otherwise CORS exception
            // }).on('click', '#website', function () {
            //     $("iframe").remove();
            //     $("#frameHolder").show('slow');
            //     document.getElementById("frameHolder").innerHTML = '<iframe src="' + jsonpath.query(data, '$..claims.P856[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#graph', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
//OLD             document.getElementById("frameHolder").innerHTML = '<iframe src="https://query.wikidata.org/embed.html#%23defaultView%3AGraph%0A%0APREFIX%20target%3A%20%3Chttp%3A%2F%2Fwww.wikidata.org%2Fentity%2F'+wdata+'%3E%0A%0ASELECT%20%3Fnode%20%3FnodeLabel%20%3FnodeImage%20%3FchildNode%20%3FchildNodeLabel%20%3FchildNodeImage%20%3Frgb%20%0AWITH%20%7B%0A%20%20SELECT%20DISTINCT%20%3Fproperty%20WHERE%20%7B%0A%20%20%20%20%20%20%3Fproperty%20a%20wikibase%3AProperty%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20wdt%3AP31%20wd%3AQ18610173%20%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20wdt%3AP31%20wd%3AQ26940804%20.%20%0A%20%20%20%20%7D%0A%7D%20AS%20%25properties%0AWITH%20%7B%0A%20%20SELECT%20DISTINCT%20%3Fnode%20%3FchildNode%20WHERE%20%7B%0A%20%20%20%20%20%20BIND(target%3A%20AS%20%3Fnode)%0A%20%20%20%20%20%20%3Fnode%20%3Fp%20%3Fi.%0A%20%20%20%20%20%20%3FchildNode%20%3Fx%20%3Fp.%0A%20%20%20%20%20%20%3FchildNode%20rdf%3Atype%20wikibase%3AProperty.%0A%20%20%20%20%20%20FILTER(STRSTARTS(STR(%3Fi)%2C%20%22http%3A%2F%2Fwww.wikidata.org%2Fentity%2FQ%22))%0A%20%20%20%20%20%20FILTER(STRSTARTS(STR(%3FchildNode)%2C%20%22http%3A%2F%2Fwww.wikidata.org%2Fentity%2FP%22))%0A%20%20%20%20%7D%0A%20%20LIMIT%205000%0A%7D%20AS%20%25nodes%0AWITH%20%7B%0A%20%20SELECT%20DISTINCT%20%3FchildNode%20%3Fnode%20%3Frgb%20WHERE%20%7B%0A%20%20%20%20%20%20BIND(%22EFFBD8%22%20AS%20%3Frgb)%0A%20%20%20%20%20%20target%3A%20%3Fp%20%3FchildNode.%0A%20%20%20%20%20%20%3Fnode%20%3Fx%20%3Fp.%0A%20%20%20%20%20%20%3Fnode%20rdf%3Atype%20wikibase%3AProperty.%0A%20%20%20%20%20%20FILTER(STRSTARTS(STR(%3FchildNode)%2C%20%22http%3A%2F%2Fwww.wikidata.org%2Fentity%2FQ%22))%0A%20%20%20%20%7D%0A%20%20LIMIT%205000%0A%7D%20AS%20%25childNodes%0AWHERE%20%7B%0A%20%20%7B%0A%20%20%20%20INCLUDE%20%25nodes%0A%20%20%7D%0A%20%20UNION%0A%20%20%7B%0A%20%20%20%20INCLUDE%20%25childNodes%0A%20%20%7D%0A%0A%20%20OPTIONAL%20%7B%20%0A%20%20%20%20INCLUDE%20%25properties%0A%20%20%20%20%3Fproperty%20wikibase%3AdirectClaim%20%3Fnodeclaim.%0A%20%20%20%20%3Fnode%20%3Fnodeclaim%20%3FnodeImage.%20%0A%20%20%7D%0A%0A%20%20OPTIONAL%20%7B%20%0A%20%20%20%20INCLUDE%20%25properties%0A%20%20%20%20%3Fproperty%20wikibase%3AdirectClaim%20%3FchildNodeclaim.%0A%20%20%20%20%3FchildNode%20%3FchildNodeclaim%20%3FchildNodeImage.%20%0A%20%20%7D%0A%20%20%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cmul%2Cen%22.%20%7D%20%20%20%20%20%20%20%20%0A%7D" title="iFrame" width="100%" height="100%" allow=""></iframe>';
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://query.wikidata.org/embed.html#%23defaultView%3AGraph%0ASELECT%20DISTINCT%20%3Fitem%20%3FitemLabel%20%3Fproperty%20%3FpropertyLabel%20%3Fvalue%20%3FvalueLabel%20%3FvalueImage%20%3Finception%20%0A%20%20%20%20%20%20%20%3FincomingProp%20%3FincomingPropLabel%20%3FincomingValue%20%3FincomingValueLabel%20%3FincomingValueImage%0AWHERE%20%7B%0A%20%20%7B%0A%20%20%20%20%23%20Main%20entity%20statements%0A%20%20%20%20wd%3A'+wdata+'%20%3Fproperty%20%3Fvalue%20.%0A%20%20%20%20BIND(wd%3A'+wdata+'%20AS%20%3Fitem)%0A%20%20%20%20%0A%20%20%20%20%23%20Get%20inception%20date%20and%20images%20for%20values%0A%20%20%20%20OPTIONAL%20%7B%20wd%3A'+wdata+'%20wdt%3AP571%20%3Finception%20%7D%0A%20%20%20%20OPTIONAL%20%7B%20%0A%20%20%20%20%20%20FILTER(STRSTARTS(STR(%3Fvalue)%2C%20%22http%3A%2F%2Fwww.wikidata.org%2Fentity%2F%22))%0A%20%20%20%20%20%20%3Fvalue%20wdt%3AP18%20%3FvalueImage%20%0A%20%20%20%20%7D%0A%20%20%7D%0A%20%20UNION%0A%20%20%7B%0A%20%20%20%20%23%20Incoming%20references%0A%20%20%20%20%3Fitem%20%3Fproperty%20wd%3A'+wdata+'%20.%0A%20%20%20%20BIND(%3Fitem%20AS%20%3Fvalue)%0A%20%20%20%20%0A%20%20%20%20%3Fitem%20%3FincomingProp%20%3FincomingValue%20.%0A%20%20%20%20%0A%20%20%20%20%23%20Get%20images%20for%20incoming%20items%20and%20their%20values%0A%20%20%20%20OPTIONAL%20%7B%20%3Fitem%20wdt%3AP571%20%3Finception%20%7D%0A%20%20%20%20OPTIONAL%20%7B%20%3Fitem%20wdt%3AP18%20%3FvalueImage%20%7D%0A%20%20%20%20OPTIONAL%20%7B%0A%20%20%20%20%20%20FILTER(STRSTARTS(STR(%3FincomingValue)%2C%20%22http%3A%2F%2Fwww.wikidata.org%2Fentity%2F%22))%0A%20%20%20%20%20%20%3FincomingValue%20wdt%3AP18%20%3FincomingValueImage%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20FILTER(STRSTARTS(STR(%3FincomingProp)%2C%20%22http%3A%2F%2Fwww.wikidata.org%2Fprop%2Fdirect%2F%22))%0A%20%20%20%20FILTER(%3FincomingProp%20NOT%20IN%20(%0A%20%20%20%20%20%20wdt%3AP17%2C%20%20%23%20country%0A%20%20%20%20%20%20wdt%3AP21%2C%20%20%23%20sex%20or%20gender%0A%20%20%20%20%20%20wdt%3AP31%2C%20%20%23%20instance%20of%0A%20%20%20%20%20%20wdt%3AP186%2C%20%23%20material%20used%0A%20%20%20%20%20%20wdt%3AP734%2C%20%23%20family%20name%0A%20%20%20%20%20%20wdt%3AP735%2C%20%23%20given%20name%0A%20%20%20%20%20%20wdt%3AP140%2C%20%23%20religion%0A%20%20%20%20%20%20wdt%3AP708%2C%20%23%20diocese%0A%20%20%20%20%20%20wdt%3AP2079%2C%20%23%20fabrication%20method%0A%20%20%20%20%20%20wdt%3AP3501%20%20%23%20commemorated%0A%20%20%20%20))%0A%20%20%7D%0A%20%20%0A%20%20FILTER(STRSTARTS(STR(%3Fproperty)%2C%20%22http%3A%2F%2Fwww.wikidata.org%2Fprop%2Fdirect%2F%22))%0A%20%20FILTER(%3Fproperty%20NOT%20IN%20(%0A%20%20%20%20wdt%3AP17%2C%0A%20%20%20%20wdt%3AP21%2C%0A%20%20%20%20wdt%3AP31%2C%0A%20%20%20%20wdt%3AP186%2C%0A%20%20%20%20wdt%3AP734%2C%0A%20%20%20%20wdt%3AP735%2C%0A%20%20%20%20wdt%3AP140%2C%0A%20%20%20%20wdt%3AP708%2C%0A%20%20%20%20wdt%3AP2079%2C%0A%20%20%20%20wdt%3AP3501%0A%20%20))%0A%20%20%0A%20%20SERVICE%20wikibase%3Alabel%20%7B%0A%20%20%20%20bd%3AserviceParam%20wikibase%3Alanguage%20%22it%2C%5BAUTO_LANGUAGE%5D%22.%0A%20%20%20%20%3Fproperty%20rdfs%3Alabel%20%3FpropertyLabel%20.%0A%20%20%20%20%3Fitem%20rdfs%3Alabel%20%3FitemLabel%20.%0A%20%20%20%20%3Fvalue%20rdfs%3Alabel%20%3FvalueLabel%20.%0A%20%20%20%20%3FincomingProp%20rdfs%3Alabel%20%3FincomingPropLabel%20.%0A%20%20%20%20%3FincomingValue%20rdfs%3Alabel%20%3FincomingValueLabel%20.%0A%20%20%7D%0A%7D" title="iFrame" width="100%" height="100%" allow=""></iframe>';
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
            //direct link only, no iframe possible
            // }).on('click', '#iccdfoto', function () {
            //     $("iframe").remove();
            //     $("#frameHolder").show('slow');
            //     document.getElementById("frameHolder").innerHTML = '<iframe src="https://fotografia.cultura.gov.it/fotografie#h.lrcs=Italia&h.lrcr=Abruzzo&h.lrcp=L\'Aquila&h.lrcc=' + cname + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            }).on('click', '#archinform', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://www.archinform.net/projekte/' + jsonpath.query(data, '$..claims.P5383[0].mainsnak.datavalue.value') + '.htm" title="iFrame" width="100%" height="100%" allow=""></iframe>';
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
            // direct link only, no iframe
            // }).on('click', '#dbunico', function () {
            //     $("iframe").remove();
            //     $("#frameHolder").show('slow');
            //    document.getElementById("frameHolder").innerHTML = '<iframe src="https://dati.beniculturali.it/mibact/luoghi/resource/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P5782[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
//             }).on('click', '#iccdcf', function () {
//                 $("iframe").remove();
//                 $("#frameHolder").show('slow');
//                 document.getElementById("frameHolder").innerHTML = '<iframe src="https://www.catalogo.beniculturali.it/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P6287[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            // will be done by direct call to new tab (google does not allow iframing)
            // }).on('click', '#gmaps', function () {
            //     $("iframe").remove();
            //     $("#frameHolder").show('slow');
            //     document.getElementById("frameHolder").innerHTML = '<iframe src="https://www.google.com/maps?cid=' + jsonpath.query(data, '$..claims.P3749[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            // }).on('click', '#iccds', function () {
            //     $("iframe").remove();
            //     $("#frameHolder").show('slow');
            //     document.getElementById("frameHolder").innerHTML = '<iframe src="https://dati.beniculturali.it/iccd/schede/resource/uod/S0' + jsonpath.query(data, '$..claims.P6286[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            // }).on('click', '#iccdcfd', function () {
            //     $("iframe").remove();
            //     $("#frameHolder").show('slow');
            //     document.getElementById("frameHolder").innerHTML = '<iframe src="http://dati.beniculturali.it/iccd/cf/resource/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P6287[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            //not working 'cause CORS
            // }).on('click', '#iccdcfr', function () {
            //     $("iframe").remove();
            //     $("#frameHolder").show('slow');
            //     document.getElementById("frameHolder").innerHTML = '<iframe src="https://catalogo.beniculturali.it/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P6287[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
            // }).on('click', '#iccdcg', function () {
            //     $("iframe").remove();
            //     $("#frameHolder").show('slow');
            //     document.getElementById("frameHolder").innerHTML = '<iframe src="https://catalogo.beniculturali.it/CulturalInstituteOrSite/' + jsonpath.query(data, '$..claims.P6288[0].mainsnak.datavalue.value') + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
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
            }).on('click', '#wikimap', function () {
                $("iframe").remove();
                $("#frameHolder").show('slow');
                document.getElementById("frameHolder").innerHTML = '<iframe src="https://wikimap.toolforge.org/?cat=' + encodeURI(jsonpath.query(data, '$..claims.P373[0].mainsnak.datavalue.value')) + '" title="iFrame" width="100%" height="100%" allow=""></iframe>';
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
        console.log('wdata: ' + wdata + ' | wdata length: ' + wdata.length);
        //alert('no data under mouse');
    }
});

// $("#map").on('click', function () {
//     target = document.getElementById("myData");
//     target.innerHTML='';
//     target.style.visibility='hidden';
//     console.log('no data under mouse');
//     alert('no data under mouse');
// })


map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken, mapboxgl: mapboxgl
}));

map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    }, trackUserLocation: true, showUserHeading: true
}));
