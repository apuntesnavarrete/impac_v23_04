export const getCurrentDate = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthNames = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  };