import React from 'react';
/* global XLS */
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
class App extends React.Component{
  constructor(props) {
    super(props);
    this.handleChangeCoefficient = this.handleChangeCoefficient.bind(this);
    this.handleChangeProfitFromCustomerEngineer = this.handleChangeProfitFromCustomerEngineer.bind(this);
    this.handleChangeDeductionFromCustomerEnginee = this.handleChangeDeductionFromCustomerEnginee.bind(this);
    this.handleChangeRefillingCartridges = this.handleChangeRefillingCartridges.bind(this);
    this.handleChangeMachineMaintenance = this.handleChangeMachineMaintenance.bind(this);
  }
    state = {
      coefficient: 1,
      sum: 0,
      profitFromCustomerEngineer: 0,
      deductionFromCustomerEngineer: 0,
      refillingCartridges: 0,
      machineMaintenance: 0,
    }
      handleChangeCoefficient(e){
        this.setState({coefficient: e.currentTarget.value})
      }
      handleChangeProfitFromCustomerEngineer(e){
        this.setState({profitFromCustomerEngineer: e.currentTarget.value})
      }
      handleChangeDeductionFromCustomerEnginee(e){
        this.setState({deductionFromCustomerEngineer: e.currentTarget.value})
      }
      handleChangeRefillingCartridges(e){
        this.setState({refillingCartridges: e.currentTarget.value})
      }
      handleChangeMachineMaintenance(e){
        this.setState({machineMaintenance: e.currentTarget.value})
      }
      
    filePicked =(oEvent)=> {
      var self = this;
        // Get The File From The Input
    let oFile = oEvent.target.files[0];
    
    // Create A File Reader HTML5
    var reader = new FileReader();

    // Ready The Event For When A File Gets Selected
    reader.onload = function(e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, {type: 'binary'});
        var wb = XLS.parse_xlscfb(cfb);
        // Loop Over Each Sheet
        wb.SheetNames.forEach(function(sheetName) {             
            var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);   
            // console.log(oJS[1].total) //вывести сумму из 2го объекта
            var sum_all_arr = oJS.map(function(sum){
              return sum.total
            });           
              // console.log(sum_all_arr);//массив из сумм
             var SUM = function(array){
                var sum = 0;
                for(var i = 0; i < array.length; i++){
                  sum += parseInt (array[i], 10);//сложить все суммы, перевод из сток в числа
                }                
                console.log(sum);// выводит итоговую сумму за всех клиентов 
                self.setState({sum})  //обновляем состояние суммы    
              }
              SUM(sum_all_arr);
        });
    };
    // Tell JS To Start Reading The File.. You could delay this if desired
    reader.readAsBinaryString(oFile);
    }
    
      render(){
        const rateWorker = 15480
        const {coefficient, sum, deductionFromCustomerEngineer, profitFromCustomerEngineer, refillingCartridges, machineMaintenance} = this.state
        const first = sum * coefficient
        const second = profitFromCustomerEngineer - deductionFromCustomerEngineer
        const third = first + second
        const fourth = machineMaintenance * 0.5
        const fife = third + parseInt(refillingCartridges, 10)
        return(
          <div className = "section">
            <div className = "container">
              <div className = "row">
                <div className = "col-lg-6 col-lg-offset-3">
                  <form>
                    <div className = "form-group">
                      <label for = "upload_file">Выберите файл</label>
                        <input 
                          id="upload_file" 
                          type = "file"  
                          name="files[]" 
                          className = "form-control-file" 
                          placeholder = "выберите файл xls"
                          onChange = {this.filePicked}
                        />
                      <label for = "enter_coefficient">Введите коэффициент</label>
                        <input 
                          type = "text"
                          id = "enter_coefficient"
                          className = "form-control"
                          onChange = {this.handleChangeCoefficient}
                          placeholder = "коэффициент"
                          value = {coefficient}
                        />
                      <label for = "enter_profitFromCustomerEngineer">
                        + Клиенты инженера
                      </label>
                        <input 
                          type = "text"
                          id = "enter_profitFromCustomerEngineer"
                          className = "form-control"
                          onChange = {this.handleChangeProfitFromCustomerEngineer}
                          placeholder = "плюс клиенты инженера"
                          value = {profitFromCustomerEngineer}
                        />
                      <label for = "enter_deductionFromCustomerEngineer">
                        - Клиенты инженера
                      </label>
                        <input 
                          type = "text"
                          id = "enter_deductionFromCustomerEngineer"
                          className = "form-control"
                          onChange = {this.handleChangeDeductionFromCustomerEnginee}
                          placeholder = "минус клиенты инженера"
                          value = {deductionFromCustomerEngineer}
                        />
                      <label for = "enter_refillingCartridges">
                        Заправка картриджей
                      </label>
                        <input 
                          type = "text"
                          id = "enter_refillingCartridges"
                          className = "form-control"
                          onChange = {this.handleChangeRefillingCartridges}
                          placeholder = "заправка"
                          value = {refillingCartridges}
                        />
                      <label for = "enter_machineMaintenance">
                        Расходы на машину
                      </label>
                        <input 
                          type = "text"
                          id = "enter_machineMaintenance"
                          className = "form-control"
                          onChange = {this.handleChangeMachineMaintenance}
                          placeholder = "расходы на машину"
                          value = {machineMaintenance}
                        />
                    <p>Всего:{fife}</p>
                    <p>К выплате:{fife - fourth - rateWorker} </p>
          </div>
            </form>
              </div>
                </div>
                  </div>
                    </div>
        )
      }
    }

export default App;
