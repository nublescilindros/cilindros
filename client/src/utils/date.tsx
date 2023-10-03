const dateCurrent = () => {
  let dayCurrent = new Date();
  let day =
    dayCurrent.getDate() > 10
      ? dayCurrent.getDate()
      : "0" + dayCurrent.getDate();
      let month =
      dayCurrent.getMonth() + 1 >= 10
        ? dayCurrent.getMonth() + 1
        : "0" + (dayCurrent.getMonth() + 1);
  let year = dayCurrent.getFullYear();
  
  return { year: year, month: month, day: day };
};

export default dateCurrent;
