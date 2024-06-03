// src/dataProcessor.js
export const processData = (data) => {
    const alertsByCategory = {};
    data.forEach((item) => {
      const category = item.alert.category;
      if (!alertsByCategory[category]) {
        alertsByCategory[category] = 0;
      }
      alertsByCategory[category]++;
    });
  
    const alertsBySeverity = {};
    data.forEach((item) => {
      const severity = item.alert.severity;
      if (!alertsBySeverity[severity]) {
        alertsBySeverity[severity] = 0;
      }
      alertsBySeverity[severity]++;
    });
  
    const alertsOverTime = {};
    data.forEach((item) => {
      const time = new Date(item.timestamp).toLocaleTimeString();
      if (!alertsOverTime[time]) {
        alertsOverTime[time] = 0;
      }
      alertsOverTime[time]++;
    });
  
    return { alertsByCategory, alertsBySeverity, alertsOverTime };
  };
  