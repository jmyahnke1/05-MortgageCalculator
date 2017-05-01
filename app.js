(function() {
  'use strict';

  angular
    .module('app', []);
})();

(function() {
  'use strict';

  angular
    .module('app')
    .controller('Controller', Controller);

  Controller.$inject = [];

  /* @ngInject */
  function Controller() {
    var vm = this;
    vm.loanBalance;
    vm.interestRate;
    vm.loanTerm;
    vm.period;
    vm.outputText = "";

    vm.selectOptions = [
      {value:1, label:"Monthly"},
      {value:3, label:"90 Days"},
      {value:6, label:"6 Months"},
      {value:12, label:"1 Year"}
    ];

    vm.Calculate = function() {

      if (vm.loanBalance <= 0 || vm.loanBalance === undefined){
        vm.outputText = "Please enter the correct loan balance amount.";
        return;
      }

      if(vm.interestRate <= 0 || vm.interestRate === undefined){
        vm.outputText = "Please enter the correct interest rate.";
        return;
      }

      if (vm.loanTerm <= 0 || vm.loanTerm === undefined){
        vm.outputText = "Please enter the loan term length.";
        return;
      }
      // monthly interest rate
      var monthlyInterestRate = (vm.interestRate / 100) / vm.period.value;

      // number of payments
      var numberOfPayments = vm.loanTerm * vm.period.value;

      // compounded interest rate
      var compoundedInterestRate = Math.pow((1 + monthlyInterestRate), numberOfPayments);

      // interest quotient
      var interestQuotient = (monthlyInterestRate * compoundedInterestRate) / (compoundedInterestRate - 1);

      // final calculation
      var monthlyPayment = vm.loanBalance * interestQuotient;

      vm.outputText = "The Monthly Payment will be: $" + monthlyPayment.toFixed(2);
    }

    function activate(){
      vm.period = vm.selectOptions[0];
     };
    activate();
  };
})();
