import React from 'react';

class Ethereum extends React.Component{
    constructor(params){
        super(params);
        this.toogleActive = this.toogleActive.bind(this);
        const data = this.props.data;
        const currencyIcon = this.props.currencyIcon;
        const course = this.props.course;
        this.state = {
            active: true,
            volume: parseInt(data.volume*100)/100,
            percent: data.changes.percent,
            price: data.changes.price,
            currencyIcon: currencyIcon,
            course: course
        }
    }

    toogleActive(){
        let activeState = this.state.active;
        this.setState({
            active: !activeState
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.currencyIcon !== this.props.currencyIcon){
            //Perform some operation
            this.setState({currencyIcon: nextProps.currencyIcon});
        }
        if(nextProps.course !== this.props.course){
            //Perform some operation
            this.setState({course: nextProps.course});
        }
    }

    render(){
        const {percent,active, currencyIcon, price, course, volume} = this.state;
        const dataChanges = active ? percent : price;
        const currencyLabel = active ? '%' : currencyIcon
        const activePercent = active ? 'switch active' : 'switch';
        return(
            <div className='widget ethereum'>
                <div className='widget_preview'>
                    <p className='widget_title'>Ethereum</p>
                    <img src="../images/ethereum_coin.png" alt="ethereum_coin"/>
                </div>
                <div className='changes_data'>
                    <div className='price'>
                        <span>Price:</span>
                        <span>{currencyIcon}{parseInt((volume * parseFloat(course))*100)/100}</span>
                    </div>
                    <div className='percent_change' onClick={this.toogleActive}>
                        <span>Percent change</span>
                        <span className={activePercent}></span>
                    </div>
                    <div className='hour_change'>
                        <span>Hour change</span>
                        <span className={parseFloat(dataChanges.hour) >= 0 ? 'color_green' : 'color_red'}>{active? dataChanges.hour : parseInt((dataChanges.hour * parseFloat(course))*100)/100}{currencyLabel}</span>
                    </div>
                    <div className='day_change'>
                        <span>Day change</span>
                        <span className={parseFloat(dataChanges.day) >= 0 ? 'color_green' : 'color_red'}>{active? dataChanges.day : parseInt((dataChanges.day * parseFloat(course))*100)/100}{currencyLabel}</span>
                    </div>
                    <div className='week_change'>
                        <span>Week change</span>
                        <span className={parseFloat(dataChanges.week) >= 0 ? 'color_green' : 'color_red'}>{active? dataChanges.week : parseInt((dataChanges.week * parseFloat(course))*100)/100}{currencyLabel}</span>
                    </div>
                    <div className='month_change'>
                        <span>Month change</span>
                        <span className={parseFloat(dataChanges.month) >= 0 ? 'color_green' : 'color_red'}>{active? dataChanges.month : parseInt((dataChanges.month * parseFloat(course))*100)/100}{currencyLabel}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Ethereum;