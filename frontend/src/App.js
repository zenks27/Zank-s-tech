import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  Dashboard, 
  DeviceUnlock, 
  FirmwareFlash, 
  SoftwareRepair, 
  SupportedDevices,
  Settings,
  Header,
  Sidebar,
  ConnectDevice,
  LogViewer
} from './components.js';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [logs, setLogs] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'info', message: 'Black Coyote started successfully', time: new Date() },
    { id: 2, type: 'warning', message: 'No device connected', time: new Date() }
  ]);

  // Simulate device connection
  const simulateDeviceConnection = () => {
    const devices = [
      { model: 'Samsung Galaxy S24', brand: 'Samsung', status: 'Ready', imei: '123456789012345' },
      { model: 'iPhone 15 Pro', brand: 'Apple', status: 'Ready', imei: '987654321098765' },
      { model: 'Xiaomi 14 Ultra', brand: 'Xiaomi', status: 'Ready', imei: '456789123456789' }
    ];
    
    const randomDevice = devices[Math.floor(Math.random() * devices.length)];
    setConnectedDevice(randomDevice);
    setIsDeviceConnected(true);
    
    // Add connection log
    addLog(`Device connected: ${randomDevice.model}`, 'success');
    
    // Update notifications
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      message: `${randomDevice.model} connected successfully`,
      time: new Date()
    }]);
  };

  const addLog = (message, type = 'info') => {
    const newLog = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep only last 100 logs
  };

  const disconnectDevice = () => {
    if (connectedDevice) {
      addLog(`Device disconnected: ${connectedDevice.model}`, 'warning');
      setNotifications(prev => [...prev, {
        id: Date.now(),
        type: 'warning',
        message: `${connectedDevice.model} disconnected`,
        time: new Date()
      }]);
    }
    setIsDeviceConnected(false);
    setConnectedDevice(null);
  };

  return (
    <div className="App">
      <Header 
        notifications={notifications}
        setNotifications={setNotifications}
      />
      <div className="app-container">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          isDeviceConnected={isDeviceConnected}
        />
        <main className="main-content">
          {activeTab === 'dashboard' && (
            <Dashboard 
              isDeviceConnected={isDeviceConnected}
              connectedDevice={connectedDevice}
              logs={logs}
              addLog={addLog}
              simulateDeviceConnection={simulateDeviceConnection}
              disconnectDevice={disconnectDevice}
            />
          )}
          {activeTab === 'connect' && (
            <ConnectDevice 
              onConnect={simulateDeviceConnection}
              isConnected={isDeviceConnected}
              connectedDevice={connectedDevice}
              onDisconnect={disconnectDevice}
            />
          )}
          {activeTab === 'unlock' && (
            <DeviceUnlock 
              connectedDevice={connectedDevice}
              isDeviceConnected={isDeviceConnected}
              addLog={addLog}
            />
          )}
          {activeTab === 'flash' && (
            <FirmwareFlash 
              connectedDevice={connectedDevice}
              isDeviceConnected={isDeviceConnected}
              addLog={addLog}
            />
          )}
          {activeTab === 'repair' && (
            <SoftwareRepair 
              connectedDevice={connectedDevice}
              isDeviceConnected={isDeviceConnected}
              addLog={addLog}
            />
          )}
          {activeTab === 'devices' && <SupportedDevices />}
          {activeTab === 'logs' && <LogViewer logs={logs} />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default App;