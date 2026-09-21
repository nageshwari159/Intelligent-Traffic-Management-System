* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
    min-height: 100vh;
    color: #333;
    padding: 20px;
}

.container {
    max-width: 1600px;
    margin: 0 auto;
}

.header {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
    color: white;
    padding: 40px;
    border-radius: 25px;
    margin-bottom: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    text-align: center;
    border: 3px solid rgba(99, 102, 241, 0.3);
    position: relative;
    overflow: hidden;
}

.header::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 0.8; }
}

.header h1 {
    font-size: 3em;
    font-weight: 800;
    margin-bottom: 15px;
    background: linear-gradient(45deg, #60a5fa, #a78bfa, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(96, 165, 250, 0.5);
    position: relative;
    z-index: 1;
}

.header p {
    font-size: 1.3em;
    opacity: 0.95;
    font-weight: 400;
    position: relative;
    z-index: 1;
}

.main-grid {
    display: grid;
    grid-template-columns: 1fr 450px;
    gap: 25px;
    margin-bottom: 25px;
}

.network-section {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 25px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    border: 3px solid rgba(59, 130, 246, 0.3);
}

.section-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 3px solid #e0e7ff;
}

.section-header h3 {
    font-size: 1.6em;
    font-weight: 700;
    color: #1e293b;
}

.section-icon {
    font-size: 2em;
    filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.5));
}

#network {
    width: 100%;
    height: 650px;
    border-radius: 20px;
    border: 4px solid #1e293b;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    box-shadow: inset 0 4px 20px rgba(0,0,0,0.1);
}
.controls-panel {
    background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
    border-radius: 25px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    border: 3px solid rgba(168, 85, 247, 0.3);
}

.control-group {
    margin-bottom: 30px;
    background: rgba(255,255,255,0.5);
    padding: 20px;
    border-radius: 15px;
    border: 2px solid rgba(168, 85, 247, 0.2);
}

.control-group h3 {
    color: #1e293b;
    margin-bottom: 20px;
    font-size: 1.4em;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 12px;
}

.input-group {
    margin-bottom: 18px;
}

.input-group label {
    display: block;
    margin-bottom: 10px;
    color: #334155;
    font-weight: 600;
    font-size: 0.95em;
}

.input-group input, .input-group select {
    width: 100%;
    padding: 14px 18px;
    border: 3px solid #cbd5e1;
    border-radius: 12px;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
    transition: all 0.3s ease;
    background: white;
}

.input-group input:focus, .input-group select:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
    transform: translateY(-2px);
} 
.btn {
    width: 100%;
    padding: 16px;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    color: white;
}

.btn-primary:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
}

.btn-success {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
}

.btn-success:hover {
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
}

.btn-warning {
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: white;
}

.btn-warning:hover {
    background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(245, 158, 11, 0.5);
}

.btn-info {
    background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    color: white;
}

.btn-info:hover {
    background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.5);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    margin-top: 25px;
}

.stat-card {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    color: white;
    padding: 20px;
    border-radius: 15px;
    text-align: center;
    border: 2px solid rgba(139, 92, 246, 0.3);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.stat-label {
    font-size: 0.85em;
    opacity: 0.8;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.stat-value {
    font-size: 1.8em;
    font-weight: 800;
    background: linear-gradient(45deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.nodes-panel {
    background: linear-gradient(135deg, #ffffff 0%, #fef3c7 100%);
    border-radius: 25px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    border: 3px solid rgba(251, 191, 36, 0.3);
    max-height: 600px;
    overflow-y: auto;
}

.nodes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.node-card {
    background: white;
    padding: 15px;
    border-radius: 12px;
    border-left: 5px solid #94a3b8;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.node-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.node-card.emergency {
    border-left-color: #ef4444;
    background: linear-gradient(135deg, #ffffff 0%, #fee2e2 100%);
}

.node-card.landmark {
    border-left-color: #3b82f6;
    background: linear-gradient(135deg, #ffffff 0%, #dbeafe 100%);
}

.node-id {
    display: inline-block;
    background: #1e293b;
    color: white;
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 0.85em;
    font-weight: 700;
    margin-bottom: 8px;
}

.node-name {
    font-weight: 600;
    color: #1e293b;
    font-size: 1.05em;
    margin-bottom: 5px;
}

.node-type {
    font-size: 0.8em;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}
.results-panel {
    background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
    border-radius: 25px;
    padding: 35px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    border: 3px solid rgba(34, 197, 94, 0.3);
    margin-top: 25px;
}

.results-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.results-table th {
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    color: white;
    padding: 18px;
    text-align: left;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.9em;
}

.results-table td {
    padding: 18px;
    border-bottom: 2px solid #f1f5f9;
}

.results-table tr:hover {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    transform: scale(1.01);
    transition: all 0.2s ease;
}

.time-cell {
    font-weight: 800;
    color: #ef4444;
    font-size: 1.2em;
}

.path-cell {
    color: #3b82f6;
    font-weight: 600;
}

.loading {
    display: none;
    text-align: center;
    padding: 40px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    margin: 20px 0;
}

.loading-spinner {
    border: 5px solid #f3f4f6;
    border-top: 5px solid #8b5cf6;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}


.loading-text {
    color: #8b5cf6;
    font-size: 1.2em;
    font-weight: 600;
}
 .legend {
    display: flex;
    gap: 25px;
    margin-top: 25px;
    flex-wrap: wrap;
    padding: 20px;
    background: rgba(255,255,255,0.5);
    border-radius: 15px;
} 


.legend-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.95em;
    color: #475569;
    font-weight: 600;
}

.legend-marker {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}



.marker-emergency { background: #ef4444; }
.marker-landmark { background: #3b82f6; }
.marker-path { background: #10b981; }
.marker-source { background: #f59e0b; }
.marker-destination { background: #8b5cf6; }

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #8b5cf6, #6d28d9);
    border-radius: 10px;
}

@media (max-width: 1200px) {
    .main-grid {
        grid-template-columns: 1fr;
    }
    
    .header h1 {
        font-size: 2em;
    }

    .nodes-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
}
