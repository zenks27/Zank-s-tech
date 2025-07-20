import React, { useState, useEffect } from 'react';

// Header Component
export const Header = ({ notifications, setNotifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <span className="logo-icon">🐺</span>
          <span className="logo-text">Black Coyote</span>
        </div>
        <span className="version">v43.66.1639</span>
      </div>
      
      <div className="header-center">
        <nav className="nav-menu">
          <a href="#" className="nav-item active">HOME</a>
          <a href="#" className="nav-item">FEATURES</a>
          <a href="#" className="nav-item">SUPPORTED MODELS</a>
          <a href="#" className="nav-item">TEST POINTS</a>
          <a href="#" className="nav-item">SHOP</a>
        </nav>
      </div>

      <div className="header-right">
        <div className="current-time">
          {currentTime.toLocaleTimeString()}
        </div>
        <div className="notification-container">
          <button 
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
          </button>
          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h3>Notifications</h3>
                <button onClick={() => setNotifications([])}>Clear All</button>
              </div>
              <div className="notification-list">
                {notifications.length === 0 ? (
                  <p>No notifications</p>
                ) : (
                  notifications.map(notification => (
                    <div key={notification.id} className={`notification-item ${notification.type}`}>
                      <span className="notification-message">{notification.message}</span>
                      <span className="notification-time">
                        {notification.time.toLocaleTimeString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        <div className="user-profile">
          <span className="username">Admin</span>
          <div className="avatar">👤</div>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
export const Sidebar = ({ activeTab, setActiveTab, isDeviceConnected }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'connect', label: 'Connect Device', icon: '🔌' },
    { id: 'unlock', label: 'Device Unlock', icon: '🔓' },
    { id: 'flash', label: 'Flash Firmware', icon: '⚡' },
    { id: 'repair', label: 'Software Repair', icon: '🔧' },
    { id: 'devices', label: 'Supported Devices', icon: '📱' },
    { id: 'logs', label: 'Logs', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="sidebar">
      <div className="connection-status">
        <div className={`status-indicator ${isDeviceConnected ? 'connected' : 'disconnected'}`}>
          <span className="status-dot"></span>
          {isDeviceConnected ? 'Device Connected' : 'No Device'}
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

// Dashboard Component
export const Dashboard = ({ 
  isDeviceConnected, 
  connectedDevice, 
  logs, 
  addLog, 
  simulateDeviceConnection, 
  disconnectDevice 
}) => {
  const [stats, setStats] = useState({
    totalUnlocks: 1247,
    successRate: 98.5,
    modelsSupported: 10000,
    lastUpdate: '2025-06-20'
  });

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>ChimeraTool Dashboard</h1>
        <p>Professional Mobile Phone Servicing Solution</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🔓</div>
          <div className="stat-info">
            <h3>{stats.totalUnlocks.toLocaleString()}</h3>
            <p>Total Unlocks</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.successRate}%</h3>
            <p>Success Rate</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📱</div>
          <div className="stat-info">
            <h3>{stats.modelsSupported.toLocaleString()}</h3>
            <p>Models Supported</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-info">
            <h3>{stats.lastUpdate}</h3>
            <p>Last Update</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="device-section">
          <h2>Device Overview</h2>
          {isDeviceConnected && connectedDevice ? (
            <div className="connected-device">
              <div className="device-image">
                <img 
                  src="https://images.unsplash.com/photo-1505468726633-0069fc52f4b9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwdGVjaG5vbG9neXxlbnwwfHx8Ymx1ZXwxNzUzMDI0NjE5fDA&ixlib=rb-4.1.0&q=85"
                  alt="Connected Device"
                />
              </div>
              <div className="device-info">
                <h3>{connectedDevice.model}</h3>
                <p><strong>Brand:</strong> {connectedDevice.brand}</p>
                <p><strong>Status:</strong> <span className="status-ready">{connectedDevice.status}</span></p>
                <p><strong>IMEI:</strong> {connectedDevice.imei}</p>
                <button className="disconnect-btn" onClick={disconnectDevice}>
                  Disconnect Device
                </button>
              </div>
            </div>
          ) : (
            <div className="no-device">
              <div className="no-device-image">
                <img 
                  src="https://images.unsplash.com/photo-1659355751133-763bd796eeb2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMHJlcGFpcnxlbnwwfHx8Ymx1ZXwxNzUzMDI0NjEyfDA&ixlib=rb-4.1.0&q=85"
                  alt="Connect Device"
                />
              </div>
              <h3>No Device Connected</h3>
              <p>Connect your device to get started with repair operations</p>
              <button className="connect-btn" onClick={simulateDeviceConnection}>
                Connect Device
              </button>
            </div>
          )}
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-grid">
            <button className="action-btn unlock">
              <span className="action-icon">🔓</span>
              <span className="action-label">Device Unlock</span>
            </button>
            <button className="action-btn flash">
              <span className="action-icon">⚡</span>
              <span className="action-label">Flash Firmware</span>
            </button>
            <button className="action-btn repair">
              <span className="action-icon">🔧</span>
              <span className="action-label">Software Repair</span>
            </button>
            <button className="action-btn root">
              <span className="action-icon">🔑</span>
              <span className="action-label">Root Device</span>
            </button>
          </div>
        </div>

        <div className="recent-logs">
          <h2>Recent Activity</h2>
          <div className="log-container">
            {logs.length === 0 ? (
              <p className="no-logs">No recent activity</p>
            ) : (
              logs.slice(0, 5).map(log => (
                <div key={log.id} className={`log-item ${log.type}`}>
                  <span className="log-time">{log.timestamp}</span>
                  <span className="log-message">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Connect Device Component
export const ConnectDevice = ({ onConnect, isConnected, connectedDevice, onDisconnect }) => {
  const [selectedPort, setSelectedPort] = useState('USB');
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onConnect();
    }, 2000);
  };

  return (
    <div className="connect-device">
      <div className="connect-header">
        <h1>Connect Device</h1>
        <p>Connect your mobile device to start repair operations</p>
      </div>

      <div className="connection-options">
        <div className="port-selection">
          <h3>Connection Type</h3>
          <div className="port-options">
            <label className="port-option">
              <input 
                type="radio" 
                name="port" 
                value="USB" 
                checked={selectedPort === 'USB'}
                onChange={(e) => setSelectedPort(e.target.value)}
              />
              <span>USB Connection</span>
            </label>
            <label className="port-option">
              <input 
                type="radio" 
                name="port" 
                value="UART" 
                checked={selectedPort === 'UART'}
                onChange={(e) => setSelectedPort(e.target.value)}
              />
              <span>UART/Serial Connection</span>
            </label>
          </div>
        </div>

        <div className="connection-status-panel">
          {isConnected ? (
            <div className="connected-panel">
              <div className="success-icon">✅</div>
              <h3>Device Connected Successfully</h3>
              <div className="device-details">
                <img 
                  src="https://images.unsplash.com/photo-1583573622766-24fa6ae858a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxzbWFydHBob25lJTIwdGVjaG5vbG9neXxlbnwwfHx8Ymx1ZXwxNzUzMDI0NjE5fDA&ixlib=rb-4.1.0&q=85"
                  alt="Connected Device"
                  className="device-preview"
                />
                <div className="device-info">
                  <h4>{connectedDevice?.model}</h4>
                  <p>Brand: {connectedDevice?.brand}</p>
                  <p>Status: {connectedDevice?.status}</p>
                  <p>IMEI: {connectedDevice?.imei}</p>
                </div>
              </div>
              <button className="disconnect-button" onClick={onDisconnect}>
                Disconnect Device
              </button>
            </div>
          ) : (
            <div className="not-connected-panel">
              <div className="device-placeholder">
                <img 
                  src="https://images.unsplash.com/photo-1587017234728-932c80f3e56f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxtb2JpbGUlMjBwaG9uZSUyMHJlcGFpcnxlbnwwfHx8Ymx1ZXwxNzUzMDI0NjEyfDA&ixlib=rb-4.1.0&q=85"
                  alt="Device Connection"
                />
              </div>
              <h3>No Device Detected</h3>
              <p>Please connect your device and click scan</p>
              <button 
                className={`scan-button ${scanning ? 'scanning' : ''}`}
                onClick={handleScan}
                disabled={scanning}
              >
                {scanning ? '🔄 Scanning...' : '🔍 Scan for Devices'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="connection-instructions">
        <h3>Connection Instructions</h3>
        <div className="instruction-steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Enable Developer Options</h4>
              <p>Go to Settings → About Phone → Tap Build Number 7 times</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Enable USB Debugging</h4>
              <p>Go to Settings → Developer Options → Enable USB Debugging</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>Connect Device</h4>
              <p>Connect your device using a USB cable and click Scan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Device Unlock Component
export const DeviceUnlock = ({ connectedDevice, isDeviceConnected, addLog }) => {
  const [unlockType, setUnlockType] = useState('network');
  const [unlocking, setUnlocking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [unlockResult, setUnlockResult] = useState(null);

  const handleUnlock = () => {
    if (!isDeviceConnected) {
      addLog('Please connect a device first', 'error');
      return;
    }

    setUnlocking(true);
    setProgress(0);
    setUnlockResult(null);
    
    addLog(`Starting ${unlockType} unlock for ${connectedDevice.model}`, 'info');

    // Simulate unlock progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUnlocking(false);
          setUnlockResult('success');
          addLog(`${unlockType} unlock completed successfully`, 'success');
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  const supportedUnlocks = [
    { type: 'network', label: 'Network Unlock', description: 'Remove SIM lock from device' },
    { type: 'bootloader', label: 'Bootloader Unlock', description: 'Unlock device bootloader' },
    { type: 'frp', label: 'FRP Bypass', description: 'Factory Reset Protection bypass' },
    { type: 'pattern', label: 'Pattern/PIN Unlock', description: 'Remove screen lock pattern or PIN' }
  ];

  return (
    <div className="device-unlock">
      <div className="unlock-header">
        <h1>Device Unlock</h1>
        <p>Unlock various security features of your mobile device</p>
      </div>

      {!isDeviceConnected && (
        <div className="no-device-warning">
          ⚠️ Please connect a device to proceed with unlock operations
        </div>
      )}

      <div className="unlock-options">
        <h3>Select Unlock Type</h3>
        <div className="unlock-types">
          {supportedUnlocks.map(unlock => (
            <label key={unlock.type} className="unlock-type">
              <input 
                type="radio" 
                name="unlockType" 
                value={unlock.type}
                checked={unlockType === unlock.type}
                onChange={(e) => setUnlockType(e.target.value)}
                disabled={unlocking}
              />
              <div className="unlock-info">
                <h4>{unlock.label}</h4>
                <p>{unlock.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {isDeviceConnected && (
        <div className="device-info-panel">
          <h3>Connected Device</h3>
          <div className="device-preview">
            <img 
              src="https://images.unsplash.com/photo-1617696991998-06ce6d87eaaf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwzfHxtb2JpbGUlMjBwaG9uZSUyMHJlcGFpcnxlbnwwfHx8Ymx1ZXwxNzUzMDI0NjEyfDA&ixlib=rb-4.1.0&q=85"
              alt="Device"
            />
            <div className="device-details">
              <h4>{connectedDevice?.model}</h4>
              <p>Brand: {connectedDevice?.brand}</p>
              <p>IMEI: {connectedDevice?.imei}</p>
            </div>
          </div>
        </div>
      )}

      <div className="unlock-action">
        {unlocking && (
          <div className="progress-section">
            <h3>Unlocking in Progress...</h3>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p>{Math.round(progress)}% Complete</p>
          </div>
        )}

        {unlockResult && (
          <div className={`unlock-result ${unlockResult}`}>
            {unlockResult === 'success' ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Unlock Successful!</h3>
                <p>Your device has been unlocked successfully</p>
              </div>
            ) : (
              <div className="error-message">
                <div className="error-icon">❌</div>
                <h3>Unlock Failed</h3>
                <p>Please try again or check device compatibility</p>
              </div>
            )}
          </div>
        )}

        <button 
          className="unlock-button"
          onClick={handleUnlock}
          disabled={!isDeviceConnected || unlocking}
        >
          {unlocking ? 'Unlocking...' : `Start ${unlockType.toUpperCase()} Unlock`}
        </button>
      </div>

      <div className="unlock-info">
        <h3>Important Information</h3>
        <div className="info-cards">
          <div className="info-card">
            <h4>⚠️ Legal Notice</h4>
            <p>Only unlock devices that you own or have permission to unlock</p>
          </div>
          <div className="info-card">
            <h4>📋 Requirements</h4>
            <p>Device must be connected with USB debugging enabled</p>
          </div>
          <div className="info-card">
            <h4>🔄 Success Rate</h4>
            <p>98.5% success rate across all supported models</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Firmware Flash Component
export const FirmwareFlash = ({ connectedDevice, isDeviceConnected, addLog }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [flashMode, setFlashMode] = useState('download');
  const [flashing, setFlashing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    addLog(`Firmware file selected: ${file?.name}`, 'info');
  };

  const handleFlash = () => {
    if (!isDeviceConnected) {
      addLog('Please connect a device first', 'error');
      return;
    }
    if (!selectedFile) {
      addLog('Please select a firmware file first', 'error');
      return;
    }

    setFlashing(true);
    setProgress(0);
    addLog(`Starting firmware flash for ${connectedDevice.model}`, 'info');

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setFlashing(false);
          addLog('Firmware flash completed successfully', 'success');
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 300);
  };

  return (
    <div className="firmware-flash">
      <div className="flash-header">
        <h1>Flash Firmware</h1>
        <p>Flash stock or custom firmware to your device</p>
      </div>

      {!isDeviceConnected && (
        <div className="no-device-warning">
          ⚠️ Please connect a device to proceed with firmware flashing
        </div>
      )}

      <div className="flash-options">
        <div className="mode-selection">
          <h3>Flash Mode</h3>
          <div className="mode-options">
            <label className="mode-option">
              <input 
                type="radio" 
                name="flashMode" 
                value="download"
                checked={flashMode === 'download'}
                onChange={(e) => setFlashMode(e.target.value)}
              />
              <span>Download Mode</span>
            </label>
            <label className="mode-option">
              <input 
                type="radio" 
                name="flashMode" 
                value="fastboot"
                checked={flashMode === 'fastboot'}
                onChange={(e) => setFlashMode(e.target.value)}
              />
              <span>Fastboot Mode</span>
            </label>
            <label className="mode-option">
              <input 
                type="radio" 
                name="flashMode" 
                value="edl"
                checked={flashMode === 'edl'}
                onChange={(e) => setFlashMode(e.target.value)}
              />
              <span>EDL Mode</span>
            </label>
          </div>
        </div>

        <div className="file-selection">
          <h3>Select Firmware File</h3>
          <div className="file-input-container">
            <input 
              type="file" 
              id="firmware-file" 
              accept=".tar,.zip,.img,.bin"
              onChange={handleFileSelect}
              className="file-input"
            />
            <label htmlFor="firmware-file" className="file-label">
              {selectedFile ? selectedFile.name : 'Choose firmware file...'}
            </label>
          </div>
          <p className="file-hint">Supported formats: .tar, .zip, .img, .bin</p>
        </div>
      </div>

      {isDeviceConnected && (
        <div className="device-info-panel">
          <h3>Target Device</h3>
          <div className="device-preview">
            <img 
              src="https://images.unsplash.com/photo-1510166150654-85d6103a2414?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxzbWFydHBob25lJTIwdGVjaG5vbG9neXxlbnwwfHx8Yml1ZXwxNzUzMDI0NjE5fDA&ixlib=rb-4.1.0&q=85"
              alt="Target Device"
            />
            <div className="device-details">
              <h4>{connectedDevice?.model}</h4>
              <p>Brand: {connectedDevice?.brand}</p>
              <p>Current Status: {connectedDevice?.status}</p>
            </div>
          </div>
        </div>
      )}

      {flashing && (
        <div className="flash-progress">
          <h3>Flashing Firmware...</h3>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{Math.round(progress)}% Complete</p>
          <div className="flash-warnings">
            <p>⚠️ Do not disconnect the device during flashing</p>
            <p>⚠️ Ensure stable power connection</p>
          </div>
        </div>
      )}

      <div className="flash-actions">
        <button 
          className="flash-button"
          onClick={handleFlash}
          disabled={!isDeviceConnected || !selectedFile || flashing}
        >
          {flashing ? 'Flashing...' : 'Start Flash Process'}
        </button>
      </div>

      <div className="flash-info">
        <h3>Important Safety Information</h3>
        <div className="safety-warnings">
          <div className="warning-card">
            <h4>⚠️ Warning</h4>
            <p>Flashing wrong firmware can permanently damage your device</p>
          </div>
          <div className="warning-card">
            <h4>🔋 Power</h4>
            <p>Ensure device has at least 50% battery before flashing</p>
          </div>
          <div className="warning-card">
            <h4>📱 Compatibility</h4>
            <p>Only use firmware specifically designed for your device model</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Software Repair Component
export const SoftwareRepair = ({ connectedDevice, isDeviceConnected, addLog }) => {
  const [repairType, setRepairType] = useState('bootloop');
  const [repairing, setRepairing] = useState(false);
  const [repairResult, setRepairResult] = useState(null);

  const repairOptions = [
    { type: 'bootloop', label: 'Fix Boot Loop', description: 'Repair devices stuck in boot loop' },
    { type: 'softbrick', label: 'Soft Brick Recovery', description: 'Recover from soft brick state' },
    { type: 'freeze', label: 'System Freeze Fix', description: 'Fix system freezing issues' },
    { type: 'imei', label: 'IMEI Repair', description: 'Restore corrupted IMEI (where legal)' }
  ];

  const handleRepair = () => {
    if (!isDeviceConnected) {
      addLog('Please connect a device first', 'error');
      return;
    }

    setRepairing(true);
    setRepairResult(null);
    addLog(`Starting ${repairType} repair for ${connectedDevice.model}`, 'info');

    setTimeout(() => {
      setRepairing(false);
      setRepairResult('success');
      addLog(`${repairType} repair completed successfully`, 'success');
    }, 3000);
  };

  return (
    <div className="software-repair">
      <div className="repair-header">
        <h1>Software Repair</h1>
        <p>Fix common software issues on your mobile device</p>
      </div>

      <div className="repair-options">
        <h3>Select Repair Type</h3>
        <div className="repair-types">
          {repairOptions.map(repair => (
            <label key={repair.type} className="repair-type">
              <input 
                type="radio" 
                name="repairType" 
                value={repair.type}
                checked={repairType === repair.type}
                onChange={(e) => setRepairType(e.target.value)}
                disabled={repairing}
              />
              <div className="repair-info">
                <h4>{repair.label}</h4>
                <p>{repair.description}</p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {isDeviceConnected && (
        <div className="device-status">
          <h3>Device Diagnosis</h3>
          <div className="diagnosis-result">
            <p>Device Model: {connectedDevice?.model}</p>
            <p>Current Status: <span className="status-ok">Detected</span></p>
            <p>Repair Compatibility: <span className="status-ok">Compatible</span></p>
          </div>
        </div>
      )}

      {repairing && (
        <div className="repair-progress">
          <div className="repair-animation">
            <div className="spinner"></div>
          </div>
          <h3>Repairing Device...</h3>
          <p>Please wait while we fix the {repairType} issue</p>
        </div>
      )}

      {repairResult && (
        <div className="repair-result success">
          <div className="result-icon">✅</div>
          <h3>Repair Successful!</h3>
          <p>The {repairType} issue has been resolved</p>
        </div>
      )}

      <button 
        className="repair-button"
        onClick={handleRepair}
        disabled={!isDeviceConnected || repairing}
      >
        {repairing ? 'Repairing...' : `Start ${repairType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Repair`}
      </button>
    </div>
  );
};

// Supported Devices Component
export const SupportedDevices = () => {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const deviceBrands = [
    { name: 'All', count: 10000 },
    { name: 'Samsung', count: 2500 },
    { name: 'Apple', count: 150 },
    { name: 'Huawei', count: 1800 },
    { name: 'Xiaomi', count: 1200 },
    { name: 'Oppo', count: 800 },
    { name: 'Vivo', count: 600 },
    { name: 'OnePlus', count: 200 },
    { name: 'LG', count: 400 }
  ];

  const sampleDevices = [
    { model: 'Galaxy S24 Ultra', brand: 'Samsung', support: '✅ Full Support' },
    { model: 'Galaxy S23 Series', brand: 'Samsung', support: '✅ Full Support' },
    { model: 'iPhone 15 Pro Max', brand: 'Apple', support: '✅ Full Support' },
    { model: 'iPhone 14 Series', brand: 'Apple', support: '✅ Full Support' },
    { model: 'Mi 14 Ultra', brand: 'Xiaomi', support: '✅ Full Support' },
    { model: 'Redmi Note 13', brand: 'Xiaomi', support: '✅ Full Support' },
    { model: 'P60 Pro', brand: 'Huawei', support: '✅ Full Support' },
    { model: 'Find X7 Ultra', brand: 'Oppo', support: '✅ Full Support' }
  ];

  const filteredDevices = sampleDevices.filter(device => {
    const matchesBrand = selectedBrand === 'All' || device.brand === selectedBrand;
    const matchesSearch = device.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <div className="supported-devices">
      <div className="devices-header">
        <h1>Supported Devices</h1>
        <p>Over 10,000 mobile device models supported</p>
      </div>

      <div className="devices-filter">
        <div className="brand-filter">
          <h3>Filter by Brand</h3>
          <div className="brand-buttons">
            {deviceBrands.map(brand => (
              <button
                key={brand.name}
                className={`brand-btn ${selectedBrand === brand.name ? 'active' : ''}`}
                onClick={() => setSelectedBrand(brand.name)}
              >
                {brand.name} ({brand.count})
              </button>
            ))}
          </div>
        </div>

        <div className="search-filter">
          <input 
            type="text"
            placeholder="Search device model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="devices-showcase">
        <div className="showcase-image">
          <img 
            src="https://images.unsplash.com/photo-1587017234728-932c80f3e56f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHxtb2JpbGUlMjBwaG9uZSUyMHJlcGFpcnxlbnwwfHx8Ymx1ZXwxNzUzMDI0NjEyfDA&ixlib=rb-4.1.0&q=85"
            alt="Supported Devices"
          />
        </div>
      </div>

      <div className="devices-list">
        <h3>Device Models ({filteredDevices.length} showing)</h3>
        <div className="device-grid">
          {filteredDevices.map((device, index) => (
            <div key={index} className="device-card">
              <div className="device-icon">📱</div>
              <h4>{device.model}</h4>
              <p>{device.brand}</p>
              <span className="support-status">{device.support}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="compatibility-info">
        <h3>Compatibility Information</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>Regular Updates</h4>
            <p>New device models added monthly</p>
          </div>
          <div className="info-card">
            <h4>Full Features</h4>
            <p>Unlock, flash, and repair supported</p>
          </div>
          <div className="info-card">
            <h4>Latest Models</h4>
            <p>Support for 2025 flagship devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Log Viewer Component
export const LogViewer = ({ logs }) => {
  const [filterType, setFilterType] = useState('all');
  
  const filteredLogs = filterType === 'all' 
    ? logs 
    : logs.filter(log => log.type === filterType);

  return (
    <div className="log-viewer">
      <div className="log-header">
        <h1>System Logs</h1>
        <div className="log-filters">
          <button 
            className={filterType === 'all' ? 'active' : ''}
            onClick={() => setFilterType('all')}
          >
            All ({logs.length})
          </button>
          <button 
            className={filterType === 'info' ? 'active' : ''}
            onClick={() => setFilterType('info')}
          >
            Info
          </button>
          <button 
            className={filterType === 'success' ? 'active' : ''}
            onClick={() => setFilterType('success')}
          >
            Success
          </button>
          <button 
            className={filterType === 'warning' ? 'active' : ''}
            onClick={() => setFilterType('warning')}
          >
            Warning
          </button>
          <button 
            className={filterType === 'error' ? 'active' : ''}
            onClick={() => setFilterType('error')}
          >
            Error
          </button>
        </div>
      </div>

      <div className="log-container">
        {filteredLogs.length === 0 ? (
          <div className="no-logs">
            <p>No logs to display</p>
          </div>
        ) : (
          filteredLogs.map(log => (
            <div key={log.id} className={`log-entry ${log.type}`}>
              <span className="log-timestamp">{log.timestamp}</span>
              <span className="log-type">[{log.type.toUpperCase()}]</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Settings Component
export const Settings = () => {
  const [settings, setSettings] = useState({
    autoConnect: true,
    notifications: true,
    debugMode: false,
    language: 'English',
    theme: 'dark'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="settings">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Configure ChimeraTool preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-section">
          <h3>General Settings</h3>
          <div className="setting-item">
            <label className="setting-label">
              <input 
                type="checkbox"
                checked={settings.autoConnect}
                onChange={(e) => handleSettingChange('autoConnect', e.target.checked)}
              />
              Auto-connect devices
            </label>
          </div>
          <div className="setting-item">
            <label className="setting-label">
              <input 
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleSettingChange('notifications', e.target.checked)}
              />
              Show notifications
            </label>
          </div>
          <div className="setting-item">
            <label className="setting-label">
              <input 
                type="checkbox"
                checked={settings.debugMode}
                onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
              />
              Debug mode
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Interface Settings</h3>
          <div className="setting-item">
            <label>Language:</label>
            <select 
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
          <div className="setting-item">
            <label>Theme:</label>
            <select 
              value={settings.theme}
              onChange={(e) => handleSettingChange('theme', e.target.value)}
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        <div className="settings-section">
          <h3>About ChimeraTool</h3>
          <div className="about-info">
            <p><strong>Version:</strong> 43.66.1639</p>
            <p><strong>Release Date:</strong> June 20, 2025</p>
            <p><strong>License:</strong> Professional</p>
            <p><strong>Supported Models:</strong> 10,000+</p>
          </div>
        </div>
      </div>
    </div>
  );
};