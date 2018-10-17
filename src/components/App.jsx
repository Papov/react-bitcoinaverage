import React from 'react';
import Ethereum from "./Ethereum";
import Litecoin from "./Litecoin";
import Bitcoin from "./Bitcoin"

const API = 'https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD';

class App extends React.Component{
    constructor(){
        super();
        this.toogleSelectHidden = this.toogleSelectHidden.bind(this)
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.state = {
            currency: 'USD',
            currencyIcon: '$',
            hidden: true,
            isLoaded: false,
            data: [],
            course: 1
        }
    }

    toogleSelectHidden(){
        let currentHiddenState = this.state.hidden;
        this.setState({hidden: !currentHiddenState})
    }

    handleChangeCurrency(e){
        let currentCurrency = e.currentTarget.dataset.currency;
        let currentCurrencyIcon = e.currentTarget.dataset.icon;
        let currentCourse = e.currentTarget.dataset.course;
        let beforeCurrency = this.state.currency;
        let beforeCurrencyIcon = this.state.currencyIcon;
        let beforeCourse = this.state.course;
        this.setState({
            currency: currentCurrency,
            currencyIcon: currentCurrencyIcon,
            hidden: true,
            course: currentCourse
        })
        e.currentTarget.innerText = beforeCurrency;
        e.currentTarget.dataset.currency = beforeCurrency;
        e.currentTarget.dataset.icon = beforeCurrencyIcon;
        e.currentTarget.dataset.course = beforeCourse;
    }



    componentDidMount() {
        fetch(API)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render(){
        const { error, isLoaded, data, currency, currencyIcon, course } = this.state;
        const classSelect = this.state.hidden ? 'select hidden' : 'select';
        return(
            <div className='app'>
                <div className='header'>
                    <h3 className='header_title'>Select currency to exhange:</h3>
                    <div className='currency checked' onClick={this.toogleSelectHidden}>{currency}</div>
                    <div className={classSelect}>
                        <div className='option' data-course="0.87" data-icon="€" data-currency="EUR" onClick={this.handleChangeCurrency}>EUR</div>
                        <div className='option' data-course="65.64" data-icon="₽	" data-currency="RUB" onClick={this.handleChangeCurrency}>RUB</div>
                        <div className='option' data-course="0.76" data-icon="£" data-currency="GBP" onClick={this.handleChangeCurrency}>GBP</div>
                    </div>
                </div>
                    {
                        isLoaded ?
                            <div className='widgets_container'>
                                <Ethereum data={data} currencyIcon={currencyIcon} course={course}/>
                                <Litecoin data={data} currencyIcon={currencyIcon} course={course}/>
                                <Bitcoin data={data} currencyIcon={currencyIcon} course={course}/>
                            </div>
                         :
                            <div className='widgets_container'>
                                <p className='loader'>Loading...</p>
                            </div>
                    }
            </div>
        )
    }
}

export default App