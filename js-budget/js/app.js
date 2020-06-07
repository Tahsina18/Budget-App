class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  //submit budget method
  submitBudgetForm(){
    const value =this.budgetInput.value;
    if(value==='' || value <0){
      this.budgetFeedback.classList.add('showItem');
      this.budgetFeedback.innterHTML ='<p>value cannot be empty or negative<p>'
      const self =this;
      console.log(this);
  //console.log(this);
      setTimeout(function(){
      self.budgetFeedback.classList.remove('showItem');
      const self =this;
      console.log(this);
      
      },4000)
    }
    else{
      this.budgetFeedback.textContext =value; 
      this.budgetInput.value ='';
      this.showBalance();
    }
  }
  //show balance 
  showBalance(){
    console.log()
      const expense = this.totalExpense();
      const total = parseInt(this.budgetAmount.textContent)-expense;
      this.balanceAmount.textContent= total;
      if(total<0){
        this.balance.classList.remove('showGreen','showBlack');
        this.balance.classList.add('showBlack');
      }
      else if (total>0){
        this.balance.classList.remove('showGreen','showBlack');
        this.balance.classList.add('showBlack');
      }
     else if(total = 0)  {
      this.balance.classList.remove('showGreen','showBlack');
      this.balance.classList.add('showBlack');
     }
    }
    //submit expense form 
    submitExpenseForm(){
      const expenseValue = this.expensiveInput.value;
      const amountValue = this.amountInput.value;
      if(expensiveValue ===''|| amountValue === '' || amountValue <0){
        this.expenseFeedback.classList.add("showItem");
        this.expenseFeedback.innerHTML =`<p>values cannot be empty or negative <p>`
        const self =this;
        selfTimeout(function(){
          self.expenseFeedback.classList.remove("showItems");
        },4000)
      }
      else{
        let amount = parseInt(amountValue);
        this.expenseInput.value ="";
        this.amountInput.vale= "";

        let expense ={
          id:this.itemID,
          title:expenseValue,
          amount:amount,
        }
        this.itemID++;
        this.itemList.push(expense)
        this.addExpense(expense)
        this.showBalance();
        // show balance

        }
      }
    
// add expense
  addExpense()
  {
  const div =document.createElement('div');
  div.classList.add('expense');
  div.innerHTML = ` <div class="expense-item d-flex justify-content-between align-items-baseline">

  <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
  <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

  <div class="expense-icons list-item">

   <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
    <i class="fas fa-edit"></i>
   </a>
   <a href="#" class="delete-icon" data-id="${expense.id}">
    <i class="fas fa-trash"></i>
   </a>
  </div>
 </div>
 `;
 this.expenseList.appendChild(div);
  }
    //total expense 
    totalExpense()
    {
      let total = 0;
       if(this.itemList.length>0)
        {
          total =this.itemList.reduce(function(acc,curr){
          acc+= curr.amount;
          return acc;
          },0)
        }
      
      this.expenseAmount.textContext = total;
      return total;
    }
    editExpense(element){
     let id =parseInt(element.dataset.id);
     let parent = element.parentElement.parentElement

    //remove from dom
    this.expenseList.removeChild(parent);

    //remove from the list
    let expense=this.itemList.filter(function(item){
    return item.id == id;
    })
    //show value 
    this.expenseInput.value = expense[0].title;
    this.amountInput.value =expense[0].amount;
    //remove from list
    let tempList =this.itemList.filter(function(item){
    return item.id !==id;
    })
    this.itemList =tempList;
    }
    //delete expense
    deleteExpense (element){
    let id =parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    //remove from dom
     this.expenseList.removeChild(parent);
    // remove from list
    let tempList= this.itemList.filter(function(item){
     return item.id !=id;
    });
    this.itemList = tempList;
    this.showBalance();
    }
  }
  
function eventListerners() 
{
const budgetForm  =document.getElementById('budget-form');// Constructor functions (3 variables)
const expenseForm =document.getElementById('expense-form');
const expenseList =document.getElementById('expense-List');
// new instance of Ui Class
const ui = new UI ();

// budget form submit 
budgetForm.addEventListeners( "submit", function(event){
event.preventDefault()
ui.submitBudgetForm()
} );

//expense form submit
expenseForm.addEventListeners( "submit", function(event){
  event.preventDefault()
  ui.submitExpenseForm()
  ui.submitExpenseForm()
} );
// expense click 
expenseForm.addEventListeners( "click", function() {
  if(event.target.parentElement.classList.contains('edit icon')){
  ui.editExpense(event.target.parentElement)
  }

else if (event.target.parentElement.classList.contains('delete icon')){
  ui.deleteExpense(event.target.parentElement)

}
});
 
// budget form submit 
expenseList.addEventListeners( 'click', function(){
  event.preventDefault();
  ui.submitBudgetForm();
} );

document.addEventListeners('DOMContentLoaded', function(){
  eventListerners();
})
}