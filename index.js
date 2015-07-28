/* global navigator, document */

(function () {
  var BatteryManager = navigator.battery;
  var els = {
    percentLabel: document.getElementById('percent'),
    chargingLabel: document.getElementById('charging'),
    chargingImg: document.getElementById('charging-img'),
    chargingTime: document.getElementById('charging-time'),
    chargingTimeLabel: document.querySelector('#charging-time .label'),
    dischargingTime: document.getElementById('discharging-time'),
    dischargingTimeLabel: document.querySelector('#discharging-time .label')
  };
  var imgOn = els.chargingImg.getAttribute('data-on');
  var imgOff = els.chargingImg.getAttribute('data-off');
  var render = function () {
    // charge level
    els.percentLabel.textContent = (BatteryManager.level * 100) + '%';

    // charging status
    if (BatteryManager.charging) {
      els.chargingTime.style.display = 'block';
      els.dischargingTime.style.display = 'none';
      els.chargingImg.setAttribute('src', imgOn);
    }
    else {
      els.chargingTime.style.display = 'none';
      els.dischargingTime.style.display = 'block';
      els.chargingImg.setAttribute('src', imgOff);
    }

    // charging time
    if (BatteryManager.chargingTime === Infinity || BatteryManager.chargingTime === 0) {
      els.chargingTimeLabel.textContent = 'N/A';
    }
    else {
      els.chargingTimeLabel.textContent = BatteryManager.chargingTime + ' seconds';
    }

    // discharging time
    if (BatteryManager.dischargingTime === Infinity) {
      els.dischargingTimeLabel.textContent = 'N/A';
    }
    else {
      els.dischargingTimeLabel.textContent = BatteryManager.dischargingTime + ' seconds';
    }
  };

  // initial render
  render();

  // setup change listeners
  BatteryManager.onchargingchange = render;
  BatteryManager.onchargingtimechange = render;
  BatteryManager.ondischargingtimechange = render;
  BatteryManager.onlevelchange = render;
})();
