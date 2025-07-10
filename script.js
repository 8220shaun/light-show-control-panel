const DEVICE_CONTAINER = document.querySelector('.devices');

const STATUS_CLASSES = {
  online: 'online',
  idle: 'idle',
  offline: 'offline'
};

// Simulated fetch function — replace with actual API endpoint
async function fetchDeviceStatus() {
  // Replace with your actual API call, e.g., `fetch('/api/devices-status')`
  const response = await fetch('/api/devices-status');
  return await response.json();
}

function updateDeviceStatus(devices) {
  // Clear existing
  DEVICE_CONTAINER.innerHTML = '';

  devices.forEach(device => {
    const btn = document.createElement('button');
    btn.textContent = device.name;
    btn.className = `device ${STATUS_CLASSES[device.status] || 'offline'}`;
    DEVICE_CONTAINER.appendChild(btn);
  });
}

async function pollDeviceStatus() {
  try {
    const data = await fetchDeviceStatus();
    updateDeviceStatus(data);
  } catch (err) {
    console.error('Failed to fetch device status:', err);
  }
}

// Start polling every 5 seconds
setInterval(pollDeviceStatus, 5000);
pollDeviceStatus(); // Initial load

