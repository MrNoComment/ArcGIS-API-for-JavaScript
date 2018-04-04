

// Regular Expression for finding newlines or carriage returns
const regExpForRows = /[\n\r]+/g

// Regular Expression for finding tabs or commas
const regExpForCols = /[\t,]/g


// Function to request and parse the data (ASYNC!)
function getData(url) {
    return fetch(url)
            .then( r => r.text() )
            .then( text => {
                //we split rows then cols
                var rows = text.split(regExpForRows)
                var rows_cols = rows.map( row => row.split(regExpForCols))
                rows_cols.pop() //pop removes last row for github newline problem (don't use = the pop the object)
                return {
                    colName: rows_cols.splice(0,1)[0],
                    rows:   rows_cols
                }
            })
}
//console.log(getData("https://raw.githubusercontent.com/joshualemli/workshop-20180404/master/dogInfo.json"))

// Wait until data is retrieved (ASYNC!) using `Promise.all`
Promise.all([
    getData("https://raw.githubusercontent.com/joshualemli/workshop-20180404/master/AirTemperatureData.csv"),
    getData("https://raw.githubusercontent.com/joshualemli/workshop-20180404/master/AirTemperatureSites.csv")
]).then( data => {

    // Log the result of the async operations
    console.log(data)
    
    // Store the data with some nicely named variables
    var airData = data[0]
    var siteData = data[1]

    // Create an empty set to store "selected" SiteIDs
    //var selectedSites = new Set()

    // Use `require` to import the following modules:
    // ----------------------------------------------
    //  - esri Map
    //  - esri SceneView
    //  - esri GraphicsLayer
    //  - esri Graphic
    //  - Plotly.js
    //  - dojo domReady

    require([
        "esri/Map",
        "esri/views/SceneView",
        "esri/layers/GraphicsLayer",
        "esri/Graphic",
        "dojo/domReady!", // ! says that it executes .. not loaded
        "https://cdn.plot.ly/plotly-latest.min.js",
    ], function(Map, SceneView, GraphicsLayer, Graphic, Plotly) { //we name them in same order as how we want to use them .. domReady last one we don't need to name it
    
    // Create the map
    // --------------
    // 1) create an esri `SceneView` (3d Map)
    // 2) specify a container element, a starting viewpoint, and an esri `Map`
    var view = new SceneView({
        container: "map",       // div dom ID to render
        center: [-106.2, 41.4], // lat, long
        scale: 50000,
        map: new Map({
            basemap: "topo",
            ground: "world-elevation",
        })
    })
    
    
    // Add a "graphics layer" to contain the sites
    // -------------------------------------------
    // 1) create the esri `GraphicsLayer`
    // 2) add it to the map
    var aGraphicLayer = new GraphicsLayer()
    view.map.add(aGraphicLayer) //adding layer then add sites to it
    
    // Add sites to the map
    // --------------------
    // 1) loop through the rows of site data
    // 2) create an "esri Graphic" for each site
    //     - geometry
    //     - attributes
    //     - symbol
    // 3) add graphic to the graphics layer
    
    siteData.rows.forEach( row => {
        var graphic = Graphic({
            geometry: {
                type: "point",
                x: row[1],
                y: row[2]
            },
            attributes: {
                SiteID: row[0]
            },
            symbol: {
                type: "simple-marker",
                color: [0,120,190],
                outline: {
                    color: [0,0,0],
                    width: 1
                }
            }
        })
        aGraphicLayer.add(graphic)
    })
    
    
    // Add onclick behavior to the map
    // -------------------------------
    // 1) add a listener for "click" on the view
    // 2) perform a `hitTest` on the view
    // 3) check if any results were found
    // 4) if results found, add or remove the SiteID from the selection set
    // 5) replot the data for those sites (use a function!)
    // BONUS: change the graphic to represent if it's being plotted or not!
    
    
    
    
    // Get the plot container
    
    
    // Create a function to plot all data for selected sites
    // -----------------------------------------------------
    // 1) create a placeholder for any series we will plot
    // 2) loop through selected SiteIDs
    // 3) filter data based on each SiteID
    // 4) add the resulting subset to the series we want to plot
    // 5) redraw the plot
    
    
    })
})

