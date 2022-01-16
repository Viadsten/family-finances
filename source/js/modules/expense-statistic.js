const nowDate = new Date();

const calcMonthlyExpense = (database) => {
  const thisMonthItems = database.filter((item) => item.mounth === nowDate.getMonth());
  const summ = thisMonthItems.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price), 0);
  const summNode = document.querySelector('.monthly-expenses');
  summNode.textContent = summ;
};

export {calcMonthlyExpense};
