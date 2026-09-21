const INF = Number.MAX_SAFE_INTEGER;

        class Node {
            constructor(id, name, type) {
                this.id = id;
                this.name = name;
                this.type = type;
            }
        }

        class Edge {
            constructor(to, weight, roadName) {
                this.to = to;
                this.weight = weight;
                this.roadName = roadName;
            }
        }

        class HeapNode {
            constructor(vertex, distance) {
                this.vertex = vertex;
                this.distance = distance;
            }
        }

        class MinHeap {
            constructor() {
                this.heap = [];
            }

            push(vertex, distance) {
                this.heap.push(new HeapNode(vertex, distance));
                this.bubbleUp(this.heap.length - 1);
            }

            pop() {
                if (this.heap.length === 0) return null;
                if (this.heap.length === 1) return this.heap.pop();

                const min = this.heap[0];
                this.heap[0] = this.heap.pop();
                this.bubbleDown(0);
                return min;
            }

            bubbleUp(index) {
                while (index > 0) {
                    const parentIndex = Math.floor((index - 1) / 2);
                    if (this.heap[index].distance >= this.heap[parentIndex].distance) break;
                    [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
                    index = parentIndex;
                }
            }

            bubbleDown(index) {
                while (true) {
                    let minIndex = index;
                    const leftChild = 2 * index + 1;
                    const rightChild = 2 * index + 2;

                    if (leftChild < this.heap.length && this.heap[leftChild].distance < this.heap[minIndex].distance) {
                        minIndex = leftChild;
                    }
                    if (rightChild < this.heap.length && this.heap[rightChild].distance < this.heap[minIndex].distance) {
                        minIndex = rightChild;
                    }
                    if (minIndex === index) break;

                    [this.heap[index], this.heap[minIndex]] = [this.heap[minIndex], this.heap[index]];
                    index = minIndex;
                }
            }

            isEmpty() {
                return this.heap.length === 0;
            }
        }

        class PathInfo {
            constructor() {
                this.path = [];
                this.totalTime = INF;
                this.roads = [];
            }
        }

        // ==================== GRAPH CLASS (C++ EQUIVALENT) ====================
        class TrafficGraph {
            constructor(numVertices) {
                this.numVertices = numVertices;
                this.nodes = [];
                this.adjacencyList = {};
                this.nameToId = {};
            }

            addVertex(id, name, type) {
                this.nodes.push(new Node(id, name, type));
                this.nameToId[name] = id;
                this.adjacencyList[id] = [];
            }

            addEdge(from, to, weight, roadName) {
                this.adjacencyList[from].push(new Edge(to, weight, roadName));
                this.adjacencyList[to].push(new Edge(from, weight, roadName));
            }

            dijkstra(source, destination) {
                const distance = new Array(this.numVertices).fill(INF);
                const parent = new Array(this.numVertices).fill(-1);
                const roadUsed = new Array(this.numVertices).fill("");
                const minHeap = new MinHeap();

                distance[source] = 0;
                minHeap.push(source, 0);

                while (!minHeap.isEmpty()) {
                    const current = minHeap.pop();
                    const u = current.vertex;

                    if (current.distance > distance[u]) continue;

                    for (const edge of this.adjacencyList[u]) {
                        const v = edge.to;
                        const weight = edge.weight;

                        if (distance[u] + weight < distance[v]) {
                            distance[v] = distance[u] + weight;
                            parent[v] = u;
                            roadUsed[v] = edge.roadName;
                            minHeap.push(v, distance[v]);
                        }
                    }
                }

                const result = new PathInfo();
                if (distance[destination] === INF) {
                    return result;
                }

                result.totalTime = distance[destination];

                const pathStack = [];
                const roadStack = [];
                let current = destination;

                while (current !== -1) {
                    pathStack.push(current);
                    if (parent[current] !== -1) {
                        roadStack.push(roadUsed[current]);
                    }
                    current = parent[current];
                }

                result.path = pathStack.reverse();
                result.roads = roadStack.reverse();

                return result;
            }

            findAllPaths(source, destinations) {
                const allPaths = {};
                for (const dest of destinations) {
                    if (dest !== source) {
                        allPaths[dest] = this.dijkstra(source, dest);
                    }
                }
                return allPaths;
            }

            findAllPossiblePaths(source) {
                const allPaths = {};
                for (let dest = 0; dest < this.numVertices; dest++) {
                    if (dest !== source) {
                        allPaths[dest] = this.dijkstra(source, dest);
                    }
                }
                return allPaths;
            }

            floydWarshall() {
                const dist = Array.from({length: this.numVertices}, () => 
                    new Array(this.numVertices).fill(INF));

                for (let i = 0; i < this.numVertices; i++) {
                    dist[i][i] = 0;
                }

                for (let u = 0; u < this.numVertices; u++) {
                    for (const edge of this.adjacencyList[u]) {
                        dist[u][edge.to] = Math.min(dist[u][edge.to], edge.weight);
                    }
                }

                for (let k = 0; k < this.numVertices; k++) {
                    for (let i = 0; i < this.numVertices; i++) {
                        for (let j = 0; j < this.numVertices; j++) {
                            if (dist[i][k] !== INF && dist[k][j] !== INF) {
                                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                            }
                        }
                    }
                }

                return dist;
            }

            getNodeName(id) {
                return this.nodes[id] ? this.nodes[id].name : "Unknown";
            }

            getNodeType(id) {
                return this.nodes[id] ? this.nodes[id].type : "unknown";
            }

            displayNodes() {
                const nodesGrid = document.getElementById('nodesGrid');
                nodesGrid.innerHTML = '';

                for (const node of this.nodes) {
                    const nodeCard = document.createElement('div');
                    nodeCard.className = `node-card ${node.type === 'emergency_station' ? 'emergency' : ''} ${node.type === 'landmark' ? 'landmark' : ''}`;
                    
                    nodeCard.innerHTML = `
                        <div class="node-id">${node.id}</div>
                        <div class="node-name">${node.name}</div>
                        <div class="node-type">${node.type.replace('_', ' ')}</div>
                    `;
                    
                    nodesGrid.appendChild(nodeCard);
                }
            }
        }

        // ==================== CITY INITIALIZATION (C++ EQUIVALENT) ====================
        function initializeComplexCity(graph) {
            // Emergency Stations
            graph.addVertex(0, "Central Command HQ", "emergency_station");
            graph.addVertex(1, "North Fire Station", "emergency_station");
            graph.addVertex(2, "East Police Station", "emergency_station");
            graph.addVertex(3, "West Hospital", "emergency_station");
            graph.addVertex(4, "South Ambulance Base", "emergency_station");
            
            // Major Landmarks
            graph.addVertex(5, "Downtown Mall", "landmark");
            graph.addVertex(6, "City Hall", "landmark");
            graph.addVertex(7, "Central Park", "landmark");
            graph.addVertex(8, "Main Railway Station", "landmark");
            graph.addVertex(9, "Airport Terminal", "landmark");
            graph.addVertex(10, "Sports Stadium", "landmark");
            graph.addVertex(11, "University Campus", "landmark");
            graph.addVertex(12, "Tech Business Park", "landmark");
            graph.addVertex(13, "Medical District", "landmark");
            graph.addVertex(14, "Financial Center", "landmark");
            
            // Residential Areas
            graph.addVertex(15, "North Residential Zone", "intersection");
            graph.addVertex(16, "East Residential Zone", "intersection");
            graph.addVertex(17, "West Residential Zone", "intersection");
            graph.addVertex(18, "South Residential Zone", "intersection");
            
            // Commercial Districts
            graph.addVertex(19, "Market District", "intersection");
            graph.addVertex(20, "Shopping Plaza", "intersection");
            graph.addVertex(21, "Restaurant Row", "intersection");
            graph.addVertex(22, "Entertainment District", "intersection");
            
            // Industrial Areas
            graph.addVertex(23, "Industrial Zone", "intersection");
            graph.addVertex(24, "Warehouse District", "intersection");
            graph.addVertex(25, "Factory Complex", "intersection");
            graph.addVertex(26, "Logistics Hub", "intersection");
            
            // Highway Intersections
            graph.addVertex(27, "Highway Junction North", "intersection");
            graph.addVertex(28, "Highway Junction East", "intersection");
            graph.addVertex(29, "Highway Junction South", "intersection");
            graph.addVertex(30, "Highway Junction West", "intersection");
            
            // Bridge Crossings
            graph.addVertex(31, "River Bridge North", "intersection");
            graph.addVertex(32, "River Bridge South", "intersection");
            graph.addVertex(33, "Canal Bridge East", "intersection");
            graph.addVertex(34, "Canal Bridge West", "intersection");
            
            // Transit Hubs
            graph.addVertex(35, "Metro Station Central", "intersection");
            graph.addVertex(36, "Metro Station North", "intersection");
            graph.addVertex(37, "Metro Station East", "intersection");
            graph.addVertex(38, "Metro Station South", "intersection");
            graph.addVertex(39, "Bus Terminal Main", "intersection");
            
            // Parks and Recreation
            graph.addVertex(40, "Lake Park Junction", "intersection");
            graph.addVertex(41, "Zoo Access Road", "intersection");
            graph.addVertex(42, "Beach Road Junction", "intersection");
            
            // Educational Institutions
            graph.addVertex(43, "School District", "intersection");
            graph.addVertex(44, "College Campus", "intersection");

            // ========== ROAD NETWORK (SAME AS C++) ==========
            
            // Emergency Station Connections
            graph.addEdge(0, 6, 4, "Emergency Route 1");
            graph.addEdge(0, 5, 5, "Main Street");
            graph.addEdge(0, 35, 3, "Metro Access");
            graph.addEdge(1, 15, 3, "North Access");
            graph.addEdge(1, 36, 4, "Metro Link North");
            graph.addEdge(2, 16, 3, "East Access");
            graph.addEdge(2, 37, 4, "Metro Link East");
            graph.addEdge(3, 17, 3, "West Access");
            graph.addEdge(3, 13, 2, "Hospital Road");
            graph.addEdge(4, 18, 3, "South Access");
            graph.addEdge(4, 38, 4, "Metro Link South");
            
            // Downtown Core Network
            graph.addEdge(5, 6, 3, "City Center Boulevard");
            graph.addEdge(5, 14, 4, "Financial Avenue");
            graph.addEdge(5, 19, 5, "Market Street");
            graph.addEdge(6, 7, 4, "Park Avenue");
            graph.addEdge(6, 35, 2, "Metro Direct");
            graph.addEdge(7, 40, 6, "Lake Road");
            graph.addEdge(7, 41, 7, "Zoo Road");
            
            // Major Landmarks Interconnection
            graph.addEdge(8, 35, 2, "Station Link");
            graph.addEdge(8, 39, 3, "Bus Connection");
            graph.addEdge(8, 19, 5, "Market Access");
            graph.addEdge(9, 28, 8, "Airport Highway");
            graph.addEdge(10, 22, 4, "Entertainment Way");
            graph.addEdge(10, 21, 5, "Stadium Road");
            graph.addEdge(11, 44, 3, "Campus Road");
            graph.addEdge(11, 12, 6, "Tech Corridor");
            graph.addEdge(12, 23, 8, "Industrial Highway");
            graph.addEdge(12, 26, 7, "Logistics Way");
            graph.addEdge(13, 3, 2, "Medical Access");
            graph.addEdge(13, 20, 4, "Healthcare Boulevard");
            graph.addEdge(14, 20, 3, "Commerce Street");
            
            // Residential Networks
            graph.addEdge(15, 36, 3, "Metro Residential North");
            graph.addEdge(15, 19, 5, "Market Link North");
            graph.addEdge(15, 27, 6, "Highway Access North");
            graph.addEdge(16, 37, 3, "Metro Residential East");
            graph.addEdge(16, 20, 5, "Shopping Access");
            graph.addEdge(16, 28, 6, "Highway Access East");
            graph.addEdge(17, 20, 5, "Market Access West");
            graph.addEdge(17, 30, 6, "Highway Access West");
            graph.addEdge(18, 38, 3, "Metro Residential South");
            graph.addEdge(18, 19, 5, "Market Link South");
            graph.addEdge(18, 29, 6, "Highway Access South");
            
            // Commercial District Network
            graph.addEdge(19, 21, 4, "Restaurant Link");
            graph.addEdge(19, 22, 4, "Entertainment Link");
            graph.addEdge(20, 33, 5, "Canal Bridge Access East");
            graph.addEdge(20, 34, 5, "Canal Bridge Access West");
            graph.addEdge(21, 22, 3, "Dining Entertainment Way");
            graph.addEdge(21, 39, 5, "Bus Terminal Link");
            
            // Industrial Network
            graph.addEdge(23, 24, 4, "Warehouse Link");
            graph.addEdge(24, 25, 5, "Factory Road");
            graph.addEdge(25, 26, 6, "Heavy Transport Route");
            graph.addEdge(26, 29, 8, "Industrial Highway Exit");
            
            // Highway Network
            graph.addEdge(27, 28, 10, "Highway East-West Segment 1");
            graph.addEdge(28, 29, 10, "Highway North-South Segment 1");
            graph.addEdge(29, 30, 10, "Highway East-West Segment 2");
            graph.addEdge(30, 27, 10, "Highway North-South Segment 2");
            
            // Bridge Crossings
            graph.addEdge(31, 32, 7, "River Bridge Main");
            graph.addEdge(31, 36, 5, "Bridge North Metro");
            graph.addEdge(32, 38, 5, "Bridge South Metro");
            graph.addEdge(33, 34, 6, "Canal Bridge Main");
            graph.addEdge(33, 37, 4, "Bridge East Metro");
            graph.addEdge(34, 35, 4, "Bridge West Metro");
            
            // Metro Network Integration
            graph.addEdge(35, 36, 5, "Metro Line North");
            graph.addEdge(36, 37, 5, "Metro Line East");
            graph.addEdge(37, 38, 5, "Metro Line South");
            graph.addEdge(38, 35, 5, "Metro Line West");
            graph.addEdge(35, 39, 3, "Metro-Bus Transfer");
            
            // Recreation Access
            graph.addEdge(40, 41, 4, "Park-Zoo Connector");
            graph.addEdge(40, 42, 8, "Lake-Beach Road");
            
            // Educational Network
            graph.addEdge(43, 44, 4, "School-College Link");
            graph.addEdge(43, 15, 6, "School-Residential North");
            graph.addEdge(44, 16, 6, "College-Residential East");
        }

        // ==================== GLOBAL VARIABLES ====================
        let cityNetwork;
        let visNetwork;

        // ==================== VISUALIZATION ====================
        function visualizeGraph(pathInfo = null, source = null, destination = null) {
            const nodesArray = [];
            const edgesArray = [];

            for (let i = 0; i < cityNetwork.nodes.length; i++) {
                const node = cityNetwork.nodes[i];
                let color = '#94a3b8';
                let size = 20;

                if (node.type === 'emergency_station') {
                    color = '#ef4444';
                    size = 30;
                } else if (node.type === 'landmark') {
                    color = '#3b82f6';
                    size = 25;
                }

                if (source !== null && i === source) {
                    color = '#f59e0b';
                    size = 35;
                }
                if (destination !== null && i === destination) {
                    color = '#8b5cf6';
                    size = 35;
                }

                if (pathInfo && pathInfo.path.includes(i) && i !== source && i !== destination) {
                    color = '#10b981';
                    size = 28;
                }

                nodesArray.push({
                    id: i,
                    label: `${i}`,
                    title: node.name,
                    color: color,
                    size: size,
                    font: { size: 14, color: '#fff', face: 'Poppins', bold: true }
                });
            }

            const addedEdges = new Set();
            for (const [from, edgeList] of Object.entries(cityNetwork.adjacencyList)) {
                for (const edge of edgeList) {
                    const edgeKey = `${Math.min(from, edge.to)}-${Math.max(from, edge.to)}`;
                    if (!addedEdges.has(edgeKey)) {
                        addedEdges.add(edgeKey);

                        let color = '#cbd5e1';
                        let width = 2;

                        if (pathInfo && pathInfo.path.length > 0) {
                            for (let i = 0; i < pathInfo.path.length - 1; i++) {
                                if ((pathInfo.path[i] == from && pathInfo.path[i + 1] == edge.to) ||
                                    (pathInfo.path[i] == edge.to && pathInfo.path[i + 1] == from)) {
                                    color = '#10b981';
                                    width = 6;
                                    break;
                                }
                            }
                        }

                        edgesArray.push({
                            from: parseInt(from),
                            to: edge.to,
                            label: `${edge.weight}m`,
                            title: edge.roadName,
                            color: { color: color },
                            width: width,
                            font: { size: 11, color: '#64748b', face: 'Poppins' }
                        });
                    }
                }
            }

            const nodes = new vis.DataSet(nodesArray);
            const edges = new vis.DataSet(edgesArray);

            const container = document.getElementById('network');
            const data = { nodes: nodes, edges: edges };
            const options = {
                physics: {
                    enabled: true,
                    barnesHut: {
                        gravitationalConstant: -10000,
                        centralGravity: 0.3,
                        springLength: 200,
                        springConstant: 0.04
                    },
                    stabilization: { iterations: 250 }
                },
                interaction: {
                    hover: true,
                    tooltipDelay: 100,
                    dragView: true,
                    zoomView: false
                },
                nodes: {
                    shape: 'dot',
                    borderWidth: 3,
                    borderWidthSelected: 4
                },
                edges: {
                    smooth: { type: 'continuous' }
                }
            };

            visNetwork = new vis.Network(container, data, options);
        }

        // ==================== MENU HANDLERS (C++ EQUIVALENT) ====================
        function handleSingleRoute() {
            const source = parseInt(document.getElementById('source').value);
            const dest = parseInt(document.getElementById('target').value);

            if (source < 0 || source > 44 || dest < 0 || dest > 44) {
                alert('Invalid intersection IDs! Must be between 0-44.');
                return;
            }

            if (source === dest) {
                alert('Source and destination cannot be the same!');
                return;
            }

            document.getElementById('loading').style.display = 'block';
            document.getElementById('resultsPanel').style.display = 'none';

            setTimeout(() => {
                const pathInfo = cityNetwork.dijkstra(source, dest);
                document.getElementById('loading').style.display = 'none';

                if (pathInfo.totalTime === INF) {
                    alert('No path exists between these intersections!');
                    return;
                }

                visualizeGraph(pathInfo, source, dest);
                displayRouteResults(pathInfo, source, dest);
            }, 500);
        }

        function displayRouteResults(pathInfo, source, dest) {
            const resultsDiv = document.getElementById('results');

            let html = `
                <div class="section-header">
                    <span class="section-icon">🛣️</span>
                    <h3>Route Details</h3>
                </div>
                <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%); padding: 25px; border-radius: 18px; margin-bottom: 25px; border: 3px solid #3b82f6;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                        <div>
                            <strong style="color: #64748b; font-size: 0.9em;">FROM:</strong><br>
                            <span style="color: #f59e0b; font-size: 1.2em; font-weight: 700;">${cityNetwork.getNodeName(source)}</span>
                        </div>
                        <div>
                            <strong style="color: #64748b; font-size: 0.9em;">TO:</strong><br>
                            <span style="color: #8b5cf6; font-size: 1.2em; font-weight: 700;">${cityNetwork.getNodeName(dest)}</span>
                        </div>
                        <div>
                            <strong style="color: #64748b; font-size: 0.9em;">TOTAL TIME:</strong><br>
                            <span style="color: #ef4444; font-size: 1.5em; font-weight: 800;">${pathInfo.totalTime} min</span>
                        </div>
                        <div>
                            <strong style="color: #64748b; font-size: 0.9em;">INTERSECTIONS:</strong><br>
                            <span style="color: #10b981; font-size: 1.4em; font-weight: 700;">${pathInfo.path.length}</span>
                        </div>
                    </div>
                </div>

                <h3 style="color: #1e293b; margin-bottom: 20px; font-size: 1.4em;">📍 Step-by-Step Route</h3>
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>Step</th>
                            <th>Location</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            for (let i = 0; i < pathInfo.path.length; i++) {
                const nodeId = pathInfo.path[i];
                html += `
                    <tr>
                        <td><strong>${i + 1}</strong></td>
                        <td class="path-cell">${cityNetwork.getNodeName(nodeId)}</td>
                        <td>
                `;
                
                if (i < pathInfo.roads.length) {
                    html += `Take <strong>${pathInfo.roads[i]}</strong>`;
                } else {
                    html += `<span style="color: #10b981; font-weight: 700;">🎯 Destination Reached</span>`;
                }
                
                html += `</td></tr>`;
            }

            html += `</tbody></table>`;
            resultsDiv.innerHTML = html;
            document.getElementById('resultsPanel').style.display = 'block';
        }

        function handleAllPossibleRoutes() {
            const source = parseInt(document.getElementById('source').value);

            if (source < 0 || source > 44) {
                alert('Please enter a valid source ID (0-44)!');
                return;
            }

            document.getElementById('loading').style.display = 'block';
            document.getElementById('resultsPanel').style.display = 'none';

            setTimeout(() => {
                const allPaths = cityNetwork.findAllPossiblePaths(source);

                document.getElementById('loading').style.display = 'none';
                displayAllPossibleRoutesResults(allPaths, source);
                visualizeGraph(null, source, null);
            }, 800);
        }

        function displayAllPossibleRoutesResults(allPaths, source) {
            const resultsDiv = document.getElementById('results');

            let html = `
                <div class="section-header">
                    <span class="section-icon">📊</span>
                    <h3>All Possible Routes from ${cityNetwork.getNodeName(source)}</h3>
                </div>
                <div style="background: linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 100%); padding: 25px; border-radius: 18px; margin-bottom: 25px; border: 3px solid #3b82f6;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                        <div>
                            <strong style="color: #64748b; font-size: 0.9em;">SOURCE:</strong><br>
                            <span style="color: #f59e0b; font-size: 1.2em; font-weight: 700;">${cityNetwork.getNodeName(source)}</span>
                        </div>
                        <div>
                            <strong style="color: #64748b; font-size: 0.9em;">TOTAL DESTINATIONS:</strong><br>
                            <span style="color: #8b5cf6; font-size: 1.5em; font-weight: 800;">${Object.keys(allPaths).length}</span>
                        </div>
                        <div>
                            <strong style="color: #64748b; font-size: 0.9em;">REACHABLE NODES:</strong><br>
                            <span style="color: #10b981; font-size: 1.4em; font-weight: 700;">${Object.values(allPaths).filter(path => path.totalTime !== INF).length}</span>
                        </div>
                        <div>
                            <strong style="color: #64748b; font-size: 0.9em;">UNREACHABLE NODES:</strong><br>
                            <span style="color: #ef4444; font-size: 1.4em; font-weight: 700;">${Object.values(allPaths).filter(path => path.totalTime === INF).length}</span>
                        </div>
                    </div>
                </div>

                <h3 style="color: #1e293b; margin-bottom: 20px; font-size: 1.4em;">📍 All Available Routes</h3>
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>Destination</th>
                            <th>Type</th>
                            <th>Travel Time</th>
                            <th>Route Preview</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            for (const [dest, pathInfo] of Object.entries(allPaths)) {
                const destNode = cityNetwork.nodes[parseInt(dest)];
                html += `<tr>`;
                html += `<td class="path-cell">${destNode.name}</td>`;
                html += `<td><span style="font-size: 0.8em; padding: 4px 8px; border-radius: 6px; background: ${destNode.type === 'emergency_station' ? '#fee2e2' : destNode.type === 'landmark' ? '#dbeafe' : '#f1f5f9'}; color: ${destNode.type === 'emergency_station' ? '#dc2626' : destNode.type === 'landmark' ? '#1d4ed8' : '#475569'};">${destNode.type.replace('_', ' ')}</span></td>`;
                
                if (pathInfo.totalTime !== INF) {
                    html += `<td class="time-cell">${pathInfo.totalTime} min</td>`;
                    
                    let pathPreview = '';
                    for (let i = 0; i < Math.min(3, pathInfo.path.length); i++) {
                        const nodeName = cityNetwork.getNodeName(pathInfo.path[i]);
                        pathPreview += nodeName.substring(0, 15);
                        if (i < Math.min(2, pathInfo.path.length - 1)) pathPreview += ' → ';
                    }
                    if (pathInfo.path.length > 3) pathPreview += '...';
                    
                    html += `<td style="font-size: 0.9em; color: #64748b;">${pathPreview}</td>`;
                } else {
                    html += `<td colspan="2" style="color: #ef4444; font-weight: 600;">No path available</td>`;
                }
                
                html += `</tr>`;
            }

            html += `</tbody></table>`;

            resultsDiv.innerHTML = html;
            document.getElementById('resultsPanel').style.display = 'block';
        }

        function handleFloydWarshall() {
            document.getElementById('loading').style.display = 'block';
            document.getElementById('resultsPanel').style.display = 'none';

            setTimeout(() => {
                const allPairsDistances = cityNetwork.floydWarshall();
                document.getElementById('loading').style.display = 'none';
                displayFloydWarshallResults(allPairsDistances);
            }, 500);
        }

        function displayFloydWarshallResults(distances) {
            const resultsDiv = document.getElementById('results');

            let html = `
                <div class="section-header">
                    <span class="section-icon">🔄</span>
                    <h3>Floyd-Warshall All-Pairs Shortest Paths</h3>
                </div>
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 18px; margin-bottom: 25px; border: 3px solid #f59e0b;">
                    <p style="color: #78350f; font-weight: 600; font-size: 1.1em;">
                        ✓ Complete distance matrix calculated successfully!<br>
                        Total computations: <strong>${45 * 45} pairs</strong>
                    </p>
                </div>

                <h3 style="color: #1e293b; margin-bottom: 20px;">Sample Results (First 10 nodes)</h3>
                <table class="results-table">
                    <thead>
                        <tr>
                            <th>From</th>
                            <th>To</th>
                            <th>Distance</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            for (let i = 0; i < Math.min(10, distances.length); i++) {
                for (let j = 0; j < Math.min(10, distances[i].length); j++) {
                    if (i !== j && distances[i][j] !== INF) {
                        html += `
                            <tr>
                                <td><strong>${i}</strong></td>
                                <td><strong>${j}</strong></td>
                                <td class="time-cell">${distances[i][j]} min</td>
                            </tr>
                        `;
                    }
                }
            }

            html += `</tbody></table>`;
            resultsDiv.innerHTML = html;
            document.getElementById('resultsPanel').style.display = 'block';
        }

        // ==================== INITIALIZATION ====================
        function initializeSystem() {
            cityNetwork = new TrafficGraph(45);
            initializeComplexCity(cityNetwork);
            
            let totalEdges = 0;
            for (const edgeList of Object.values(cityNetwork.adjacencyList)) {
                totalEdges += edgeList.length;
            }
            totalEdges = totalEdges / 2;

            document.getElementById('stat-roads').textContent = totalEdges;

            cityNetwork.displayNodes();
            visualizeGraph();
        }

        window.onload = function() {
            console.log('🚦 Intelligent Traffic Management System');
            console.log('Initializing...');
            initializeSystem();
            console.log('✓ System ready!');
        };
