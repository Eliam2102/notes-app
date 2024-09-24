export const fetchTime = async () => {
    try {
      // API para la zona horaria de Mérida, Yucatán
      const response = await fetch('http://worldtimeapi.org/api/timezone/America/Merida');
      const data = await response.json();
      const dateTime = new Date(data.datetime);
      return {
        hours: dateTime.getHours().toString().padStart(2, '0'),
        minutes: dateTime.getMinutes().toString().padStart(2, '0'),
        seconds: dateTime.getSeconds().toString().padStart(2, '0'),
      };
    } catch (error) {
      console.error('Error fetching time:', error);
      return { hours: '00', minutes: '00', seconds: '00' }; 
    }
  };
  